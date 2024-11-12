uniform vec2 resolution;
uniform sampler2D buffer;
uniform float time;

vec2 hash( vec2 p ) {
	p = vec2(dot(p,vec2(127.1,311.7)), dot(p,vec2(269.5,183.3))); return -1.0 + 2.0*fract(sin(p)*43758.5453123);
}

float noise(vec2 p) {
	vec2 i = floor(p);
	vec2 f = fract(p);

	vec2 u = f*f*(3.0-2.0*f);

	return mix(mix(dot(hash(i + vec2(0.0,0.0)), f - vec2(0.0,0.0)),
				dot(hash(i + vec2(1.0,0.0)), f - vec2(1.0,0.0)), u.x),
			mix(dot(hash(i + vec2(0.0,1.0)), f - vec2(0.0,1.0)),
				dot(hash(i + vec2(1.0,1.0)), f - vec2(1.0,1.0)), u.x), u.y);
}

void main() {
	vec2 uv = gl_FragCoord.xy/resolution.xy - 0.5;
	vec4 O = vec4(0.0);
	float s = 0.0;
	float s2 = 0.0;
	float t = time * 1.9;

	float angle = radians(0.0);
	float cosA = cos(angle);
	float sinA = sin(angle);
	uv = vec2(
			uv.x * cosA - uv.y * sinA,
			uv.x * sinA + uv.y * cosA
			);

	uv.x += 0.03;

	float sc = pow(2., -mod(t, 5.0) - 0.8);
	uv *= sc;

	float disturbance = noise(uv * 2.0 + time * 0.2) * 0.1;
	float blend_disturbance = noise(uv * 1.5 - time * 0.15) * 0.15;

	for (int i = 0; i < 10; i++) {
		vec2 v = abs(uv + uv);
		if (max(v.x, v.y) > 1.0) break;
		v = smoothstep(1.0, 0.5, v);
		float m = v.x * v.y;

		vec2 mirror_uv = vec2(-uv.x + disturbance * sin(uv.y * 4.0 + time),
				uv.y + disturbance * cos(uv.x * 3.0 + time * 0.7));

		float blend = 0.5 + blend_disturbance * sin(uv.y * 2.0 + time * 0.3);
		blend = clamp(blend, 0.3, 0.7);

		O = mix(O,
				mix(texture(buffer, uv+.5, sqrt((sc * 2.)*.3)),
					texture(buffer, mirror_uv+.5, sqrt((sc * 2.)*.3)),
					blend),
				m);

		s = mix(s, 1.0, m);
		s2 = s2 * (1.0 - m) * (1.0 - m) + m * m;
		uv *= 2.0;

		disturbance *= 0.8;
		blend_disturbance *= 0.9;
	}

	vec2 final_mirror_uv = vec2(-uv.x + disturbance, uv.y + disturbance * 0.5);
	vec4 mean = mix(texture2D(buffer, uv, 10.0),
			texture2D(buffer, final_mirror_uv, 10.0),
			0.5 + 0.3 * sin(time + uv.y * 2.0));

	O = mean + (O - s * mean) / sqrt(s2);

	gl_FragColor = vec4(O.rgb, 1.0);
}

