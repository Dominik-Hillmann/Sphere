const SPHERE_RADIUS = 500;
const WIDTH = 1000;
const HEIGHT = 1000;

var circlePositions = [];
var circleDists = [];
var filteredPositions = [];
var middlePoint = new Position(WIDTH / 2, HEIGHT / 2);

var leftPositions = [];
var rightPositions = [];


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

   console.log("Distance before filter: ", circlePositions);
   circlePositions = circlePositions.filter(function(element, i, array)
   {
      return (circleDists[i] === SPHERE_RADIUS / 2); // return true if at same spot in circleDists wanted radius
   });
   console.log("Array after filter for SPHERE_RADIUS: ", circlePositions);


   // second filter that matches each position in different hemisphere with its counterpart at same y
   leftPositions = circlePositions.filter(function(element, i, array)
   {
      return ;
   });
   //console.log("Distances ", circleDists);

   // filteres for positions that are on the edge of the circle
   /*for(var i = 0; i < circlePositions.length; i++)
   {
      if(circleDists[i] == SPHERE_RADIUS)
         filteredPositions.push(circlePositions[i]);
   }*/

   // error if somehow distance array does not have same length as array with positions


   //console.log("Filter", filteredPositions);
   // cirlcePositions = filteredPositions;
   //console.log("Cricle", circlePositions);
   /*circlePositions = circlePositions.filter(function(element, index, array)
   {
      return (array[index].x < 50);
   });*/
   //console.log(circlePositions);
   console.log(circlePositions);
}

console.log(circlePositions);
function draw()
{
   // background(255, 255, 255);
   background(0, 0, 0);
   //ellipse(middlePoint.x, middlePoint.y, SPHERE_RADIUS);

   stroke(255, 0, 0);
   fill(255, 0, 0);

   //console.log(circlePositions[0]);
   //ellipse(circlePositions[0].x, circlePositions[0].y, 50);
   //console.log(cirlcePositions[cirlcePositions.length - 1]);
   for(var i = 0; i < circlePositions.length; i++)
      ellipse(circlePositions[i].x, circlePositions[i].y, 1);

   // finding a way to put dots into a circle

}
/* TODO:
-





*/
