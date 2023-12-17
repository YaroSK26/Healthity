import Link from "next/link";

const Footer = () => {
  return (
    <footer className="absolute bottom-0 text-gray-200 w-full h-16 bg-teal-600 text-lg flex justify-center items-center">
      <div className="">
        &copy; Copyright all right reserved. Created by{" "}
        <Link target="_blank" href={"https://jaroslav-portfolio.vercel.app/"} className="underline">Jaroslav Barabáš</Link>
      </div>
    </footer>
  );
}

export default Footer
