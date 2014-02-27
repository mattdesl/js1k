precision lowp float;

uniform vec2 M;

float hash( vec2 n ) //Borrowed from voltage
{
    return fract(sin(n.x*n.y)*1e6);
}


void main( void ) {
	float R = .45;
	vec2 P = gl_FragCoord.xy/512. - .5;
	vec3 N = normalize( vec3(P.xy, sqrt(R*R - P.x*P.x - P.y*P.y)) );
	vec3 L = normalize( vec3(M.xy/512.-.5, .5) );
	float D = max(0., dot(N,L));

	vec3 C = mix(vec3(.8,.6,.5), vec3(0.2), .3*vec3(hash(gl_FragCoord.xy*.01))) * D;

	// vec3 C = mix(vec3(D), vec3(0.8, 0.6, 0.5), hash(gl_FragCoord.xy));
	gl_FragColor = vec4(C,1.0);
}