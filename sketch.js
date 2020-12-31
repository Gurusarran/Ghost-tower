var tower, towerImage;
var door,doorImage;
var doorGroup;
var climber, climberImage,climberGroup;
var ghost,ghostImage;
var invisible,invisibleGroup;

var gameState= "play";


function preload () {
  towerImage= loadImage("tower.png");
  doorImage= loadImage("door.png");
  climberImage= loadImage("climber.png");
  ghostImage= loadImage("ghost-standing.png");
}



function setup () {
  createCanvas(600,600);
  tower=createSprite(300,300);
  
  
  
  tower.addImage("tower1",towerImage);
  tower.velocityY= 1;
  
  doorGroup= new Group ();
  climberGroup= new Group ();
  
  ghost=createSprite(200,200)
  ghost.addImage("ghost1",ghostImage);
  ghost.scale= 0.4;
  
  invisibleGroup= new Group();
  
  
}

function draw (){
  
  if (gameState=== "play"){
  if (tower.y>500){
    tower.y=300;
  }
  
  if(keyDown("left")){
    ghost.x=ghost.x-3;
  }
  
  if(keyDown("right")){
    ghost.x=ghost.x+3;
  }
  
  if(keyDown("space")){
    ghost.velocityY= -6;
    
  }
  
  ghost.velocityY= ghost.velocityY+0.5;
  
  if(climberGroup.isTouching(ghost)){
    ghost.velocityY=0;
    
  }
  
  
  if(invisibleGroup.isTouching(ghost)||ghost.y>600){
    ghost.destroy;
    gameState= "end";
    
  }
          spawnDoors() ;                      
  }
  
  if(gameState==="end"){
    textSize(30);
    stroke('yellow');
    fill('yellow');
    text("Game Over",200,200);
    
  }
  
  
   
  drawSprites();

}

function spawnDoors() {
  if (frameCount%200===0){
    
  
  
  door=createSprite(200,0);
  door.addImage("door1",doorImage);
  door.velocityY= 1;
    door.x= Math.round(random(100,450));
    door.lifetime= 650;
    doorGroup.add (door);
    climber=createSprite(200,50);
    climber.addImage("climber1",climberImage);
    climber.x=door.x;
    climber.velocityY= 1;
    climber.lifetime= 650;
    climberGroup.add(climber);
    ghost.depth=door.depth;
    ghost.depth+=1;
    
    invisible=createSprite(200,65);
    invisible.width=climber.width;
    invisible.height= 2;
    invisible.x=door.x;
    invisible.velocityY=1;
    invisible.debug=true;
    invisibleGroup.add(invisible);
    invisible.lifetime= 650;
  }
  
  
  
  
}

