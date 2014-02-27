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

var p = [];

for ()


function R() {
    var i = s*s,
        x, y;
    
    t+=0.01;

    //resize our canvas back to normal
    //This also clears the canvas
    a.style.cssText=a.width=a.height=s;
    
    


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