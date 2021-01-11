var tower, towerImg
var ghost, ghostImg, ghostI

var PLAY= 1
var END= 0
var gameState= PLAY

var door, doorImg, doorG
var climber, climbImg, invisibleClimber,climberG,invisibleG
var sound


function preload(){
  towerImg= loadImage("tower.png")
  ghostImg= loadAnimation("ghost-standing.png")
  ghostI= loadAnimation("ghost-jumping.png")
  doorImg= loadImage("door.png")
  climbImg= loadImage("climber.png")
  sound= loadSound("spooky.wav")
}


function setup(){
  createCanvas(600,600)
  
  tower= createSprite(300,300)
  tower.addImage("tImg",towerImg)
  tower.velocityY= 1
  
  ghost= createSprite(200,200,50,50)
  ghost.addAnimation("gImg",ghostImg)
  ghost.addAnimation("jump",ghostI)
  ghost.scale= 0.3
  
  climberG= new Group();
  invisibleG= new Group();
  doorG= new Group();
}


function draw(){
  
  
  if (gameState===PLAY){
  
    
    
    if(tower.y>600){
    tower.y= 300
  }
  spawndoors();
   ghost.velocityY= 3
  
  if(keyDown("SPACE")){
    ghost.velocityY=-7
   }
    
    if(keyWentDown("SPACE")){
       ghost.changeAnimation("jump",ghostI)
    }
    if(keyWentUp("SPACE")){
       ghost.changeAnimation("gImg",ghostImg)
    }
  if(keyDown("RIGHT_ARROW")){
    ghost.x= ghost.x+5
  }
  if(keyDown("LEFT_ARROW")){
    ghost.x= ghost.x+-5
  }
  if(keyDown("DOWN_ARROW")){
    ghost.y= ghost.y+5
  }
 
    if(climberG.isTouching(ghost)){
   ghost.velocityY= 0
 }
   sound.loop()
    
    
    if(ghost.y>600||invisibleG.isTouching(ghost)){
      gameState= END
    }
      
} 
else{
  gameState=END
  ghost.destroy()
  tower.velocityY= 0
  tower.destroy();
  climberG.destroyEach()
  doorG.destroyEach();
  background("black")
    fill("yellow");
    textSize(30);
    text("Game Over", 230,250)
  sound.stop()
}
   
  
  drawSprites();

}

function spawndoors(){
  
  if(frameCount%240==0){
  
door= createSprite(200,-50)
    door.x= Math.round(random(120,400))
  door.addImage("image",doorImg)
  door.velocityY= 1
    doorG.add(door)
    ghost.depth=door.depth
ghost.depth= ghost.depth+1
    
  
    
climber= createSprite(200,10,10,10)
climber.x=door.x
climber.velocityY=1
climber.addImage("Image",climbImg)
//climber.debug= true
climberG.add(climber)
    
invisibleClimber= createSprite(10,15,100,10)
invisibleClimber.x=climber.x
invisibleClimber.velocityY=1
invisibleClimber.visible= false;
invisibleG.add(invisibleClimber)
}
  
  

}