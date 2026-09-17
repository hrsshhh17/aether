import React, { useEffect, useRef } from "react";
import * as THREE from "three";
export default function ParticleField() {
  const host = useRef(null);
  useEffect(() => {
    const el = host.current;
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
    } catch {
      return;
    }
    renderer.setPixelRatio(Math.min(devicePixelRatio, 1.7));
    el.appendChild(renderer.domElement);
    const scene = new THREE.Scene(),
      camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.z = 8;
    const count = 6500,
      geo = new THREE.BufferGeometry();
    const base = new Float32Array(count * 3),
      sphere = new Float32Array(count * 3),
      network = new Float32Array(count * 3),
      scatter = new Float32Array(count * 3),
      logo = new Float32Array(count * 3),
      word = new Float32Array(count * 3),
      seed = new Float32Array(count);
    let rng = 19;
    const random = () => {
      rng = (rng * 16807) % 2147483647;
      return (rng - 1) / 2147483646;
    };
    const anchors = Array.from(
      { length: 36 },
      () =>
        new THREE.Vector3(
          (random() - 0.5) * 4.7,
          (random() - 0.5) * 3.5,
          (random() - 0.5) * 2,
        ),
    );
    const canvas = document.createElement("canvas");
    canvas.width = 1500;
    canvas.height = 360;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "white";
    ctx.font = "500 115px Arial";
    ctx.textAlign = "center";
    ctx.fillText("One intelligence.", 750, 145);
    ctx.fillText("Infinite possibilities.", 750, 280);
    const data = ctx.getImageData(0, 0, 1500, 360).data;
    const pixels = [];
    for (let y = 0; y < 360; y += 3)
      for (let x = 0; x < 1500; x += 3)
        if (data[(y * 1500 + x) * 4 + 3] > 100)
          pixels.push([(x - 750) / 205, (180 - y) / 205]);
    for (let i = 0; i < count; i++) {
      const j = i * 3,
        t = i / count,
        phi = Math.acos(1 - 2 * t),
        theta = i * 2.39996323,
        r = 1.95 + 0.1 * Math.sin(theta * 4) * Math.sin(phi * 9);
      sphere[j] = r * Math.sin(phi) * Math.cos(theta);
      sphere[j + 1] = r * Math.cos(phi);
      sphere[j + 2] = r * Math.sin(phi) * Math.sin(theta);
      base.set(sphere.subarray(j, j + 3), j);
      const a = anchors[i % 36];
      network[j] = a.x + (random() - 0.5) * 0.22;
      network[j + 1] = a.y + (random() - 0.5) * 0.22;
      network[j + 2] = a.z + (random() - 0.5) * 0.22;
      scatter[j] = (random() - 0.5) * 8;
      scatter[j + 1] = (random() - 0.5) * 5;
      scatter[j + 2] = (random() - 0.5) * 4;
      const p = pixels[Math.floor((i / count) * pixels.length)];
      word[j] = p[0];
      word[j + 1] = p[1];
      word[j + 2] = (random() - 0.5) * 0.07;
      const edge = i % 3,
        u = random(),
        verts = [
          [-1.8, -1.65],
          [0, 1.8],
          [1.8, -1.65],
        ];
      logo[j] = verts[edge][0] * (1 - u) + verts[(edge + 1) % 3][0] * u;
      logo[j + 1] = verts[edge][1] * (1 - u) + verts[(edge + 1) % 3][1] * u;
      logo[j + 2] = (random() - 0.5) * 0.4;
      seed[i] = random();
    }
    ctx.clearRect(0, 0, 1500, 360);
    ctx.font = "500 180px Arial";
    ctx.fillText("AETHER", 750, 235);
    const ld = ctx.getImageData(0, 0, 1500, 360).data,
      lp = [];
    for (let y = 0; y < 360; y += 3)
      for (let x = 0; x < 1500; x += 3)
        if (ld[(y * 1500 + x) * 4 + 3] > 100)
          lp.push([(x - 750) / 260, (180 - y) / 260]);
    for (let i = 0; i < count; i++) {
      const j = i * 3;
      if (i < count * 0.55) {
        logo[j] *= 0.53;
        logo[j + 1] = logo[j + 1] * 0.53 + 0.85;
      } else {
        const p =
          lp[
            Math.min(
              lp.length - 1,
              Math.floor(((i - count * 0.55) / (count * 0.45)) * lp.length),
            )
          ];
        logo[j] = p[0];
        logo[j + 1] = p[1] - 1.05;
        logo[j + 2] = 0;
      }
    }
    geo.setAttribute("position", new THREE.BufferAttribute(base, 3));
    geo.setAttribute("aSeed", new THREE.BufferAttribute(seed, 1));
    const material = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(10, 10) },
        uPixel: { value: renderer.getPixelRatio() },
        uCalm: { value: 0 },
      },
      vertexShader: `attribute float aSeed;uniform float uTime;uniform vec2 uMouse;uniform float uPixel;uniform float uCalm;varying float vAlpha;varying float vSeed;void main(){vec3 p=position;float wave=sin(p.y*4.+uTime*.5+aSeed*2.)*.045*(1.-uCalm);p+=normalize(p+vec3(.001))*wave;float d=length(p.xy-uMouse);p.xy+=normalize(p.xy-uMouse+vec2(.001))*.25*exp(-d*2.5);vec4 mv=modelViewMatrix*vec4(p,1.);gl_Position=projectionMatrix*mv;gl_PointSize=(1.3+aSeed*1.5)*uPixel*(6./-mv.z);vAlpha=.4+aSeed*.6;vSeed=aSeed;}`,
      fragmentShader: `varying float vAlpha;varying float vSeed;void main(){float d=length(gl_PointCoord-.5);if(d>.5)discard;vec3 color=mix(vec3(.28,.57,.45),vec3(.80,1.,.86),vSeed);gl_FragColor=vec4(color,vAlpha*smoothstep(.5,.16,d));}`,
    });
    const points = new THREE.Points(geo, material);
    scene.add(points);
    const linePositions = [];
    for (let i = 0; i < anchors.length; i++)
      for (let j = i + 1; j < anchors.length; j++)
        if (anchors[i].distanceTo(anchors[j]) < 1.55)
          linePositions.push(...anchors[i].toArray(), ...anchors[j].toArray());
    const lg = new THREE.BufferGeometry();
    lg.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(linePositions, 3),
    );
    const lm = new THREE.LineBasicMaterial({
      color: 0x9ee4bc,
      transparent: true,
      opacity: 0,
    });
    const lines = new THREE.LineSegments(lg, lm);
    scene.add(lines);
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    material.uniforms.uCalm.value = reduced ? 1 : 0;
    let frame,
      target = 0;
    const stages = [sphere, network, scatter, word, logo];
    const resize = () => {
      renderer.setSize(el.clientWidth, el.clientHeight);
      camera.aspect = el.clientWidth / el.clientHeight;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(el);
    const mouse = (e) => {
      const rect = el.getBoundingClientRect();
      material.uniforms.uMouse.value.set(
        ((e.clientX - rect.left) / rect.width - 0.5) * 7,
        -((e.clientY - rect.top) / rect.height - 0.5) * 5,
      );
    };
    const reset = () => material.uniforms.uMouse.value.set(10, 10);
    addEventListener("pointermove", mouse);
    addEventListener("pointerout", reset);
    const onScroll = () => {
      const section = document.getElementById("intelligence"),
        end = document.getElementById("lab");
      if (!section || !end) return;
      const y = scrollY,
        h = innerHeight;
      target =
        y < h * 0.65
          ? Math.min(y / (h * 0.65), 1)
          : y < section.offsetTop - h * 0.4
            ? 1 +
              Math.min(
                (y - h * 0.65) / Math.max(section.offsetTop - h * 1.05, 1),
                1,
              )
            : 2 +
              Math.min(
                Math.max((y - (section.offsetTop - h * 0.4)) / (h * 0.3), 0),
                1,
              );
      if (y > section.offsetTop + h * 0.6)
        target = 3 + Math.min((y - section.offsetTop - h * 0.6) / (h * 0.5), 1);
      el.style.opacity = y > end.offsetTop - h * 0.3 ? "0" : "1";
      el.classList.toggle("centered", y > section.offsetTop - h * 0.7);
    };
    addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    let progress = 0;
    const clock = new THREE.Clock();
    const scaleTarget = new THREE.Vector3();
    function render() {
      const time = clock.getElapsedTime();
      if (document.hidden || el.style.opacity === "0") {
        frame = requestAnimationFrame(render);
        return;
      }
      progress += (target - progress) * (reduced ? 1 : 0.035);
      const from = Math.min(Math.floor(progress), 4),
        to = Math.min(from + 1, 4),
        blend = progress - from;
      const arr = geo.attributes.position.array;
      for (let i = 0; i < arr.length; i++)
        arr[i] = stages[from][i] * (1 - blend) + stages[to][i] * blend;
      geo.attributes.position.needsUpdate = true;
      material.uniforms.uTime.value = reduced ? 0 : time;
      points.rotation.y =
        progress < 0.8 && !reduced ? time * 0.035 * (1 - progress) : 0;
      points.rotation.z = progress < 0.8 ? 0.12 * (1 - progress) : 0;
      const desiredScale =
        innerWidth <= 760
          ? progress > 3
            ? 0.48 + (progress - 3) * 0.27
            : 1 - 0.52 * Math.max(0, progress - 2)
          : 1;
      points.scale.lerp(
        scaleTarget.set(desiredScale, desiredScale, desiredScale),
        0.08,
      );
      lm.opacity = Math.max(0, 1 - Math.abs(progress - 1)) * 0.18;
      renderer.render(scene, camera);
      frame = requestAnimationFrame(render);
    }
    render();
    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      removeEventListener("pointermove", mouse);
      removeEventListener("pointerout", reset);
      removeEventListener("scroll", onScroll);
      geo.dispose();
      material.dispose();
      lg.dispose();
      lm.dispose();
      renderer.dispose();
      el.replaceChildren();
    };
  }, []);
  return <div className="particle-field" ref={host} aria-hidden="true" />;
}
