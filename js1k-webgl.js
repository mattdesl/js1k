

// The abbreviation loop, initializing the variabled needed by the key-handlers on the side.


// for (p in g) {
//     g[i++] = g[p];
//     //g[p[0]+(p[6]||'')]=g[p];

//     if (typeof g[p] === "function")
//         console.log(p, '->', i) //p[0]+(p[6]||''));
// }
// console.log(g[20])


var fs = require('fs');

var F = fs.readFileSync(__dirname+'/shader.glsl', 'utf8'); 
// console.log(F);
with (g) {
    // var F = 'uniform lowp float t; void main(){ lowp float b = 0.0; gl_FragColor=vec4(1.0,0.0,0.0,1.0); }';
    

    //optional
    // var s = 512;

    var X,Y;
    

    //setup viewport and define S (shader) and s (size) variables...
    viewport(
        0,
        S=0,
        s=512,
        a.style.cssText=a.width=a.height=s);

    //some very well compressed setup code from p01 
    for(k in g) 
        g[k.match(/^..|[A-Z]|1f$/g).join('')] = g[k];
    for (p = createProgram(t=2); t; compileShader(S), (attachShader(p, S) || console.log( getShaderInfoLog(S) ) )) {
        shaderSource(S = createShader(35634 - t), --t ? F : 'attribute vec4 p;void main(){gl_Position=p;}');
    }
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
}

/*
//compressed
with (g) {
    var F = 'uniform lowp float t; void main(){gl_FragColor=vec4(1.0,0.0,0.0,1.0);}';

    var s = 256, S;
    a.style.cssText=a.width=a.height=s;

    //some very well compressed setup code from p01 
    for(k in g) 
        g[k.match(/^..|[A-Z]|1f$/g).join('')] = g[k];
    for (p = crP(t=2); t; coS(S), atS(p, S)) 
        shS(S = crS(35634 - t), --t ? F : 'attribute vec4 p;void main(){gl_Position=p;}');
    setInterval('g.drA(4,g.un1f(g.geUL(p,"t"),t+=0.1),3)',
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
        // ||16 // <- the timer interval, leaving it as undefined leads to 60 FPS in chrome..
    );
}*/

/*
//de-obfuscated
with (g) {
    var s = 256, S, k;

    a.style.cssText=a.width=a.height=s;

    //some very well compressed setup code from p01 
    for (p = createProgram(t=2); t; compileShader(S), attachShader(p, S)) 
        shaderSource(S = createShader(35634 - t), --t ? F : 'attribute vec4 p;void main(){gl_Position=p;}');
    
    setInterval('g.drawArrays(4,g.uniform1f(g.getUniformLocation(p,"t"),t+=0.1),3)',
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
}*/