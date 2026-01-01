# Tanstack Start Workout Track App

- This project is a port of my previous Next.js application into Tanstack Start. I was having a lot of fun using Tanstack Router and Query, so I thought I'd do a quick migration to learn more. Site is objectively faster than next. I had next outputting static html, using PPR, cache components etc and all that extra wrangling gets beat by an SPA with preload lol.

## TODO
- move data fetching into react query?
- move data fetching from server functions to clientside supabase queries and then store in react query?
- add suspense boundaries back in? - remove done from /plans but could add again
- add progressbar back. was getting some error I think but would be nice to have for after they submit
