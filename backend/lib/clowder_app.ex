defmodule ClowderApp do
  @moduledoc """
  Documentation for `ClowderApp`.
  """

  @doc """
  Hello world.

  ## Examples

      iex> ClowderApp.hello()
      :world

  """
  use Application

  def start(_type, _args) do
    children = [
      Plug.Cowboy.child_spec(
        scheme: :http,
        plug: ClowderApp.Router,
        options: [
          dispatch: dispatch(),
          port: Application.fetch_env!(:clowder_app, :port)
        ]
      ),
      Registry.child_spec(
        keys: :duplicate,
        name: Registry.ClowderApp
      )
    ]

    opts = [strategy: :one_for_one, name: ClowderApp.Application]
    Supervisor.start_link(children, opts)
  end

  defp dispatch do
    [
      {:_,
       [
         {"/ws/[...]", ClowderApp.SocketHandler, []},
         {:_, Plug.Cowboy.Handler, {ClowderApp.Router, []}}
       ]}
    ]
  end
end
