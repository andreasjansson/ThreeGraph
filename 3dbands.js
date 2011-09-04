// Javascript library basic 3d rendering using text.
// v0.1a
//
// Copyright (C) 2007  W. Xavier Snelgrove
// 
// This program is free software; you can redistribute it and/or
// modify it under the terms of the GNU General Public License
// as published by the Free Software Foundation; either version 2
// of the License, or (at your option) any later version.
// 
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
// 
// You should have received a copy of the GNU General Public License
// along with this program; if not, write to the Free Software
// Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
//
// http://www.wxs.ca/gpl.txt

var PHI = 1.61803398874989484820458683;
var PHI_INV = 1/PHI;


// This function multiplies a 4x4 matrix by a 4x1 vector
function multV(m,v0,v1,v2,v3) 
{
    // Initialize the result vector.
    var result = new Array(3);
    
    // Perform the multiplication
    result[0] = m[0][0]*v0 + m[0][1]*v1 + m[0][2]*v2 + m[0][3]*v3;
    result[1] = m[1][0]*v0 + m[1][1]*v1 + m[1][2]*v2 + m[1][3]*v3;
    result[2] = m[2][0]*v0 + m[2][1]*v1 + m[2][2]*v2 + m[2][3]*v3;
    result[3] = m[3][0]*v0 + m[3][1]*v1 + m[3][2]*v2 + m[3][3]*v3;
    return result;
}

// This function multiplies two 4x4 matrices
function mult(m1, m2) 
{
    //Initialize the result matrix
    var result = new Array(4);
    for (var i = 0; i<4;i++) {
        result[i] = new Array(4);
    }
    
    // Perform the multiplication.
    for(var i = 0; i < 3; i++){
        result[i][0] = m1[i][0] * m2[0][0] + m1[i][1] * m2[1][0] + m1[i][2] * m2[2][0] + m1[i][3] * m2[3][0];
        result[i][1] = m1[i][0] * m2[0][1] + m1[i][1] * m2[1][1] + m1[i][2] * m2[2][1] + m1[i][3] * m2[3][1];
        result[i][2] = m1[i][0] * m2[0][2] + m1[i][1] * m2[1][2] + m1[i][2] * m2[2][2] + m1[i][3] * m2[3][2];
        result[i][3] = m1[i][0] * m2[0][3] + m1[i][1] * m2[1][3] + m1[i][2] * m2[2][3] + m1[i][3] * m2[3][3];
    }
    return result;
}

// This funciton returns the identity matrix
function identity() 
{
    return [[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]];
}


// This class will represent a single stand-alone renderer.
function JS3D(renderDiv, maxZ) 
{    

    // The div in which all will be drawn.
    this.rField=document.getElementById(renderDiv);
    
    // xCut is the maximum displayable z value.
    if (maxZ) this.maxZ = maxZ;
    else this.maxZ = 0;
    // Find the coordinates of the canvas thing.
    this.xPos = this.rField.style.left.substring(0,this.rField.style.left.indexOf("px"));
    this.yPos = this.rField.style.top.substring(0,this.rField.style.left.indexOf("px"));
    
    this.width = this.rField.style.width.substring(0,this.rField.style.width.indexOf("px"));
    this.height = this.rField.style.height.substring(0,this.rField.style.height.indexOf("px"));
    
    this.resetMatrix();
    
    // This array will contain all the points to be drawn.
    this.points = new Array();
}

JS3D.prototype.resetMatrix = function() 
{
    // translate the axes to the center of the canvas.
    this.matrix = identity();
    this.matrix = this.translate(this.width/2,this.height/2,0);
}

JS3D.prototype.rotateX = function(angle,m) 
{
    if(!m) m = this.matrix;
    var c = Math.cos(angle);
    var s = Math.sin(angle);
    return mult(m,[[1, 0, 0, 0],[0, c, -s, 0],[0, s, c, 0],[0, 0, 0, 1]]);
}

JS3D.prototype.rotateY = function(angle,m) 
{
    if(!m) m = this.matrix;
    var c = Math.cos(angle);
    var s = Math.sin(angle);
    return mult(m,[[c, 0, s, 0],[0, 1, 0, 0],[-s, 0, c, 0],[0, 0, 0, 1]]);
}

JS3D.prototype.rotateZ = function(angle,m) 
{
    if(!m) m = this.matrix;
    var c = Math.cos(angle);
    var s = Math.sin(angle);
    return mult(m,[[c, -s, 0, 0],[s, c, 0, 0],[0, 0, 1, 0],[0, 0, 0, 1]]);
}

JS3D.prototype.scale = function(scaleX,scaleY,scaleZ,m) 
{
    if(!m) m = this.matrix;
    return mult(m,[[scaleX,0,0,0],[0,scaleY,0,0],[0,0,scaleZ,0],[0,0,0,1]]);
}


JS3D.prototype.translate = function(dX, dY, dZ,m) 
{
    if(!m) m = this.matrix;
    return mult(m,[[1,0,0,dX],[0,1,0,dY],[0,0,1,dZ],[0,0,0,1]]);
}

JS3D.prototype.addPoint = function(x,y,z,text,m) 
{
    if(!m) m=identity();
    var v = multV(m,x,y,z,1);
    var l = this.points.length;
    this.points[l]=new Point(v[0],v[1],v[2],text);
    this.rField.appendChild(this.points[l].div);
    return this.points[l];
}

JS3D.prototype.addPointV = function(v,text) 
{
    this.addPoint(v[0],v[1],v[2],text);
}

JS3D.prototype.clearPoints = function() 
{
    for (var i = 0; i <this.points.length; i++) {
        this.rField.removeChild(this.points[i].div);
    }
    this.points.length=0;
}

JS3D.prototype.drawPoint = function(index) 
{
    // The transformed position of this point.
    var tPoint = multV(this.matrix,this.points[index].x,this.points[index].y,this.points[index].z,this.points[index].W);
    if (tPoint[0] < 0 ||
        tPoint[0] > this.width ||
        tPoint[1] < 0 ||
        tPoint[1] > this.height ||
        tPoint[2] >= this.maxZ) {
        this.points[index].div.style.visibility = "hidden";
        return;
    }
    this.points[index].div.style.visibility = "visible";
    this.points[index].div.style.left=tPoint[0]+"px";
    this.points[index].div.style.top=tPoint[1]+"px";
    this.points[index].div.style.fontSize =5000/(-tPoint[2])+"px";
}

// This function paints each point onto the screen.
JS3D.prototype.paint = function() 
{
    for(var i = 0; i<this.points.length; i++) {
        this.drawPoint(i);
    }
}

// Draws a line from the given point to the next.
JS3D.prototype.addLine = function(x1,y1,z1,x2,y2,z2,num,text,m) 
{
    if(!text) text="*";
    if(!m) m=identity();
    var dx = x2-x1;
    var dy = y2-y1;
    var dz = z2-z1;
    var length = Math.sqrt(dx*dx+dy*dy+dz*dz);
    for(var i = 0; i <= num; i++) {
        var px = x1+dx*i/num;
        var py = y1+dy*i/num;
        var pz = z1+dz*i/num;
        this.addPoint(px,py,pz,text,m);
    }
}


function Point(x, y, z, text) 
{
    this.x = x;
    this.y = y;
    this.z = z;
    this.W = 1;
    
    this.div = document.createElement("div");
    if(text) this.div.innerHTML = text;
    else this.div.innerHTML = "*";
    this.div.style.position = "absolute";
    this.div.style.fontSize = "10px";
    this.div.style.fontFamily = "times";
}
