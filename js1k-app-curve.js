var time = 0;
var dragon = require('./dragon1.js');

setInterval(function() { //replace with str eval
    var size = 256,
        hsize = size/2,
        i=0, j=0, dstep=0,
        sqrt = Math.sqrt,
        sin = Math.sin,
        v; //maybe another way around this

    time+=0.1;

    // a.width=a.width;
    c.clearRect(0,0,size,size);

    var t = 0;


        // for (; t<dragon.length; t+=6) {
        //     c.strokeStyle = 'black';
        //     c.beginPath();
        //     c.moveTo(dragon[t], dragon[t+1]);
        //     c.quadraticCurveTo(dragon[t+2], 
        //                     dragon[t+3],
        //                     dragon[t+4],
        //                     dragon[t+5]);
        //     c.stroke();
        // }
        


        c.fillStyle = "black";
        for (; dstep<dragon.length; dstep+=6) {
            var x1=dragon[dstep],
                y1=dragon[dstep+1],
                x2=dragon[dstep+2],
                y2=dragon[dstep+3],
                x3=dragon[dstep+4],
                y3=dragon[dstep+5];

            if (dstep > dragon.length/2) {
                //hardcode..
                x2 += sin(time)*10;
                y2 += sin(time)*10;
            }

            var steps = 10;
            for (j=0; j<steps; j++) {
                var t = j/(steps-1),
                    dt = 1-t,
                    dtSq = dt*dt,
                    tSq = t*t;
                
                //quadratic curve
                var cx = (dtSq * x1 + 2 * dt * t * x2 + tSq * x3);
                var cy = (dtSq * y1 + 2 * dt * t * y2 + tSq * y3);

                // debugger;
                // return;
                c.fillRect(cx,cy,2,2);
            }
        }

        
}, 1e3/60);




/*//////raymarching

        //// RAY ORIGIN
        //right   * u + up      * v
        //[1,0,0] * u + [0,1,0] * v;
        //[u,0,0]     + [0,v,0]
        // => [u,v,0]
        //rox = u,
        //roy = v,
        //roz = 0

        //// RAY DIRECTION
        //normalize( cross(right, up) )
        // up => [0, 1, 0]
        // var ax = right.x, ay = right.y, az = right.z,
        // bx = up.x, by = up.y, bz = up.z;
        // out.x = ay * bz - az * by;
        // out.y = az * bx - ax * bz;
        // out.z = ax * by - ay * bx;
        
        //TODO: optimize
        var ax = u, ay = v, az = 0,
            bx = 0, by = 1, bz = 0,
            rdx = ay * bz - az * by,
            rdy = az * bx - ax * bz,
            rdz = ax * by - ay * bx;

        var len = sqrt(rdx*rdx+rdy*rdy+rdz*rdz);
        rdx/=len;
        rdy/=len;
        rdz/=len;

        var d = 0, color = 0;
        //Raymarch
        for (f=0; j<size; j++) {
            //p = ro + rd * f
            //px = rox + rdx * f
            //py = roy + rdy * f
            //pz = roz + rdy * f
            var px = u + rdx * f,
                py = v + rdy * f,
                pz = rdz * f;

            //length of p
            len = sqrt(px*px+py*py+pz*pz) - 0.5;
            
            if (len < 1e-4) {
                color = 128;
                break;
            }

            //1e-4
            f += d;
        }
*/


/*// var raf = requestAnimationFrame;
// var w = a.width, h = a.height,
//     midx = w/2, midy = h/2,
//     bez = c.bezierCurveTo;






var p = require('./dragon1');
// var rnd = Math.random;
var t = 0;
var times = 0;

function rnd(k) { 
    // debugger;
    var x = Math.sin((k+times)) * 10000;
    return p[k] + (x - ~~x) * 4;
}

function r() {
    raf(r);

    // c.clearRect(0,0,w, h);
    
    //background.. might remove
    c.fillStyle = c.createRadialGradient(midx,midy,0,midx,midy,w);
    c.fillStyle.addColorStop(0,'#ad9781');
    c.fillStyle.addColorStop(1,'#171410');
    c.fillRect(0, 0, w, h);


    c.strokeStyle = 'black';
    // var k = p.length; 
    //TODO: hardcode length
    c.fillStyle = 'black';

    c.lineWidth = 2;

    
    t += 0.1;
    

    times = 6;
    while (times--) {
        

        var k = p.length;
        while ((k-=6) >= 0) {
            c.globalAlpha = Math.sin(k*times)/2+0.5;
            
            c.beginPath();
            c.moveTo( rnd(k+0), rnd(k+1));
            c.quadraticCurveTo(rnd(k+2), rnd(k+3), 
                                rnd(k+4), rnd(k+5));
            c.stroke();
        }
    }
    

    // var cnt = 0;
    // for (var y=-10; y<10; y++) {
    //     for (var x=-10; x<10; x++, cnt++) {
    //         var radius = Math.sqrt(x*x+y*y);
    //         var th = Math.atan2(y,x);

    //         radius = 2 + 2 * Math.cos(2 * th);
    //         radius *= 50;

    //         if (y<0 && x<0 || x>0&&y>0)
    //             continue;

    //         var cx = radius * Math.sin(th) + w/2;
    //         var cy = radius * Math.cos(th) + h/2;
    //         c.fillRect(cx, cy, 2, 2);
    //     }
    // }
    
}
raf(r);*/