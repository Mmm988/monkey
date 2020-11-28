var monkey , monkey_running,monkey_stop;
var banana ,bananaImage, obstacle, obstacleImage;
var ground, groundImage;
var foodGroup, obstacleGroup;
var score=0;
var time=0;
var PLAY;
var END;
var gameState = PLAY;

function preload(){
  //adding animation to the monkey
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  monkey_stop = loadImage("sprite_0.png");
  
  //adding images to banana
  bananaImage = loadImage("banana.png");
  
  //adding images to obstacles
  obstacleImage = loadImage("obstacle.png");
  
  //adding image to ground
  //groundImage = loadImage("grounds.png");
}



function setup() {
  //creating the canvas
  createCanvas(600,300);
  
  //making the monkey
  monkey = createSprite(80,250,10,10);
  monkey.addAnimation("monkeyisrunning",monkey_running);
  monkey.scale=0.1;
  
  //making the ground
  ground=createSprite(300,290,600,5);
  //ground.addImage("ground",groundImage);

  //making the groups
  foodGroup = createGroup();
  obstacleGroup = createGroup();
}


function draw() {
background("lightBlue")
  
  
  if(gameState===PLAY){
  food();
  stone();
  //making the score
  if(monkey.isTouching(foodGroup)){
    foodGroup.destroyEach();      
    score=score+1;
  }
  //jumping the monkey
  if(keyDown("space") && monkey.y>240){
    monkey.velocityY=-20;
  }
  //add gravity
  monkey.velocityY = monkey.velocityY + 1;
    //ending the game
    if(monkey.isTouching(obstacleGroup)){
      gameState=END;   
    }
  } else if(gameState===END){
    monkey.velocityY=0;
    obstacleGroup.setVelocityYEach(0);
    foodGroup.setVelocityYEach(0);
    monkey.changeAnimation(monkey_stop);
    text("GAME OVER",290,150);
  }
  
  //making the monkey collide
  monkey.collide(ground);
  
  drawSprites();
  
  //showing the score
  textSize(17);
  fill("black");
  text("score: "+score,500,30);

  //showing the time
  textSize(17);
  fill("black");
  time=Math.ceil(frameCount/frameRate());
  text("Survival Time: "+time,100,30)
}



function food(){
  if(frameCount%175===0){
  banana=createSprite(600,50,10,10);
  banana.addImage("bannana",bananaImage);
  banana.scale=0.1;
  banana.velocityX=-3;
  banana.lifetime=180;
  banana.y=Math.round(random(50,200));
  foodGroup.add(banana);
  }
}


function stone(){
  if(frameCount%100===0){
  obstacle=createSprite(600,268,10,10);
  obstacle.addImage("stone",obstacleImage);
  obstacle.scale=0.1;
  obstacle.velocityX=-5;
  obstacle.lifetime=125;
  obstacleGroup.add(obstacle);
  }
}