import Head from "next/head";
import "nouislider/distribute/nouislider.css";
import { useEffect, useState } from "react";
// redux
import { Provider } from "react-redux";
import SimpleReactLightbox from "simple-react-lightbox";
// Css style
import "../public/styles/chart.css";
import "../public/styles/colors.css";
import "../public/styles/custom.css";
import "../public/styles/print.css";
import "../public/styles/style.css";
import "../public/styles/wizard.css";
import Layout from "../src/layouts/Layout";
// action
import { bodyArt, resizeWindow } from "../src/redux/action/utils";
import store from "../src/redux/store";

import "../src/layouts/sideBar.css";

function MyApp({ Component, pageProps }) {
  const [doc, setDoc] = useState();
  const [pages, setPages] = useState();
  useEffect(() => {
    bodyArt();
    setDoc(document);
    setPages(window.location.pathname);
    resizeWindow();
    setPages(window.location.pathname);
    window.addEventListener("resize", resizeWindow);

    return () => window.removeEventListener("resize", resizeWindow);
  }, [pages]);

  return (
    <Provider store={store}>
      <SimpleReactLightbox>
        <Head>
          <title>
            Geo Trade - India's No 1 Mining Directory and B2B Market Place
          </title>
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="https://geotrade.org.in/static/media/logo.0bf9f979.png"
          />
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
            integrity="sha512-1ycn6IcaQQ40/MKBW2W4Rhis/DbILU74C1vSrLJxCq57o941Ym01SwNsOMqvEBFlcgUa6xLiPY/NS5R+E6ztJQ=="
            crossorigin="anonymous"
            referrerpolicy="no-referrer"
          />
        </Head>

        {pages && window.location.pathname.includes("pages") ? (
          <Component {...pageProps} />
        ) : (
          <Layout>
            <Component {...pageProps} />
          </Layout>
        )}
      </SimpleReactLightbox>
    </Provider>
  );
}

export default MyApp;
