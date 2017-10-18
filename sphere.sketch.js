const SPHERE_RADIUS = 200;
const WIDTH = 300;
const HEIGHT = 300;

var circlePositions = [];
var circleDists = [];
var middlePoint = new Position(WIDTH / 2, HEIGHT / 2);


function setup()
{
   var canvas = createCanvas(WIDTH, HEIGHT);

   // getting all points that make a cirlce with RADIUS
   /*for(var x = 1; x <= WIDTH; x++)
   {
      for(var y = 1; y <= HEIGHT; y++)
      {
         if(haveDistance(x, y, middlePoint, RADIUS))
         {
            circlePoints.push(new Position(x, y));
            console.log("Geschafft: ", circlePoints[circlePoints.length]);
         }
      }
   }*/

   // einfach jeden Punkt mit Abstand reinmachen

   for(var x = 1; x <= WIDTH; x++)
   {
      for(var y = 1; y <= HEIGHT; y++)
      {
         circlePositions.push(new Position(x, y));
         circleDists.push(reDistance(x, y, middlePoint));
      }
   }

   console.log("Dists", circleDists);
   console.log("pos", circlePositions);
   var filteredPositions = [];
   for(var i = 0; i < circlePositions.length; i++)
   {
      if(circleDists[i] == SPHERE_RADIUS)
         filteredPositions.push(circlePositions[i]);
   }
   console.log("Filtered", filteredPositions);
   cirlcePositions = filteredPositions;
   // circlePoints.push("LALALALA");
   console.log(circlePositions);
}

function draw()
{
   background(0, 0, 0);


   ellipse(middlePoint.x, middlePoint.y, SPHERE_RADIUS);

   // finding a way to put dots into a circle

}
