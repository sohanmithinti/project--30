const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var box1;
var backgroundImg,platform;
var bird, slingshot;
var score = 0;

var gameState = "onSling";


function setup(){
    var canvas = createCanvas(1200,400);
    engine = Engine.create();
    world = engine.world;


    ground = new Ground(600,height,1200,20);
    platform = new Ground(150, 305, 300, 170);

    box1 = new Box(700,320,70,70);
    box2 = new Box(920,320,70,70);
    box3 = new Box(700,240,70,70);
    box4 = new Box(920,240,70,70);
    box5 = new Box(810,160,70,70);
    bird = new Bird(200,50);

    
    slingshot = new SlingShot(bird.body,{x:200, y:50});
}

function draw(){
    background("white")
   textSize(30);
   fill("white");
   text("score:"+score,1000,50);
    Engine.update(engine);
    box1.display();
    box2.display();
    ground.display();

    box3.display();
    box4.display();

    box5.display();

    bird.display();
    platform.display();
    
    slingshot.display();    

    
}

function mouseDragged(){
    if (gameState!=="launched"){
        Matter.Body.setPosition(bird.body, {x: mouseX , y: mouseY});
    }
}


function mouseReleased(){
    slingshot.fly();
    gameState = "launched";
}

function keyPressed(){
    if(keyCode === 32 && bird.body.speed <1 || keyCode === 32 && bird.body.speed > 15){
        bird.trajectory = [];
        Matter.Body.setPosition(bird.body, {x: 200 , y: 50});
      slingshot.attach(bird.body);
      gameState = "onSling"
    }
}

