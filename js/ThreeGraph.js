function ThreeGraph(centredNodeName)
{
  this.view = new View();
  this.controller;
  this.graph;

  var reader = new Reader();
  var self = this;
  reader.onLoad = function() {
    self.graph = new Graph(reader.graphNodes, centredNodeName);
    self.onLoad();
    self.controller = new Controller(self.graph, self.view);
    self.controller.start();
  }
}

ThreeGraph.prototype.onLoad = function() { }