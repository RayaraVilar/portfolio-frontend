"use client";

import { useEffect, useRef } from "react";

const size = 850;
// Pixel centers in the original illustration. Each warp fades to zero before the eyelid.
const eyes = [[321, 385], [526, 384]];
const radiusX = 63;
const radiusY = 48;

function makePatch(context, image, [x, y]) {
  const left = x - radiusX;
  const top = y - radiusY;
  const width = radiusX * 2;
  const height = radiusY * 2;
  context.drawImage(image, left, top, width, height, left, top, width, height);
  const source = context.getImageData(left, top, width, height);
  const output = context.createImageData(width, height);
  const weights = new Float32Array(width * height);
  for (let row = 0; row < height; row++) {
    for (let column = 0; column < width; column++) {
      const distance = Math.hypot((column - radiusX) / radiusX, (row - radiusY) / radiusY);
      const blend = Math.max(0, Math.min(1, (1 - distance) / 0.52));
      weights[row * width + column] = blend * blend * (3 - 2 * blend);
    }
  }
  return { left, top, width, height, source, output, weights };
}

function paintGaze(context, { left, top, width, height, source, output, weights }, dx, dy) {
  for (let row = 0; row < height; row++) {
    for (let column = 0; column < width; column++) {
      const index = row * width + column;
      const weight = weights[index];
      const x = column - dx * weight;
      const y = row - dy * weight;
      const x0 = Math.floor(x);
      const y0 = Math.floor(y);
      const x1 = Math.min(x0 + 1, width - 1);
      const y1 = Math.min(y0 + 1, height - 1);
      const tx = x - x0;
      const ty = y - y0;
      for (let channel = 0; channel < 4; channel++) {
        const top = source.data[(y0 * width + x0) * 4 + channel] * (1 - tx) +
          source.data[(y0 * width + x1) * 4 + channel] * tx;
        const bottom = source.data[(y1 * width + x0) * 4 + channel] * (1 - tx) +
          source.data[(y1 * width + x1) * 4 + channel] * tx;
        output.data[index * 4 + channel] = top * (1 - ty) + bottom * ty;
      }
    }
  }
  context.putImageData(output, left, top);
}

export function Mascot({ active, className = "" }) {
  const artwork = useRef(null);
  const overlay = useRef(null);

  useEffect(() => {
    const image = artwork.current;
    const canvas = overlay.current;
    const hero = image.closest(".cinema");
    const pointer = matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)");
    if (!active || !pointer.matches) return;
    const context = canvas.getContext("2d", { willReadFrequently: true });
    if (!context) return;

    let patches;
    let frame = 0;
    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;

    function draw() {
      frame = 0;
      currentX += (targetX - currentX) * 0.25;
      currentY += (targetY - currentY) * 0.25;
      const settled = Math.hypot(targetX - currentX, targetY - currentY) < 0.12;
      if (settled && !targetX && !targetY) {
        context.clearRect(0, 0, size, size);
        return;
      }
      patches.forEach(patch => paintGaze(context, patch, currentX, currentY));
      if (!settled) frame = requestAnimationFrame(draw);
    }

    function move(event) {
      if (event.pointerType !== "mouse" || !image.complete || !image.naturalWidth) return;
      patches ??= eyes.map(eye => makePatch(context, image, eye));
      const bounds = image.getBoundingClientRect();
      const x = event.clientX - (bounds.left + bounds.width * 0.5);
      const y = event.clientY - (bounds.top + bounds.height * 0.45);
      const length = Math.max(Math.hypot(x, y), 80);
      targetX = x / length * 7;
      targetY = y / length * 5;
      if (!frame) frame = requestAnimationFrame(draw);
    }

    function reset() {
      targetX = 0;
      targetY = 0;
      if (patches && !frame) frame = requestAnimationFrame(draw);
    }

    hero.addEventListener("pointermove", move, { passive: true });
    hero.addEventListener("pointerleave", reset);
    return () => {
      hero.removeEventListener("pointermove", move);
      hero.removeEventListener("pointerleave", reset);
      cancelAnimationFrame(frame);
      context.clearRect(0, 0, size, size);
    };
  }, [active]);

  return <div className={"cinema-mascot " + className}>
    <img ref={artwork} src="/rayara-chibi.webp" alt="" width={size} height={size} />
    <canvas ref={overlay} width={size} height={size} />
  </div>;
}
