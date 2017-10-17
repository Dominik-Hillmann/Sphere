const SPHERE_RADIUS = 100;
const WIDTH = 300;
const HEIGHT = 300;

var circlePoints = [];
var middlePoint =
{
   x : WIDTH / 2,
   y : HEIGHT / 2
}

function setup()
{
   var canvas = createCanvas(WIDTH, HEIGHT);
   console.log(middlePoint.x, middlePoint.y);

   // getting all points that make a cirlce with RADIUS
   for(var x = 1; x < WIDTH; x++)
   {
      for(var y = 1; y < HEIGHT; y++)
      {
         if(haveDistance(x, y, middlePoint, RADIUS))
         {
            circlePoints.push(new Vector(x, y));
            console.log("Geschafft: ", circlePoints[circlePoints.length]);
         }
      }
   }

   console.log(circlePoints);
}

function draw()
{
   background(0, 0, 0);


   ellipse(middlePoint.x, middlePoint.y, 4);
   // finding a way to put dots into a circle

}
