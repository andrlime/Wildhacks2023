##
## Andrew Li 04/15/2023
## Modelled off of https://medium.com/@loganbbres/elixir-websocket-chat-example-c72986ab5778
##

defmodule ClowderApp.SocketHandler do
  @behaviour :cowboy_websocket

  def init(request, _state) do
    state = %{registry_key: request.path}

    {:cowboy_websocket, request, state}
  end

  def websocket_init(state) do
    Registry.ClowderApp
    |> Registry.register(state.registry_key, {})

    {:ok, state}
  end

  def websocket_handle({:text, json}, state) do
    case Jason.decode!(json) do
      %{"msg" => message, "also" => also} ->
        # IO.inspect(json, label: "Message")
        output_map = %{"name" => message, "firstletter" => also}
        output_json = Jason.encode!(output_map)

        Registry.ClowderApp
        |> Registry.dispatch(state.registry_key, fn entries ->
          for {pid, _} <- entries do
            if pid != self() do
              Process.send(pid, output_json, [])
            end
          end
        end)

        {:reply, {:text, output_json}, state}

      {:error, error_rsn} ->
        IO.puts(error_rsn)
    end
  end

  def websocket_info(info, state) do
    {:reply, {:text, info}, state}
  end
end
