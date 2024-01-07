import Link from "next/link";

const Footer = () => {
  return (
    <div className="   mt-16 flex justify-center items-center text-center  ">
      <footer className=" text-center  text-gray-200 w-full h-16  flex justify-center items-center bg-teal-600 text-lg  ">
        <p>
          &copy; Copyright all right reserved. Created by{" "}
          <Link
            target="_blank"
            href={"https://jaroslav-portfolio.vercel.app/"}
            className="underline"
          >
            Jaroslav Barabáš
          </Link>
        </p>
      </footer>
    </div>
  );
}

export default Footer
