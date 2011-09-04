function Graph(graphNodes, centredGraphNodeName)
{
  this.graphNodes = graphNodes;
  this.viewableDistance = Config.viewableDistance;
  if(typeof centredGraphNodeName == "undefined")
    this.centredGraphNode = this.getRandomGraphNode();
  else {
    var graphNode = this.getGraphNodeByName(centredGraphNodeName);
    if(graphNode)
      this.centredGraphNode = graphNode;
    else
      this.centredGraphNode = this.getRandomGraphNode();
  }
}

// depth-limited breadth-first search;
Graph.prototype.getVisibleGraphNodesAndEdges = function()
{
  this.centredGraphNode.currentLevel = 0;
  var graphNodes = [this.centredGraphNode];
  var edges = [];

  var tempGraphNodes = [this.centredGraphNode];
  for(var depth = 0; depth < this.viewableDistance; depth ++) {
    var nextTempGraphNodes = [];

    for(var i = 0; i < tempGraphNodes.length; i ++) {
      var graphNode = tempGraphNodes[i];

      var adjacentGraphNodes = graphNodes[i].adjacent;

      for(var j = 0; j < adjacentGraphNodes.length; j ++) {
        var adjacentGraphNode = adjacentGraphNodes[j];
        var isVisited = false;
        for(var k = 0; k < graphNodes.length; k ++) {
          if(graphNodes[k] == adjacentGraphNode) {
            isVisited = true;
            break;
          }
        }

        if(!isVisited) {
          adjacentGraphNode.currentLevel = depth;
          graphNodes.push(adjacentGraphNode);
          nextTempGraphNodes.push(adjacentGraphNode);
        }
        var edge = new Edge(graphNode, adjacentGraphNode);
        edge.currentLevel = depth;
        edges.push(edge);
      }
    }
    tempGraphNodes = nextTempGraphNodes;
  }

  return {graphNodes: graphNodes, edges: edges};
}

Graph.prototype.getRandomGraphNode = function()
{
  return this.graphNodes[Math.floor(Math.random() * this.graphNodes.length)];
}

Graph.prototype.getGraphNodeByName = function(name)
{
  for(var i = 0; i < this.graphNodes.length; i ++) {
    if(unescape(this.graphNodes[i].name) == name)
      return this.graphNodes[i];
  }

  return null;
}