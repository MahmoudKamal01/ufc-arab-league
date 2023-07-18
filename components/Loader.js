import Image from "next/image";
const Loader = () => {
  return (
    <>
      {/* <!-- OUR MAIN SECTION FULL SCREEN LOADING --> */}
      <section class="bg-gray-600 relative place-items-center grid h-screen w-screen gap-4">
        {/* <!--   ITEM 1 --> */}
        <div class="bg-blue-500 w-48 h-48  absolute animate-ping rounded-full delay-1s shadow-xl"></div>
        {/* <!--   ITEM 2 --> */}
        <div class="bg-blue-400 w-32 h-32 absolute animate-ping rounded-full shadow-xl"></div>
        {/* <!--   ITEM 3 --> */}
        <div class="bg-white w-24 h-24 absolute animate-pulse rounded-full shadow-xl"></div>
        {/* <!--   SVG LOGO --> */}
        <Image
          src="/lgo.svg"
          alt="logo"
          className="h-16 w-16"
          width="100"
          height="100"
        />
      </section>
    </>
  );
};

export default Loader;
