const Loader = () => {
    return (
      <div className="absolute left-0 top-0 w-full h-full">
        <CutoutTextLoader
          height="100vh"
          background="white"
          // NOTE: Using GIFs for the background looks super cool :)
          imgUrl="https://i.pinimg.com/originals/03/1a/22/031a228eb520468b72b4bf841a4baba5.gif"
        />
      </div>
    );
  };
  
  const CutoutTextLoader = ({
    height,
    background,
    imgUrl,
  }: {
    height: string;
    background: string;
    imgUrl: string;
  }) => {
    return (
      <div className="relative h-full w-full" style={{ height }}>
        <div
          className="absolute inset-0 z-0 w-full h-full"
          style={{
            backgroundImage: `url(${imgUrl})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        />
        <div
          style={{ background }}
          className="absolute inset-0 animate-pulse z-10"
        />
        <span
          className="font-black absolute inset-0 z-20 text-center bg-clip-text text-transparent pointer-events-none"
          style={{
            backgroundImage: `url(${imgUrl})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            fontSize: "clamp(3rem, 12vw, 10rem)",
            lineHeight: height,
          }}
        >
          Loading...
        </span>
      </div>
    );
  };
  
  export default Loader;
  