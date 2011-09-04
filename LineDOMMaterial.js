/**
 * @author mr.doob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 *
 * parameters = {
 *  color: <hex>,
 *  opacity: <float>,
 
 *  blending: THREE.NormalBlending,
 *  depthTest: <bool>,
 
 *  linewidth: <float>,
 *  linecap: "round",  
 *  linejoin: "round",
 
 *  vertexColors: <bool>
 * }
 */

THREE.LineDOMMaterial = function (domElement, parameters)
{
	THREE.Material.call( this, parameters );

  this.domElement = domElement;
	parameters = parameters || {};

	this.color = parameters.color !== undefined ? new THREE.Color( parameters.color ) : new THREE.Color( 0xffffff );
	this.linewidth = parameters.linewidth !== undefined ? parameters.linewidth : 1;

  this.domElement.style.backgroundColor = this.color.getContextStyle();
  this.domElement.style.height = this.linewidth + "px";
};

THREE.LineDOMMaterial.prototype = new THREE.Material();
THREE.LineDOMMaterial.prototype.constructor = THREE.LineDOMMaterial;
