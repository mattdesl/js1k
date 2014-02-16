
var Rectangle = require('minimath').Rectangle;
var World = require('knit.js').World;

var Constraint = require('knit.js').Constraint;
var PointMass = require('knit.js').PointMass;

var rand = require('minimath').random;
var dist = require('minimath').distance;
var lerp = require('minimath').lerp;
var smoothstep = require('minimath').smoothstep;

var domready = require('domready');
var ImageBuffer = require('imagebuffer');

require('raf.js');
var Cloth = require('./Cloth');
var CanvasRenderer = require('./CanvasRenderer');
var WebGLRenderer = require('./WebGLRenderer');

var stats = require('./stats');

var dat = require('dat-gui');


var canvas = document.createElement("canvas");
canvas.width = 400;
canvas.height = 400;
var context = canvas.getContext("2d");

var img = new Image();
img.src = 'img/coach.jpg';

function start() {
    requestAnimationFrame(render);
}

function render() {
    requestAnimationFrame(render);
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(img, 0, 0);
}

domready(start);