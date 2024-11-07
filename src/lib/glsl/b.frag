uniform vec2 resolution;
uniform sampler2D buffer;

void main() {
    vec2 uv = gl_FragCoord.xy/resolution.xy;
		vec4 col = texture2D(buffer, uv);

    gl_FragColor = col;
}

