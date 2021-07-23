
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var ground;
var survivalTime=0;
var score=0;
var jungle,jungleImage
var gameover,gameoverimg;
var youwin,yowinimg

function preload(){
  
  
  monkey_running =loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  jungleImage = loadImage("jungle.jpg");
  gameoverimg = loadImage("gameover.jpg");
 // youwinimg = loadImage("youwin.jpg");
}



function setup() {
  
  
   createCanvas(600, 400);
  
   

  jungle = createSprite(300,150,10,10);
  jungle.addImage("jungle",jungleImage);
  jungle.scale = 1.2
  jungle.velocityX = -5;

  monkey = createSprite(200,350,10,10);
  monkey.addAnimation("monkey",monkey_running) 
  monkey.scale = 0.1
      
  ground = createSprite(300,450,2000,5);
  ground.velocityX = 0
  ground.x = ground.width/2;
  
  FoodGroup = createGroup();
  obstacleGroup = createGroup();
  
  gameover = createSprite(250,400,10,10);
  
  //youwin = createSprite(250,400,10,10);

  
  

  
}


function draw() {
  
    background(180);
  
  drawSprites();
  
    monkey.collide(ground);
      
   if(gameState===PLAY){
if(keyDown("space")&& monkey.y >= 100) {
    monkey.velocityY = -14;
}
    survivalTime=Math.ceil(frameCount/frameRate())
   monkey.velocityY = monkey.velocityY+0.8
 
  fruit();
  obstacles();
     
  ground.visible = false; 
    camera.position.x = displayWidth/6
    camera.position.y = monkey.y   
          
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+score,350,250);
  
  stroke("black");
  textSize("20");
  fill("black");

  text("survival Time: "+ survivalTime,75,250);
  
  stroke("black");
  textSize("20");
  fill("black");

  text(" IF YOUR SCORE WAS 25 YOU WIN",75,275);
  
if (ground.x < 0){
      ground.x = ground.width/2;
    }
if (jungle.x < 0){
  jungle.x = jungle.width/4; 
}
     
 if (FoodGroup.isTouching(monkey)){
   FoodGroup.destroyEach();
   score = score+1
   monkey.scale = monkey.scale + 0.01
 } 
     
  if (obstacleGroup.isTouching(monkey)){
    monkey.velocity.Y = 0
      gameState=END
 }
   
 if (score === 25){
 // youwin.addImage("youwin",youwinimg); 
 stroke("black");
 textSize("30");
 fill("orange");

 text("YOU WIN",200,300)
  FoodGroup.setVelocityXEach(0);
  obstacleGroup.setVelocityXEach(0);
  monkey.VelocityY = 0;
  ground.velocityX = 0;  
  jungle.velocityX = 0;
 }
   //if(FoodGroup.isTouching(monkey)){
      //monkey.scale = monkey.scale + 0.3
   //} 
   }
   
  if(gameState===END){
    
    

  
    
  FoodGroup.setVelocityXEach(0);
  obstacleGroup.setVelocityXEach(0);
  monkey.VelocityY = 0;
  ground.velocityX = 0;  
  jungle.velocityX = 0;       
  gameover.addImage("gameover",gameoverimg); 
    
  
 }
 
}


function fruit() {
  
  if (frameCount % 150 === 0) {
  banana = createSprite(800,250,20,20);
  banana.addImage("banana",bananaImage)
  banana.scale = 0.1
  banana.velocityX = -2;  
   FoodGroup.add(banana);
  }
  
  
}


function obstacles() {
  
 if(frameCount % 200 === 0) { 
  obstacle = createSprite(600,420,20,200);
  obstacle.addImage("obstacle",obstacleImage)
  obstacle.scale = 0.1;
  obstacle.velocityX = -2; 
  
   obstacleGroup.add(obstacle);
  
}
}












