Vector2d = function(x, y)
{
  this.x = x || 0;
  this.y = y || 0;
}

Vector2d.UP = new Vector2d(0, -1);
Vector2d.RIGHT = new Vector2d(1, 0);
Vector2d.DOWN = new Vector2d(0, 1)
Vector2d.LEFT = new Vector2d(-1, 0);

Vector2d.randomUnitVector2d = function()
{
  var angle = Math.random() * 2 * Math.PI;
  return new Vector2d(
    Math.cos(angle),
    Math.sin(angle)
  );
}

Vector2d.fromRadians = function(radians, length)
{
  if(typeof length == 'undefined') {
    length = 1;
  }
  return new Vector2d(
    Math.cos(radians) * length,
    Math.sin(radians) * length
  );
}

Vector2d.prototype.equals = function(vector2)
{
  return this.x == vector2.x && this.y == vector2.y;
}

Vector2d.prototype.length = function()
{
  return this.distance(new Vector2d());
}

Vector2d.prototype.add = function(vector2)
{
  return new Vector2d(
    this.x + vector2.x,
    this.y + vector2.y
  );
}

Vector2d.prototype.subtract = function(vector2)
{
  return new Vector2d(
    this.x - vector2.x,
    this.y - vector2.y
  );
}

Vector2d.prototype.multiply = function(scalar)
{
  return new Vector2d(
    this.x * scalar,
    this.y * scalar
  );
}

Vector2d.prototype.divide = function(scalar)
{
  return new Vector2d(
    this.x / scalar,
    this.y / scalar
  );
}

Vector2d.prototype.power = function(scalar)
{
  return new Vector2d(
    Math.pow(this.x, scalar),
    Math.pow(this.y, scalar)
  );
}

Vector2d.prototype.rotate = function(radians)
{
  return new Vector2d(
    this.x * Math.cos(radians) - this.y * Math.sin(radians),
    this.x * Math.sin(radians) + this.y * Math.cos(radians)
  );
}

Vector2d.prototype.distance = function(vector2)
{
  return Math.sqrt(Math.pow(this.x - vector2.x, 2) +
                   Math.pow(this.y - vector2.y, 2));
}

Vector2d.prototype.directionTo = function(vector2)
{
  return vector2.subtract(this)
    .divide(this.distance(vector2));
}

/**
 * 0 <= radians < 2 * pi
 */
Vector2d.prototype.toRadians = function()
{
  var radians = Math.atan2(this.y, this.x);
  if(radians < 0)
    radians = radians + 2 * Math.PI;
  return radians;
}

Vector2d.prototype.round = function()
{
  return new Vector2d(
    Math.round(this.x),
    Math.round(this.y)    
  );
}