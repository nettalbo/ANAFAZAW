let font; // Variable to hold the font
let moveText = "ANAFAZA"; // Text displayed on moving elements
let backgroundText = "THINK\nSENSE\nMOVE"; // Text displayed in the background
let img; // Variable to hold an image

let inputs; 
let x = []; // Array to store x-coordinates of moving elements
let y = []; // Array to store y-coordinates of moving elements
let num = 200; // Number of moving elements
let isMousePressed = true; // Boolean variable to track mouse press state
let exposure = []; // Array to store exposure values for background text

function preload() { //function that load any external files
  fontA = loadFont("SpaceGrotesk-Light.ttf");
  fontB = loadFont("SpaceGrotesk-Bold.ttf");
  fontC = loadFont("SpaceGrotesk-Medium.ttf");
  img = loadImage("LOGO2.png");
}

function setup() {
  createCanvas(600, 750); // Creates a canvas with a width of 600 and height of 750
  saveButton = createButton("Save Poster"); // Creates a button "Save Poster"
  saveButton.position(0, 760); // Sets the position of the button on the canvas
  saveButton.mousePressed(saveImage); // Attaches a mousePressed to the button

  for (let i = 0; i < num; i++) {
    x.push(width / 2); // Adds the initial x-coordinate of the moving element to the x array
    y.push(height / 2); // Adds the initial y-coordinate of the moving element to the y array
    exposure.push(10); // Adds the initial exposure value to the exposure array
  }
  noStroke(); // Disables drawing strokes (outlines)
}

function draw() {
  background(255, 10); // Sets the background color to black with a low opacity (10)
  textFont(fontA); // Sets the font to fontA
  textSize(14); // Sets the font size to 14
  text("Discover what we don’t know yet - By Ohad Naharin ", 10, 735); // Displays a text string at position 
  textFont(fontC); // Sets the font to fontC
  text("22.06.23 ", 522, 100); // Displays a text string at position
  textFont(fontB); // Sets the font to fontB
  fill(0); // Sets the fill color to black
  textSize(30); // Sets the font size to 30
  text("PROGRAMING MOVEMENT", 10, 715); // Displays a text string at position
  textSize(182);  // Sets the font size to 182
  fill(0); // Sets the fill color to black
  rect(486, 90,30, 11); // Draws a rectangle at position
  // Display the image
  image(img, 475,-5,120, 120); // Displays the loaded image at position

  // Reveal background text with low exposure
  let xPos = 0;
  let yPos = 250;

  for (let i = 0; i < backgroundText.length; i++) {
    let charExposure = exposure[i]; // Retrieves the exposure value for the current character

    fill(255, 255, 255, charExposure); // Sets the fill color with an alpha value based on the exposure
    text(backgroundText[i], xPos, yPos); // Displays the current character of backgroundText at position xPos, yPos

    xPos += textWidth(backgroundText[i]); // Increments xPos by the width of the current character

    if (backgroundText[i] === "\n") {
      xPos = 0;
      yPos += 200; // Adjust spacing between lines
    }
  }

  fill(0);
  for (let i = 0; i < num; i++) {
    let x1 = noise((frameCount + i * 10) * 0.01, 0.2) - 0.5; // Calculates a noise value for x direction
    let y1 = noise(0.5, (frameCount + i * 10) * 0.01) - 0.5; // Calculates a noise value for y direction
    x[i] += x1 * 6; // Updates the x-coordinate of the moving element based on the noise value
    y[i] += y1 * 6; // Updates the y-coordinate of the moving element based on the noise value
    if (x[i] > width) x[i] = 0; // Wraps the x-coordinate to the left edge if it exceeds the canvas width
    if (y[i] > height) y[i] = 0; // Wraps the y-coordinate to the top edge if it exceeds the canvas height
    if (x[i] < 0) x[i] = width; // Wraps the x-coordinate to the right edge if it goes below 0
    if (y[i] < 0) y[i] = height; // Wraps the y-coordinate to the bottom edge if it goes below 0

    push(); // Saves the current drawing style settings
    translate(x[i], y[i]);  // Translates the coordinate system to the position of the moving element
    rotate(x[i] * 0.02);  // Rotates the coordinate system based on the x-coordinate
    textAlign(CENTER); // Sets the text alignment to center
    textSize(15); // Sets the font size to 15
    text(moveText, 0, 0); // Displays the moveText at the translated position (0, 0)
    fill(255); // Sets the fill color to white
    rect(0, 0, 5, 5); // Draws a rectangle at the translated position 
    pop(); // Restores the previous drawing style settings
  }
}

function mouseClicked() {
  isMousePressed = !isMousePressed; // Toggles the value of isMousePressed when the mouse is clicked
}

function mouseMoved() {
  if (isMousePressed) {
    //x[0] = mouseX; letter mouse trail
    //y[0] = mouseY;  letter mouse trail

    // Calculate exposure based on mouse position
    let xPos = 0;
    let yPos = 200;

    for (let i = 0; i < backgroundText.length; i++) {
      let distance = dist(mouseX, mouseY, xPos, yPos);  // Calculates the distance between the mouse position and the current character position
      exposure[i] = map(distance, 60, 60, 150, 40); // Maps the distance value to the exposure range (40-150)

      xPos += textWidth(backgroundText[i]);  // Increments xPos by the width of the current character

      if (backgroundText[i] === "\n") {
        xPos = 0;
        yPos += 200; // Adjust spacing between lines
      }
    }
  }
}

function saveImage() {
  saveCanvas('ANAFAZA WHITE', 'jpg');  // Saves the canvas as an image file with the name "ANAFAZA WHITE.jpg"
}