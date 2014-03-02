with (g) {
    //not really that important, but gives a nicer background..
    b.style.background='#000';

    //some very well compressed setup code from p01 
    //here is our aliasing for WebGL context
    for(k in g) 
        g[k.match(/^..|[A-Z]|1f$/g).join('')] = g[k];
    
    //setup viewport and define S (shader) and s (size) variables...
    vi(
        0,
        S=0,
        s=256,
        a.style.cssText=(a.width=a.height=s));


    //uncomment for debugging shader errors
    for (p = crP(t=2); t; coS(S), (atS(p, S)  || console.log( "GL Error:", getError(), "\nShader Log:", getShaderInfoLog(S) ) )) {
        shS(S = crS(35634 - t), --t ? "precision mediump float;uniform float T;void main(void){vec2 a=gl_FragCoord.xy;vec2 b=a/256.;vec3 c=vec3(b.xy*2.-1.,.9);vec3 d=c;d.z-=15.5;vec3 e=vec3(.0);float f;float g;for(float h=0.;h<20.;h+=1.){float i=T/4.+.01*d.y;float j=cos(i);float k=sin(i);mat2 l=mat2(j,-k,k,j);vec3 m=abs(1.-mod(vec3(l*mix(d.xz,d.xy,abs(sin(T/5.))),d.y),2.));f=max(length(vec2(length(m.xz)-(sin(T)/2.+.5),m.y))-.4,length(d)-10.5);g=h;if(abs(f)<.005) break;d+=c*f;}e=vec3(g/40.)*(1.-length(b-.5))*1.4;e+=fract(sin(dot(b,vec2(12.9,78.2)))*43758.5)*.15;if(mod(a.x+a.y,6.)>2.) e*=.9;gl_FragColor=vec4(vec3(e),1.);}" : 'attribute vec4 p;void main(){gl_Position=p;}');
    }
    console.log( getShaderInfoLog(S) )
    console.log( "GL Error:", getError() );

    //setInterval leads to pretty brutal performance in Chrome
    D=function() { 
        requestAnimationFrame(D)
        drA(4, un1f(geUL(p,"T"),t+=.01), 3) 
        var e = getError();
        if (e)
            console.warn("GL Error:", e);
    }
    D(
        veAP(
            enVAA(
                biB(k = 34962, crB())
            ),   
            2,
            5126,
            liP(p),
            usP(p),
            buD(k, new Float32Array([1,1,1, -3, -3, 1]), k+82)
        )
    );
    var e = getError();
    if (e)
        console.warn("GL Error:", e);
}


/*
//de-obfuscated
with (g) {
    //setup viewport and define S (shader) and s (size) variables...
    viewport(
        0,
        S=0,
        s=512,
        a.style.cssText=a.width=a.height=s);

    //some very well compressed setup code from p01 
    for(k in g) 
        g[k.match(/^..|[A-Z]|1f$/g).join('')] = g[k];
        // console.log(k, '->', k.match(/^..|[A-Z]|1f$/g).join(''))
    
    //note the debugging console.log !!
    for (p = createProgram(t=2); t; compileShader(S), (attachShader(p, S) || console.log( getShaderInfoLog(S) ) )) {
        shaderSource(S = createShader(35634 - t), --t ? "precision lowp float;uniform float T;void main(void){vec2 a=gl_FragCoord.xy;vec2 b=a/256.;vec3 c=vec3(b.xy*2.-1.,.9);vec3 d=c;d.z-=15.5;vec3 e=vec3(.0);float f;float g;for(float h=0.;h<20.;h+=1.){float i=T/4.+.01*d.y;float j=cos(i);float k=sin(i);mat2 l=mat2(j,-k,k,j);vec3 m=abs(1.-mod(vec3(l*mix(d.xz,d.xy,abs(sin(T/5.))),d.y),2.));f=max(length(vec2(length(m.xz)-(sin(T)/2.+.5),m.y))-.4,length(d)-10.5);g=h;if(abs(f)<.005) break;d+=c*f;}e=vec3(g/40.)*(1.-length(b-.5))*1.4;e+=fract(sin(dot(b,vec2(12.9,78.2)))*43758.5)*.15;if(mod(a.x+a.y,6.)>2.) e*=.9;gl_FragColor=vec4(vec3(e),1.);}" : 'attribute vec4 p;void main(){gl_Position=p;}');
    }
    //debugging
    console.log( getShaderInfoLog(S) )
    
    // setInterval //optional since we render on mouse
    setTimeout((b.onmousemove=function(e) {

            drawArrays(4, e&&uniform2f(getUniformLocation(p,"M"),e.clientX,s-e.clientY), 3)
        }),
        vertexAttribPointer(
            enableVertexAttribArray(
                bindBuffer(k = 34962, createBuffer())
            ),   
            2,
            5126,
            linkProgram(p),
            useProgram(p),
            bufferData(k, new Float32Array([1,1,1, -3, -3, 1]), k+82)
        )
        // ||16 // <- the timer interval, leaving it as undefined leads to 60 FPS in chrome..
    );

    // console.log(getProgramInfoLog(p))
}*/
