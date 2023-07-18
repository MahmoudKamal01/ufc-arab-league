import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../components/Navbar";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";

const Authentication = () => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isVerificationSent, setIsVerificationSent] = useState(false);
  const { isLoggedIn, setIsLoggedIn, handleLogin, handleLogout } = useAuth();
  const handleLoginSubmit = async (event) => {
    event.preventDefault();

    // Email validation
    if (!email.trim()) {
      toast.error("Please enter your email");
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.post(
        "https://ufc-arab-league.onrender.com/api/v1/auth/otp/login",
        {
          email,
        },
        { withCredentials: true }
      );
      toast.success(response.data.msg);
      setIsVerificationSent(true);
    } catch (error) {
      toast.error(String(error.response.data.message));
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerificationSubmit = async (event) => {
    event.preventDefault();

    // Validation
    if (!code.trim()) {
      toast.error("Please enter the verification code");
      return;
    }

    try {
      const response = await axios.post(
        "https://ufc-arab-league.onrender.com/api/v1/auth/otp/verify",
        {
          verificationCode: code,
        },
        { withCredentials: true }
      );
      console.log("ss", response.data.token);
      handleLogin(response.data.token);
      toast.success("Authenticated successfully ✔ Redirecting to home page");
      setTimeout(() => {
        window.location.href = "/";
      }, 3000);
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response.data.message || "An Error has occurred!");
    }
  };

  const handleResendCode = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        "https://ufc-arab-league.onrender.com/api/v1/auth/otp/login",
        {
          email,
        },
        { withCredentials: true }
      );
      toast.success(response.data.msg);
      setIsVerificationSent(true);
    } catch (error) {
      toast.error(String(error.response.data.message));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <section className="bg-gray-900 lg:p-32">
        <div className="lg:grid lg:min-h-screen lg:grid-cols-12 ">
          <aside className="hidden lg:block lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
            <Image
              alt="Pattern"
              src="/login.svg"
              className="cover"
              width={800}
              height={1200}
            />
          </aside>
          <main className="flex px-8 py-8 sm:px-12 lg:col-span-12 lg:px-16 lg:py-12 xl:col-span-6">
            <div className="max-w-xl lg:max-w-3xl">
              {!isVerificationSent ? (
                <>
                  <h1 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
                    Welcome back to{" "}
                    <div className="text-[#FACC15]">UFC Arab League</div>
                  </h1>

                  <p className="mt-4 leading-relaxed text-gray-400">
                    Enter your email to log in and start making your predictions
                    for the upcoming UFC event!
                  </p>

                  <form
                    className="mt-8 grid grid-cols-6 gap-6"
                    onSubmit={handleLoginSubmit}
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
                    <div className="col-span-6 flex items-center gap-4">
                      <button
                        type="submit"
                        className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 dark:hover:bg-blue-700 dark:hover:text-white"
                        disabled={isLoading}
                      >
                        {isLoading ? "Logging in..." : "Login"}
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                <>
                  <h1 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
                    Welcome to{" "}
                    <span className="text-[#FACC15]">UFC Arab League</span>
                  </h1>

                  <p className="mt-4 leading-relaxed text-gray-400">
                    Enter the verification code:
                  </p>

                  <form
                    className="mt-8 grid grid-cols-6 gap-6"
                    onSubmit={handleVerificationSubmit}
                  >
                    <div className="col-span-6">
                      <label
                        htmlFor="code"
                        className="block text-sm font-medium text-gray-200"
                      >
                        Verification code
                      </label>
                      <input
                        type="text"
                        id="code"
                        name="code"
                        className="mt-1 px-3 py-2 w-full rounded-md text-lg text-gray-200 bg-gray-800"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                      />
                    </div>

                    <div className="col-span-6 flex items-center gap-4">
                      <button
                        type="submit"
                        className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 dark:hover:bg-blue-700 dark:hover:text-white"
                      >
                        Submit code
                      </button>
                      <button
                        type="button"
                        onClick={handleResendCode}
                        className="inline-block shrink-0 rounded-md border border-blue-600 bg-gray-800 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 dark:hover:bg-blue-700 dark:hover:text-white"
                        disabled={isLoading}
                      >
                        Resend Code
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </main>
          <aside className="block lg:hidden col-span-12">
            <Image
              alt="Pattern"
              src="/login.svg"
              className="cover"
              width={800}
              height={1200}
            />
          </aside>
        </div>
      </section>
      <ToastContainer />
    </>
  );
};

export default Authentication;
