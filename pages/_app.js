import "tailwindcss/tailwind.css";
import "../styles/globals.css";
import Head from "next/head";
import { ToastContainer } from "react-toastify";
import Footer from "../components/Footer";
import Router from "next/router";
import { useState, useEffect } from "react";
import Loader from "../components/Loader";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { AuthProvider } from "../hooks/useAuth"; // Adjust the path

export default function App({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const handleStart = (url) => {
      setLoading(true);
      NProgress.start();
    };

    const handleComplete = (url) => {
      setLoading(false);
      NProgress.done();
    };

    Router.events.on("routeChangeStart", handleStart);
    Router.events.on("routeChangeComplete", handleComplete);

    return () => {
      Router.events.off("routeChangeStart", handleStart);
      Router.events.off("routeChangeComplete", handleComplete);
    };
  }, []);
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/lgo.svg" />
        <title>UFC Arab League</title>
      </Head>
      <AuthProvider>
        {loading ? (
          <Loader />
        ) : (
          <>
            <ToastContainer />
            <Component {...pageProps} />
            <Footer />
          </>
        )}
      </AuthProvider>
    </>
  );
}
