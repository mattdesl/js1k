// console.log(a);

var s = 256,
    H = ~~(Math.random()*360),
    L = ~~(Math.random()*100)/2,
    t = 0;

var mouseX, mouseY;

window.onmousemove = function(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    // console.log(mouseX);
}

function R() {
    var i = s*s,
        x, y;
    
    t+=0.01;

    //resize our canvas back to normal
    //This also clears the canvas
    a.style.cssText=a.width=a.height=s;
    
    


    // c.beginPath();
    // c.arc(50, 50, 25, Math.PI*2, 0);
    // // console.log(mouseX)
    // c.stroke();
    // c.strokeStyle = c.isPointInPath(mouseX, mouseY) ? "red" : "blue";
    
    x = s/2;
    y = s/4;

    c.moveTo(x, y);
    var l = 5;
    c.quadraticCurveTo(x+50/4, y+Math.sin(t)*5, x+50, y);
    // c.bezierCurveTo(x+Math.sin(t), y+Math.sin(t),
    //                 x+Math.sin(t)*10, y+Math.sin(t)*10,
    //                 x+10, y+10);
    c.stroke();
    requestAnimationFrame(R);
};








// "rgb(255,255,255)"
// "hsl(0,0%,"+~~(c*100)+"%)"

// c.fillStyle="hsl(0,0%,"+c+"%)";
// c.fillStyle="#"+Array(4).join( (r).toString(16) );

// console.log( (a = new Array(256).join(Math.random())) );
// console.log( b.innerHTML.split('',128).map(Math.random) );

R();
requestAnimationFrame(R);
// setInterval(R, .16);





//Dot shader effect
// while (i--) {
//     var y = i%s,
//         x = ~~(i/s),
//         u = x/s;

//     var n = 8*u;
//     c.fillStyle = "hsl("+H+",50%,"+L+"%)";
//     c.fillRect(x*4,y*4,n,n);
// }