precision lowp float;

uniform float T;


void main( void ) {
	vec2 fc = gl_FragCoord.xy;
	vec2 p = fc/512.;
	float r = length(p*2.-1.);
	p -= .5;

	float theta = atan(p.y, p.x);
	float mask = smoothstep(.7, .69, r);
	float center = smoothstep(.95, .85, 1.-r);
	float modo = sin(r*5.6+sin(T*2.)*.1);
	
	float c = smoothstep(.5, .2, (sin(6.*theta+T)/2.+.5)*10.0 * center*modo);
	
	vec3 color = mix(vec3(.4,.1,.1), vec3(.7), mask*c);
	vec3 inner = mix(vec3(.2), vec3(.6, .4, .3), smoothstep(1.2, .5, r));
	color = mix(color, inner, r);

	//some noise
	color += fract(sin(dot(p, vec2(12.9,78.2))) * 43758.5)*.05;
	
	//scanlines
	if (mod( fc.x+fc.y, 6.0 ) > 2. )
		color *= 0.9;

	gl_FragColor = vec4(color, 1.);
}


// void main( void ) {
	
// 	float R = .45;
// 	vec2 P = gl_FragCoord.xy/512. - .5;
	// vec3 N = normalize( vec3(P.xy, sqrt(R*R - P.x*P.x - P.y*P.y)) );
	// vec3 L = normalize( vec3(M.xy/512.-.5, .5) );
	// float D = max(0., dot(N,L));

// 	vec3 C = mix(vec3(.8,.6,.5), vec3(0.2), .3*vec3(hash(M.y+gl_FragCoord.xy*.01))) * D;

// 	 // vec3 C = mix(vec3(D), vec3(0.8, 0.6, 0.5), hash(gl_FragCoord.xy));
// 	gl_FragColor = vec4(C,1.0);
// }   