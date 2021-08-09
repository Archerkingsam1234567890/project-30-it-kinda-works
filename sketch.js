const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

var wall1,wall2;
var bridge,jointpoint;
var ground;
var jointlink;
var stone;
var zombie,zombee, bkimg;
var breakbutton;

var stones = [];

function preload() {
  bkimg = loadImage("./assets/background.png");
  zombie = loadImage("./assets/zombie.png");


}








function setup() {
  createCanvas(windowWidth, windowHeight );
  engine = Engine.create();
  world = engine.world;
  frameRate(80);

  ground = new Base(0, height-10, width*2, 20, "orange", true);

  breakbutton = createImg('axe.png');
  breakbutton.position(width-200,height/2 -50);
  breakbutton.size(50,50);
  breakbutton.mouseClicked(handlebuttonpress);

  zombee.createSprite(width/2, height-110);
  zombee.addAnimation(zombie);
  zombee.velocityX = 10;
  zombee.scale = 0.1;
  

  wall1 = new Base(300,height/2 +50, 600,100, "black", true);
  wall2 = new Base(width-300,height/2+50 , 600,10, "black" , true);

  bridge = new Bridge(15, {x: width/2 - 400, y:height/2});
  jointpoint = new Base(width-600,height/2+10, 40,20 , "black",true);

  Matter.Composite.add(bridge.body,jointpoint);
  jointlink = new Link(bridge, jointpoint);

  for (var i = 0; i <= 8; i++) {
    var x = random(width / 2 - 200, width / 2 + 300);
    var y = random(-10, 140);
    var stone = new Stone(x, y, 80, 80);
    stones.push(stone);
  }

}

function draw() {
  background(bkimg);

  wall1.display();
  wall2.display();
  ground.display();
  jointpoint.display();
  bridge.show();
  for (var stone of stones) {
    stone.show();
  }
  
  Engine.update(engine);
  drawSprites();

  

}

function handlebuttonpress() {
  jointlink.detach();
  setTimeout(() => {
    bridge.break();
  }, 1500)
}
  
