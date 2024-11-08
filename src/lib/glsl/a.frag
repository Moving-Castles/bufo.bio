uniform vec2 resolution;
uniform float time;
uniform sampler2D buffer;
uniform vec2 beauty;
uniform float complexity;

#define PI2 6.28318530718
#define M1 1597334677U
#define M2 3812015801U
const float blurSize1 = 5.0;
const float blurSize2 = 9.0;

float monoBlur(sampler2D channel, vec2 uv, vec2 scale, float step) {
    float result = 0.0;
    int i = 0;
    vec2 d;
    for(float y = -scale.y; y < scale.y; y += step) {
        for(float x = -scale.x; x < scale.x; x += step) {
            d = vec2(x, y);
            result += texture(channel, uv + (d / resolution.xy)).r * 
                     (1.0 - smoothstep(0.0, scale.y * 2.0, length(d)));
            i++;
        }
    }
    return result / float(i);
}

float hash(uvec2 q) {
    q *= uvec2(M1, M2);
    uint n = (q.x ^ q.y) * M1;

    return float(n) * (1.0/float(0xffffffffU));
}

void main() {
    vec2 uv = gl_FragCoord.xy/resolution.xy;
    vec2 uvR = (gl_FragCoord.xy - 0.5 * resolution.xy)/resolution.y;
    float aspect = resolution.x / resolution.y;

    vec3 noise = vec3(1.0) * hash(uvec2(gl_FragCoord.xy * time));
    noise.r = clamp(noise.r, 0.0, 1.0);
    
    float fft = 0.25;
    float wave = 0.5;
    
    vec2 uv2 = (uv - 0.5);
    uv2 *= 0.999 * (1.0 + (length(uv2/2.0) /300.0));
    uv2 *= 1.0 - (0.03 * fft) * (0.5 + 0.25 * smoothstep(length(vec2(aspect,1.0)) / 2.0, 0.0, length(uvR)));
    uv2.x += (0.0001 + 0.002 * fft) * sin(wave + time + uv2.y*beauty.x);
    uv2.y += (0.0001 + 0.002 * fft) * cos(wave + time + uv2.x*beauty.y);
    uv2 = uv2 + 0.5;
  
    vec3 prev = texture(buffer, uv2).rgb;
   
    float vB = blurSize2 - (blurSize2 * (0.5 + 0.5 * sin(time)) - blurSize1 - 2.0);
    
    vec3 blur1 = vec3(monoBlur(buffer, uv2, vec2(blurSize1), blurSize1/4.0));
    vec3 blur2 = vec3(monoBlur(buffer, uv2, vec2(vB), vB/6.0));
 
    vec3 col = prev - (blur2 - blur1 * 0.999);

    col += (noise.r-0.5)/256.0;
    
    col = clamp(col, 0.0, 1.0);
    
		gl_FragColor = vec4(vec3(col), 1.0);
}

