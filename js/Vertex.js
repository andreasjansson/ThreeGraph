// Called GraphNode because Node is already used by the DOM.

function GraphNode(name, pos, adjacent)
{
  this.name = name;
  this.pos = pos;
  this.adjacent = typeof adjacent == "undefined" ? [] : adjacent;

  this.particle = null;
  this.$div = null;
}

GraphNode.prototype.addAdjacent = function(graphNode)
{
  this.adjacent.push(graphNode);
}

GraphNode.prototype.prepareForView = function(scene)
{
  this.$div = $("<div>" + decodeURIComponent(unescape(this.name)) + "</div>")
    .appendTo($("#canvas"))
    .css("font-size", "0px");
  var material = new THREE.ParticleDOMMaterial(this.$div[0]);
  this.particle = new THREE.Particle(material);
  this.particle.position.x = this.pos.x;
  this.particle.position.y = this.pos.y;
  this.particle.position.z = this.pos.z;
  scene.addObject(this.particle);


  /*
  // fade in div.
  this.$div = $("<div>" + this.name + "</div>");
  window.$canvas.append(this.$div);
  this.$div.fadeIn(Config.fadeTime);

  var self = this;
  this.$div.click(function() {
    self.onClick();
  });
  */
}

GraphNode.prototype.update = function(distance)
{
  this.$div
    .css("left", Math.round(this.projectedPos.x) + "px")
    .css("top", Math.round(this.projectedPos.y) + "px");
//    .css("font-size", Math.round(Math.max(6, 100 - distance)));
}

GraphNode.prototype.removeFromView = function()
{
  var $div = this.$div;
  $div.fadeOut(Config.fadeTime, function() {
    $div.remove();
  });
}

GraphNode.prototype.onClick = function() { }