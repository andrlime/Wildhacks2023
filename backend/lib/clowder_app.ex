defmodule ClowderApp do
  use Application

  @spec start(any, any) :: {:error, any} | {:ok, pid}
  def start(_type, _args) do
    children = [ # Start with a http process at port 4000 by default. Can be changed.
      Plug.Cowboy.child_spec(
        scheme: :http,
        plug: ClowderApp.Router,
        options: [
          dispatch: dispatch(),
          port: 4000
        ]
      ),
      Registry.child_spec(
        keys: :duplicate,
        name: Registry.ClowderApp
      )
    ]

    IO.puts("⚠️  Started app at port 4000")

    opts = [strategy: :one_for_one, name: ClowderApp.Application]
    Supervisor.start_link(children, opts)
  end

  defp dispatch do
    [
      {:_,
       [
         {"/ws/[...]", ClowderApp.SocketHandler, []}, # Listens to requests from /ws/* and sends them to the socket handler
         {:_, Plug.Cowboy.Handler, {ClowderApp.Router, []}}
       ]}
    ]
  end
end
