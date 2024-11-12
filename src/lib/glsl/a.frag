uniform vec2 resolution;
uniform vec2 mouse;
uniform float time;
uniform vec3 personality;
uniform vec3 rarity;
uniform float complexity;
uniform vec2 beauty;

#define ITERATIONS 150.0
void main() {
	vec2 uv = gl_FragCoord.xy/resolution.xy;
	uv = uv * 2.0 - 1.0;
	uv *= 2.0;
	uv.x *= resolution.x/resolution.y;

	vec2 c = vec2(0.0);

	if (true) {
		c = mix(1., 400., complexity)/vec2(600., 1000.);
		c = c * 2.0 - 1.0;
	} else {
		float f = sin(min(3.14, beauty.x * 0.5) - 1.57) * 0.5 + 0.5;
		float t = mix(0.0, beauty.y, min(1.0, f));

		c = vec2(-cos(t), sin(t));
		c *= mix(0.6, 0.87, cos(t * 2.0) * 0.5 + 0.5);
	}

	float m = 0.0;
	float i = 0.0;

	for (; i < ITERATIONS && length(uv) < 100.0; i++) {
		uv = vec2(
				uv.x*uv.x - uv.y*uv.y + c.x,
				uv.x*uv.y + uv.x*uv.y + c.y
				);
	}
	m = i / ITERATIONS;

	vec3 t = vec3(0.5 + 0.5*cos(m * ITERATIONS * mix(0., 0.5, complexity)));
	vec3 col = mix(personality, rarity, t);

	gl_FragColor = vec4(col, 1.0);
}

