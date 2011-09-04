function Controller(graph, view)
{
  this.graph = graph;
  this.view = view;
  this.view.cameraPosition = this.graph.centredVertex.pos;
  this.view.cameraAngle = this.graph.centredVertex.pos.
    directionTo(Vector3d.origin());

  this.visibleVertices;
  this.visibleEdges;
}

Controller.prototype.start = function()
{
  this.view.listen();
  this.refreshVisible();
}

Controller.prototype.refreshVisible = function()
{
  for(var i = 0; i < this.visibleVertices; i ++)
    vertex.removeFromView();

  for(var i = 0; i < this.visibleEdges; i ++)
    edge.removeFromView();

  var verticesAndEdges = this.graph.getVisibleVerticesAndEdges();
  this.visibleVertices = verticesAndEdges.vertices;
  this.visibleEdges = verticesAndEdges.edges;

  var self = this;
  for(var i = 0; i < this.visibleVertices.length; i ++) {
    var vertex = this.visibleVertices[i];
    vertex.prepareForView(this.view.$canvas);

    vertex.onClick = function() {
      self.moveTo(this);
    };
  }

  for(var i = 0; i < this.visibleEdges.length; i ++) {
    var edge = this.visibleEdges[i];
    edge.prepareForView(this.view.$canvas);
  }

  this.view.update(this.visibleVertices, this.visibleEdges);
}

Controller.prototype.moveTo = function(vertex)
{
  var self = this;
  this.view.moveTo(vertex, function() {
    self.graph.centredVertex = vertex;
    this.refreshVisible();
  });
}