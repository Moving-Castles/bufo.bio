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
    uv *= 1.0 - complexity * 0.2;
    uv.x *= resolution.x/resolution.y;
    
    vec2 c = vec2(0.0);
    if (true) {
        c = mix(50., 150., complexity)/vec2(600., 1000.);
        c = c * 2.0 - 1.0;

        float t = time * 0.1;
        c += vec2(
            sin(t * 0.3) * beauty.x * 0.1,
            cos(t * 0.4) * beauty.y * 0.1
						);
    } else {
        float f = sin(min(3.14, 3.0) - 1.57) * 0.5 + 0.5;
        float t = mix(0.0, 3.0, min(1.0, f));
        c = vec2(-cos(t), sin(t));
        c *= mix(0.6, 0.87, cos(t * 2.0) * 0.5 + 0.5);
    }
    
    float m = 0.0;
    float i = 0.0;
    vec2 z = uv;
    for (;i < ITERATIONS && length(z) < 100.0; i++) {
        z = vec2(
            z.x*z.x - z.y*z.y + c.x,
            z.x*z.y + z.x*z.y + c.y
        );
    }
    m = i / ITERATIONS;
    
    float phase = time * 0.5;
    vec3 t_color = vec3(
        0.5 + 0.5 * cos(m * ITERATIONS * mix(0., 0.5, complexity) + phase),
        0.5 + 0.5 * cos(m * ITERATIONS * mix(0., 0.5, complexity) + phase + 2.094),
        0.5 + 0.5 * cos(m * ITERATIONS * mix(0., 0.5, complexity) + phase - 2.094)
    );
    vec3 col = mix(personality, rarity, t_color);
    gl_FragColor = vec4(col, 1.0);
}

