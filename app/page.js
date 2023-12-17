import Services from "../components/Services";
import TestAPI from "../components/TestAPI";
import Link from "next/link"; 

export default function Home() {
  return (
    <div className="flex justify-center items-center flex-col  ">
      <TestAPI></TestAPI>
      <Services></Services>
      <footer className="text-gray-200 w-full h-16 bg-teal-600 text-lg flex justify-center items-center">
        <div className="">
          &copy; Copyright all right reserved. Created by{" "}
          <Link 
            target="_blank"
            href={"https://jaroslav-portfolio.vercel.app/"}
            className="underline"
          >
            Jaroslav Barabáš
          </Link>
        </div>
      </footer>
    </div>
  );
}
