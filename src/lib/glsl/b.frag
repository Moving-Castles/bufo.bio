uniform vec2 resolution;
uniform vec3 beauty;
uniform vec3 rarity;
uniform float time;
uniform float complexity;
uniform sampler2D buffer;

#include "../../../node_modules/lygia/filter/laplacian.glsl"

void main() {
    vec2 uv = gl_FragCoord.xy/resolution.xy;
    vec2 pixel = 1.0/resolution.xy;
    
    float pattern = texture(buffer, uv).r;
    float edges = length(laplacian(buffer, uv, pixel));
    
		float phase = sin(time * (complexity * 100.0) + 1.0);
    
    float r = step(0.0, sin(edges * phase));
    float g = step(0.0, sin(edges * phase + 2.094));
    float b = step(0.0, sin(edges * phase + 4.189));
    
    vec3 bands = vec3(r, g, b);
    
    vec3 col = mix(beauty, rarity, pattern);
    col = mix(col, bands, phase * edges * 2.0);
    
    gl_FragColor = vec4(col, 1.0);
}
