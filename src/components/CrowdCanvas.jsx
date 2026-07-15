import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import allPeepsImg from "../assets/all-peeps.png";

export default function CrowdCanvas({ rows = 4, cols = 4 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const config = {
      src: allPeepsImg,
      rows,
      cols,
    };

    const randomRange = (min, max) => min + Math.random() * (max - min);
    const randomIndex = (array) => randomRange(0, array.length) | 0;
    const removeFromArray = (array, i) => array.splice(i, 1)[0];
    const removeItemFromArray = (array, item) => removeFromArray(array, array.indexOf(item));
    const removeRandomFromArray = (array) => removeFromArray(array, randomIndex(array));
    const getRandomFromArray = (array) => array[randomIndex(array) | 0];

    const resetPeep = ({ stage, peep }) => {
      const direction = Math.random() > 0.5 ? 1 : -1;
      const offsetY = randomRange(-25, 5);
      const startY = stage.height + offsetY;
      let startX;
      let endX;

      if (direction === 1) {
        startX = -peep.width;
        endX = stage.width;
        peep.scaleX = -0.55; // Face right when walking right
      } else {
        startX = stage.width + peep.width;
        endX = -peep.width;
        peep.scaleX = 0.55; // Face left when walking left
      }

      peep.x = startX;
      peep.y = startY;
      peep.anchorY = startY;

      return { startX, startY, endX };
    };

    const normalWalk = ({ peep, props }) => {
      const { startX, startY, endX } = props;
      const xDuration = randomRange(12, 22);
      const yDuration = randomRange(0.24, 0.35);

      const tl = gsap.timeline();
      tl.to(peep, {
        duration: xDuration,
        x: endX,
        ease: "none",
      }, 0);
      tl.to(peep, {
        duration: yDuration,
        repeat: Math.ceil(xDuration / yDuration),
        yoyo: true,
        y: startY - 12,
        ease: "sine.inOut"
      }, 0);

      return tl;
    };

    const walks = [normalWalk];

    const createPeep = ({ image, rect }) => {
      const peep = {
        image,
        rect,
        width: rect[2],
        height: rect[3],
        x: 0,
        y: 0,
        anchorY: 0,
        scaleX: 0.55,
        walk: null,
        render: (ctx) => {
          ctx.save();
          // Draw character scaled and positioned
          ctx.translate(peep.x, peep.y);
          ctx.scale(peep.scaleX, 0.55); // uniform scale
          ctx.drawImage(
            peep.image,
            peep.rect[0],
            peep.rect[1],
            peep.rect[2],
            peep.rect[3],
            -peep.width / 2,
            -peep.height,
            peep.width,
            peep.height
          );
          ctx.restore();
        },
      };
      return peep;
    };

    const img = new Image();
    const stage = { width: 0, height: 0 };
    const allPeeps = [];
    const availablePeeps = [];
    const crowd = [];

    const removeBackgroundOfCrop = (sourceImage, sx, sy, sw, sh) => {
      try {
        const cropCanvas = document.createElement("canvas");
        cropCanvas.width = sw;
        cropCanvas.height = sh;
        const cropCtx = cropCanvas.getContext("2d");
        if (!cropCtx) return null;

        // Draw the cropped character from the source image
        cropCtx.drawImage(sourceImage, sx, sy, sw, sh, 0, 0, sw, sh);

        const imgData = cropCtx.getImageData(0, 0, sw, sh);
        const data = imgData.data;

        // Flood fill from the borders of the cropped image
        const visited = new Uint8Array(sw * sh);
        const queue = [];
        
        const isWhite = (r, g, b) => r > 240 && g > 240 && b > 240;
        const getIndex = (x, y) => (y * sw + x) * 4;

        // Push border pixels
        for (let x = 0; x < sw; x++) {
          // Top edge
          let idx = getIndex(x, 0);
          if (isWhite(data[idx], data[idx+1], data[idx+2])) {
            visited[x] = 1;
            queue.push(x, 0);
          }
          // Bottom edge
          idx = getIndex(x, sh - 1);
          if (isWhite(data[idx], data[idx+1], data[idx+2])) {
            visited[(sh - 1) * sw + x] = 1;
            queue.push(x, sh - 1);
          }
        }

        for (let y = 0; y < sh; y++) {
          // Left edge
          let idx = getIndex(0, y);
          if (isWhite(data[idx], data[idx+1], data[idx+2])) {
            visited[y * sw] = 1;
            queue.push(0, y);
          }
          // Right edge
          idx = getIndex(sw - 1, y);
          if (isWhite(data[idx], data[idx+1], data[idx+2])) {
            visited[y * sw + (sw - 1)] = 1;
            queue.push(sw - 1, y);
          }
        }

        let head = 0;
        const dx = [0, 0, 1, -1];
        const dy = [1, -1, 0, 0];

        while (head < queue.length) {
          const cx = queue[head++];
          const cy = queue[head++];

          const idx = (cy * sw + cx) * 4;
          data[idx + 3] = 0; // Set alpha to 0

          for (let i = 0; i < 4; i++) {
            const nx = cx + dx[i];
            const ny = cy + dy[i];

            if (nx >= 0 && nx < sw && ny >= 0 && ny < sh) {
              const vIdx = ny * sw + nx;
              if (visited[vIdx] === 0) {
                const pIdx = vIdx * 4;
                if (isWhite(data[pIdx], data[pIdx+1], data[pIdx+2])) {
                  visited[vIdx] = 1;
                  queue.push(nx, ny);
                }
              }
            }
          }
        }

        cropCtx.putImageData(imgData, 0, 0);
        return cropCanvas;
      } catch (e) {
        console.error("Failed to remove crop background:", e);
        return null;
      }
    };

    const createPeeps = () => {
      const { rows, cols } = config;
      const { naturalWidth: width, naturalHeight: height } = img;
      const total = rows * cols;
      const rectWidth = width / rows;
      const rectHeight = height / cols;

      for (let i = 0; i < total; i++) {
        const sx = (i % rows) * rectWidth;
        const sy = ((i / rows) | 0) * rectHeight;
        const transparentCrop = removeBackgroundOfCrop(img, sx, sy, rectWidth, rectHeight);
        
        allPeeps.push(
          createPeep({
            image: transparentCrop || img,
            rect: transparentCrop 
              ? [0, 0, rectWidth, rectHeight]
              : [sx, sy, rectWidth, rectHeight],
          })
        );
      }
    };

    const addPeepToCrowd = () => {
      if (availablePeeps.length === 0) return null;
      const peep = removeRandomFromArray(availablePeeps);
      const walk = getRandomFromArray(walks)({
        peep,
        props: resetPeep({ peep, stage }),
      }).eventCallback("onComplete", () => {
        removePeepFromCrowd(peep);
        addPeepToCrowd();
      });

      peep.walk = walk;
      crowd.push(peep);
      crowd.sort((a, b) => a.anchorY - b.anchorY);
      return peep;
    };

    const removePeepFromCrowd = (peep) => {
      removeItemFromArray(crowd, peep);
      availablePeeps.push(peep);
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      crowd.forEach((peep) => peep.render(ctx));
    };

    const resize = () => {
      if (!canvas || !canvas.parentElement) return;
      stage.width = canvas.parentElement.clientWidth || window.innerWidth;
      stage.height = canvas.parentElement.clientHeight || 240;
      canvas.width = stage.width;
      canvas.height = stage.height;

      crowd.forEach((peep) => peep.walk && peep.walk.kill());
      crowd.length = 0;
      availablePeeps.length = 0;
      availablePeeps.push(...allPeeps);

      // Spawn active crowd size based on container width
      const activeCount = Math.min(allPeeps.length, Math.floor(stage.width / 90));
      for (let i = 0; i < activeCount; i++) {
        const p = addPeepToCrowd();
        if (p && p.walk) p.walk.progress(Math.random());
      }
    };

    let isMounted = true;

    const init = () => {
      if (!isMounted) return;
      const transparentCanvas = makeWhiteTransparent(img);
      createPeeps(transparentCanvas);
      resize();
      gsap.ticker.add(render);
    };

    img.onload = init;
    img.src = config.src;

    const handleResize = () => {
      if (isMounted) resize();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      isMounted = false;
      img.onload = null;
      window.removeEventListener("resize", handleResize);
      gsap.ticker.remove(render);
      crowd.forEach((peep) => peep.walk && peep.walk.kill());
    };
  }, [rows, cols]);

  return (
    <canvas ref={canvasRef} style={{ display: "block", width: "100%", height: "100%" }} />
  );
}