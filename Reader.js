Reader = function(indicesURL, adjlistURL, layoutURL)
{
  this.indices = null;
  this.adjlist = null;
  this.layout = null;
  this.vertices = [];

  var self = this;
  var checkFunction = function() {
    self.indices && self.adjlist && self.layout && self.parse();
  };
  this.readIndices(indicesURL, checkFunction);
  this.readAdjlist(adjlistURL, checkFunction);
  this.readLayout(layoutURL, checkFunction);
}

Reader.prototype.readIndices = function(url, callback)
{
  var self = this;
  $.getJSON(url, function(data) {
    self.indices = data;
    callback();
  });
}

Reader.prototype.readAdjlist = function(url, callback)
{
  var self = this;
  $.getJSON(url, function(data) {
    self.adjlist = data;
    callback();
  });
}

Reader.prototype.readLayout = function(url, callback)
{
  var self = this;
  $.getJSON(url, function(data) {
    self.layout = data;
    callback();
  });
}

Reader.prototype.parse = function()
{
  var vertices = [];
  for(var key in this.indices) {
    vertices[key] = new Vertex(this.indices[key]);
  }

  for(var key in this.adjlist) {
    var vertex = vertices[key];
    var adjIndices = this.adjlist[key];
    for(var adjKey in adjIndices)
      vertex.addAdjacent(vertices[adjIndices[adjKey]]);
  }

  for(var key in this.layout) {
    var point = this.layout[key];

    if((key in vertices))
      vertices[key].pos = new Vector3d(point.x, point.y, point.z);
  }

  // drop "named" indices
  for(var key in vertices)
    this.vertices.push(vertices[key]);

  this.onLoad();
}

Reader.onLoad = function() { }
