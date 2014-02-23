(window.onkeydown = function() {
    var s = 256,
        i=0,
        k=0,
        J=s*40, 
        r=c.createImageData(s,s),
        d=r.data,
        n=[],
        T=0,
        Q=Math.sin,
        R=Math.sqrt,
        A=Math.abs,
        Z,//magnitude of ray input point
        U,//noise value 
        D,RR,GG,BB,N=180, //values for our raymarcher
        nx,ny,nz,nl, //normals
        DIFF,
        Lx=1,
        Ly=3,
        Lz=1,
        SKY=0,
        Lm=R(Lx*Lx+Ly*Ly+Lz*Lz)
        ; 

    Lx/=Lm;
    Ly/=Lm;
    Lz/=Lm;

    //mix/lerp
    function M(s,n,t){return s+(n-s)*t};
    //SmoothStep
    function S(t){return t*t*(3-2*t)};

    b.style.background='#000';

    //fill an array with random values
    for(i=0; i<s*s; i++)
        n[i]=M(.7,.5,Math.random());

    //our 'noise' function.. not a very good one.
    function $(X, Y, k) {
        X = A(X+s)*k; //offset to avoid the tile seam in center
        Y = A(Y)*k;
        var tx = S(X - ~~X),
            ty = S(Y - ~~Y),
            m = s-1, //bit mask
            //smooth the random noise a little
            rx0 = ~~X & m,
            ry0 = ~~Y & m,
            rx1 = rx0+1 & m,
            ry1 = ry0+1 & m,
            nx0 = M( n[ry0*m+rx0], n[ry0*m+rx1], tx ),
            nx1 = M( n[ry1*m+rx0], n[ry1*m+rx1], tx );
        return M(nx0, nx1, ty);
    }

    function CY(px,pz) {
        var cx = px-3,
            cz = pz-3,
            clen = R(cx*cx+cz*cz);
        return clen-10;
    }

    function F(px,py,pz) {
        D = py;
        Z = px*px+py*py+pz*pz;
        U = $(px,pz,.05) + $(px,pz,.5)*.1;//+ $(px,pz,.8)*.1; 
        SKY=0;

        if (Z > s*s) {
            D = k = 0;
            RR = GG = BB = 0;
            SKY=1;
            // RR=BB=GG = py/10000;
            // BB+=pz/1e4;
        } else {
            D = py - U*90;

            U = $(px,pz,1)*2-1;
            RR = .3 + U/2;
            GG = .2 + U/2;
            BB = .1 + U/5;

            //modulo to repeat the columns
            // var REPEAT = 1;
            // var Mx = (px-REPEAT * ~~(px/REPEAT)) - 0.5 * REPEAT,
            //     Mz = (pz-REPEAT * ~~(pz/REPEAT)) - 0.5 * REPEAT,
            
            // var Mx = (px)-10,
            //     Mz = pz,
            //     cx = Mx-5,
            //     cz = Mz-5,
            //     clen = R(cx*cx+cz*cz)-5;

            var Mx = A(px%50)-25,
                Mz = A(pz%100)-50,
                clen = CY(Mx,Mz);

            if (clen < D) {
                D = clen;
                RR = GG = BB = ($(px,py,.8)+$(px,py,2)*.5)*.5;

                // D += Q(k%10000 * 0.01)*.1;
                //
            }

            //return length(p.xz-c.xy)-c.z;


            //fake some sparkle on the very tips
            // if (pz<50 && py+D*40>72) {
            //     RR = S(RR*2);
            //     GG = S(GG*1.75)*.95;
            //     BB = S(BB*1);
            // }             
        }
        return D;
    }

    //calculate normal of point
    function _(px,py,pz) {
        var e = 0.01;
        nx = F(px+e, py, pz) - F(px-e, py, pz);
        ny = F(px, py+e, pz) - F(px, py-e, pz);
        nz = F(px, py, pz+e) - F(px, py, pz-e);
        nl = R(nx*nx+ny*ny+nz*nz);
        if (nl==0)return;
        nx/=nl;
        ny/=nl;
        nz/=nl;
    }

    //fog
    function V(px,py,pz) {
        var len = R(px*px+py*py+pz*pz);
        //normalize
        px/=len;
        py/=len;
        pz/=len;

        var fogAmt = 1 - Math.exp(-len*0.004),
            //dot(ray, light)
            sunAmt = px*Lx + py*Ly + pz*Lz;

        sunAmt = Math.pow(Math.max(0,sunAmt), 2);
        var fx = M(.5, .0, sunAmt),//TODO: optimize these out
            fy = M(.6, .0, sunAmt),
            fz = M(.7, .0, sunAmt);
        RR = M(RR, fx, fogAmt);
        GG = M(GG, fy, fogAmt);
        BB = M(BB, fz, fogAmt);
    }

    T+=.02;
    
    //for each pixel
    for (i=0; i<s*s-J; i++) { //nobody's gonna notice a few missing pixels... 

        var u = i%s/s,
            v = 1-~~(i/s)/s;

        //determine ray direction & position
        var rdx = (u*2-1) + .5,
            rdy = (v*2-1.5),
            rdz = (-1.25),
            L = R(rdx*rdx+rdy*rdy+rdz*rdz), //length of ray dir
            px = -10, //original position
            py = 150,
            pz = 150,


            rpx = px, //current ray position
            rpy = py,
            rpz = pz

            ; 
        
        RR=GG=BB=0; //reset color

        rdx/=L; //normalize the direction. looks OK without it.
        rdy/=L;
        rdz/=L;
        
        for (k=0,E=1; k<N; k++) {
            //calculate our distance field now..
            F(rpx,rpy,rpz);         
            
            //store the distance since normal calc may change it
            L = D;
            if (L < .01) {
                //calculate the normal, which will be stored in nx,ny,nz
                _(rpx,rpy,rpz);

                //D will now be used for diffuse, N dot L 
                DIFF = nx*Lx + ny*Ly + nz*Lz;
                if (DIFF<0) DIFF=0; //clamp
                if (DIFF>1) DIFF=1;

                //this is ugly.. we do this to correct RGB.
                //It isn't really needed if we rework the global vars thing
                F(rpx,rpy,rpz);

                RR *= DIFF;
                GG *= DIFF;
                BB *= DIFF;

                if (SKY==1) {//sky
                    RR = GG = BB = v/100;
                }


                break;
            }
            //continue marching
            rpx += rdx * L;
            rpy += rdy * L;
            rpz += rdz * L;
        }

        V(rpx-px, rpy-py, rpz-pz);

        //color correction
        RR+=.05;
        BB+=.02;
        GG+=.04;

        //apply colors
        d[i*4] = RR*255;
        d[i*4+1] = GG*255;
        d[i*4+2] = BB*255;
        d[i*4+3] = 255;
    }
    c.putImageData(r,0,0);
    //requestAnimationFrame(G); //setInterval is slow in chrome  

})();
