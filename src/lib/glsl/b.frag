uniform vec2 resolution;
uniform sampler2D buffer;
uniform vec3 personality;
uniform vec3 rarity;

void main() {
	vec2 uv = gl_FragCoord.xy/resolution.xy;
	vec3 col = texture2D(buffer, uv).rgb;

	gl_FragColor = vec4(mix(personality, rarity, col.r), 1.0);
}

