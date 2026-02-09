type BannerProps = {
  src: string;
};
const Banner: React.FC<BannerProps> = ({ src }) => {
  return (
    <div className="group overflow-hidden rounded-xl block cursor-pointer">
      <img
        src={src}
        className="hover:scale-105 transition-transform duration-300 "
        alt=""
      />
    </div>
  );
};

export default Banner;
