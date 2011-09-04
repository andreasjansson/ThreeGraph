/**
 * Based on http://www.tecgraf.puc-rio.br/~ismael/Cursos/Cidade_CG/labs/Java3D/Java3D_onlinebook_selman/Htmls/3DJava_Ch02.htm
 *
 * @param Vector2d screenCentre
 * @param Vector3d cameraPosition
 * @param Vector3d cameraAngle
 */
function Projection(screenCentre, cameraPosition, cameraAngle, scale)
{
  this.screenCentre = screenCentre;
  this.cameraPosition = cameraPosition;
  this.cameraAngle = cameraAngle;
  this.scale = typeof scale == "undefined" ? 1000 : scale;

  this.cosX = Math.cos(cameraAngle.x);
  this.sinX = Math.sin(cameraAngle.x);
  this.cosY = Math.cos(cameraAngle.y);
  this.sinY = Math.sin(cameraAngle.y);
}

/**
 * @param Vector3d point
 * @return Vector2d
 */
Projection.prototype.project = function(point)
{
  var x = this.cameraPosition.x + point.x * this.cosX - point.y * this.sinX;
  var y = this.cameraPosition.y + point.x * this.sinX * this.sinY + point.y *
    this.cosX * this.sinY + point.z * this.cosY;
  var temp = this.cameraAngle.z / (
    this.cameraPosition.z + point.x * this.sinX * this.cosY +
      point.y * this.cosX * this.cosY - point.z * this.sinY);

  var projectedPoint = new Vector2d();
  projectedPoint.x = this.screenCentre.x + this.scale * temp * x;
  projectedPoint.y = this.screenCentre.y + this.scale * temp * y;

  return projectedPoint;
}
