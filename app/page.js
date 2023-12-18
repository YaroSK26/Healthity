import Footer from "../components/Footer";
import Services from "../components/Services";
import TestAPI from "../components/TestAPI";

export default function Home() {
  return (
    <div className="relative  flex justify-center items-center flex-col  ">
      <TestAPI></TestAPI>
      <Services></Services>
      <Footer></Footer>
    </div>
  );
}
