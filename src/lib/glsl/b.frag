uniform vec2 resolution;
uniform vec3 beauty;
uniform vec3 rarity;
uniform float time;
uniform float complexity;
uniform sampler2D buffer;
#include "../../../node_modules/lygia/filter/boxBlur.glsl"

void main() {
    vec2 uv = gl_FragCoord.xy/resolution.xy;
    float pattern = texture(buffer, uv).r;
    
    float t = (sin(time * (complexity * 100.0)) + 1.0) * 0.5;
    vec3 col = mix(beauty, rarity, t * pattern);
    
    gl_FragColor = vec4(col, 1.0);
}

