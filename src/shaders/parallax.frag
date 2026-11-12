#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform sampler2D uTexA;
uniform sampler2D uDepthA;
uniform sampler2D uTexB;
uniform sampler2D uDepthB;

uniform vec2 uMouse;        // -1.0 to 1.0 (smoothed)
uniform float uStrength;    // 0.035 desktop, 0.025 mobile, clamped to <= 0.05
uniform float uProgress;    // 0.0 to 1.0 transition progress
uniform float uTime;
uniform vec2 uResolution;   // container viewport resolution in px
uniform float uImageAspect; // image aspect ratio, e.g. 1.5 (3:2)
uniform float uFocus;       // focal depth plane, default 0.5

varying vec2 vUv;

// 4-tap box filter for smoother depth lookup without aliasing/stair-stepping
float getSampledDepth(sampler2D depthMap, vec2 uv) {
  float rawDepth = texture2D(depthMap, uv).r;
  vec2 texel = 1.0 / max(uResolution, vec2(1.0));
  float d1 = texture2D(depthMap, uv + vec2(-texel.x, -texel.y) * 2.0).r;
  float d2 = texture2D(depthMap, uv + vec2(texel.x, -texel.y) * 2.0).r;
  float d3 = texture2D(depthMap, uv + vec2(-texel.x, texel.y) * 2.0).r;
  float d4 = texture2D(depthMap, uv + vec2(texel.x, texel.y) * 2.0).r;
  float blurredDepth = (d1 + d2 + d3 + d4) * 0.25;
  return mix(rawDepth, blurredDepth, 0.5);
}

void main() {
  // 1. Cover-fit UVs so the 3:2 image fills container without distortion
  float containerAspect = uResolution.x / max(uResolution.y, 1.0);
  vec2 uv = vUv;
  if (containerAspect > uImageAspect) {
    float scale = containerAspect / uImageAspect;
    uv.y = (uv.y - 0.5) * scale + 0.5;
  } else {
    float scale = uImageAspect / containerAspect;
    uv.x = (uv.x - 0.5) * scale + 0.5;
  }

  // 2. Base Zoom 6% to prevent parallax from pulling in black edges
  uv = (uv - 0.5) * 0.94 + 0.5;

  // Camera forward travel during transition:
  // Zoom A forward +4% (as if walking through)
  vec2 uvA = (uv - 0.5) * (1.0 - 0.04 * uProgress) + 0.5;
  // Bring B in from -4% to 0
  vec2 uvB = (uv - 0.5) * (1.0 + 0.04 * (1.0 - uProgress)) + 0.5;

  // 3 & 4. Parallax with 2-step depth refinement
  // For Texture A:
  float depthA1 = getSampledDepth(uDepthA, uvA);
  vec2 offsetA = clamp(uMouse * uStrength * (depthA1 - uFocus), -0.02, 0.02);
  float depthA2 = getSampledDepth(uDepthA, uvA + offsetA);
  offsetA = clamp(uMouse * uStrength * (depthA2 - uFocus), -0.02, 0.02);
  vec4 colorA = texture2D(uTexA, uvA + offsetA);

  // For Texture B:
  float depthB1 = getSampledDepth(uDepthB, uvB);
  vec2 offsetB = clamp(uMouse * uStrength * (depthB1 - uFocus), -0.02, 0.02);
  float depthB2 = getSampledDepth(uDepthB, uvB + offsetB);
  offsetB = clamp(uMouse * uStrength * (depthB2 - uFocus), -0.02, 0.02);
  vec4 colorB = texture2D(uTexB, uvB + offsetB);

  // 5. Depth-aware transition A -> B (near pixels switch first)
  // threshold = uProgress * 1.2 - depthB * 0.2
  // mask = smoothstep(threshold - 0.08, threshold + 0.08, 1.0 - depthB)
  float threshold = uProgress * 1.2 - depthB2 * 0.2;
  float mask = smoothstep(threshold - 0.08, threshold + 0.08, 1.0 - depthB2);
  vec4 finalColor = mix(colorA, colorB, mask);

  // 6. Neutral architectural grade: vignette 0.06
  float dist = distance(vUv, vec2(0.5));
  finalColor.rgb *= (1.0 - dist * dist * 0.24);

  // Animated film grain 0.015 via uTime
  float grain = fract(sin(dot(vUv + fract(uTime * 0.07), vec2(12.9898, 78.233))) * 43758.5453) - 0.5;
  finalColor.rgb += grain * 0.015;

  gl_FragColor = vec4(finalColor.rgb, 1.0);
}

