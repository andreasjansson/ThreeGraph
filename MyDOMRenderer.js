/**
 * @author mr.doob / http://mrdoob.com/
 */

THREE.MyDOMRenderer = function () {

	var _renderList = null,
	_projector = new THREE.Projector(),
	_div = document.createElement( 'div' ),
	_width, _height, _widthHalf, _heightHalf;

	this.domElement = _div;

	this.setSize = function ( width, height ) {

		_width = width; _height = height;
		_widthHalf = _width / 2; _heightHalf = _height / 2;

	};

	this.render = function ( scene, camera ) {

		var e, el, m, ml, element, material, dom, v1x, v1y;

		_renderList = _projector.projectScene( scene, camera );

		for ( e = 0, el = _renderList.length; e < el; e++ ) {

			element = _renderList[ e ];

			if ( element instanceof THREE.RenderableParticle ) {

				v1x = element.x * _widthHalf + _widthHalf; v1y = element.y * _heightHalf + _heightHalf;

				for ( m = 0, ml = element.materials.length; m < ml; m++ ) {

					material = element.materials[ m ];

					if ( material instanceof THREE.ParticleDOMMaterial ) {

						dom = material.domElement;

            var fontSize = element.z > .9999 ? 0 :
              Math.round(Math.min(1, 1 - (element.z * 100 - 99)) * 120);

            dom.style.fontSize = fontSize + "px";
						dom.style.left = (v1x - (dom.innerText.length * fontSize / 3)) + 'px';
						dom.style.top = (v1y - fontSize / 2) + 'px';
					}
				}
			}
      else if(element instanceof THREE.RenderableLine) {

				for ( m = 0, ml = element.materials.length; m < ml; m++ ) {

					material = element.materials[ m ];

					if ( material instanceof THREE.LineDOMMaterial ) {

				    _v1 = element.v1;
            _v2 = element.v2;

				    _v1.positionScreen.x *= _widthHalf;
            _v1.positionScreen.y *= _heightHalf;
				    _v2.positionScreen.x *= _widthHalf;
            _v2.positionScreen.y *= _heightHalf;

	          var _bboxRect = new THREE.Rectangle();
				    _bboxRect.addPoint( _v1.positionScreen.x, _v1.positionScreen.y );
				    _bboxRect.addPoint( _v2.positionScreen.x, _v2.positionScreen.y );

            var _clipRect = new THREE.Rectangle();
		        _clipRect.set( - _widthHalf, - _heightHalf, _widthHalf, _heightHalf );

						dom = material.domElement;
				    if ( _clipRect.instersects( _bboxRect ) ) {

              var x1 = _v1.positionScreen.x + _widthHalf;
              var y1 = _v1.positionScreen.y + _heightHalf;
              var x2 = _v2.positionScreen.x + _widthHalf;
              var y2 = _v2.positionScreen.y + _heightHalf;

		          if (x2 < x1)
		          {
			          var temp = x1;
			          x1 = x2;
			          x2 = temp;
			          temp = y1;
			          y1 = y2;
			          y2 = temp;
		          }
		          var length = Math.sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2));

			        var angle = Math.atan((y2-y1)/(x2-x1));
			        dom.style.top = y1 + 0.5 * length * Math.sin(angle) + "px";
			        dom.style.left = x1 - 0.5 * length * (1 - Math.cos(angle)) + "px";
              dom.style.width = length + "px";
			        dom.style.mozTransform = dom.style.webkitTransform = dom.style.OTransform = "rotate(" + angle + "rad)";
            }
            else {
              dom.style.width = 0;
            }
					}
				}
      }
		}
	};
}
