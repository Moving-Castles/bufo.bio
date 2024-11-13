#define PI2 6.28318530718
#define M1 1597334677u
#define M2 3812015801u

uniform float time;
uniform vec2 resolution;
uniform vec2 personality;
uniform float complexity;
uniform sampler2D buffer;

const float blurSize1 = 2.0;
const float blurSize2 = 20.0;

float monoBlur(sampler2D channel, vec2 uv, vec2 scale, float step) {
	float result = 0.0;
	int i = 0;
	vec2 d;
	vec2 channelResolution = resolution;

	for(float y = -scale.y; y < scale.y; y += step) {
		for(float x = -scale.x; x < scale.x; x += step) {
			d = vec2(x, y);
			result += texture2D(channel, uv + (d / channelResolution)).r * 
				(1.0 - smoothstep(0.0, scale.y * 2.0, length(d)));
			i++;
		}
	}
	return result / float(i);
}

float hash(vec2 q) {
	vec2 p = floor(q);
	float n = p.x * float(M1) + p.y * float(M2);
	n = mod(n * float(M1), 4294967296.0);
	return fract(n / 4294967296.0);
}

float smoothDiffusion(float time) {
	return 0.5 + 0.25 * sin(time * 0.5) 
		+ 0.15 * sin(time * 0.7 + 1.3)
		+ 0.1 * sin(time * 1.1 + 2.4);
}

void main() {
	vec2 uv = gl_FragCoord.xy / resolution.xy;
	vec2 uvR = (gl_FragCoord.xy - 0.5 * resolution.xy) / resolution.y;
	float aspect = resolution.x / resolution.y;

	vec3 noise = vec3(1.0, 0.5, 1.0) * hash(vec2(gl_FragCoord.xy * time));
	noise.r = clamp(noise.g, noise.r, 1.0);

	float diffusionStrength = smoothDiffusion(time);
	float wave = smoothDiffusion(time) * 0.1;

	vec2 uv2 = (uv - 0.5);
	uv2 *= 0.995 * (1.0 + (length(uv2/2.0) / 300.0)) + complexity * 0.01;
	uv2 *= 1.0 - (0.03 * diffusionStrength) * (0.5 + 0.25 * smoothstep(length(vec2(aspect, 1.0)) / 2.0, 0.0, length(uvR)));
	uv2.x += (.0001 + (complexity * 0.001 * 2.) + .002 * diffusionStrength) * sin(wave + time + uv2.y*personality.y);
	uv2.y += (.0001 + (complexity * 0.001 * 2.) + .002 * diffusionStrength) * cos(wave + time + uv2.x*personality.x*2.0);
	uv2 = uv2 + 0.5;

	vec3 prev = texture2D(buffer, uv2).rgb;

	float vB = blurSize2 - (blurSize2 * (0.5 + 0.5 * sin(time)) - blurSize1 - 2.0); 

	vec3 blur1 = vec3(monoBlur(buffer, uv2, vec2(blurSize1), blurSize1/4.0));
	vec3 blur2 = vec3(monoBlur(buffer, uv2, vec2(vB), vB/6.0));

	vec3 col = prev - (blur2 - blur1 * 0.999);

	col += (noise.r - 0.5) * diffusionStrength / 8.0;

	col = clamp(col, 0.0, 1.0);

	gl_FragColor = vec4(col, 1.0);
}
