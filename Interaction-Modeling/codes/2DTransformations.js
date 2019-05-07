"use strict";

var canvas;
var gl;

var vBuffer, vertices;
var vPosition;
var transformationMatrix, transformationMatrixLoc;

var colorLoc;
var program;

var circle_colorArray = { r: 0, g: 0, b: 1 }
var rectengle_colorArray = { r: 1, g: 0, b: 0 }

var numberOfVertex = 12;
var x_radius = 0.4;
var y_radius = 0.2;
var a = 0.05;
var transformation_x = 0, transformation_y = 0, scale_x = 0.5, scale_y = 0.5, ROTATION = 0;

window.onload = function init() {
    canvas = document.getElementById("gl-canvas");

    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) { alert(" WebGL isn't available"); }

    //  Configure WebGL
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(1.0, 1.0, 1.0, 1.0);

    //  Load shaders and initialize attribute buffers
    program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    // Make the geometry   
    createPoints();

    function radian(degree) {

        var rad = (degree / numberOfVertex) * 2.0 * Math.PI;
        return rad;

    }

    function createPoints() {

        vertices = [];

        // Create vertices for CIRCLE
        for (var i = 0; i < numberOfVertex; i++) {

            vertices.push(vec2(x_radius * Math.cos(radian(i)),
                y_radius * Math.sin(radian(i)))
            );
        }
        // Create vertices for RECTENGLE
        vertices.push(vec2(0, 0.05));
        vertices.push(vec2(0, 0));
        vertices.push(vec2(0.05, 0));
        vertices.push(vec2(0.05, 0.05));

        // Load the data into the GPU
        vBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);

        // Associate out shader variables with our data buffer
        vPosition = gl.getAttribLocation(program, "vPosition");
        gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(vPosition);

    }

    transformationMatrixLoc = gl.getUniformLocation(program, "transformationMatrix");

    document.getElementById("inp_objX").oninput = function (event) {
        transformation_x = event.srcElement.value;
    };
    document.getElementById("inp_objY").oninput = function (event) {
        transformation_y = event.srcElement.value;
    };
    document.getElementById("inp_obj_scaleX").oninput = function (event) {
        scale_x = event.srcElement.value;
        console.log(scale_x);
    };
    document.getElementById("inp_obj_scaleY").oninput = function (event) {
        scale_y = event.srcElement.value;
    };
    document.getElementById("inp_rotation").oninput = function (event) {
        ROTATION = event.srcElement.value;
    };
    document.getElementById("redSlider1").oninput = function (event) {
        circle_colorArray.r = event.srcElement.value;
    };
    document.getElementById("greenSlider1").oninput = function (event) {
        circle_colorArray.g = event.srcElement.value;
    };
    document.getElementById("blueSlider1").oninput = function (event) {
        circle_colorArray.b = event.srcElement.value;
    };
    document.getElementById("redSlider2").oninput = function (event) {
        rectengle_colorArray.r = event.srcElement.value;
    };
    document.getElementById("greenSlider2").oninput = function (event) {
        rectengle_colorArray.g = event.srcElement.value;
    };
    document.getElementById("blueSlider2").oninput = function (event) {
        rectengle_colorArray.b = event.srcElement.value;
    };
    document.getElementById("theta1").onclick = function (event) {
        numberOfVertex = 101;
        createPoints();
    };
    document.getElementById("theta2").onclick = function (event) {
        numberOfVertex = 36;
        createPoints();
    };
    document.getElementById("theta3").onclick = function (event) {
        numberOfVertex = 18;
        createPoints();
    };
    document.getElementById("theta4").onclick = function (event) {
        numberOfVertex = 12;
        createPoints();
    };
    document.getElementById("theta5").onclick = function (event) {
        numberOfVertex = 6;
        createPoints();
    };
    document.getElementById("xrSlider").oninput = function (event) {
        x_radius = event.srcElement.value;
        createPoints();
    };
    document.getElementById("yrSlider").oninput = function (event) {
        y_radius = event.srcElement.value;
        createPoints();
    };

    render();

};

function render() {

    var mvStack = [];
    const offset = 0;

    gl.clear(gl.COLOR_BUFFER_BIT);
    colorLoc = gl.getUniformLocation(program, "color");

	/* A triangle and a rectangle is drawn in this example.
	Your job is to draw the shape described in the HW.
	In this example, transformationMatrix is just identity matrix.
	You have to change it to apply necessary transformations.*/

    transformationMatrix = mat4();

    transformationMatrix = mult(transformationMatrix, translate(transformation_x, transformation_y, 0));
    transformationMatrix = mult(transformationMatrix, rotate(ROTATION, 0, 0, 1));
    transformationMatrix = mult(transformationMatrix, scalem(scale_x, scale_y, 0));


    mvStack.push(transformationMatrix);
    gl.uniform4fv(colorLoc, vec4(circle_colorArray.r, circle_colorArray.g, circle_colorArray.b, 1.0));
    gl.uniformMatrix4fv(transformationMatrixLoc, false, flatten(transformationMatrix));
    gl.drawArrays(gl.TRIANGLE_FAN, offset, numberOfVertex);

    gl.uniform4fv(colorLoc, vec4(rectengle_colorArray.r, rectengle_colorArray.g, rectengle_colorArray.b, 1.0));
    transformationMatrix = mvStack.pop();
    mvStack.push(transformationMatrix);
    transformationMatrix = mult(transformationMatrix, translate(0, y_radius, 0));
    transformationMatrix = mult(transformationMatrix, rotate(45, 0, 0, 1));
    gl.uniformMatrix4fv(transformationMatrixLoc, false, flatten(transformationMatrix));
    gl.drawArrays(gl.TRIANGLE_FAN, numberOfVertex, 4);

    gl.uniform4fv(colorLoc, vec4(rectengle_colorArray.r, rectengle_colorArray.g, rectengle_colorArray.b, 1.0));
    transformationMatrix = mvStack.pop();
    mvStack.push(transformationMatrix);
    transformationMatrix = mult(transformationMatrix, translate(0, -y_radius, 0));
    transformationMatrix = mult(transformationMatrix, rotate(-135, 0, 0, 1));
    gl.uniformMatrix4fv(transformationMatrixLoc, false, flatten(transformationMatrix));
    gl.drawArrays(gl.TRIANGLE_FAN, numberOfVertex, 4);

    gl.uniform4fv(colorLoc, vec4(rectengle_colorArray.r, rectengle_colorArray.g, rectengle_colorArray.b, 1.0));
    transformationMatrix = mvStack.pop();
    mvStack.push(transformationMatrix);
    transformationMatrix = mult(transformationMatrix, translate(x_radius, 0.0, 0));
    transformationMatrix = mult(transformationMatrix, rotate(-45, 0, 0, 1));
    gl.uniformMatrix4fv(transformationMatrixLoc, false, flatten(transformationMatrix));
    gl.drawArrays(gl.TRIANGLE_FAN, numberOfVertex, 4);

    gl.uniform4fv(colorLoc, vec4(rectengle_colorArray.r, rectengle_colorArray.g, rectengle_colorArray.b, 1.0));
    transformationMatrix = mvStack.pop();
    mvStack.push(transformationMatrix);
    transformationMatrix = mult(transformationMatrix, translate(-x_radius, 0, 0));
    transformationMatrix = mult(transformationMatrix, rotate(135, 0, 0, 1));
    gl.uniformMatrix4fv(transformationMatrixLoc, false, flatten(transformationMatrix));
    gl.drawArrays(gl.TRIANGLE_FAN, numberOfVertex, 4);

    window.requestAnimFrame(render);
}
