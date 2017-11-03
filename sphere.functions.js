// measures distance between two points
var distance = function(x, y, middlePos)
{
   return Math.round(Math.sqrt(Math.pow(x - middlePoint.x, 2) + Math.pow(y - middlePoint.y, 2)));
}

// returns the position of a part of a distance
var partialDist = function(start, length, percent)
{
   return start + Math.round(length * percent);
}


// cursor that has information about its own past position
class Cursor
{
   constructor(x, y)
   {
      // x and y position in the last frame
      this.last =
      {
         x : x, // both .last and .now having the same value directly after construction is enough
         y : y
      };
      // x and y position in the current frame
      this.current =
      {
         x : x,
         y : y
      };

      this.relChangeX = 0.0; // enough directly after
   }

   // last position is current position and current position is mouseX and mouseY
   update()
   {
      this.last.x = this.current.x;
      this.last.y = this.current.y;
      this.current.x = winMouseX;
      this.current.y = winMouseY;

      this.relChangeX = (this.current.x - this.last.x) / WIDTH; // saves the current relative change to the canvas WIDTH in x
   }

   /*calcRelChangeX()
   {
      // only for x
      // it shows, how far the cursor has travelled relative to the size of the canvas
      // this change will be translated into the relative distance the points will travel on their layers
      // if they are in the first tier, they will travel in the same direction as the cursor
      // if they are in the 2nd tier, they will travel in the opposite direction of the one the cursor is taking

      // if it goes left, i want it to be negatve
      // so last value has to be bigger than current
   }*/
}


// creates new vector
class Position
{
   constructor(x, y)
   {
      this.x = x;
      this.y = y;
   }
}


// contains additonal information about the tier of the point
class CirclePos extends Position
{
   constructor(x, y)
   {
      super(x, y);
      this.secondTier = (Math.random() > 0.5); // 50% possibility that the dot will be in the second tier
   }
}


// a layer represents a line on which the points can move
class Layer
{
   constructor(x1, y1, x2, y2)
   {
      if(y1 != y2)
         console.error("Borders in layer do not have same height!");

      this.left = new Position(x1, y1);
      this.right = new Position(x2, y2);
      this.layerLen = x2 - x1;
      this.points = [];
   }


   // new point that will move along this layer's height between left.x and right.x
   newPointsOnLayer(howMany)
   {
      // first decide, how many points there will be on this layer
      var layerLen = this.right.x - this.left.x;
      // top to bottom: each layer is divided into unequal parts:
      // the first 0 to 10 percent, 10 to 25 percent, 25 to 75 percent, 75 to 90, 90 to 100 percent
      // the smaller areas on the side are supposed to have a bigger probability of points falling into them
      var area1Left = [this.left.x, partialDist(this.left.x, layerLen, 0.1)]; // first left
      var area2Left = [partialDist(this.left.x, layerLen, 0.1), partialDist(this.left.x, layerLen, 0.25)]; // second left
      var area3 = [partialDist(this.left.x, layerLen, 0.25), partialDist(this.left.x, layerLen, 0.75)]; // middle
      var area2Right = [partialDist(this.left.x, layerLen, 0.75), partialDist(this.left.x, layerLen, 0.9)]; // second right
      var area1Right = [partialDist(this.left.x, layerLen, 0.9), this.right.x]; // frist right
      // console.log("Areas: ", area1Left, area2Left, area3, area2Right, area1Right);
      // console.log("von ", this.left.x, " bis ", this.right.x);

      // DAMIT NICHT ZU HARTE KANTEN BEREICHE UEBERLAPPEN LASSEN

      // here is where the areas are assigned probabilities of points falling into them
      // we want 50 percent for area1, 30 for area2, 20 for area3
      var odds = Math.random();
      var selectedAreas;

      if(odds < 0.5) // if odds are around 50 percent, area1 gets selected
         selectedAreas = [area1Left, area1Right];
      else if((odds > 0.5) && (odds < 0.8)) // other 30 percent, area2 will be selected
         selectedAreas = [area2Left, area2Right];
      else // the other 20 percent, so 0.8 to 1.0 will get area3 selected
         selectedAreas = area3;

      // both parts of an area need to be selected because both together have the overall probability assigned
      // since areas 1 and 2 are divided into two and area 3 is kept together, they need to be treated differently
      if(selectedAreas[0].length == 2) // so area 1 or 2
      {
         var iterationArea; // to select left or right half based on random number
         for(var i = 1; i <= howMany; i++)
         {
            var randPos = Math.random(); // new random position within selectedArea every iteration
            if((randPos <= 0.5) && (selectedAreas.length == 2)) // whether to choose left or right side
               iterationArea = selectedAreas[0];
            else
               iterationArea = selectedAreas[1];

            this.points.push(new CirclePos
            (
               map(Math.random(), 0, 1, iterationArea[0], iterationArea[1]),
               this.left.y
            )); // then finally push new point in array that contains this layer's points
         }
      }
      else // so area 3 is selected --> no need to decide between
      {
         for(var i = 1; i <= howMany; i++)
         {
            this.points.push(new CirclePos
            (
               map(Math.random(), 0, 1, selectedAreas[0], selectedAreas[1]),
               this.left.y
            ));
         }
      }
   }

   movePoints(cursor)
   {
      for(var j = 0; j < this.points.length; j++)
      {
         //console.log(this.layerLen);
         this.points[j].x += this.layerLen * cursor.relChangeX;
      }
         //this.points[j].x += this.points[j].x * cursor.relChangeX;
         // Punkt bewegt sich um Anteil innerhalb der Layer zwischen den Grenzen
         // also

   }

   // draws the array of points in this layer
   drawPoints(size1stTier, size2ndTier)
   {
      stroke(255, 255 ,255);
      fill(255, 255, 255);
      for(var i = 0; i < this.points.length; i++)
      {
         if(this.points[i].secondTier)
            ellipse(this.points[i].x, this.points[i].y, size2ndTier);
         else
            ellipse(this.points[i].x, this.points[i].y, size1stTier);
      }
   }

   // draws a line between the ledt point of the layer and the right point
   drawLine()
   {
      line(this.left.x, this.left.y, this.right.x, this.right.y);
   }
}
