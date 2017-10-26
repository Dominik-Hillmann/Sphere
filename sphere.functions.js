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

      var area1Left = [this.left.x, partialDist(this.left.x, layerLen, 0.1)];
      var area1Right = [partialDist(this.left.x, layerLen, 0.9), this.right.x];
      var area2Left = [partialDist(this.left.x, layerLen, 0.1), partialDist(this.left.x, layerLen, 0.25)];
      var area2Right = [partialDist(this.left.x, layerLen, 0.75), partialDist(this.left.x, layerLen, 0.9)];
      var area3 = [partialDist(this.left.x, layerLen, 0.25), partialDist(this.left.x, layerLen, 0.75)];

      // Bereiche sind festgelegt, nun Algorithmus zur Festlegung der eigentlichen Positionen darin
      var odds = Math.random();
      var selectedAreas;
      if(odds < 0.5)
         selectedAreas = [area1Left, area1Right];
      else if((odds > 0.5) && (odds < 0.8))
         selectedAreas = [area2Left, area2Right];
      else
         selectedAreas = area3;
      // nun ist zufaellig ein Teil gemaess den gewuenschten Wahrscheinlichkeiten ausgewaehlt
      // nun innerhalb dieses Teils eine Position zufällig ausgewaehlt werden

      if(selectedAreas.length === 2)
      {
         for(var i = 1; i <= howMany; i++)
         {
            var randPos = Math.random();
            if(randPos <= 0.5)
               selectedAreas = selectedAreas[0];
            else
               selectedAreas = selectedAreas[1];

            this.points.push(new Position
            (
               map(Math.random(), 0, 1, selectedAreas[0], selectedAreas[1]),
               this.left.y
            ));
         }
      }
      else
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


      // für einzelne layer Punkt
         // hohe Wahrscheinlichkeit für Randregion, kleinere Wahrscheinlichkeit für Mittle
         // 0.5, ob im Hintergrund oder nicht
         // random([min], [max])
   }

   drawPoints()
   {

   }
}
