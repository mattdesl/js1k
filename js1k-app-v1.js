

// var noise = btoa(b.innerHTML).split('', sz*sz).map(function(x, i) { return x.charCodeAt()/255; });


// var l = ['normal','multiply','screen','overlay','darken','lighten','color-dodge','color-burn','hue','hard-light','soft-light','difference','exclusion','hue','color','saturation','luminosity'];


// var s=256,
//     M=s-1,
//     n=s,
//     //A big array of random floats
//     $=b.innerHTML.split('',s).map(Math.random),
    // //Lerp
    // L=function(s,n,$){return s+(n-s)*$},
    // //SmoothStep
    // S=function(t){return t*t*(3-2*t)},
//     k=0,
//     i=0;

// for ( ; i<n*n; i++) {
//     //this is px,py which is passed into noise func
//     var x = ~~(i/n),
//         y = i%n;

//     //get fractional part, then remap with smoothstep
//     var sx = S(x-~~x),
//         sy = S(y-~~y);



//     var r = 1;

//     //for debugging
//     c.fillRect(~~x,y,r,r);
// }




// The abbreviation loop, initializing the variabled needed by the key-handlers on the side.
// for(p in c) 
//   c[p[0]+(p[6]||'')]=c[p];


// c.createImageData()


var s = 512, 
    n = s;
var o = a.cloneNode(),
    x = o.getContext("2d"),
    d=0,
    i=0,
    k=0,
    r=0,
    T=0,
    F=[],
    RND=Math.random,
    Q=Math.sin,
    R=Math.sqrt,
    A=Math.abs,
    //mix/lerp
    M=function(s,n,$){return s+(n-s)*$},
    //SmoothStep
    S=function(t){return t*t*(3-2*t)};


for (; k<4; n/=2, k++) {
    o.width=o.height=n;
    for (i=0; i<n*n; r=RND()*.4, i++)
        x.fillRect( i%n, ~~(i/n), r, 1);
    c.drawImage(o,0,0,s/2,s/2);
}

//The 0..255 noise is now in the image data, every 3rd component.
//For simplicity's sake we can put that into a flat array in range 0..1
n=[];
s/=2; //reduce our size back to normal
//r is now the ImageData
r=c.getImageData(0,0,s,s);
//d is the pixel data
d=r.data;

// a.width=a.height=s;
// a.style.width=a.style.height=s*2+'px';

for(i=0; i<s*s; i++) {
    // n[i]=d[i*4+3]/255;
    n[i]=M(0.7,0.5,Math.random());
    // F[i]=RND()*.6;
    // d[i*4+3]=0;//////FOR DEBUGGING... to clear the pixels
}

//not really needed..
c.clearRect(0,0,s,s);

setInterval(function() {
    T+=.02;
    //for each pixel
    for (i=0; i<s*s; i++) {

        var y = ~~(i/s),
            x = i%s
            u = x/s,
            v = 1-y/s;
        // if (x*y%2==0)
        //     continue;

        //determine ray direction & position
        var rdx = (u*2-1) - Q(T)/8,
            rdy = (v*2-1 - 0.5),
            rdz = (-1.0 * 1.15),
            L = R(rdx*rdx+rdy*rdy+rdz*rdz), //length of ray dir
            px = Q(T)*50, //ray position
            py = 90,
            pz = 150+Q(Q(T))*20,

            RD=0, B=0, //color channels
            X, Y, H, //for our noise
            D=0, //ray marched distance; TODO: optimize this var out, replace with x or o
            N=150, //number of steps
            color=0; //current pixel color

        // rdx/=L; //normalize the direction. we can get away without this actually..
        // rdy/=L;
        // rdz/=L;

        for (k=0,E=1; k<N; k++) {
            //calculate our distance field now..
            D = py;

            X = A((px+100)*0.05);
            Y = A(pz*0.05);
            var len = R(px*px+py*py+pz*pz),
                tx = S(X - ~~X),
                ty = S(Y - ~~Y),
                m = (s-1),
                E=1,
                rx0 = ~~X & m,
                ry0 = ~~Y & m,
                rx1 = (rx0+1) & m,
                ry1 = (ry0+1) & m,
                nx0 = M( n[ry0*m+rx0], n[ry0*m+rx1], tx ),
                nx1 = M( n[ry1*m+rx0], n[ry1*m+rx1], tx ),
                nn = M(nx0, nx1, ty);
            
            if (len > 300) {
                D = 0;
                B = py/200+pz/600;
                RD = nn/2;
            } else {
                H = nn*90;
                D = py - H;
                E = nn*3;
            }

            if (D < .5) {
                color = k/N;
                break;
            }

            px += rdx * D;
            py += rdy * D;
            pz += rdz * D;
        }

        color *= 2.5*E;
        d[i*4] = RD*255;
        d[i*4+2] = B*255;
        d[i*4+3] = (1-color)*255;
    }

    // console.log(x);
    c.putImageData(r,0,0);
},45);



