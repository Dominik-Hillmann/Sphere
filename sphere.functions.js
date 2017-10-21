// measures distance between two points
var distance = function(x, y, middlePos)
{
   return Math.round(Math.sqrt(Math.pow(x - middlePoint.x, 2) + Math.pow(y - middlePoint.y, 2)));
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

class Circle {}

// a layer represents a line on which the points can move
class Layer
{
   constructor(x1, y1, x2, y2)
   {
      this.left = new Position(x1, y1);
      this.right = new Position(x2, y2);
   }

   draw()
   {
      line(left.x, left.y, right.x, right.y);
   }
}
