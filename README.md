# Project Description

Leave a trace is an interactive p5.js artwork about memory and how things don't last forever. When the user moves the mouse soft traces appear and slowly fade away. Clicking creates more details "memories" in flower form that stay longer, but they also eventually disappear. The idea is to show how digital actions can feel more permanent, but are actually quite temporary and unstable.

# Technical Approach

The project is built in p5.js using to main systems: traces abd memories. These are stored in arrays and updated inside the draw() loop so the sketch is always changing.

Traces follow the mouse and slowly fade out over time by reducing their alpha value. I used noise() to move them slightly so they feel more naftural instead of random. 

Memories are created when the user clicks. They are more detailed shaped that grow and slowly fade. This makes them feel more important but still temporary. 

I used background() with transparency to create a fading trail effect, so old frames don't disappear instantly. The canvas uses createCanvas(windowWidth, windowHeight) to fill the whole screen, this made the experience feel more immersive, which was one of my main goals. Even though it is a simple function, it is an important detail because the project focuses on creating an immersive environment.

# Sources 

For visual inspiration I looked at early internet aesthetics through GifCities which influenced the idea of digital decay and temporary visuals.

- p5.js Reference https://p5js.org/reference/ 
- p5.js Interactivity (mouse + keyboard) https://archive.p5js.org/learn/interactivity.html 
- p5.js noise() function (used for movement) https://p5js.org/reference/p5/noise/
- GifCities (Internet Archive – early web visuals) https://gifcities.org/