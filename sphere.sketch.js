const SPHERE_RADIUS = 300;
const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;
const CURSOR_MOVE = true; // determines whether the rotation of the sphere follows the cursor or rotates with time
// LATER TO BE CONTROLLED BY USER
var middlePoint = new Position(WIDTH / 2, HEIGHT / 2);
var layers = [];
var cursor;

var startPoint;

function setup()
{
   var canvas = createCanvas(WIDTH, HEIGHT);
   canvas.parent("sketch-holder");
   cursor = new Cursor(winMouseX, winMouseY);

   // frist collect all points possible, and for each of them the distance to the middle point
   var circlePositions = []; // needed to capture all possible points on canvas that may belong to circle
   var circleDists = []; // needed to save the distance between possible points and the desired middle point of the sphere
   for(var x = 1; x <= WIDTH; x++)
   {
      for(var y = 1; y <= HEIGHT; y++)
      {
         circlePositions.push(new Position(x, y));
         circleDists.push(distance(x, y, middlePoint));
      }
   }

   // filter for all points circlePositions, that have a distance (saved in circleDists) of SPHERE_RADIUS to middle point
   circlePositions = circlePositions.filter(function(element, i, array)
   {
      return circleDists[i] === SPHERE_RADIUS;
   });
   // console.log("Array after filter for SPHERE_RADIUS: ", circlePositions);
   // filters for all points with SPHERE_RADIUS distance to middle point on the left side of the canvas
   var leftPositions = circlePositions.filter(function(element, i, array)
   {
      return element.x < WIDTH / 2;
   });
   // filters for all points with SPHERE_RADIUS distance to middle point on the right side of the canvas
   var rightPositions = circlePositions.filter(function(element, i, array)
   {
      return element.x > WIDTH / 2;
   });
   // none of the filters uses <= or >= because those points directly on the edge won't be needed anyways

   // for the last filter, both arrays need to have the same number of points in them
   if(leftPositions.length != rightPositions.length)
      console.error("unequal length of arrays to build layers");
   else
   {
      var sortedByYPos;
      for(var i = 1; i <= HEIGHT; i++) // first, get all points that have the same height (.y)
      {
         sortedByYPos = circlePositions.filter(function(element, index, array)
         {
            return element.y === i;
         });

         if(sortedByYPos.length === 0) // if there are no circle points with the y-position of i, go to the next iteration
            continue;
         /* the points were sorted into the original array so that
            the points most on the left (or the smallest .x) were sorted in first
            the points on the top of the canvas (smalles .y) were sorted in first
            --> therefore, the left border of one height is the first element and right border is the last element */
         layers.push(new Layer
         (
            sortedByYPos[0].x,
            sortedByYPos[0].y,
            sortedByYPos[sortedByYPos.length - 1].x,
            sortedByYPos[sortedByYPos.length - 1].y
         ));
      } // for

      // colorizing the dots with a color gradient
      // now the starting point for the color gradient has to be set up
      startPoint = layers[Math.round(0.75 * layers.length)].right;
      // colorizing with startPoint from before as starting position for color gradient
      for(var i = 0; i < layers.length; i++)
      {
         layers[i].newPointsOnLayer(3);
         layers[i].colorize(startPoint);
      } // for


   } // else
} // setup

var outsideSphere = []
function draw()
{
   background(0, 0, 0);
   cursor.update();
   //fill(255, 255, 255);
   //stroke(255, 255, 255);

   if(frameCount === 1)
   {
      for(var i = 0; i < layers.length; i++)
      {
         for(var j = 0; j < layers[i].points.length; j++)
         {
            var point = layers[i].points[j];
            if(distance(point.x, point.y, middlePoint) > SPHERE_RADIUS)
            {
               var pointObj =
               {
                  point : point,
                  layer : i,
                  number : j
               }
               console.log(pointObj);
               outsideSphere.push(pointObj);
            }
         }
      }
   }
   //if(frames === 2)
   {
      //for(var obj = 0; obj < outsideSphere.length)
   }


   for(var i = 0; i < layers.length; i++)
   {
      //layers[i].drawLine();
      layers[i].movePoints(cursor);
      layers[i].drawPoints(3, 2);
      //layers[i].drawLine();
   }
   ellipse(startPoint.x, startPoint.y, 6);
}
/* TODO:
- change of direction, wenn Punkt > rechte Grenze der Layer XXX
- dann hat die Differenzaddierung den umgekehrten Effekt: Punkte laufen in die andere Richtung XXX
- remove bug at the edges of the circle
- colors
   - Schleiereffekt
   - Loesung dazu: Farbenverlauf raussuchen, imaginäre Linie von oben links nach unten rechts ziehen,
     Position darauf ermitteln, das für alle 3 Unterschiede auf 0 bis 255 mappen --> Farbenverlauf XXX
   - weiterhin Startpunkt für Farben Startpunkt bei 0.75 unten rechts XXX
   - implementieren, dass aus mehreren Farbkombis ausgewählt wird
- lines popping up
*/
