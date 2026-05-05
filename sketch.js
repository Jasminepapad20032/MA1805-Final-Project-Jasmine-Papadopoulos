

// Leave a Trace by Jasmine Papadopoulos

// An interactive artwork about trying to leave a mark before it fades. 


let traces = [];

let memories = [];

let bgFade = 18;


function setup() {

    createCanvas(windowWidth, windowHeight); // full screen canvas so it feels immersive
    background(5);
    noCursor(); // hide default cursor so I can draw my own softer one

}

function draw() {
    
    background(5, bgFade); // slightly transparent background so old marks slowly disappear instead of resetting

    drawSoftGrid();
    drawCursorGlow();

    // create small traces as the mouse moves
    if (frameCount % 2 === 0) {
        traces.push(new Trace(mouseX, mouseY));


    }


    // loop backwards so I can safely remove items
    for (let i = traces.length - 1; i >= 0; i--) {
        traces[i].move();
        traces[i].show();
        traces[i].fade();

        if (traces[i].alpha <= 0) {
            traces.splice(i, 1);

        }


    }



    for (let i = memories.length - 1; i >= 0; i--) {
        memories[i].grow();
        memories[i].show();

        if (memories[i].alpha <= 0) {
            memories.splice(i, 1);

        }

    }

    drawSmallText();


}


class Trace {

    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.alpha = 120;
        this.size = random(4, 18);
        this.offset = random(1000);

    }

    move() {
        // using noise instead of random makes the movement softer and more natural
        this.x += map(noise(this.offset), 0, 1, -1.2, 1.2);
        this.y += map(noise(this.offset + 20), 0, 1, -1.2, 1.2);
        this.offset += 0.01;


    }

    show() {
        noStroke();

        // layering two shapes makes the trace feel like a glow rather than a flat dot 
        fill(255, 230 ,205, this.alpha);
        ellipse(this.x, this.y, this.size);

        fill(170, 210, 255, this.alpha * 0.35);
        ellipse(this.x + 4, this.y - 3, this.size * 0.7);
        
    }

    fade() {
         this.alpha -= 1.6; // gradually fade each trace out 

    }

}

class Memory {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.r = 5;
        this.alpha = 210;
        this.petals = int(random(6, 12));
        this.angle = random(TWO_PI);


    }


    grow() {
        this.r += 0.12;
        this.alpha -= 0.28;
        this.angle += 0.004;

    }

    show() {
        // isolate transformations so they don't affect everything else
        push();
        translate(this.x, this.y);
        rotate(this.angle);

        noFill();
        stroke(255, 235, 210, this.alpha);
        strokeWeight(1);

        // repeating shapes to create a simple "memory flower" form
        for (let i = 0; i < this.petals; i++) {
            rotate(TWO_PI / this.petals);
            ellipse(this.r, 0, this.r * 1.7, this.r * 0.55);

        }


        fill(255, 220, 190, this.alpha);
        noStroke();
        ellipse(0, 0, 6);
        pop();


    }

}


function mousePressed() {
    // clicking creates a longer-lasting memory compared to traces
    memories.push(new Memory(mouseX, mouseY));
}

function drawCursorGlow() {
    noStroke();

    // soft glow around the cursor
    for (let i = 5; i > 0; i--) {
        fill(255, 230, 205, 10);
        ellipse(mouseX, mouseY, i * 18);

    }

    fill(255, 245, 230, 180);
    ellipse(mouseX, mouseY, 5);

}

function drawSoftGrid() {
    stroke(255, 255, 255, 9);
    strokeWeight(1);

    // faint grid to suggest a digital archive sort of space
    for (let x = 0; x < width; x += 70) {
        line(x, 0, x, height);

    }

    for (let y = 0; y < height; y += 70) {
        line(0, y, width, y);

    }

    
}

function drawSmallText() {
    noStroke();
    fill(255, 245, 230, 70);
    textSize(12);
    textAlign(RIGHT);

    let countText = "saved traces: " + memories.length;
    text(countText, width - 24, 32);

    if (memories.length > 8) {
        text("some memories will still disappear", width - 24, 72);


    }

}

function keyPressed() {
    // simple reset so the user can start again
    if (key === "c" || key === "C") {
        memories = [];
        traces = [];
        background(5);

    }


}


function windowResized() {
    // keep the sketch responsive when the browser changes size
    resizeCanvas(windowWidth, windowHeight);
    background(5);

}




