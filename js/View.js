function View($canvas)
{
  this.graphNodes;
  this.edges;

  this.scene = new THREE.Scene();
	this.camera = new THREE.GraphCamera(Config.camera.fov,
                                      window.innerWidth / window.innerHeight,
                                      Config.camera.near, Config.camera.far,
                                      Config.camera.initialRotation);
  this.camera.lookSpeed = Config.camera.lookSpeed;
  this.scene.addChild(this.camera);
	this.renderer = new THREE.MyDOMRenderer(Config.autoClearInterval,
                                          $("#canvas")[0]);
	this.renderer.setSize(window.innerWidth, window.innerHeight);
	$canvas.append(this.renderer.domElement);

  this.interval = null;
  this.moveFrames = null;
  this.cameraDelta = null;
}

View.prototype.start = function()
{
  var maxIteration = 0000;
  var iteration = 0;

  var self = this;
  this.interval = window.setInterval(function() {
    self.update();

    if(maxIteration && iteration ++ > maxIteration)
      window.clearInterval(self.interval);

  }, Config.frameRate);
}

/**
 * @param Vector3d position
 */
View.prototype.setCameraPosition = function(position)
{
  this.camera.position.x = position.x;
  this.camera.position.y = position.y;
  this.camera.position.z = position.z;
}

View.prototype.update = function()
{
  if(this.moveFrames -- > 0) {
    this.setCameraPosition((new Vector3d(this.camera.position)).
                           add(this.cameraDelta));
  }
  this.renderer.render(this.scene, this.camera);
}

View.prototype.prepare = function(object)
{
  object.prepareForView(this.scene);
}

View.prototype.remove = function(object)
{
  object.removeFromView(this.scene);
}

View.prototype.moveTo = function(graphNode, callback)
{
  var cameraPos = new Vector3d(this.camera.position);
  var targetPos = graphNode.pos.subtract(new Vector3d(0, 0, 20));
  var frameCount = Math.floor((Config.moveTime / 1000) * Config.frameRate);

  this.moveFrames = frameCount;
  this.cameraDelta = targetPos.subtract(cameraPos).divide(frameCount);

  callback();
}

View.prototype.listen = function()
{

}
