with(g){viewport(0,S=0,s=512,a.style.cssText=a.width=a.height=s);for(k in g)g[k.match(/^..|[A-Z]|2f$/g).join("")]=g[k];for(p=crP(t=2);t;coS(S),atS(p,S)||console.log(getShaderInfoLog(S)))shS(S=crS(35634-t),--t?"precision lowp float;uniform vec2 M;float a(vec2 b){return fract(sin(b.x*b.y)*1e6);}void main(void){float c=.45;vec2 d=gl_FragCoord.xy/512.-.5;vec3 e=normalize(vec3(d.xy,sqrt(c*c-d.x*d.x-d.y*d.y)));vec3 f=normalize(vec3(M.xy/512.-.5,.5));float g=max(0.,dot(e,f));vec3 h=mix(vec3(.8,.6,.5),vec3(0.2),.3*vec3(a(gl_FragCoord.xy*.01)))*g;gl_FragColor=vec4(h,1.0);}":"attribute vec4 p;void main(){gl_Position=p;}");console.log(getShaderInfoLog(S)),setTimeout(b.onmousemove=function(o){drA(4,o&&un2f(geUL(p,"M"),o.clientX,s-o.clientY),3)},veAP(enVAA(biB(k=34962,crB())),2,5126,liP(p),usP(p),buD(k,new Float32Array([1,1,1,-3,-3,1]),k+82)))}