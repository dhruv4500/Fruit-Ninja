//Defining the variables for the Name of the game
  var intro1,intro1_image;
  var intro2,intro2_image;

//Game States
  const PLAY=1;
  const END=0;
  const START=2;
  var gameState=START;

//Sword variables
  var sword,swordImage;

//fruit variables
  var fruit,fruit1Image,fruit2Image,fruit3Image,fruit4Image,fruitGroup;
  var rand,position;

//enemy variables
  var alien,enemy1Image,enemy2Image,enemyGroup;
  var randenemy;

//Score variable
  var score=0;
  localStorage["hiScore"]=0;

//defining variable for image of gameover
  var gameOverImage;

//replaying variable
  var replay,replayImage;

//For sound variables
var cuttingSound;
var gameOverSound;

function preload(){
  
  //Loading Image for Name of the game
    intro1_image=loadImage("Intro10.jpg");
    intro2_image=loadImage("intro20.jpg");
  
  //loading image for sword
    swordImage=loadImage("sword.png");
  
  //loading images of fruit
    fruit1Image=loadImage("fruit1.png");
    fruit2Image=loadImage("fruit2.png");
    fruit3Image=loadImage("fruit3.png");
    fruit4Image=loadImage("fruit4.png");
  
  //loading images for enemy
    enemy1Image=loadImage("alien1.png");
    enemy2Image=loadImage("alien2.png");
  
  //loading image for gameover
    gameOverImage=loadImage("gameover.png");
  
  //loading replay image
    replayImage=loadImage("download.png");
  
  //loading the sound for the game
    cuttingSound=loadSound("knifeSwooshSound.mp3");
    gameOverSound=loadSound("gameover.mp3");
}

function setup(){
  
  //Stage set up
    createCanvas(400,400);
  
  //introduction prepartion
    intro1=createSprite(200,200,400,400);
    intro1.addImage(intro1_image);
    intro1.scale=2.0;

    intro2=createSprite(200,200,400,400);
    intro2.addImage(intro2_image);
    intro2.scale=1.55;
  
  //Making the sword for the player
    sword=createSprite(150,200,30,30);
    sword.addImage(swordImage);
    sword.scale=0.7;
    sword.visible=false;
  
  //creating fruit group
    fruitGroup=new Group();
  
  //creating enemy group
    enemyGroup=new Group();
  
  //setting image for replay
    replay=createSprite(200,250,20,20);
    replay.addImage(replayImage);
    replay.scale=0.3;
    replay.visible=false;
  
}

function fruits(){
  
  if(frameCount%80===0){
  fruit=createSprite(400,200,30,30);
  fruit.scale=0.2;  
    
  position=Math.round(round(1,2));  
  rand=Math.round(random(1,4));
  
  if(rand===1){
    fruit.addImage(fruit1Image);
  }else if(rand===2){
    fruit.addImage(fruit2Image);
  }else if(rand===3){
    fruit.addImage(fruit3Image);
  }else{
    fruit.addImage(fruit4Image);
  }
 
  fruit.y=Math.round(random(50,360));
  fruit.setLifetime=100;
    
   if(position==1){
      fruit.x=400;
      fruit.velocityX=-(7+(score/4));
   
  } else if(position==2){
    fruit.x=0;
    fruit.velocityX=(7+(score/4));
  }
  
  fruitGroup.add(fruit);
  
}
}

function enemy(){
  
  if(frameCount%200===0){
  alien=createSprite(400,200,20,20);
  
    randenemy=Math.round(random(1,2));
    
    if(randenemy===1){
      alien.addImage(enemy1Image);
    }else{
      alien.addImage(enemy2Image);
    }
    
    alien.y=Math.round(random(100,300));
    alien.setLifetime=50;
    
  alien.velocityX=-(8+(score/10));
    
    enemyGroup.add(alien);
    
    
  }
}

function draw(){
  
  //Intro animation
    if(gameState===START){
      
      background("lightgrey");

      if(frameCount<50){
        intro1.visible=true;
        intro2.visible=false;
      }


      if(frameCount>55){
        intro1.visible=false;
        intro2.visible=true;
      }

      if(frameCount>100){
        intro2.visible=false;
        gameState=PLAY;
      }

    }
  
  //Game Animation
    if(gameState===PLAY){
      
      background(3, 252, 157);
      
      //Sword functioning
        sword.visible=true;
        sword.x=mouseX;
        sword.y=mouseY;
      
      //calling the fruit function
        fruits();
      
      //calling the enemy function
        enemy();
      
      //Showing score
 text("Highest Score: "+localStorage["hiScore"],3,390,textSize(20));
      text("Score: "+score,250,390,textSize(20));
      
      if(localStorage["hiScore"]<score){
        localStorage["hiScore"]=score;
      }
      
      if(fruitGroup.isTouching(sword)){
        score=score+1;
        
        cuttingSound.play();
        fruitGroup.destroyEach();
      } 
      
      if(enemyGroup.isTouching(sword)){
        
        gameOverSound.play();
        gameState=END;
        
      }
      
    }else if(gameState===END){
      
      background(3, 165, 252);
      
      //sword action after stopping
        sword.x=200;
        sword.y=200;
        sword.addImage(gameOverImage);
        sword.scale=1.7;
      
      //destroying the groups
        enemyGroup.destroyEach();
        enemyGroup.setVelocityXEach(0);
        fruitGroup.destroyEach();
        fruitGroup.setVelocityXEach(0);
      
      //reseting
      replay.visible=true;
      
      if(mousePressedOver(replay)){
        reset();
      }
      
    }
  drawSprites();
}

function reset(){
  gameState=PLAY;
  sword.addImage(swordImage);
  sword.scale=0.7;
  score=0;
  replay.visible=false;
}





  
  