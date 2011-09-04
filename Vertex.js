function Vertex(name, pos, adjacent)
{
  this.name = name;
  this.pos = pos;
  this.adjacent = typeof adjacent == "undefined" ? [] : adjacent;

  // caching
  this.projectedPos = null;

  // a bit of view code in here to avoid duplication
  this.$div = null;
}

Vertex.prototype.addAdjacent = function(vertex)
{
  this.adjacent.push(vertex);
}

Vertex.prototype.prepareForView = function()
{
  // fade in div.
  this.$div = $("<div>" + this.name + "</div>");
  window.$canvas.append(this.$div);
  this.$div.fadeIn(Config.fadeTime);

  var self = this;
  this.$div.click(function() {
    self.onClick();
  });
}

Vertex.prototype.update = function(distance)
{
  this.$div
    .css("left", Math.round(this.projectedPos.x) + "px")
    .css("top", Math.round(this.projectedPos.y) + "px");
//    .css("font-size", Math.round(Math.max(6, 100 - distance)));
}

Vertex.prototype.removeFromView = function()
{
  var $div = this.$div;
  $div.fadeOut(Config.fadeTime, function() {
    $div.remove();
  });
}

Vertex.prototype.onClick = function() { }