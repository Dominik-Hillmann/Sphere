const SPHERE_RADIUS = 100;
const WIDTH = 300;
const HEIGHT = 300;

var middlePoint =
{
   x : WIDTH / 2,
   y : HEIGHT / 2
}

function setup()
{
   var canvas = createCanvas(WIDTH, HEIGHT);
   console.log(middlePoint.x, middlePoint.y);
}

function draw()
{
   background(0, 0, 0);


   ellipse(middlePoint.x, middlePoint.y, 5);
   // finding a way to put dots into a circle

}
