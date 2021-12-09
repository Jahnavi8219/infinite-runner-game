var frenchman, frenchmanImg;
var baguetteImg, baguetteGroup;
var road, roadImg;
var carImg, carGroup;
var gameOver, gameOverImg;
var restart, restartImg;

const PLAY = 1;
const END = 0;

var gameState;

var score = 0;

function preload(){
    frenchmanImg = loadImage("frenchman.png");
    baguetteImg = loadImage("baguette.png");
    roadImg = loadImage("road.png");
    carImg = loadImage("car.png");
    gameOverImg = loadImage("gameOver.png");
    restartImg = loadImage("restart.png");
}

function setup() {

    createCanvas(windowWidth, windowHeight);

    road = createSprite(width/2,height/2, 50, 50);
    road.addImage("road", roadImg);
    road.scale = 3;

    gameOver = createSprite(width/2, height/2-50, 50, 50);
    gameOver.addImage("gameOver", gameOverImg);

    restart = createSprite(width/2, height/2+100, 50, 50);
    restart.addImage("reset", restartImg);


    frenchman = createSprite(width/2, 100, 10, 10);
    frenchman.addImage("frenchman", frenchmanImg);
    frenchman.scale = 0.5;

    baguetteGroup = new Group();
    carGroup = new Group();

    gameState = PLAY;
}

function draw() {
    background(30);

    textSize(20);
    text("Score: "+ score, width-400,70);

    if(gameState == PLAY){
        frenchman.visible = true;
        gameOver.visible = false;
        restart.visible = false;
        road.visible = true;

        if(road.y<200){
            road.y = 380;
        }

        if(frameCount%3 == 0){
            score += 1;
        }
    
        spawnBaguettes();
        spawnCars();

        if(keyDown("LEFT_ARROW")){
            if(frenchman.x > windowWidth/2-130){
                frenchman.x -= 5;
            }
        }

        if(keyDown("RIGHT_ARROW")){
            if(frenchman.x < windowWidth/2+130){
                frenchman.x += 5;
            }
        }

        if(frenchman.isTouching(baguetteGroup)){
            baguetteGroup.destroyEach();
            score += 100;
        }

        if(frenchman.isTouching(carGroup)){
            carGroup.destroyEach();
            baguetteGroup.destroyEach();
            frenchman.visible = false;
            console.log("It worked I guess.");
            gameState = END;
        }

          frenchman.debug = false;
          frenchman.setCollider("rectangle", 0, 0, 100, 210);

          road.velocityY = -5 -(score/200);

          if(road.velocityY<-12){
            road.velocityY = -12;
         }

    } else {
        road.velocityY = 0;
        gameOver.visible = true;
        restart.visible = true;
        gameOver.scale = 4;
        road.visible = false;
        gameOver.scale = 0.5

        if(mousePressedOver(restart)) {
            reset();
          }
    }

    drawSprites();
}

function spawnBaguettes(){
    if(frameCount%150==0){

        var randomNum = Math.round(random(200))
        var x = width/2 - 100 + randomNum;

        var baguette = createSprite(x, height, 50, 50);

        baguette.scale = 0.5;
        baguette.addImage("baguette", baguetteImg);
        baguette.velocityY = road.velocityY;
        frenchman.depth = baguette.depth + 1;
        baguette.debug = false;
        baguette.lifetime = 1000;


        baguetteGroup.add(baguette);
        baguette.setCollider("rectangle", 0, 0, 80, 50);
    }
}

function spawnCars(){
    if(frameCount%100==0){

        var randomNum = Math.round(random(200))
        var x = width/2 - 100 + randomNum;

        var car = createSprite(x, height, 50, 50);

        car.scale = 0.7;
        car.addImage("car", carImg);

        car.velocityY = road.velocityY * 2;
        frenchman.depth = car.depth + 1;
        car.lifetime = 1000;
        car.setCollider("rectangle", 0, 0, 70, 110);
        carGroup.add(car);
    }
}

function reset(){
    score = 0;
    gameState = PLAY;
}
