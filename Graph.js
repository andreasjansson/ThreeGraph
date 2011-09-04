function Graph(vertices, centredVertex)
{
  this.vertices = vertices;
  this.viewableDistance = Config.viewableDistance;
  this.centredVertex = typeof centredVertex == "undefined" ?
    this.getRandomVertex() : centredVertex;
}

// depth-limited breadth-first search;
Graph.prototype.getVisibleVerticesAndEdges = function()
{
  var vertices = [this.centredVertex];
  var edges = [];

  var tempVertices = [this.centredVertex];
  for(var depth = 0; depth < this.viewableDistance; depth ++) {
    var nextTempVertices = [];

    for(var i = 0; i < tempVertices.length; i ++) {
      var vertex = tempVertices[i];

      var adjacentVertices = vertices[i].adjacent;

      for(var j = 0; j < adjacentVertices.length; j ++) {
        var adjacentVertex = adjacentVertices[j];
        var isVisited = false;
        for(var k = 0; k < vertices.length; k ++) {
          if(vertices[k] == adjacentVertex) {
            isVisited = true;
            break;
          }
        }

        if(!isVisited) {
          vertices.push(adjacentVertex);
          nextTempVertices.push(adjacentVertex);
        }
        edges.push(new Edge(vertex, adjacentVertex));
      }
    }
    tempVertices = nextTempVertices;
  }

  return {vertices: vertices, edges: edges};
}

Graph.prototype.getRandomVertex = function()
{
  return this.vertices[Math.floor(Math.random() * this.vertices.length)];
}