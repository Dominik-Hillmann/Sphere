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

// creates new vector
class Position
{
   constructor(x, y)
   {
      this.x = x;
      this.y = y;
   }
}

class circlePos extends Position
{}

class Circle {}

// a layer represents a line on which the points can move
class Layer
{
   constructor(x1, y1, x2, y2)
   {
      if(y1 != y2)
         console.error("Borders in layer do not have same height!");

      this.left = new Position(x1, y1);
      this.right = new Position(x2, y2);
      this.points = [];
   }

   draw() // draws a line between the ledt point of the layer and the right point
   {
      line(this.left.x, this.left.y, this.right.x, this.right.y);
   }

   // new point that will move along this layer's height between left.x and right.x
   // later, there need to be
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
      // console.log("selectedAreas ", odds, selectedAreas, "len:", selectedAreas.length);
      // both parts of an area need to be selected because both together have the overall probability assigned

      // since areas 1 and 2 are divided into two and area 3 is kept together, they need to be treated differently
      if(selectedAreas.length == 2) // so area 1 or 2
      {
         var iterationArea; // to select left or right half based on random number
         for(var i = 1; i <= howMany; i++)
         {
            var randPos = Math.random(); // new random position within selectedArea every iteration
            if((randPos <= 0.5) && (selectedAreas.length == 2)) // whether to choose left or right side
               iterationArea = selectedAreas[0];
            else
               iterationArea = selectedAreas[1];

            this.points.push(new Position
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
            this.points.push(new Position
            (
               map(Math.random(), 0, 1, selectedAreas[0], selectedAreas[1]),
               this.left.y
            ));
         }
      }
      // console.log(this.points);
   }

   // draws the array of points in this layer
   drawPoints(size)
   {
      fill(255, 255, 255);
      for(var i = 0; i < this.points.length; i++)
         ellipse(this.points[i].x, this.points[i].y, size);
   }
}
