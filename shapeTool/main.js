var domready = require('domready');

var Vector2 = require('vecmath').Vector2;

var canvas,
    context,
    width = 256,
    height = 256;

var paths = [],
    currentPath = [],
    mouseX = 0,
    mouseY = 0,
    tmp2 = new Vector2(),
    tmp = new Vector2(),
    nearestIndex = -1,
    nearestStartIndex = -1,
    textBox = null,
    snapping = true;

window.addEventListener("mousedown", function(ev) {
    var x = ev.clientX,
        y = ev.clientY;

    
    //snap to nearest index...
    if (snapping && nearestIndex !== -1) {
        x = paths[nearestIndex].x;
        y = paths[nearestIndex].y;
    }

    if (ev.shiftKey || ev.which > 1) {
        //if we are making path, delete it.
        if (currentPath.length > 0) {
            currentPath = [];
            ev.preventDefault();
        } 
        //if we are not making a path, delete the point under cursor
        else if (nearestStartIndex !== -1) {
            paths.splice(nearestStartIndex, 3);
        }
    } else if (currentPath.length < 2) { 
        //starting or continuing a path
        currentPath.push( new Vector2(x, y) );
    } else if (currentPath.length >= 2) {
        //finishing a path, ready to turn it into a quadratic
        //curve and push it onto our stack of total paths.
        currentPath.push( new Vector2(x, y) );

        findControlPoint(currentPath[0], currentPath[1], currentPath[2], tmp);

        paths.push(currentPath[0], tmp.clone(), currentPath[2]);

        currentPath = [];
    }

    updateOutput();
}, false); 

function findNearest(x, y) {
    tmp.set(x, y);
    var radius = 12;
    var minDist = radius*radius;
    var nearestIndex = -1;

    for (var i=0; i<paths.length; i++) {
        var dist = paths[i].distanceSq(tmp);

        if (dist < minDist) {
            nearestIndex = i;
            minDist = dist;
        }
    }
    return nearestIndex;
}

window.addEventListener("mousemove", function(ev) {
    mouseX = ev.clientX;
    mouseY = ev.clientY;
}, false);

function updateOutput() {
    var out = [];
    for (var i=0; i<paths.length; i++) {
        var p = paths[i];
        out.push((~~p.x ), (~~p.y));
    }
    textBox.value = JSON.stringify(out, undefined, ' ');
}

function start() {
    canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    document.body.appendChild(canvas);
    document.body.style.margin = "0";

    canvas.style.cursor = "none";
    canvas.style.background = "#d6d6d6";

    canvas.addEventListener('contextmenu', function(ev) {
        ev.preventDefault();
    }, false);

    context = canvas.getContext("2d");


    textBox = document.createElement("textarea");
    document.body.appendChild(textBox);
    textBox.rows = 20;
    textBox.cols = 30;
    textBox.style.position = "absolute";
    textBox.style.top = "0";
    


    requestAnimationFrame(render);
}

function point(x, y, alpha, fill, radius) {
    context.fillStyle = fill || "#3d3d3d";
    context.globalAlpha = typeof alpha === "number" ? alpha : 1.0;
    context.beginPath();
    context.arc(x, y, radius || 3, 0, Math.PI*2);
    context.fill();
}

function render() {
    requestAnimationFrame(render);

    context.clearRect(0, 0, width, height);

    nearestIndex = findNearest(mouseX, mouseY);
    nearestStartIndex = nearestIndex===-1 ? nearestIndex : (Math.floor( nearestIndex / 3 ) * 3);
    //draw all curves
    
    for (var i=0; i<paths.length; i+=3) {
        
        context.strokeStyle = i === nearestStartIndex ? 'green' : 'black';
        context.globalAlpha = 1.0;
        context.beginPath();
        context.moveTo(paths[i].x, paths[i].y);
        context.quadraticCurveTo(paths[i+1].x, paths[i+1].y, paths[i+2].x, paths[i+2].y);
        context.stroke();
        if (i===nearestStartIndex) {
            point(paths[i].x, paths[i].y, 0.85, 'green');
            point(paths[i+2].x, paths[i+2].y, 0.85, 'green');
        }
    }
    

    //draw example of current path...
    if (currentPath.length === 1) {
        context.beginPath();
        context.moveTo(currentPath[0].x, currentPath[0].y);
        context.lineTo(mouseX, mouseY);
        context.strokeStyle = 'black';
        context.globalAlpha = 0.5;
        context.stroke();
    } else if (currentPath.length === 2) {
        context.beginPath();
        context.moveTo(currentPath[0].x, currentPath[0].y);

        //
        findControlPoint(currentPath[0], currentPath[1], tmp2.set(mouseX, mouseY), tmp);
        context.quadraticCurveTo(tmp.x, tmp.y, mouseX, mouseY);
        context.strokeStyle = 'black';
        context.globalAlpha = 0.5;
        context.stroke();
    }
        
    
    //draw current path as points
    for (var i=0; i<currentPath.length; i++) {
        var p = currentPath[i];
        point(p.x, p.y, 0.5);
    }

    //draw cursor
    point(mouseX, mouseY, 1.0, undefined, 5);
}




domready(start);





//this could really be cleaned up with 'vecmath' lib
function findControlPoint(s1, s2, s3, out) 
{ 
    var s1x = s1.x, 
        s1y = s1.y, 
        s2x = s2.x, 
        s2y = s2.y, 
        s3x = s3.x, 
        s3y = s3.y;

    //http://www.benknowscode.com/2012/10/drawing-curves-with-html5-canvas_8123.html
    //unit vector s3 - s1
    var ax = s3x - s1x;
    var ay = s3y - s1y;
    var lenA = Math.sqrt(ax * ax + ay * ay);
    if (lenA !== 0) {
        ax /= lenA;
        ay /= lenA;
    }

    //unit vector s2 - s1
    var bx = s2x - s1x;
    var by = s2y - s1y;
    var lenB = Math.sqrt(bx * bx + by * by);
    if (lenB !== 0) {
        bx /= lenB;
        by /= lenB;
    }

    //dot product
    var k = ax * bx + ay * by;

    //project s2 onto s1, s3
    var px = s1x + ax * k * lenB;
    var py = s1y + ay * k * lenB;

    //s2 - p
    var dx = s2x - px;
    var dy = s2y - py;
    var lenD = Math.sqrt(dx * dx + dy * dy);
    if (lenD !== 0) {
        dx /= lenD;
        dy /= lenD;
    }

    // Midpoint
    var mx = (s1x+s3x)/2;
    var my = (s1y+s3y)/2;
    
    // Control point on s2, p
    var cpmx = s2x + dx * lenD;
    var cpmy = s2y + dy * lenD;

    // Translate based on distance from midpoint
    var tx = px - mx;
    var ty = py - my;
        
    out = out || new Vector2();

    out.x = cpmx+tx;
    out.y = cpmy+ty;
}