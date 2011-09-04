function Controller(graph, view)
{
  this.graph = graph;
  this.view = view;
  this.view.setCameraPosition(graph.centredGraphNode.pos.
                              subtract(new Vector3d(0, 0, 20)));

  this.visibleGraphNodes;
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
  var graphNodesAndEdges = this.graph.getVisibleGraphNodesAndEdges();
  var newVisibleGraphNodes = graphNodesAndEdges.graphNodes;
  var newVisibleEdges = graphNodesAndEdges.edges;

  var graphNodesToAdd = this.visibleGraphNodes ?
    Array.diff(newVisibleGraphNodes, this.visibleGraphNodes) : newVisibleGraphNodes;
  var edgesToAdd = this.visibleEdges ?
    Array.diff(newVisibleEdges, this.visibleEdges) : newVisibleEdges;
  var graphNodesToRemove = this.visibleGraphNodes ?
    Array.diff(this.visibleGraphNodes, newVisibleGraphNodes) : [];
  var edgesToRemove = this.visibleEdges ?
    Array.diff(this.visibleEdges, newVisibleEdges) : [];

  var self = this;
  for(var i = 0; i < graphNodesToAdd.length; i ++) {
    var graphNode = graphNodesToAdd[i];
    this.view.prepare(graphNode);

    graphNode.onClick = function() {
      self.moveTo(this);
    };
  }

  for(var i = 0; i < edgesToAdd.length; i ++)
    this.view.prepare(edgesToAdd[i]);

  for(var i = 0; i < graphNodesToRemove.length; i ++)
    this.view.remove(graphNodesToRemove[i]);
  
  for(var i = 0; i < edgesToRemove.length; i ++)
    this.view.remove(edgesToRemove[i]);
  
  this.visibleGraphNodes = newVisibleGraphNodes;
  this.visibleEdges = newVisibleEdges;
}

Controller.prototype.moveTo = function(graphNode)
{
  var self = this;
  this.view.moveTo(graphNode, function() {
    self.graph.centredGraphNode = graphNode;
    self.refreshVisible();
  });
}