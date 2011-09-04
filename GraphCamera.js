/**
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

THREE.GraphCamera = function ( fov, aspect, near, far ) {

	THREE.Camera.call( this, fov, aspect, near, far );

	// API

	this.mouseLook = true;
	this.autoForward = false;

	this.lookSpeed = 1;
	this.movementSpeed = 1;
	this.rollSpeed = 1;

	this.constrainVertical = [ -0.5, 0.5 ];

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

	var doRoll = false, rollDirection = 1, forwardSpeed = 0, sideSpeed = 0, upSpeed = 0;

	var mouseX = 0, mouseY = 0;
	
	var windowHalfX = window.innerWidth / 2;
	var windowHalfY = window.innerHeight / 2;

	// custom update

	this.update = function() {

		var now = new Date().getTime();

		if ( this.lastUpdate == -1 ) this.lastUpdate = now;
		
		this.delta = ( now - this.lastUpdate ) / 1000;
		this.lastUpdate = now;

		if ( this.mouseLook ) {

			var actualLookSpeed = this.delta * this.lookSpeed;

			this.rotateHorizontally( actualLookSpeed * mouseX );
			this.rotateVertically( actualLookSpeed * mouseY );

		}

		var actualSpeed = this.delta * this.movementSpeed;
		var forwardOrAuto = ( forwardSpeed > 0 || ( this.autoForward && ! ( forwardSpeed < 0 ) ) ) ? 1 : forwardSpeed;
		
		this.translateZ( actualSpeed * forwardOrAuto );
		this.translateX( actualSpeed * sideSpeed );
		this.translateY( actualSpeed * upSpeed );

		if( doRoll ) {
			
			this.roll += this.rollSpeed * this.delta * rollDirection;

		}
		
		// cap forward up / down
		
		if( this.forward.y > this.constrainVertical[ 1 ] ) {
			
			this.forward.y = this.constrainVertical[ 1 ];
			this.forward.normalize();
			
		} else if( this.forward.y < this.constrainVertical[ 0 ] ) {
			
			this.forward.y = this.constrainVertical[ 0 ];
			this.forward.normalize();
			
		}


		// construct unrolled camera matrix
	
		zTemp.copy( this.forward );
		yTemp.set( 0, 1, 0 );
	
		xTemp.cross( yTemp, zTemp ).normalize();
		yTemp.cross( zTemp, xTemp ).normalize();
	
		this.matrix.n11 = xTemp.x; this.matrix.n12 = yTemp.x; this.matrix.n13 = zTemp.x;
		this.matrix.n21 = xTemp.y; this.matrix.n22 = yTemp.y; this.matrix.n23 = zTemp.y;
		this.matrix.n31 = xTemp.z; this.matrix.n32 = yTemp.z; this.matrix.n33 = zTemp.z;
		
		
		// calculate roll matrix
	
		rollMatrix.identity();
		rollMatrix.n11 = Math.cos( this.roll ); rollMatrix.n12 = -Math.sin( this.roll );
		rollMatrix.n21 = Math.sin( this.roll ); rollMatrix.n22 =  Math.cos( this.roll );
	
	
		// multiply camera with roll
	
		this.matrix.multiplySelf( rollMatrix );
		this.matrixWorldNeedsUpdate = true;
	
		
		// set position
	
		this.matrix.n14 = this.position.x;
		this.matrix.n24 = this.position.y;
		this.matrix.n34 = this.position.z;
		
		
		// call supr

		this.supr.update.call( this );

	};
	
	this.translateX = function ( distance ) {
		
		this.position.x += this.matrix.n11 * distance;
		this.position.y += this.matrix.n21 * distance;
		this.position.z += this.matrix.n31 * distance;
		
	};
	
	this.translateY = function ( distance ) {
		
		this.position.x += this.matrix.n12 * distance;
		this.position.y += this.matrix.n22 * distance;
		this.position.z += this.matrix.n32 * distance;
		
	};

	this.translateZ = function ( distance ) {
	
		this.position.x -= this.matrix.n13 * distance;
		this.position.y -= this.matrix.n23 * distance;
		this.position.z -= this.matrix.n33 * distance;
	
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

		mouseX = ( event.clientX - windowHalfX ) / window.innerWidth;
		mouseY = ( event.clientY - windowHalfY ) / window.innerHeight;

	};
	
	this.onClick = function(event) { }

	function onMouseUp ( event ) {

		event.preventDefault();
		event.stopPropagation();

		switch ( event.button ) {

			case 0: forwardSpeed = 0; break;
			case 2: forwardSpeed = 0; break;

		}

	};
	
	this.domElement.addEventListener( 'contextmenu', function ( event ) { event.preventDefault(); }, false );

  var self = this;
	this.domElement.addEventListener( 'mousemove', onMouseMove, false );
	this.domElement.addEventListener( 'click', function(event) {
    self.onClick(event)
  }, false );	

};


THREE.GraphCamera.prototype = new THREE.Camera();
THREE.GraphCamera.prototype.constructor = THREE.RollCamera;
THREE.GraphCamera.prototype.supr = THREE.Camera.prototype;


