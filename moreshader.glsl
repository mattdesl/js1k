precision lowp float;

uniform float time;
uniform vec2 resolution;

/*
float hash( float n )
{
	return fract(sin(n)*43758.5453);
}

float noise( in vec2 x )
{
	vec2 p = floor(x);
	vec2 f = fract(x);
    	f = f*f*(3.0-2.0*f);
    	float n = p.x + p.y*57.0;
    	float res = mix(mix( hash(n+  0.0), hash(n+  1.0),f.x), mix( hash(n+ 57.0), hash(n+ 58.0),f.x),f.y);
    	return res;
}

float fbm( vec2 p )
{
    	float f = 0.0;
    	f += 0.50000*noise( p ); p = p*2.02;
    	f += 0.25000*noise( p+time ); p = p*2.03;
    	f += 0.12500*noise( p+time/2.0 ); p = p*2.01;
    	f += 0.06250*noise( p); p = p*2.04;
    	f += 0.03125*noise( p );
    	return f/0.984375;
}*/

// vec2 rotate(in vec2 v, in float a) {
// 	return vec2(cos(a)*v.x + sin(a)*v.y, -sin(a)*v.x + cos(a)*v.y);
// }

// vec3 hsv(in float h, in float s, in float v) {
// 	return mix(vec3(1.0), clamp((abs(fract(h + vec3(3, 2, 1) / 3.0) * 6.0 - 3.0) - 1.0), 0.0 , 1.0), s) * v;
// }

// // These are all equally interesting, but I could only pick one :(
// float F(vec3 p)
// {
// 	return abs(length(p.xz)-0.05)-0.1;
// }

float hash( float n )
{
	return fract(sin(n)*43758.5453);
}

float noise( in vec2 x )
{
	vec2 p = floor(x);
	vec2 f = fract(x);
    	f = f*f*(3.0-2.0*f);
    	float n = p.x + p.y*57.0;
    	float res = mix(mix( hash(n+  0.0), hash(n+  1.0),f.x), mix( hash(n+ 57.0), hash(n+ 58.0),f.x),f.y);
    	return res;
}

float fbm( vec2 p )
{
    	float f = 0.0;
    	f += 0.50000*noise( p ); p = p*2.02;
    	f += 0.25000*noise( p+time ); p = p*2.03;
    	f += 0.12500*noise( p+time/2.0 ); p = p*2.01;
    	f += 0.06250*noise( p); p = p*2.04;
    	f += 0.03125*noise( p );
    	return f/0.984375;
}

void main( void ) {
	vec2 p = gl_FragCoord.xy / resolution.xy;
	float T = time;
	
	
	//vec3 ray_dir = vec3( (p.xy), - 1.);

	//ray_dir.xy = ray_dir.xy*2.-1.;
	vec3 dir = normalize(vec3(sin(T/4.), .5, 1.0));

	vec3 ray_dir = vec3(0.0);
	ray_dir.x += (p.x*2.-1.);
	ray_dir.y += (p.y*-2.+1.);
	ray_dir.z += 0.85;
	
	//ray_dir.x += sin(T)/2.;
	ray_dir.y += sin(T/4.)/4.;
	

	//vec3 ray_dir = vec3(dir.x*(p.x*2.-1.), dir.y*(p.y*2.-.1)*(resolution.x/resolution.y), dir.z);
	
	vec3 pos = vec3(sin(-T)/2., sin(-T/2.)/4., -5.0) + ray_dir ;
	ray_dir = normalize(ray_dir);	
	
	vec3 color = vec3(1.0);
	float dist;
	float j;
	for( float i = 0.0; i < 15.0; i += 1.0 ) {
	
		vec3 cur = (1.-mod(vec3(pos),2.0));
		
		// dist = length(max(abs(cur)-0.5,0.0))-0.0001;
		
		cur = pos;
		cur.y *= smoothstep(.5, .0, cur.y*0.5);
		dist = length(cur)-0.5;
		
	   	j = i;
		if(abs(dist)<0.01) {
			break;
		}
		
		pos += ray_dir * dist;
	}
	
	// vec3(length(p-.5)
	//color = hsv(clamp(pos.z*0.01, .55, .7) + .4, j/100., j/50.);
	//color = mix( vec3(0.0), vec3(0.8, 0.9, 0.5) * 1.-(j/50.0), smoothstep(0.9, 0.5, length(p-0.5)));
	// float c=j/50.0;
	gl_FragColor=vec4(1.-vec3(j/50.0), 1.0);
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