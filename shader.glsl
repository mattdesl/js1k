precision lowp float;

uniform float T;

void main( void ) {
	vec2 fc = gl_FragCoord.xy;
	vec2 p = fc / 256.;
	
	vec3 ray_dir = vec3(p.xy*2.-1., .9);

	vec3 pos = ray_dir;
	pos.z -= 15.5;
// ray_dir = normalize(ray_dir);		
	
	vec3 color = vec3(.0);
	float dist;
	float j;
	float time = T;
	for( float i = 0.; i < 20.; i += 1. ) {		
		float a = time/4.+.01*pos.y;
		
		//twist deform
		float c = cos(a);
    	float s = sin(a);
    	mat2  m = mat2(c,-s,s,c);
		
		//here we repeat the content, lerping from one plane to another
		vec3 q = abs(1.-mod(vec3(m*mix(pos.xz, pos.xy, abs(sin(time/5.))),pos.y),2.));
		
		//here is where we model the tori and intersect them with a sphere
		dist = max(length(vec2(length(q.xz)-(sin(time)/2.+.5),q.y))-.4, length(pos)-10.5);

	   	j = i;
		if(abs(dist)<.005) 
			break;		
		pos += ray_dir * dist;
	}
	
	//determine our color, with vignette
	color = vec3(j/40.) * (1.-length(p-.5)) * 1.4;

	//some noise
	color += fract(sin(dot(p, vec2(12.9,78.2))) * 43758.5)*.15;
	
	//scanlines
	if (mod( fc.x+fc.y, 6. ) > 2. )
		color *= .9;

	gl_FragColor = vec4(vec3(color),1.);
}





		//original box model:
		// dist = max(length(vec2(length(q.xz)-1.2,q.y))-.5, length(max(abs(q)-1., 0.)));

		// dist = length(vec2(length(q.xz)-(sin(T)/2.+.5),q.y))-.4;
		
		// dist += length(pos)-.5;
		//a regular sphere in the centre
		// dist = max(dist, length(pos)-.4+sin(T)/8.);	

		//abs(1.-mod(pos,2.0));
		//dist = max(dist, length( abs(1.-mod(pos,2.)) )-.5);
		//dist = length(max(abs(mod(q, 2.)-.5*2.)-1., 0.0));
