var backgroundImg,invisibleGround,bg;
var sunImg,SUN;
var cloudImg,CLOUD;
var boyImg1,boyImg2,boyImg3;
var boy;
var coronaImg,corona;
var maskImg,MASK;
var sanitizerImg,SANITIZER;
var rand;
var coro;
var badal;
var coronaGrp;
var maskGrp;
var sanitizerGrp;
var stageGrp;
var boyStanding;
var score = 0;
var PLAY = 1;
var gameState = PLAY;
var END = 0 ; 
var gameover,gameoverImg;
var reset,resetImg;


function preload() {
  backgroundImg = loadImage("bg-1.png");
  boyImg1 = loadAnimation("BOY1.png","BOY2.png","BOY3.png");
  boyImg2 = loadImage("BOY2.png");
  coronaImg = loadImage("CORONA.png");
  maskImg = loadImage("mask.png");
  sanitizerImg = loadImage("sanitizer.png");
  sunImg = loadImage("sun.png");
  cloudImg = loadImage("cloud.png");
  boyStanding = loadImage("BOY2.png");
  gameoverImg = loadImage("gameOver.png");
  resetImg = loadImage("restart.png");
  jumpSound = loadSound("jump.wav");
  collidedSound = loadSound("collided.wav");
}


function setup() {
  createCanvas(displayWidth,displayHeight - 120);
  
  bg = createSprite(displayWidth/2,displayHeight - 530);
  bg.addImage(backgroundImg);
  bg.scale = 4.2; 
  bg.x = bg.width / 2;
  bg.velocityX = -20;

  SUN = createSprite(displayWidth - 120,displayHeight - 790,100,100);
  SUN.addImage("SUN",sunImg);
  SUN.scale = 0.2;

 
  //console.log(displayWidth - 1350);
  boy = createSprite(displayWidth - 1350,displayHeight - 300,100,100);
  boy.addAnimation("boy",boyImg1);
  boy.addAnimation("boyStanding",boyStanding);
 // boy.setCollider("rectangle",0,10,boy.width,boy.height);
  boy.debug = false;


  invisibleGround = createSprite(displayWidth/2,displayHeight - 100,10000,10);
  invisibleGround.shapeColor = "red";
  invisibleGround.visible = false;

  rand = Math.round(random(200,500));
  //console.log(rand);
  coro = Math.round(random(displayHeight - 100,displayHeight - 400));

  coronaGrp = new Group();
  maskGrp = new Group();
  sanitizerGrp = new Group();
  
  score = 0;

  gameover = createSprite(displayWidth - 750,displayHeight - 700,100,100);
    gameover.addImage("gameover",gameoverImg);
    gameover.scale = 2;
    gameover.visible = false;

    reset = createSprite(displayWidth - 750,displayHeight - 500,100,100);
    reset.addImage("reset",resetImg);
    reset.scale = 2;
    reset.visible = false;
  
}


function draw() {
  background("lightblue");  
  if(bg.x<displayWidth/3) 
    {
      bg.x = displayWidth/2
    }
 //joining the ground or infinitive ground
  if(gameState === PLAY) 
  {
   
    if(keyDown(UP_ARROW) && boy.y>=650 ) 
    {
      boy.velocityY = -15;
      jumpSound.play();
    }
     boy.velocityY = boy.velocityY + 0.8;
     boy.collide(invisibleGround);

     if(coronaGrp.isTouching(boy)) 
     {
       collidedSound.play();
       gameState = END;

       gameover.visible = true;
       reset.visible = true;
     }
     
     
     if(maskGrp.isTouching(boy)) {
      MASK.visible = false;
      score = score + 1;
      
    }

    if(sanitizerGrp.isTouching(boy)) {
      SANITIZER.visible = false;
      score = score + 1;

    }


  }
 
  if(gameState === END) {
   
    boy.velocityY = 0;
 
      bg.velocityX = 0;
      CLOUD.velocityX = 0;
      corona.velocityX = 0;
      MASK.velocityX = 0;
      //SANITIZER.velocityX = 0;
      
    
      boy.changeAnimation("boyStanding",boyStanding);
    console.log("touch");

    if (mousePressedOver(reset)) {
      restart();
    }

  }

  spawnCorona();
  spawnMask();
  spawnSanitizer();
  spawnCLOUD();
  
  if (mousePressedOver(reset)) {
    restart();
  }

  drawSprites();

  textSize(20);
  stroke(3);
  fill("black")
  text("Score: "+ score, camera.position.x,50);
  
}

function spawnCorona() {
  if(frameCount%80 === 0) {
    console.log(coro);
    corona = createSprite(displayWidth - 10,displayHeight - 180,100,100);
    corona.addImage("corona",coronaImg);
    corona.scale = 0.2;
    corona.velocityX = -26;
    coronaGrp.add(corona); 
  }
  }

  function spawnCLOUD() {
    badal = Math.round(random(100,200));
    if (frameCount%badal === 0){
      CLOUD = createSprite(displayWidth - 40,displayHeight - 700,100,100);
      CLOUD.addImage("CLOUD",cloudImg);
      CLOUD.scale = 2;
      CLOUD.velocityX = -20;

    }
  }
 
function spawnMask() {
  var num;
  num = Math.round(random(displayWidth -100,displayHeight - 400 ));
  if(frameCount% 150 === 0) {
  MASK = createSprite(displayWidth - 10,num,150,150);
  MASK.addImage("MASK",maskImg);
  MASK.scale = 0.08;
  MASK.velocityX = -28;
  maskGrp.add(MASK);
}

}

function spawnSanitizer() {
  var sani;
  sani = Math.round(random(displayHeight - 200,displayHeight - 500));
  if(frameCount% 300 === 0) {
  SANITIZER = createSprite(displayWidth - 200,sani,50,50);
  SANITIZER.addImage("SANITIZER",sanitizerImg);
  SANITIZER.scale = 0.4;
  SANITIZER.velocityX = -30;
  sanitizerGrp.add(SANITIZER);
}

}

function restart() {
  gameState = PLAY;
  gameover.visible = false;
  reset.visible = false;
  bg.velocityX = -8;
  MASK.velocityX = -8;
  //SANITIZER.velocityX = -8;
  //bg.velocityX = -8;
 
  coronaGrp.destroyEach();

  boy.changeAnimation("boy",boyImg1);
  
  score = 0;

}

