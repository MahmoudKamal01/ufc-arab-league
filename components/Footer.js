import Link from "next/link";
function Footer() {
  return (
    <>
      <footer className="bg-gray-50">
        <div className="mx-auto bg-gray-600  px-4 py-2 sm:px-6 lg:px-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div className="flex justify-center text-teal-600 sm:justify-start">
              <Link
                href="/"
                className="flex justify-center items-center text-center font-bold text-2xl italic text-[#FACC15]"
              >
                UFC Arab League
              </Link>
            </div>

            <p className="mt-4 text-center text-sm text-white lg:mt-0 lg:text-right">
              Copyright &copy; 2022. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
