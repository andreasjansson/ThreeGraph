function Edge(vertex1, vertex2)
{
  this.vertex1 = vertex1;
  this.vertex2 = vertex2;

  this.line = null;
}

Edge.prototype.getPos1 = function()
{
  if(!this.vertex1.projectedPos)
    throw "Unknown projected vertex position";

  return this.vertex1.projectedPos;
}

Edge.prototype.getPos2 = function()
{
  if(!this.vertex2.projectedPos)
    throw "Unknown projected vertex position";

  return this.vertex2.projectedPos;
}

Edge.prototype.prepareForView = function()
{
  /*
  this.line = svg.line(0, 0, 0, 0,
                       {strokeWidth: 1, stroke: "black",
                        strokeOpactiy: 0});
  $(this.line).animate({svgStrokeOpacity: 1}, Config.fadeTime);
  */
}

Edge.prototype.update = function()
{
  /*
  var pos1 = this.getPos1();
  var pos2 = this.getPos2();

  svg.change(this.line, {x1: pos1.x, y1: pos1.y, x2: pos2.x, y2: pos2.y});
  */
}

Edge.prototype.removeFromView = function()
{
  var line = this.line;
  $(line).animate({svgStrokeOpacity: 0}, Config.fadeTime, function() {
    svg.remove(line);
  });
}