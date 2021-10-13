var player;
var obstacle1;
var obstacle2;
var treasure;
var cloud;
var bg;
var gameOver;
var restartButton;

var playerImg;
var obstacle1Img;
var obstacle2Img;
var diamondImg;
var candy1Img;
var candy2Img;
var cloudImg;
var backgroundImg;
var gameOverImg;
var restartButtonImg;

var treasureGroup;
var obstacleGroup;
var cloudGroup;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

var score = 0;

function preload() {

  playerImg = loadAnimation("assets/sprite_0.png", "assets/sprite_1.png", "assets/sprite_2.png", "assets/sprite_3.png", "assets/sprite_4.png", "assets/sprite_5.png", "assets/sprite_6.png", "assets/sprite_7.png");

  obstacle1Img = loadImage("assets/obstacle1.png");
  obstacle2Img = loadImage("assets/obstacle2.png");

  diamondImg = loadImage("assets/diamond.png");
  candy1Img = loadImage("assets/candy1.png");
  candy2Img = loadImage("assets/candy2.png");

  cloudImg = loadImage("assets/cloud.png");

  backgroundImg = loadImage("assets/background.png");

  gameOverImg = loadImage("assets/gameOver.png");
  restartButtonImg = loadImage("assets/restart.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  bg = createSprite(width / 2, height / 2, width, height);
  bg.addImage(backgroundImg);
  bg.scale = 6.8;
  bg.velocityX = -5;

  player = createSprite(250, height / 2);
  player.addAnimation("flying", playerImg);
  player.debug = true;

  gameOver = createSprite(width/2,100);
  gameOver.addImage(gameOverImg);

  restart = createSprite(width/2, 140);
  restart.addImage(restartButtonImg);

  restart.visible = false;
  gameOver.visible = false;


  treasureGroup = new Group();
  obstacleGroup = new Group();
  cloudGroup = new Group();



}

function draw() {
  background(51);
  
score = score + Math.round(getFrameRate()/60);

  if (gameState === PLAY) {
    if (bg.x < width / 2 - 180) {
      bg.x = width / 2;
    }
  
    bg.velocityX = -5;

    player.y = mouseY;
    if (player.y < 50) {
      player.y = 70;
  
    }
    if (player.y > height - 50) {
      player.y = height - 70;
    }
  
    treasures();
    obstacles();
    spawnClouds();

    if(obstacleGroup.isTouching(player)){
      gameState = END;
    }

    if(treasureGroup.isTouching(player)){
      score = score + 50;
      treasureGroup.destroyEach();
    }
    
  } else if (gameState === END) {
    bg.velocityX = 0;
    treasureGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
    cloudGroup.setVelocityXEach(0);

    treasureGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
    cloudGroup.setLifetimeEach(-1);

    gameOver.visible = true;
    restart.visible = true;

    if(mousePressedOver(restart)) {
      reset();
    }

  }


  drawSprites();

  fill("red");
  textSize(40);
  text("Score: " + score, width - 250, 120);
}

function treasures() {
  if (frameCount % 100 === 0) {
    treasure = createSprite(width + 50, random(150, height - 50));
    treasure.velocityX = -7
    var rand = Math.round(random(1, 3));

    switch (rand) {
      case 1:
        treasure.addImage(diamondImg);
        break;
      case 2:
        treasure.addImage(candy1Img);
        break;
      case 3:
        treasure.addImage(candy2Img);
        break;
      default:
        break;
    }
    treasure.scale = 0.4;
    treasure.lifetime = 400;
    treasureGroup.add(treasure);
  }
}


function obstacles() {
  if (frameCount % 120 === 0) {
    obstacle = createSprite(width + 50, random(150, height - 50));
    obstacle.velocityX = -7;
    var rand = Math.round(random(1, 2));

    switch (rand) {
      case 1:
        obstacle.addImage(obstacle1Img);
        break;
      case 2:
        obstacle.addImage(obstacle2Img);
        break;
      default:
        break;
    }
    obstacle.scale = 0.4;
    obstacle.lifetime = 400;
    obstacleGroup.add(obstacle);
  }
}

function spawnClouds() {
  if (frameCount % 80 === 0) {
    var cloud = createSprite(width + 50, random(50, 100));
    cloud.addImage(cloudImg);
    cloud.velocityX = -8;
    cloud.lifetime = 400;
    cloud.scale = 0.6;
    cloudGroup.add(cloud);
  }
}

function reset() {
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;

  obstacleGroup.destroyEach();
  treasureGroup.destroyEach();
  cloudGroup.destroyEach();

  score = 0;
}