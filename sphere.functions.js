// returns boolean whether two points have exactly this distance
var haveDistance = function(x, y, middlePoint, dist)
{
   var actualDist = Math.round(Math.sqrt(Math.pow(x - middlePoint.x, 2) + Math.pow(y - middlePoint.y, 2)));
   //console.log(actualDist);
   return actualDist === dist || actualDist + 1 === dist || actualDist - 1 === dist;//(dist >= actualDist - 1) && (dist <= actualDist + 1);
}
