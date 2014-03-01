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
    for (p = crP(t=2); t; coS(S), (atS(p, S)  /*|| console.log( getShaderInfoLog(S) )*/ )) {
        shS(S = crS(35634 - t), --t ? <%= frag %> : 'attribute vec4 p;void main(){gl_Position=p;}');
    }
    //console.log( getShaderInfoLog(S) )

    //setInterval leads to pretty brutal performance in Chrome
    D=function() { 
        requestAnimationFrame(D)
        drA(4, un1f(geUL(p,"T"),t+=.01), 3) 
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
        shaderSource(S = createShader(35634 - t), --t ? <%= frag %> : 'attribute vec4 p;void main(){gl_Position=p;}');
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
