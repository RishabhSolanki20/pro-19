//Declare all the variables 
var space,star,meteor,rocket;
var spaceImg,starImg,meteorImg,rocketImg;
var checkPointSound;
var starsGroup, meteorsGroup;
var game_ovarImage, restartImage, blastimage;
var restart, game_ovar, blast;

var score=0;
var PLAY = 1;
var END = 0;
var gameState = PLAY;

//Create function preload and load all the variables
function preload(){
    spaceImg = loadImage("space.png");
    rocketImg = loadImage("rocket.png");
    starImg = loadImage("star.png");
    meteorImg = loadImage("meteor.png");
    checkPointSound = loadSound("checkpoint Sound Effect.mp3")
    game_ovarImage = loadImage("game_ovar.png"); 
    restartImage = loadImage("restart.png");
    blastimage = loadImage("blast.png");
}

//Create function setup and create all the sprites
function setup() {

    //Create canvas
    createCanvas(500, 600);

    //create BACKGROUND(SPACE)
    space=createSprite(300,600);
    space.addImage("space",spaceImg);
    space.y = space.width /4;
    space.velocityY = -3;

    //Create ROCKET
    rocket = createSprite(200,400);
    rocket.addImage("rocket",rocketImg);
    rocket.scale = 0.5;

    //Create groups
    starsGroup= new Group();
    meteorsGroup= new Group();

    //create score
    score = 0;

game_ovar = createSprite(250,250);
game_ovar.addImage("game_ovar",game_ovarImage);


restart = createSprite(250,300);
restart.addImage("restart",restartImage);

blast = createSprite(250,250);
blast.addImage("blast",blastimage);


   
   
   
    game_ovar.visible = true;
    restart.visible = false;
    blast.visible = false;

  
} 


 //Create function draw    
    function draw() {

    //Create background
    background(3);
    text("Score: "+ score, 700,50);

    //Change Gamestate to PLAY
    if (gameState===PLAY){

        
        score = score + Math.round(getFrameRate()/60);
        space.velocityY = -(6 + 3*score/100);

     //Create edges sprite
     edges= createEdgeSprites();
      rocket.collide(edges[1]);
     rocket.collide(edges[2]);
     // rocket.collide(edges[4]);


     //Make a infinate background
     if(space.y < 100 ){
        space.y = width/2;
      }

     //Give velocity Y to rocket
      if(keyDown("space")) {
        rocket.velocityY = -3;
       }
       //Giving gravaty to rocket
       rocket.velocityY= rocket.velocityY + 0.2

        //Make button to move 
       if(keyDown("RIGHT_ARROW")) {
        rocket.velocityX= 3;
       }

       if(keyDown("LEFT_ARROW")) {
        rocket.velocityX= -3;
       }

       //Add sound when rocket touch star
       if(rocket.isTouching(star)) {
        checkPointSound.play();
       }

       //Call all function
       spwan_star()
        //spwan_meteor()

        if(meteor.isTouching(rocket) && rocket.y <= 600){
            gameState = END;
        }
    }

    else if (gameState === END) {
        space.velocityY = 0;
        rocket.velocityY = 0;
    
    starsGroup.setLifetimeEach(-1);
    meteorsGroup.setLifetimeEach(-1);


    }
    drawSprites();
}
   

//Create function for spwan stars 
function spwan_star() {

    if(frameCount % 60 === 0) {
     star = createSprite(150,-10);
     star.addImage("star",starImg);
     star.velocityY = 2
     star.scale = 0.1
     star.x = Math.round(random(80,120));

     //adjust the depth
     star.depth = rocket.depth;
     rocket.depth = rocket.depth + 1;

     star.lifetime = 300;

    
}
}

//create function to spwan meteoriods
function spwan_meteor() {
    

    if(frameCount % 60 === 0) {
      var meteor = createSprite(150,-30);
      meteor.addImage("meteoriod" ,meteorImg)
      obstacle.velocityY = 3 
      meteor.scale = 0.2;
      meteor.x = Math.round(random(80,120));

      meteor.depth = rcket.depth;
      rocket.depth = rocket.depth + 1;
     

    }
}