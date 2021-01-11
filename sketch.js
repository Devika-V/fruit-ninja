
var PLAY=1;
var END=0;
var gameState=1;

var sword,fruit ,alien,fruitGroup,enemyGroup, score,r;
var swordImage , fruit1, fruit2 ,fruit3,fruit4, alienImage, gameOverImage


function preload(){
  
  swordImage = loadImage("sword.png");
  
  alienImage = loadAnimation("alien1.png","alien2.png");
  
  fruit1 = loadImage("fruit1.png");
  
  fruit2 = loadImage("fruit2.png");
  
  fruit3 = loadImage("fruit3.png");
  
  fruit4 = loadImage("fruit4.png");
  
  gameOverImage = loadImage("gameover.png")
  
  
}



function setup() {
  createCanvas(600, 600);
  
  //creating sword
   sword=createSprite(40,200,20,20);
   sword.addImage(swordImage);
   sword.scale=0.7

  score=0;
  fruitGroup=createGroup();
  enemyGroup=createGroup();
  
}

function draw() {
  background("lightblue");
  
  if(gameState===PLAY){
    
    //Call fruits and Enemy function
    fruits();
    Enemy();
    

    sword.y=World.mouseY;
    sword.x=World.mouseX;
  
    
    if(fruitGroup.isTouching(sword)){
      fruitGroup.destroyEach();
      
      
      score=score+3;
    }
    else
    {
      
      if(enemyGroup.isTouching(sword)){
        gameState=END;
        
        fruitGroup.destroyEach();
        enemyGroup.destroyEach();
        fruitGroup.setVelocityXEach(0);
        enemyGroup.setVelocityXEach(0);
        
        
        
        sword.addImage(gameOverImage);
        sword.x=200;
        sword.y=200;
      }
    }
  }
  
  drawSprites();
  text("Score : "+ score,300,30);
}


function Enemy(){
  if(World.frameCount%200===0){
                            alien=createSprite(400,Math.round(random(100,300)),20,20);
    alien.addAnimation("moving", alienImage);
    alien.velocityX=-(8 + (score/10));
    alien.setLifetime=50;
    enemyGroup.add(alien);
  }
}

function fruits(){
  if(World.frameCount%80===0){
    fruit=createSprite(400,200,20,20);
    fruit.scale=0.2;
     //fruit.debug=true;
     r=Math.round(random(1,4));
    if (r == 1) {
      fruit.addImage(fruit1);
    } else if (r == 2) {
      fruit.addImage(fruit2);
    } else if (r == 3) {
      fruit.addImage(fruit3);
    } else {
      fruit.addImage(fruit4);
    }
    
   fruit.velocityX=-10
    
    fruit.setLifetime=100;
    
    fruitGroup.add(fruit);
  }
}

