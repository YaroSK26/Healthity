import Services from "../components/Services";
import TestAPI from "../components/TestAPI";

export default function Home() {
  return (
    <div className="relative flex justify-center items-center flex-col  ">
      <span className="mt-20">
      <TestAPI></TestAPI>
      </span>
      <Services></Services>
    </div>
  );
}
