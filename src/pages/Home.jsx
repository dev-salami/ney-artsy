import Header from "../components/Header";
import Featured from "../components/Featured";
import Nletter from "../components/Nletter";
import Footer from "../components/Footer";
import UpComing from "../components/upComing";
import Navbar from "../components/Navbar";
import { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";

function Home() {
  useEffect(() => {
    Aos.init({
      offset: 200,
      duration: 2000,
      easing: "ease-out",
      delay: 400,
    });
  }, []);
  return (
    <>
      <Navbar />
      <Header />
      <Featured />
      <UpComing />
      <Nletter />
      <Footer />
    </>
  );
}
export default Home;
