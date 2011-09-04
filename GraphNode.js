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
  this.$div = $("<div>" + this.niceName() + "</div>")
    .appendTo($("#canvas"))
    .css("font-size", "0px")
    .fadeIn(Config.fadeTime);
  var material = new THREE.ParticleDOMMaterial(this.$div[0]);
  this.particle = new THREE.Particle(material);
  this.particle.position.x = this.pos.x;
  this.particle.position.y = this.pos.y;
  this.particle.position.z = this.pos.z;
  scene.addObject(this.particle);

  var self = this;
  this.$div.mousedown(function(event) {

		event.preventDefault();
		event.stopPropagation();

    console.log(event.button);

    switch(event.button) {
    case 0:
      self.onClick();
      break;
    case 2:
      window.open("http://en.wikipedia.org/wiki/" + self.name, "_blank");
      break;
    }
  });
}

GraphNode.prototype.removeFromView = function(scene)
{
  var $div = this.$div;
  var particle = this.particle;
  $div.fadeOut(Config.fadeTime, function() {
    $div.remove();
    scene.removeObject(particle);
  });
}

GraphNode.prototype.niceName = function()
{
  return decodeURIComponent(unescape(this.name))
    .replace(/_/g, " ").replace(/\([^\)]*band\)$/, '');
}

GraphNode.prototype.onClick = function() { }