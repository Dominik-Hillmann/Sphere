// returns boolean whether two points have exactly this distance
var haveDistance = function(x, y, middlePoint, dist)
{
   var actualDist = Math.round(Math.sqrt(Math.pow(x - middlePoint.x, 2) + Math.pow(y - middlePoint.y, 2)));
   return ((actualDist == dist) || ((actualDist + 2) == dist) || ((actualDist - 2) == dist));//(dist >= actualDist - 1) && (dist <= actualDist + 1);
}

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
