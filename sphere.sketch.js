const SPHERE_RADIUS = 200;
const WIDTH = 300;
const HEIGHT = 300;

var circlePositions = [];
var circleDists = [];
var filteredPositions = [];
var middlePoint = new Position(WIDTH / 2, HEIGHT / 2);


function setup()
{
   var canvas = createCanvas(WIDTH, HEIGHT);
   canvas.parent("sketch-holder");

   // einfach jeden Punkt mit Abstand reinmachen
   for(var x = 1; x <= WIDTH; x++)
   {
      for(var y = 1; y <= HEIGHT; y++)
      {
         circlePositions.push(new Position(x, y));
         circleDists.push(distance(x, y, middlePoint));
      }
   }

   // filteres for positions that are on the edge of the circle
   for(var i = 0; i < circlePositions.length; i++)
   {
      if(circleDists[i] == SPHERE_RADIUS)
         filteredPositions.push(circlePositions[i]);
   }
   console.log("Filter", filteredPositions);
   // cirlcePositions = filteredPositions;
   console.log("Cricle", circlePositions);
   circlePositions = circlePositions.filter(function(element, index, array)
   {
      return (array[index].x < 50);
   });
   console.log(circlePositions);
}

function draw()
{
   // background(255, 255, 255);
   background(0, 0, 0);
   //ellipse(middlePoint.x, middlePoint.y, 100);

   stroke(255, 0, 0);
   for(var i = 0; i < filteredPositions.length; i++)
      ellipse(filteredPositions[i].x, filteredPositions[i].y, 1);

   // finding a way to put dots into a circle

}
