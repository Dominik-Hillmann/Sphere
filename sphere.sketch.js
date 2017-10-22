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

   // frist collect all points possible, and for each of them the distance to the middle point
   for(var x = 1; x <= WIDTH; x++)
   {
      for(var y = 1; y <= HEIGHT; y++)
      {
         circlePositions.push(new Position(x, y));
         circleDists.push(distance(x, y, middlePoint));
      }
   }

   // filter for all points circlePositions, that do need
   circlePositions = circlePositions.filter(function(element, i, array)
   {
      return circleDists[i] === SPHERE_RADIUS; // return true if at same spot in circleDists wanted radius
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


   if(leftPositions.length != rightPositions.length)
      console.error("unequal length of arrays to build layers");
   else
   {
      var sortedByYPos;
      // neue Strategie: alle wieder durchgehen: da für jede Zeile die Px von links nach rechts durchgangen werden
      // die ganz links in einem Filter auf Zeile zuerst im Array erscheinen
      // also Filter auf jede Zeile anwenden
      // dann das mit dem hächsten x-Wert in rightPositions, das mit dem kleinsten in leftPositions

      // first, save all point that have the same height (y-position)
      for(var i = 1; i <= HEIGHT; i++)
      {
         sortedByYPos = circlePositions.filter(function(element, index, array)
         {
            return element.y === i;
         });

         // if there are no circle points with the y-position of i, go to the next iteration
         if(sortedByYPos.length === 0)
            continue;

         // zu layers gleich die linksten und rechtesten mit Konstruktor pushen?
         layers.push(new Layer
         (
            sortedByYPos[0].x,
            sortedByYPos[0].y,
            sortedByYPos[sortedByYPos.length - 1].x,
            sortedByYPos[sortedByYPos.length - 1].y
         ));
      }
   }
   console.log("Layers: ", layers);

   console.log(circlePositions.filter(function(element, i, array)
   {
      return element.y === 1;
   }).length);
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
   /*for(var i = 0; i < circlePositions.length; i++)
      ellipse(circlePositions[i].x, circlePositions[i].y, 1);

   fill(0, 255, 0);
   stroke(0, 255, 0);
   for(var i = 0; i < leftPositions.length; i++)
      ellipse(leftPositions[i].x, leftPositions[i].y, 1);

   fill(0, 0, 255);
   stroke(0, 0, 255);
   for(var i = 0; i < rightPositions.length; i++)
      ellipse(rightPositions[i].x, rightPositions[i].y, 1);*/

   for(var i = 0; i < layers.length; i++)
      layers[i].draw();/*line
      (
         layers[i].left.x,
         layers[i].left.y,
         layers[i].right.x,
         layers);*/

   // finding a way to put dots into a circle

}
/* TODO:
-





*/
