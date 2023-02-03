/*
Repo: https://github.com/??????
Created by S_keys in class "Lógica de programação: comece em lógica com o jogo Pong e Javascript - Alura"
Version v0.0.1 | september 20, 2022
*/

console.log("{Keys Pong 2022 - VS CPU}");

///////////////////////////////////////////////

//ball dimensions
let xBall = 274;
let yBall = 152;
let ballDiameter = 18;
let radiusBall = ballDiameter / 2;

//ball displacement
let xBallSpeed = 6;
let yBallSpeed = 5;

//racket p1 + dimensions
let xP1Racket = 3;
let yP1Racket = 117;
let widthRacket = 10;
let heightRacket = 75;
let cornerRacket = 3;
let hit = false;

//racket CPU
let xCpuRacket = 537;
let yCpuRacket = 117;
let speedCpu;
let chanceToMiss = 0;

//game score
let scoreP1 = 0;
let scoreCpu = 0;

//game sounds
let soundHit;
let soundScore;
let soundTrack;
let table

function preload() {
  soundHit = loadSound("soundhit.mp3");
  soundScore = loadSound("soundscore.mp3");
  soundTrack = loadSound("soundtrack.mp3");
}

///////////////////////////////////////////////

function setup() {
  createCanvas(548, 304);
  soundTrack.loop();
}

function draw() {
  background(10);
  
//ball functions
  showBall();
  ballMovement();
  ballCollision();

//p1 racket functions
  fill(color(50, 205, 50));
  stroke(color(255, 222, 173));
  showRacket(xP1Racket, yP1Racket);
  racketDisplacement();
  hitRacketLibrary(xP1Racket, yP1Racket);

/*racketCollision(); previous collide function paused to use the "collideRect Circle" (inside "hitRacketLibrary") imported from the library
*/

//CPU Racket functions
  fill(color(139, 0, 0));
  stroke(255, 222, 173);
  showRacket(xCpuRacket, yCpuRacket);
  hitRacketLibrary(xCpuRacket, yCpuRacket);
  movesCPU();

//game score functions
  showScore();
  getScore();
  stuckBall();
}

///////////////////////////////////////////////

//ball parameters
function showBall() {
  fill(color(255, 215, 0));
  stroke(184, 134, 11);
  circle(xBall, yBall, ballDiameter);
}

function ballMovement() {
  xBall += xBallSpeed;
  yBall += yBallSpeed;
}

function ballCollision() {
  if (xBall + radiusBall > width || xBall - radiusBall < 0) {
    xBallSpeed *= -1;
  }

  if (yBall + radiusBall > height || yBall - radiusBall < 0) {
    yBallSpeed *= -1;
  }
}

function racketCollision() {
  if (
    xBall - radiusBall < xP1Racket + widthRacket &&
    yBall - radiusBall < yP1Racket + heightRacket &&
    yBall + radiusBall > yP1Racket - heightRacket
  ) {
    xBallSpeed *= -1;
    soundHit.play();
  }
}

function hitRacketLibrary(x, y) {
  hit = collideRectCircle(x,y,widthRacket,heightRacket,xBall,yBall,radiusBall);
  if (hit) {
    xBallSpeed *= -1;
    soundHit.play();
  }
}

//p1 parameters
function showRacket(x, y) {
  rect(x, y, widthRacket, heightRacket, cornerRacket);
}

function racketDisplacement() {
  if (keyIsDown(UP_ARROW)) {
    yP1Racket -= 10;
  }
  if (keyIsDown(DOWN_ARROW)) {
    yP1Racket += 10;
  }
}

//CPU parameters
function movesCPU() {
  speedCpu = yBall - yCpuRacket - widthRacket / 2 - 33;
  yCpuRacket += speedCpu + chanceToMiss;
  if (scoreCpu > scoreP1){
    chanceToMiss = 40;
  }
  if (scoreCpu < scoreP1 && chanceToMiss > 35){
    chanceToMiss -= 3;
  }
}

//score parameters
function showScore() {
  stroke(255);
  textAlign(CENTER);
  textSize(15);
  fill(color(255, 140, 0));
  rect(90, 3, 40, 20, 3);
  fill(255);
  text(scoreP1, 110, 18);
  fill(color(255, 140, 0));
  rect(418, 3, 40, 20, 3);
  fill(255);
  text(scoreCpu, 438, 18);
}

function getScore() {
  if (xBall + radiusBall > xCpuRacket + widthRacket + 3) {
    scoreP1 += 1;
    soundScore.play();
  }
  if (xBall - radiusBall < xP1Racket - 6) {
    scoreCpu += 1;
    soundScore.play();
  }
}

function stuckBall(){
    if (xBall - radiusBall < 0){
    xBall = 10
    }
    if (xBall + radiusBall > 548){
      xBall = 520
    }
}