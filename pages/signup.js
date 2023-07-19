import Navbar from "../components/Navbar";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../utils/api";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Email validation
    if (!email.trim()) {
      toast.error("Please enter your email");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    // Name validation
    if (!name.trim()) {
      toast.error("Please enter your name");
      return;
    }

    if (name.trim().length < 6) {
      toast.error("Name should have a minimum of 6 characters");
      return;
    }

    try {
      setIsLoading(true);
      const response = await api.post(
        "/api/v1/auth/otp/register",
        { email, name },
        { withCredentials: true }
      );
      setEmail("");
      setName("");
      toast.success("Account created successfully ✔ You can login now!");
      setTimeout(() => {
        window.location.href = "/login";
      }, 3000);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <section className="bg-gray-900 lg:p-32">
        <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
          <aside className="block order-last col-span-5 h-full ">
            <Image
              alt="Pattern"
              src="/login.svg"
              className="cover"
              width={800}
              height={1200}
            />
          </aside>
          <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-12 lg:px-16 lg:py-12 xl:col-span-6">
            <div className="max-w-xl lg:max-w-3xl">
              <h1 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
                Welcome to{" "}
                <span className="text-[#FACC15]">UFC Arab League</span>
              </h1>

              <p className="mt-4 leading-relaxed text-gray-400">
                Enter your email and name to start making your predictions for
                the upcoming UFC event!
              </p>

              <form
                className="mt-8 grid grid-cols-6 gap-6"
                onSubmit={handleSubmit}
              >
                <div className="col-span-6">
                  <label
                    htmlFor="Email"
                    className="block text-sm font-medium text-gray-200"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="Email"
                    name="email"
                    className="mt-1 px-3 py-2 w-full rounded-md text-lg text-gray-200 bg-gray-800"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="col-span-6">
                  <label
                    htmlFor="Name"
                    className="block text-sm font-medium text-gray-200"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="Name"
                    name="name"
                    className="mt-1 px-3 py-2 w-full rounded-md text-lg text-gray-200 bg-gray-800"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                  <button
                    type="submit"
                    className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 dark:hover:bg-blue-700 dark:hover:text-white"
                    disabled={isLoading}
                  >
                    {isLoading ? "Creating..." : "Create an account"}
                  </button>

                  <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
                    Already have an account?{" "}
                    <Link
                      href="/login"
                      className="text-gray-700 underline dark:text-gray-200"
                    >
                      Log in
                    </Link>
                    .
                  </p>
                </div>
              </form>
            </div>
          </main>
        </div>
      </section>
    </>
  );
};

export default Signup;
