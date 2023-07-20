import Image from "next/image";
const Loader = () => {
  return (
    <>
      {/* <!-- OUR MAIN SECTION FULL SCREEN LOADING --> */}
      <section className="bg-gray-600 relative place-items-center grid h-screen w-screen gap-4">
        {/* <!--   ITEM 1 --> */}
        <div className="bg-blue-500 w-48 h-48  absolute animate-ping rounded-full delay-1s shadow-xl"></div>
        {/* <!--   ITEM 2 --> */}
        <div className="bg-blue-400 w-32 h-32 absolute animate-ping rounded-full shadow-xl"></div>
        {/* <!--   ITEM 3 --> */}
        <div className="bg-white w-24 h-24 absolute animate-pulse rounded-full shadow-xl"></div>
        {/* <!--   SVG LOGO --> */}
        <Image
          src="/log.png"
          alt="logo"
          className="h-32 w-24"
          width="100"
          height="100"
        />
      </section>
    </>
  );
};

export default Loader;
