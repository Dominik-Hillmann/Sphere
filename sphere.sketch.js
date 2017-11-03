const SPHERE_RADIUS = 300;
const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

var middlePoint = new Position(WIDTH / 2, HEIGHT / 2);
var layers = [];
var cursor;

function setup()
{
   var canvas = createCanvas(WIDTH, HEIGHT);
   canvas.parent("sketch-holder");
   cursor = new Cursor(mouseX, mouseY)

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
         // the points were sorted into the original array so that
            // the points most on the left (or the smallest .x) were sorted in first
            // the points on the top of the canvas (smalles .y) were sorted in first
         // --> therefore, the left border of one height is the first element and right border is the last element
         layers.push(new Layer
         (
            sortedByYPos[0].x,
            sortedByYPos[0].y,
            sortedByYPos[sortedByYPos.length - 1].x,
            sortedByYPos[sortedByYPos.length - 1].y
         ));
      }

      for(var i = 0; i < layers.length; i++)
         layers[i].newPointsOnLayer(3);
   }
}


function draw()
{
   background(0, 0, 0);
   cursor.update();

   for(var i = 0; i < layers.length; i++)
   {
      //layers[i].draw();
      stroke(255, 255 ,255);
      fill(255, 255, 255);
      layers[i].movePoints(cursor);
      layers[i].drawPoints(3, 2);
      //layers[i].drawLine();
   }
}
/* TODO:
- two layers behind each other
   - constructor with additonal info about the tier
   - drawing them differently
*/
