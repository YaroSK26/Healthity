/* eslint-disable @next/next/no-img-element */
"use client"


import { motion } from "framer-motion";
import { fadeIn } from "../utils/motion";
import { Tilt } from "react-tilt";
import Link from "next/link";
import Scale from "../icons/Scale"
import Cup from "@/icons/Cup";


const services = [
  {
    title: "Weight progress",
    icon: <Scale></Scale>,
    button: "Try me!",
    href: "/weight",
  },
  {
    title: "Water filler",
    icon: <Cup></Cup>,
    button: "Try me!",
    href: "/cup",
  },
  {
    title: "Web analyst",
    icon: "./logo.png",
    button: "Weigth Stats",
    href: "/cup",
  },
  {
    title: "Backend Developer",
    icon: "./logo.png",
    button: "Weigth Stats",
    href: "/cup",
  },
];

const ServiceCard = ({ index, title, icon, button,href }) => (
  <Tilt className="xs:w-[250px] w-[300px] mx-2">
    <motion.div
      variants={fadeIn("right", "spring", index * 0.5, 0.75)}
      className="w-full  rounded-[20px] shadow-card "
    >
      <div
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className="bg-teal-700  rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col mb-5"
      >
        <div  className="w-12 h-12 text-white object-contain">
          {icon}
        </div>
        

        <h1 className="text-white text-2xl font-bold text-center">
          {title}
        </h1>

        <Link href={href} className="bg-gray-200 p-2 rounded-lg">
          {button}
        </Link>
      </div>
    </motion.div>
  </Tilt>
);

const Services = () => {
  return (
    <>
      <div className="mt-20 flex flex-wrap gap-10 justify-center">
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  );
};

export default Services