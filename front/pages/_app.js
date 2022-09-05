import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "styles/globals.css";
import Main from "components/main";
import "styles/loading.css";

function MyApp({ Component, pageProps }) {
  //loading js for bootstrap
  useEffect(() => {
    typeof document !== undefined
      ? require("bootstrap/dist/js/bootstrap")
      : null;
  });
  return (
    <>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
