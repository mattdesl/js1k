(window.onkeydown=function(){function a(a,n,r){return a+(n-a)*r}function n(a){return a*a*(3-2*a)}function r(r,t,o){r=A(r+p)*o,t=A(t)*o;var e=n(r-~~r),u=n(t-~~t),f=p-1,c=~~r&f,i=~~t&f,v=c+1&f,h=i+1&f,M=a(q[i*f+c],q[i*f+v],e),d=a(q[h*f+c],q[h*f+v],e);return a(M,d,u)}function t(a,n){var r=a-3,t=n-3,o=z(r*r+t*t);return o-10}function o(a,n,o){if(v=n,f=a*a+n*n+o*o,i=r(a,o,.05)+.1*r(a,o,.5),H=0,f>p*p)v=x=0,h=M=d=0,H=1;else{v=n-90*i,i=2*r(a,o,1)-1,h=.3+i/2,M=.2+i/2,d=.1+i/5;var e=A(a%50)-25,u=A(o%100)-50,c=t(e,u);v>c&&(v=c,h=M=d=.5*(r(a,n,.8)+.5*r(a,n,2)))}return v}function e(a,n,r){var t=.01;s=o(a+t,n,r)-o(a-t,n,r),m=o(a,n+t,r)-o(a,n-t,r),w=o(a,n,r+t)-o(a,n,r-t),g=z(s*s+m*m+w*w),0!=g&&(s/=g,m/=g,w/=g)}function u(n,r,t){var o=z(n*n+r*r+t*t);n/=o,r/=o,t/=o;var e=1-Math.exp(.004*-o),u=n*C+r*F+t*G;u=Math.pow(Math.max(0,u),2);var f=a(.5,0,u),c=a(.6,0,u),i=a(.7,0,u);h=a(h,f,e),M=a(M,c,e),d=a(d,i,e)}var f,i,v,h,M,d,s,m,w,g,k,p=256,l=0,x=0,y=40*p,D=c.createImageData(p,p),I=D.data,q=[],j=0,z=(Math.sin,Math.sqrt),A=Math.abs,B=180,C=1,F=3,G=1,H=0,J=z(C*C+F*F+G*G);for(C/=J,F/=J,G/=J,b.style.background="#000",l=0;p*p>l;l++)q[l]=a(.7,.5,Math.random());for(j+=.02,l=0;p*p-y>l;l++){var K=l%p/p,L=1-~~(l/p)/p,N=2*K-1+.5,O=2*L-1.5,P=-1.25,Q=z(N*N+O*O+P*P),R=-10,S=150,T=150,U=R,V=S,W=T;for(h=M=d=0,N/=Q,O/=Q,P/=Q,x=0,E=1;B>x;x++){if(o(U,V,W),Q=v,.01>Q){e(U,V,W),k=s*C+m*F+w*G,0>k&&(k=0),k>1&&(k=1),o(U,V,W),h*=k,M*=k,d*=k,1==H&&(h=M=d=L/100);break}U+=N*Q,V+=O*Q,W+=P*Q}u(U-R,V-S,W-T),h+=.05,d+=.02,M+=.04,I[4*l]=255*h,I[4*l+1]=255*M,I[4*l+2]=255*d,I[4*l+3]=255}c.putImageData(D,0,0)})();