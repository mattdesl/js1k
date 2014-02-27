
// "rgb(255,255,255)"
// "hsl(0,0%,"+~~(c*100)+"%)"

// c.fillStyle="hsl(0,0%,"+c+"%)";
// c.fillStyle="#"+Array(4).join( (r).toString(16) );

// var s = 256,
//     H = ~~(Math.random()*360),
//     L = ~~(Math.random()*100)/2,
//     t = 0;

// var mouseX, mouseY;

// window.onmousemove = function(e) {
//     mouseX = e.clientX;
//     mouseY = e.clientY;
//     // console.log(mouseX);
// }



(function() {
    var s = 512, t=0,
        fl = 1000, M=Math,
        PI=Math.PI, S=Math.sin;

    // console.log("B".charCodeAt(0))
    

    //mix/lerp
    function M(s,n,t){return s+(n-s)*t};

    var mesh = [], segments = 20, divs = 3;

    mesh.push({x:-1,y: -1,z: 1});
    mesh.push({x:-1,y:  1,z: 1});
    mesh.push({x: 1,y:  1,z: 1});
    mesh.push({x: 1,y: -1,z: 1});


    mesh.push({x:-2,y: -2,z: 2});
    mesh.push({x:-2,y:  2,z: 2});
    mesh.push({x: 2,y:  2,z: 2});
    mesh.push({x: 2,y: -2,z: 2});

    // for (var seg=0; seg<divs; seg++)
    //     for (var t=0, angle=0, step=PI*2/segments; t<segments; t++, angle+=step) 
    //         mesh.push( S(8+angle), seg/divs, S(angle) )

        //x and y
        // mesh.push( Math.random(), Math.random(), 0 );
    



    function R() {
        var i = s*s,
            x, y, z,
            xx,yy,zz,
            cs = Math.cos(t),
            sn = Math.sin(t);
            
        t+=0.005;

        //resize our canvas back to normal
        //This also clears the canvas
        a.style.cssText=a.width=a.height=s;


        for (var i=0; i<mesh.length; i++) {
            x = mesh[i].x*1;
            y = mesh[i].y*1;
            z = mesh[i].z*1;

            t = 0.01;
            // cs = Math.cos(t);
            // sn = Math.sin(t);

            // // rotate X
            // mesh[i].x = y * cs - z * sn;
            // mesh[i].z = z * cs + y * sn;
                        
            cs = Math.cos(t);
            sn = Math.sin(t);
            //rotate Y
            mesh[i].x = x * cs - z * sn;
            mesh[i].z = z * cs + x * sn;    

            x = mesh[i].x; 
            y = mesh[i].y;
            z = mesh[i].z;
            z += 1000;

            // console.log(mesh)
            // break;
            var scale = fl / (fl + z) * 100;
            x = s/2 + x * scale;
            y = s/2 + y * scale;
            
            c.lineTo(x,y);

            if ((i+1)%4==0) {
                if (i>0) {
                    c.closePath();
                    c.stroke();
                }
                c.beginPath();
                c.fillStyle = 'blue';
            } else
                c.fillStyle = 'red';

            c.fillRect(x, y, 4, 4);
        }

        // for (j=0; j<mesh.length; j+=4) {
        //     c.beginPath();
        //     for (var i=8; i>=0; i-=2)
        //         c.lineTo(mesh[j+i], mesh[j+i+1]);
        //     // c.lineTo(mesh[j], mesh[j+1]);
        //     // c.lineTo(mesh[j+2], mesh[j+3]);
        //     c.closePath();
        //     c.fill();

        //     // c.fillRect(mesh[j], mesh[j+1], 4, 4);
        //     // c.fillRect(mesh[j+2], mesh[j+3], 4, 4);
        // }


        // for (var i=0; i<s*s; i++) {
        //     var y = i%s,
        //         x = ~~(i/s),
        //         r = (RAND.charCodeAt(i%RAND.length)&255)/128;
            



        //     // r = Math.random();
        //     c.fillRect(x, y, r, r);
        // }
        
        requestAnimationFrame(R);
    };
    R();
})();
// requestAnimationFrame(R);

//Dot shader effect
// while (i--) {
//     var y = i%s,
//         x = ~~(i/s),
//         u = x/s;

//     var n = 8*u;
//     c.fillStyle = "hsl("+H+",50%,"+L+"%)";
//     c.fillRect(x*4,y*4,n,n);
// }