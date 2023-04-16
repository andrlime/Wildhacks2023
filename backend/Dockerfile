## https://github.com/erlef/docker-elixir/blob/359c4c4879581c2aa3b7722b910a1a99726e6771/1.14/Dockerfile
## Modified on 04/16/2023
## Currently does NOT work
FROM elixir:latest

RUN git clone https://github.com/andrlime/Wildhacks2023.git

WORKDIR ./Wildhacks2023/backend
RUN mix local.hex --force
RUN mix local.rebar --force
RUN mix deps.get && mix compile
CMD ["mix", "run", "--no-halt"]
