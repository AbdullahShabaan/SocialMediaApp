import SimpleImageSlider from "react-simple-image-slider";

const MemoriesSlider = ({ imagesSlider, imageIndex }) => {
  return (
    <div>
      <SimpleImageSlider
        width={1000}
        height={600}
        startIndex={imageIndex}
        images={imagesSlider ?? []}
        showBullets={true}
        showNavs={true}
      />
    </div>
  );
};
export default MemoriesSlider;
