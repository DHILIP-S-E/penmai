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
        peep.scaleX = 0.55; // Slightly scaled down for styling
      } else {
        startX = stage.width + peep.width;
        endX = -peep.width;
        peep.scaleX = -0.55;
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

    const makeWhiteTransparent = (image) => {
      const tempCanvas = document.createElement("canvas");
      tempCanvas.width = image.naturalWidth;
      tempCanvas.height = image.naturalHeight;
      const tempCtx = tempCanvas.getContext("2d");
      tempCtx.drawImage(image, 0, 0);

      const imgData = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
      const data = imgData.data;

      // Loop through pixels and set alpha=0 for white/near-white pixels
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        // Match solid white and very light background pixels
        if (r > 240 && g > 240 && b > 240) {
          data[i + 3] = 0; // Transparent
        }
      }

      tempCtx.putImageData(imgData, 0, 0);
      return tempCanvas;
    };

    const createPeeps = (processedImage) => {
      const { rows, cols } = config;
      const { naturalWidth: width, naturalHeight: height } = img;
      const total = rows * cols;
      const rectWidth = width / rows;
      const rectHeight = height / cols;

      for (let i = 0; i < total; i++) {
        allPeeps.push(
          createPeep({
            image: processedImage,
            rect: [
              (i % rows) * rectWidth,
              ((i / rows) | 0) * rectHeight,
              rectWidth,
              rectHeight,
            ],
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

    const init = () => {
      const transparentCanvas = makeWhiteTransparent(img);
      createPeeps(transparentCanvas);
      resize();
      gsap.ticker.add(render);
    };

    img.onload = init;
    img.src = config.src;

    const handleResize = () => resize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      gsap.ticker.remove(render);
      crowd.forEach((peep) => peep.walk && peep.walk.kill());
    };
  }, [rows, cols]);

  return (
    <canvas ref={canvasRef} style={{ display: "block", width: "100%", height: "100%" }} />
  );
}