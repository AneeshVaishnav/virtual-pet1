//Create variables here
var dog, dogImg, dog1Img, database, foodS, foodstock;
function preload()
{
	//load images here
  dogImg = loadImage("images/dogImg.png")
  dogImg1 = loadImage("images/dogImg1.png")
}

function setup() {
	createCanvas(500,500);
  database = firebase.database();
  foodStock = database.ref("Food")
  foodStock.on("value",readStock)

  dog = createSprite(250,350,10,50);
  dog.addImage(dogImg)
  dog.scale = 0.2
}


function draw() {  
 background("green");
 textSize(20);
 fill(255);
 text("Note: press UP ARROW to feed DRAGO milk", 50,50);
 text("Food Reamaining: "+foodS, 150,150);
 
 if(keyWentDown(UP_ARROW)){
   writeStock(foodS);
   dog.addImage(dogImg1)
 }
 if(keyWentUp(UP_ARROW)){
  dog.addImage(dogImg)
 }

 if(foodS === 0){
    foodS = 20;
 }
 
  drawSprites();
}
  //add styles here
  function writeStock(x){
    if(x<=0){
      x = 0;
  }
  else{
   x = x-1;
 }
 database.ref("/").update({
   Food:x
 });
}

function readStock(data){
  foodS = data.val();
}


