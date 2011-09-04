function Edge(graphNode1, graphNode2)
{
  this.graphNode1 = graphNode1;
  this.graphNode2 = graphNode2;

  this.line = null;
  this.$div = null;
}

Edge.prototype.prepareForView = function(scene)
{
  var geometry = new THREE.Geometry();

  var pos1 = this.graphNode1.pos.toThreeJSVector3();
  var pos2 = this.graphNode2.pos.toThreeJSVector3();

  geometry.vertices.push(
    new THREE.Vertex(pos1));
  geometry.vertices.push(
    new THREE.Vertex(pos2));

  this.$div = $("<div></div>").appendTo($("#canvas")).fadeIn(Config.fadeTime);

  var material = new THREE.LineDOMMaterial(this.$div[0], {color: 0x000000});
  this.line = new THREE.Line(geometry, material);

  scene.addObject(this.line);
}

Edge.prototype.removeFromView = function(scene)
{
  var $div = this.$div;
  var line = this.line;
  $div.fadeOut(Config.fadeTime, function() {
    $div.remove();
    scene.removeObject(line);
  });
}