function View($canvas)
{
  this.vertices;
  this.edges;

  this.scene = new THREE.Scene();
	this.camera = new THREE.GraphCamera(Config.camera.fov,
                                      window.innerWidth / window.innerHeight,
                                      Config.camera.near, Config.camera.far);
  this.camera.lookSpeed = Config.camera.lookSpeed;
  this.scene.addChild(this.camera);
	this.renderer = new THREE.CanvasRenderer();
	this.renderer.setSize(window.innerWidth, window.innerHeight);
	$canvas.append(this.renderer.domElement);

  this.interval = null;
}

View.prototype.start = function()
{
  var self = this;
  this.interval = window.setInterval(function() {
    self.update();
  }, Config.frameRate);
}

/**
 * @param Vector3d position
 */
View.prototype.setCameraPosition = function(position)
{
  this.camera.x = position.x;
  this.camera.y = position.y;
  this.camera.z = position.z;
}

View.prototype.update = function()
{
  this.renderer.render(this.scene, this.camera);
}

View.prototype.prepare = function(object)
{
  object.prepareForView(this.scene);
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

}
