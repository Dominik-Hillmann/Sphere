const SPHERE_RADIUS = 250;
const WIDTH = 1000;
const HEIGHT = 1000;

var circlePositions = [];
var circleDists = [];
var filteredPositions = [];
var middlePoint = new Position(WIDTH / 2, HEIGHT / 2);

var leftPositions = [];
var rightPositions = [];

var layers = [];


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
      return (circleDists[i] === SPHERE_RADIUS); // return true if at same spot in circleDists wanted radius
   });
   console.log("Array after filter for SPHERE_RADIUS: ", circlePositions);

   // ab hier hat man eine Liste aller Punkte, die den Kreis ergeben
   // um die Linien ziehen zu koennen, braucht man die Punkte, die auf der x-Achse am weitesten links und am weistesten rechts liegen
   //
   leftPositions = circlePositions.filter(function(element, i, array)
   {
      return element.x < WIDTH / 2;
   });

   rightPositions = circlePositions.filter(function(element, i, array)
   {
      return element.x > WIDTH / 2;
   });
   // none of the filters uses <= or >= because those points directly on edge won't be needed anyways
   console.log(leftPositions);
   console.log(rightPositions);

   // now put the outermost points on the left and right on each y together to have lines or layers

   var newLeftPositions = [];
   if(leftPositions.length != rightPositions.length)
      console.error("unequal length of arrays to build layers");
   else
   {
      var mostLeft;
      for(var i = 0; i < leftPositions.length; i++)
      {
         var currentY = leftPositions[i].y;
         var currentX = leftPositions[i].x;
         mostLeft = leftPositions[i];

         for(var j = 0; j < leftPositions; j++)
         {
            if((leftPositions[j].y === currentY) && (leftPositions[j].x < currentX))
               mostLeft = leftPositions[j]; // PROBLEM HIER KEINE ALTERIERUNG
         }

         if(mostLeft != null)
            newLeftPositions.push(mostLeft);

         // nun haben wir ein Element mit einem y Wert: alle weiteren Elemente absuchen, die gleiches y haben
         // aber weiter links: immer, wenn eins linker, dann in Var rein
      }
   }

   console.log("Alt", leftPositions);
   console.log("Neu", newLeftPositions);
}



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

   fill(0, 255, 0);
   stroke(0, 255, 0);
   for(var i = 0; i < leftPositions.length; i++)
      ellipse(leftPositions[i].x, leftPositions[i].y, 1);

   fill(0, 0, 255);
   stroke(0, 0, 255);
   for(var i = 0; i < rightPositions.length; i++)
      ellipse(rightPositions[i].x, rightPositions[i].y, 1);

   // finding a way to put dots into a circle

}
/* TODO:
-





*/
