# Tanstack Start Workout Track App

- This project is a port of my previous Next.js application into Tanstack Start. I was having a lot of fun using Tanstack Router and Query, so I thought I'd do a quick migration to learn more. Site is objectively faster than next. I had next outputting static html, using PPR, cache components etc and all that extra wrangling gets beat by an SPA with preload lol.

## TODO
- fix server actions to improve sql
- refactor to reduce code reuse, specifically about suspense boundaries - break headers into component
- skeleton for workouts/$workoutid, workouts/create/$id
