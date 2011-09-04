// Called Vertex because Node is already used by the DOM.
// Not anything to do with the computer graphics concept Vertex.

function Vertex(name, pos, adjacent)
{
  this.name = name;
  this.pos = pos;
  this.adjacent = typeof adjacent == "undefined" ? [] : adjacent;

  this.mesh = null;
  this.object3d = null;
  this.dimensions = null;
}

Vertex.prototype.addAdjacent = function(vertex)
{
  this.adjacent.push(vertex);
}

Vertex.prototype.prepareForView = function(scene)
{
  var textGeometry = new THREE.TextGeometry(unescape(this.name), {
    size: Config.vertex.size,
    height: Config.vertex.height,
    curveSegments: Config.vertex.curveSegments,
    font: Config.vertex.font
  });

  textGeometry.computeBoundingBox();
  this.dimensions = new Vector2d(textGeometry.boundingBox.x[1] -
                                 textGeometry.boundingBox.x[0],
                                 textGeometry.boundingBox.y[1] -
                                 textGeometry.boundingBox.y[0]);
  var textMaterial = new THREE.MeshBasicMaterial({
    color: 0x000000,
    wireframe: false
  });
  this.mesh = new THREE.Mesh(textGeometry, textMaterial);
  this.mesh.position.x = this.pos.x - this.dimensions.x / 2;
  this.mesh.position.y = this.pos.y - this.dimensions.y / 2;
  this.mesh.position.z = this.pos.z;
  this.mesh.doubleSided = true;  
  this.mesh.overdraw = true;

	this.object3d = new THREE.Object3D();
  this.object3d.addChild(this.mesh);

  scene.addObject(this.object3d);

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