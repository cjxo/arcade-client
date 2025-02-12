import { useEffect, useRef } from "react";
import PropTypes from "prop-types";

const PixelArtCanvas = ({ imageSrc, alt, scaleX=2, scaleY=2 }) => {
  const canvasRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = imgRef.current;

    img.onload = () => {
      const imgWidth = img.width;
      const imgHeight = img.height;

      canvas.width = imgWidth * scaleX;
      canvas.height = imgHeight * scaleY;

      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(img, 0, 0, imgWidth, imgHeight, 0, 0, imgWidth * scaleX, imgHeight * scaleY);

      // Suppose that we use a nearest-neighbor sampler.
      // My problem is that I want to somehow _retain_ the crisp of the pixel (texel) art, while removing "wobbly" or "irregular"
      // pixel sizes caused by aliasing. This occurs when placing the pixel art on some non-integer position.
      // To disable antialiasing with <img />, see this link: https://stackoverflow.com/questions/14068103/disable-antialising-when-scaling-images
      //
      // Setting the sampler to bilinear filtering causes the undesirable "smearing" effect (default of img). But the point of pixel art is to retain those blockiness.
      // Hence, we want some sort of mix between bilinear filtering and nearest neighbor filtering. To be specific, when near the edges of the texel,
      // we want bilinear filtering. When inside (far from) the texel, we use nearest neighbor filtering. How to achieve this? Well, this property does:
      // ctx.imageSmoothingEnabled = false;
    };
  }, [imageSrc]);

  return (
    <canvas ref={canvasRef}>
      <img ref={imgRef} src={imageSrc} alt={alt} style={{ display: 'none' }} />
    </canvas>
  );
};

PixelArtCanvas.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  scaleX: PropTypes.number,
  scaleY: PropTypes.number,
};

export default PixelArtCanvas;
