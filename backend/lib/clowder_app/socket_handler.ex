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

  ## Handle websocket requests
  ## Based on the structure of the input JSON
  ## Modified from https://medium.com/@loganbbres/elixir-websocket-chat-example-c72986ab5778
  ## Referenced Elixir docs
  def websocket_handle({:text, json}, state) do
    IO.inspect(json, label: "❎ Got request. Payload") # Output to console
    case Jason.decode!(json) do
      %{ # Specify input data
        "area" => area,
        "class" => class,
        "location" => location,
        "pinlatitude" => pinlatitude,
        "pinlongitude" => pinlongitude,
        "school" => school,
        "showpin" => showpin,
        "status" => status,
        "subject" => subject,
        "uuid" => uuid,
        "timestamp" => timestamp,
        "displayname" => displayname,
        "message" => message
      } ->
        output_map = %{ # Specify format for return data
          "area" => area,
          "class" => class,
          "location" => location,
          "pinlatitude" => pinlatitude,
          "pinlongitude" => pinlongitude,
          "school" => school,
          "showpin" => showpin,
          "status" => status,
          "subject" => subject,
          "uuid" => uuid,
          "timestamp" => timestamp,
          "displayname" => displayname,
          "message" => message
        }
        output_json = Jason.encode!(output_map)

        Registry.ClowderApp
        |> Registry.dispatch(state.registry_key, fn entries ->
          for {pid, _} <- entries do
            if pid != self() do
              Process.send(pid, output_json, []) # Send json response to all processes
            end
          end
        end)

        {:reply, {:text, output_json}, state} # For good measure

      {:error, error_rsn} ->
        IO.puts(error_rsn)
    end
  end

  def websocket_info(info, state) do
    {:reply, {:text, info}, state}
  end
end