// function dist( px, py, pz, tx, ty, tz )
// {   
//     var dx = px-tx,
//         dy = pz-ty,
//         len = R(dx*dx+dy*dy);
//     return len-tz;
// }
// console.log("generating raymarch");

// for(i=0; i<s*s; i++) {
    // var y = ~~(i/s),
    //     x = i%s,
    //     u = x/s,
    //     v = y/s;

//     //ray direction & origin
//     var rdx = u,
//         rdy = v - 0.5,
//         rdz = -1,
//         rox = -20,
//         roy = 20,
//         roz = 100,

//         //get rid of this normalization
//         L = R(rdx*rdx+rdy*rdy+rdz*rdz),
//         C=0, //color
//         D=0, //distance
//         N=40,//steps
//         off=0; //offset


//     rdx/=L;
//     rdy/=L;
//     rdz/=L;

//     // //Raymarch
//     for (k=0; k<N; k++) {
//         var px = rox + rdx*off,
//             py = roy + rdy*off,
//             pz = roz + rdz*off;

//         D = py - n[ ~~(px+(py*s))%n.length ] * 50;
//         // D = dist(px,py,pz, 3, 1, 10);

//         //D = py-n[(px+(pz*s))%n.length]*10;
//         off += D;
//         C = k;
//         if ( Math.abs(D)<0.00001 ) break;
//     }

//     //fill in our color for this pixel
//     d[i*4+3] = C/N*255;
// }


/*
for (;i<size*size*4;i+=4) {
    // v = (i%24 == 0) ? size : 0;

    //u,v coordinates in 0-255 range
    //Works well because our output needs to be in same range
    var y = ~~(i/size/4),
        x = i/4 - size * y;
    
    var u = x/size,
        v = y/size;


    var rdx = u,
        rdy = v - 0.5,
        rdz = -1,
        rox = -20 + sin(time*0.1)*10,
        roy = 5 +sin(time*0.1)*10.,
        roz = 100;

    var len = sqrt(rdx*rdx+rdy*rdy+rdz*rdz);
    // rdx/=len;
    // rdy/=len;
    // rdz/=len;

    var d = 0, color = 0;

    var steps = 40,
        offs = 0;

    // //Raymarch
    for (j=0; j<steps; j++) {
        var px = rox + rdx*offs,
            py = roy + rdy*offs,
            pz = roz + rdz*offs;

        d = repeat(px, py, pz, 1,1,1, 1, 5, 5);
        offs += d;
        color = j;
        if ( Math.abs(d)<0.000001) break;

        // var px = 

        // var dist = 
    }

    pix[i+3] = color/steps*255;
    // pix[i+3] = dist(0,0,0,u,1-v)*255;
}*/



//we can now safely manipulate R since we've copied the noise





/*
for (var layer=0; layer<8; layer++) {
    n/=2;
    o.width=n;
    o.height=n;

    //draw to off-screen buffer 
    for (var i=0, r; i<n*n; r=Math.random()*.1, i++) {
        // x.fillStyle = 'hsl(360,0%,'+(r*100)+'%)';
        x.setFillColor(r);

    }



    c.setCompositeOperation('lighter');
    c.drawImage(o, 0, 0, s, s);
}*/




// c.globalCompositeOperation='overlay';

//draw noise texture to main buffer
// c.drawImage(a2, 0, 0, sz, sz);

// c.drawImage(a2, 0, 0, sz, sz);


    // <canvas id="c"></canvas>
    //     <script>
    //         var a = document.getElementsByTagName('canvas')[0];
    //         var b = document.body;
    //   var d = function(e){ return function(){ e.parentNode.removeChild(e); }; }(a);
    //   // unprefix some popular vendor prefixed things (but stick to their original name)
    //   var AudioContext =
    //     window.AudioContext ||
    //     window.webkitAudioContext;
    //   var requestAnimationFrame =
    //     window.requestAnimationFrame ||
    //     window.mozRequestAnimationFrame ||
    //     window.webkitRequestAnimationFrame ||
    //     window.msRequestAnimationFrame ||
    //     function(f){ setInterval(f, 1000/30); };
    //   // stretch canvas to screen size (once, wont onresize!)
    //   a.style.width = (a.width = innerWidth) + 'px';
    //   a.style.height = (a.height = innerHeight) + 'px';

    //   var c = a.getContext('2d');
    //     </script>

