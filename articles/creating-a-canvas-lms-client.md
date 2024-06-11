---
title: Creating a Canvas LMS client
id: creating-a-canvas-lms-client
date: 2024-06-11
---

I've recently started to develop a seperate client for the Canvas LMS. Canvas has a well
documented API available which covers everything in the LMS, available
[here](https://canvas.instructure.com/doc/api/).

I was intrested in creating this using Material Design (the best component specification)
and adding lots of customization. To do this, I used [Vuetify](https://vuetifyjs.com/) and
[Vue](https://vuejs.org/) to create the UI, Vuetify being the Material Design library.

# Canvas API problems
I had to create this with Electron, so I could turn off web security (CORS). How CORS works
is that is sends a preflight request, to confirm that the request is allowed to continue, using OPTIONS, instead of GET or HEAD.
Thing is, the API is not designed to handle OPTIONS requests, so it sends a HTML 404 page, without the CORS header.
The browser then concludes that the request is not safe. I've made a flowchart to graphically explain this:

![Flow chart](https://i.imgur.com/mBbrkAz.png)

# Download the program
It's still in development, but when i'm ready, i'll put it up on GitHub and make a fancy website for it.
