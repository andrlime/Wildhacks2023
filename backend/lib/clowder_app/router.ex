##
## Andrew Li 04/15/2023
## Source: https://medium.com/@loganbbres/elixir-websocket-chat-example-c72986ab5778
##

defmodule ClowderApp.Router do
  use Plug.Router

  plug(Plug.Static,
    at: "/",
    from: :my_websocket_app
  )

  plug(:match)

  plug(Plug.Parsers,
    parsers: [:json],
    pass: ["application/json"],
    json_decoder: Jason
  )

  plug(:dispatch)

  match _ do
    send_resp(conn, 404, "404")
  end
end
