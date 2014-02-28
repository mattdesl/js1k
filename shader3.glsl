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

void main()
{


	vec2 p = gl_FragCoord.xy / resolution;
	

	
	vec3 ray_dir = normalize( vec3( p.xy - .5, - 1.) );
	vec3 ray_orig = vec3(0.);
	vec3 pos = ray_dir;
	vec3 color = vec3(1.0);
	float dist;
	float j;
	for( float i = 0.0; i < 50.0; i += 1.0 ) {
		vec3 c = vec3(100.0,100.0,100.0);
		vec3 q = mod(pos,c)-0.5*c;
		
		
		dist = length(max(abs(q.xy) - 10.5, 0.));
		
	        j = i;
		if(abs(dist)<0.01) {
			
			break;
		}
		
		pos += ray_dir * dist;
	}
	
	
	color = hsv(clamp(length(pos.z)*0.0005, .2, .3) - 0.2, j/100., j/50.);
	
	//float c=j/50.0;
	gl_FragColor=vec4(color, 1.0);
	
}