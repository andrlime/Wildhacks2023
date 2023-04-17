# Clowder: A new way to meet people on university campuses
We created Clowder for Northwestern WildHacks 2023. This project won first prize, and here we are archiving our submission AS IS. If we make iterations on this project in the future, we will create a separate branch at the very least. 

## Our video
[clowder - YouTube]

## Inspiration
We have all been in a situation where we wanted to study for a class but didn't have anyone to study with at the time. Studying with friends is crucial; you can bounce ideas, practice explaining topics, among many other things. Clowder can help students find other students studying for the same class at any time, creating a space for both academic and social support. The inspiration for the web app name comes from an antiquated word, clowder, referring to a group of cats. As the goal of the app is to bring together us 'Cats, we figured the term was purr-fect :)

## What it does
Clowder enables students to share info (location, topic, time, etc.) of their study sessions so other people taking the same class can join in. Students looking to join a study session can browse an interactive map to see if anyone nearby is studying their desired topic. Clowder also has a filter functionality, to easily sort by class, subject, or location. Moving beyond the academic scope, students can also use Clowder to find a buddy for any activity, such as going to the gym or getting lunch at Norris.

## How we built it
We used the ReactJS library to build the front end (landing page, sign up page, homepage, etc.) The map interface was created using React Leaflet, a library that supplies React components for elements from the Leaflet map library. On the backend, we built a custom websocket using Elixir's Cowboy library, which is written in Erlang. Being engineered for telecom, the Erlang VM is extremely fast and reliable, and our testing proves this. Finally, we used Firebase for authentication, and this means our app is easier to scale if there ends up being a lot of demand. Andrew worked on the Dockerfile and Elixir websocket, Jerry worked on the Firebase backend and data authentication, Elysia worked on the map integration and various UI components, and Miya did the magic to make literally everything look amazing and professional and made the demo video!

## Challenges we ran into
Andrew (the Elixir developer) started learning Elixir the night before, one because it might be useful for this hackathon and two because they wanted to. That was very hard, because coming from OOP syntax, the functional syntax was, well, weird to say the least. Getting used to "|>" in a programming language and learning how to match patterns was definitely challenging, but rewarding. In React, we had lots and lots of merge conflicts, which started with an hour of us dealing with packages and the NPM vs Yarn debate. Things worked out in the end, but we now have more hands on experience with what agile development is like.

## Accomplishments that we're proud of
We are proud of implementing an Elixir backend after following only one tutorial, collectively becoming better at using React hooks, creating a professional design, and integrating our systems together all within 24 hours. We're also proud of learning how to integrate the interactive map into the webpage using Leaflet, which took several hours (after which Elysia realized that the React Leaflet library was a thing and took two seconds to copy and paste their demo code, which worked perfectly).

## What we learned
Andrew learned a new language, Elixir, for this, and will definitely continue using it in the future. We as a team learned more about different React libraries, like Leaflet and Mantine. Collectively, we are better prepared for future Hackathons or engineering challenges.

## What's next
1. We can improve our Dockerfile to make our app fully deployable on an external server. As of now, there is a problem when deploying on Linux servers due to a dependency, and this should be an easy fix.
2. We need more backend routes, possibly to support reporting users to moderators or other features.
3. We might even implement a chat system – instead of giving away your contact info you can just use the website to communicate with other students. To adhere to our principle of user privacy, we won't store any chat logs.
4. We can expand Clowder beyond the academic scope, as aforementioned. For example, we can support more custom activities like going to the gym, eating at Norris, etc.
