#ifdef GL_ES
precision mediump float;
#endif

uniform float time;
uniform vec2 mouse;
uniform vec2 resolution;

//@mattdesl - first attempts at raymarching, W.I.P. 

float sdTorus( vec3 p, vec2 t )
{
  vec2 q = vec2(length(p.xz)-t.x,p.y);
  return length(q)-t.y;
}

float sdFloor(vec3 p, vec3 b) {
  return length(max(abs(p)-b,0.0));
}

float sdCylinder( vec3 p, vec3 c )
{
  return length(p.xz-c.xy)-c.z;
}

vec2 rotate(in vec2 v, in float a) {
	return vec2(cos(a)*v.x + sin(a)*v.y, -sin(a)*v.x + cos(a)*v.y);
}

vec3 hsv(in float h, in float s, in float v) {
	return mix(vec3(1.0), clamp((abs(fract(h + vec3(3, 2, 1) / 3.0) * 6.0 - 3.0) - 1.0), 0.0 , 1.0), s) * v;
}


float torus(in vec3 p, in vec2 t)
{
	vec2 q = abs(vec2(max(abs(p.x), abs(p.z))-t.x, p.y));
	return max(q.x, q.y)-t.y;
}


// These are all equally interesting, but I could only pick one :(
float trap(in vec3 p)
{
	//return abs(max(abs(p.z)-0.1, abs(p.x)-0.1))-0.01;
	//return length(max(abs(p.xy) - 0.05, 0.0));
	//return length(p)-0.5;
	//return length(max(abs(p) - 0.35, 0.0));
	//return abs(length(p.xz)-0.2)-0.01;
	//return abs(min(torus(vec3(p.x, mod(p.y,0.4)-0.2, p.z), vec2(0.1, 0.05)), max(abs(p.z)-0.05, abs(p.x)-0.05)))-0.005;
	//return abs(min(torus(p, vec2(0.3, 0.05)), max(abs(p.z)-0.05, abs(p.x)-0.05)))-0.005;
	return min(length(p.xz), min(length(p.yz), length(p.xy))) - 0.05;
}

float map(in vec3 p)
{
	float cutout = dot(abs(p.yz),vec2(0.5))-0.035;
	float road = max(abs(p.y-0.025), abs(p.z)-0.035);
	
	vec3 z = abs(1.0-mod(p,2.0));
	//z.yz = rotate(z.yz, 0.05);

	float d = 999.0;
	float s = 1.0;
	for (float i = 1.0; i < 2.0; i++) {
		//z.xz = rotate(z.xz, radians(i*10.0));
		z.zy = rotate(z.yz, radians((i+1.0)*20.0*1.1234));
		z = abs(1.0-mod(z+i/3.0,2.0));
		
		z = z*2.0 - .8;
		s *= 0.5;
		d = trap(z) * s;
		//d = min(1., trap(z) * s);
	}
//	z = z * 2.0 - 0.8;
//	d = trap(z)*0.5;
	
	return d;
}
void main()
{


	vec2 p = gl_FragCoord.xy / resolution;
	

	
	vec3 ray_dir = normalize( vec3( p.xy - .5, - 1.) );
//	ray_dir.z -= time*0.00005;
	vec3 pos = ray_dir + time*0.05;
	vec3 color = vec3(1.0);
	float dist;
	float j;
	for( float i = 0.0; i < 50.0; i += 1.0 ) {
		vec3 c = vec3(100.0,100.0,100.0);
		vec3 q = mod(pos,c)-0.5*c;
		
		
		vec3 z = abs(1.-mod(pos,2.0));
//		z.yz = rotate(z.yz, 1.0*0.5);
		z.xz = rotate(z.xz, 2.0);
		z.zy = rotate(z.yz, 0.5);
		dist = trap(z*2.-.8) * 0.5;
		
		z.yz = rotate(z.yz, 0.0);
		z.xz = rotate(z.xz, 2.0);
		z.zy = rotate(z.yz, 0.5);
		dist = min(dist, length(max(abs(z*3.0) - 0.35, 0.0)) * 0.25);
		
//		dist = min(0.6*(length(z)-0.5), dist);
		
		
	        j = i;
		if(abs(dist)<0.0001) {
			
			break;
		}
		
		pos += ray_dir * dist;
	}
	
	
	color = hsv(clamp(pos.z*0.01, .55, .7) + .4, j/100., j/50.);
	//color = vec3(j/50.0);
	//float c=j/50.0;
	gl_FragColor=vec4(color, 1.0);
	
}