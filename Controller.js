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
  this.view.start();
  this.refreshVisible();
}

Controller.prototype.refreshVisible = function()
{
  var verticesAndEdges = this.graph.getVisibleVerticesAndEdges();
  var newVisibleVertices = verticesAndEdges.vertices;
  var newVisibleEdges = verticesAndEdges.edges;

  var verticesToAdd = this.visibleVertices ?
    Array.diff(newVisibleVertices, this.visibleVertices) : newVisibleVertices;
  var edgesToAdd = this.visibleEdges ?
    Array.diff(newVisibleEdges, this.visibleEdges) : newVisibleEdges;
  var verticesToRemove = this.visibleVertices ?
    Array.diff(this.visibleVertices, newVisibleVertices) : [];
  var edgesToRemove = this.visibleEdges ?
    Array.diff(this.visibleEdges, newVisibleEdges) : [];

  var self = this;
  for(var i = 0; i < verticesToAdd.length; i ++) {
    var vertex = verticesToAdd[i];
    this.view.prepare(vertex);

    vertex.onClick = function() {
      self.moveTo(this);
    };
  }

  for(var i = 0; i < edgesToAdd.length; i ++)
    /* this.view.prepare(edgesToAdd[i]) */ ;

  for(var i = 0; i < verticesToRemove.length; i ++)
    this.view.remove(verticesToRemove[i]);
  
  for(var i = 0; i < edgesToRemove.length; i ++)
    this.view.remove(edgesToRemove[i]);
  
  this.visibleVertices = newVisibleVertices;
  this.visibleEdges = newVisibleEdges;
}

Controller.prototype.moveTo = function(vertex)
{
  var self = this;
  this.view.moveTo(vertex, function() {
    self.graph.centredVertex = vertex;
    this.refreshVisible();
  });
}