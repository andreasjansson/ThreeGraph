/**
 * @author andreas jansson / http://jansson.me.uk/
 * @author mikael emtinger / http://gomo.se/
 * @author alteredq / http://alteredqualia.com/
 *
 * parameters = {
 *  fov: <float>,
 *  aspect: <float>,
 *  near: <float>,
 *  far: <float>,

 *  movementSpeed: <float>,
 *  lookSpeed: <float>,
 *  rollSpeed: <float>,

 *  autoForward: <bool>,
 * 	mouseLook: <bool>,

 *  domElement: <HTMLElement>,
 * }
 */

THREE.GraphCamera = function ( fov, aspect, near, far, initialRotation ) {

	THREE.Camera.call( this, fov, aspect, near, far );

	// API

	this.mouseLook = true;
	this.autoForward = false;

	this.lookSpeed = 1;
	this.movementSpeed = 1;
	this.rollSpeed = 1;

	this.constrainVertical = [ -0.8, 0.8 ];

	this.domElement = document;

	// disable default camera behavior

	this.useTarget = false;
	this.matrixAutoUpdate = false;

	// internals

	this.forward = new THREE.Vector3( 0, 0, 1 );
	this.roll = 0;

	this.lastUpdate = -1;
	this.delta = 0;
	
	var xTemp = new THREE.Vector3();
	var yTemp = new THREE.Vector3();
	var zTemp = new THREE.Vector3();
	var rollMatrix = new THREE.Matrix4();

  var oldMouseX, oldMouseY, mouseX = 0, mouseY = 0, mouseDown = false;
  var rotateX = initialRotation, rotateY = 0;

	var doRoll = false, rollDirection = 1, forwardSpeed = 0, sideSpeed = 0, upSpeed = 0;

	var windowHalfX = window.innerWidth / 2;
	var windowHalfY = window.innerHeight / 2;

	// custom update

	this.update = function() {

    var newRotateX, newRotateY;

    if(mouseDown) {

      if(oldMouseX || oldMouseY) {
        newRotateX = oldMouseX - mouseX;
        newRotateY = oldMouseY - mouseY;

        rotateX = (rotateX + newRotateX) / 2;
        rotateY = (rotateY + newRotateY) / 2;
      }
      else {
        rotateX = rotateX / 2;
        rotateY = rotateY / 2;
      }

      oldMouseX = mouseX;
      oldMouseY = mouseY;
    }
    else {
      // nice iphone like slide effect when you let go.
      rotateX = rotateX / 1.1;
      rotateY = rotateY / 1.1;
    }

    if(rotateY)
      this.rotateVertically(- (rotateY / 1000) * this.lookSpeed);

    if(rotateX)
      this.rotateHorizontally((rotateX / 1000) * this.lookSpeed);

		// cap forward up / down
		
		if( this.forward.y > this.constrainVertical[ 1 ] ) {
			
			this.forward.y = this.constrainVertical[ 1 ];
			this.forward.normalize();
			
		} else if( this.forward.y < this.constrainVertical[ 0 ] ) {
			
			this.forward.y = this.constrainVertical[ 0 ];
			this.forward.normalize();
			
		}

		this.matrix.n14 = this.position.x;
		this.matrix.n24 = this.position.y;
		this.matrix.n34 = this.position.z;

		this.matrixWorldNeedsUpdate = true;
    
		zTemp.copy( this.forward );
		yTemp.set( 0, 1, 0 );
	
		xTemp.cross( yTemp, zTemp ).normalize();
		yTemp.cross( zTemp, xTemp ).normalize();
	
		this.matrix.n11 = xTemp.x; this.matrix.n12 = yTemp.x; this.matrix.n13 = zTemp.x;
		this.matrix.n21 = xTemp.y; this.matrix.n22 = yTemp.y; this.matrix.n23 = zTemp.y;
		this.matrix.n31 = xTemp.z; this.matrix.n32 = yTemp.z; this.matrix.n33 = zTemp.z;
		
		this.supr.update.call( this );

	};
	
	this.rotateHorizontally = function ( amount ) {

		// please note that the amount is NOT degrees, but a scale value
		
		xTemp.set( this.matrix.n11, this.matrix.n21, this.matrix.n31 );
		xTemp.multiplyScalar( amount );

		this.forward.subSelf( xTemp );
		this.forward.normalize();
	
	};
	
	this.rotateVertically = function ( amount ) {
		
		// please note that the amount is NOT degrees, but a scale value
		
		yTemp.set( this.matrix.n12, this.matrix.n22, this.matrix.n32 );
		yTemp.multiplyScalar( amount );
		
		this.forward.addSelf( yTemp );
		this.forward.normalize();
	
	};
	function onMouseMove( event ) {
    if(mouseDown) {
      mouseX = event.pageX;
      mouseY = event.pageY;
    }
	};
	
	function onMouseDown ( event ) {

    mouseX = event.pageX;
    mouseY = event.pageY;
    oldMouseX = oldMouseY = null;
		event.preventDefault();
		event.stopPropagation();

    mouseDown = true;

    /*

		switch ( event.button ) {

			case 0: forwardSpeed = 1; break;
			case 2: forwardSpeed = -1; break;

		}

    */

	};

	function onMouseUp ( event ) {

    oldMouseX = oldMouseY = null;
    mouseDown = false;

	};
	
	this.domElement.addEventListener( 'contextmenu', function ( event ) { event.preventDefault(); }, false );

	this.domElement.addEventListener( 'mousemove', onMouseMove, false );
	this.domElement.addEventListener( 'mousedown', onMouseDown, false );
	this.domElement.addEventListener( 'mouseup', onMouseUp, false );

};


THREE.GraphCamera.prototype = new THREE.Camera();
THREE.GraphCamera.prototype.constructor = THREE.GraphCamera;
THREE.GraphCamera.prototype.supr = THREE.Camera.prototype;


