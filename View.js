function View($canvas, onLoad)
{
  window.$canvas = $canvas;

  $canvas.svg({onLoad: function(svg) {
    window.svg = svg;
    onLoad();
  }});

  this.vertices;
  this.edges;
  this.cameraPosition;
  this.cameraAngle;

  this.mouseX = null;
  this.mouseY = null;
}

View.prototype.update = function(vertices, edges)
{
  if(vertices && edges) {
    this.vertices = vertices;
    this.edges = edges;
  }

  var projection = new Projection(
    new Vector2d(window.$canvas.width() / 2, window.$canvas.height() / 2),
    this.cameraPosition, this.cameraAngle);

  for(var i = 0; i < this.vertices.length; i ++)
    this.vertices[i].projectedPos = projection.project(this.vertices[i].pos);

  for(var i = 0; i < this.vertices.length; i ++) {
    var vertex = this.vertices[i];
    vertex.update(this.cameraPosition.distance(vertex.pos));
  }

  for(var i = 0; i < this.edges.length; i ++)
    this.edges[i].update();
}

View.prototype.moveTo = function(vertex, callback)
{
  var cameraPos = this.cameraPosition;
  var vertexPos = vertex.pos;
  var frameCount = Math.floor((Config.moveTime / 1000) * Config.frameRate);
  var delta = vertexPos.subtract(cameraPos).divide(frameCount);
  var frameIndex = 0;

  var self = this;
  var intervalID = window.setInterval(function() {

    if(frameIndex ++ >= frameCount) {
      window.clearInterval(intervalID);
      return;
    }

    self.cameraPosition = self.cameraPosition.add(delta);
    self.update();

  }, Config.frameRate);
}

View.prototype.listen = function()
{
  var self = this;
  window.listenInterval = window.setInterval(function() {
    var x = self.mouseX;
    var y = self.mouseY;
    var midX = window.$canvas.width() / 2;
    var midY = window.$canvas.height() / 2;
    var dX = x - midX;
    var dY = y - midY;

    self.cameraAngle = self.cameraAngle.add(new Vector3d(dX / 10000, -dY / 10000, 0));
    self.update();
  }, Config.frameRate);

  window.$canvas.mouseover(function(event) {
    self.mouseX = event.pageX;
    self.mouseY = event.pageY;
  });
}