/*
var sz = 100, dbl = sz*2, e0=4, e1=dbl-e0, s=btoa(b.innerHTML), i=0, t, Q=Math.sin, lmx=0;

var tx=0,ty=0;
var time = 0, mx=0,my=0;

a.onmousemove = function(ev) {
    mx=ev.pageX;
    my=ev.pageY;
};

setInterval(function() {
    //surely there is a nicer way of clearing the canvas...
    c.clearRect(0,0,a.width,a.height);
    b.style.background = '#bca574';
    a.style.opacity = 0.8;
    

    // time+=.15;
    
    time++;
    
    //draw the script..
    for (i=0; i<sz*sz; t=s.charCodeAt(i%s.length), i++) {
        var x = i/sz*2,
            y = i%sz*2,
            z = 0,
            dx = mx-tx-x,
            dy = my-ty-y;

        var alpha = 1, cs, sn;
        //edge tear
        if (x<=e0||x>=e1||y<=e0||y>=e1) 
            alpha = Math.sin(t)*1.5;
        alpha += (dx*dx+dy*dy) / (sz*sz/8) * 0.05;



        rot=Q(time/10+(y/sz*4))/8;
        cs = Q(rot+8);
        sn = Q(rot);

        //rotate X axis
        // x -= sz/2;
        // y -= sz/2;
        y = y*cs - z*sn;
        z = z*cs + y*sn;
        // x += sz/2;
        // y += sz/2;
        
        rot=Q(time/12)/4;
        cs = Q(rot+8);
        sn = Q(rot);

        //rotate Y axis
        x -= sz;
        y -= sz;
        x = x*cs - z*sn;
        z = z*cs + x*sn;


        x = x*cs-y*sn;
        y = y*cs+x*sn;
        x += sz;
        y += sz;


        var scl = 1000/(1000+z);
        x = x + dbl/2 * scl;
        y = y + dbl/2 * scl;

        // if ((x*y)%10>8)
        c.fillRect(x, y, t/70*alpha, t/90*alpha);
        // if (i%1==0)
        // c.fillRect(x, y, t/70*alpha, t/90*alpha);
    }
}, 30);
// a.onmousemove({pageX:sz,pageY:sz});
*/


/*
var sz = 128, dbl = sz*2;
a.onmousemove = function(ev) {
    c.fillStyle="#b49656";
    c.clearRect(0,0,dbl,dbl);
    c.fillStyle="#000";
    //draw the script..
    for (var i=0, s=btoa(b.innerHTML), t; i<sz*sz; t=s.charCodeAt(i%s.length), i++) {
        var x = i/sz*2,
            y = i%sz*2,
            midy = y-sz/8;
        // var alpha = ((x*x+midy*midy)/sz/2)/sz/2;
        var alpha = 1;
        c.fillRect(x, y, t/70*alpha, t/90*alpha);

    }  
}();*/



//  ~~(i/size/4),
// x = i/4 - size * y;

    // img.data[i] = s.charCodeAt(i%s.length)

// c.putImageData(img, 0, 0);


// console.dir(a);



// var rndStr = btoa(b.innerHTML);
// console.log(rndStr);

/*
var time = 0,
    sqrt = Math.sqrt,
    sin = Math.sin;

// function dist(px, py, pz, tx, ty) {
//     var qx = sqrt(px*px+pz*pz)-tx;
//     return sqrt(qx*qx+py*py) - ty;
// }

function dist( px, py, pz, tx, ty, tz )
{   
    var dx = px-tx,
        dy = pz-ty,
        len = sqrt(dx*dx+dy*dy);
    return len-tz;
}

function repeat(px,py,pz, cx,cy,cz, tx,ty,tz) {
    var qx = px%cx - 0.5 * cx,
        qy = py%cy - 0.5 * cy,
        qz = pz%pz - 0.5 * cz;
    return dist(qx, py, pz, tx,ty,tz)
}

setInterval(function() { //replace with str eval
    var size = 256,
        hsize = size/2,
        i=0, j=0, 
        data = c.createImageData(size,size),
        pix = data.data,
        v; //maybe another way around this

    time+=0.1;



//TODO: reverse the loop
    for (;i<size*size*4;i+=4) {
        // v = (i%24 == 0) ? size : 0;

        //u,v coordinates in 0-255 range
        //Works well because our output needs to be in same range
        var y = ~~(i/size/4),
            x = i/4 - size * y;
        
        var u = x/size,
            v = y/size;


        var rdx = u,
            rdy = v - 0.5,
            rdz = -1,
            rox = -20 + sin(time*0.1)*10,
            roy = 5 +sin(time*0.1)*10.,
            roz = 100;

        var len = sqrt(rdx*rdx+rdy*rdy+rdz*rdz);
        // rdx/=len;
        // rdy/=len;
        // rdz/=len;

        var d = 0, color = 0;

        var steps = 40,
            offs = 0;

        // //Raymarch
        for (j=0; j<steps; j++) {
            var px = rox + rdx*offs,
                py = roy + rdy*offs,
                pz = roz + rdz*offs;

            d = repeat(px, py, pz, 1,1,1, 1, 5, 5);
            offs += d;
            color = j;
            if ( Math.abs(d)<0.000001) break;

            // var px = 

            // var dist = 
        }

        pix[i+3] = color/steps*255;
        // pix[i+3] = dist(0,0,0,u,1-v)*255;
    }

    c.putImageData(data,0,0);
}, 300);
*/



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