/* eslint-disable @next/next/no-img-element */
"use client"


import { motion } from "framer-motion";
import { fadeIn, textVariant } from "../utils/motion";
import { Tilt } from "react-tilt";
import Link from "next/link";
import { BookMarked, CupSoda, HeartPulse, Radar, ScaleIcon } from "lucide-react";



const services = [
  {
    title: "Weight progress",
    icon: <ScaleIcon className="w-12 h-12"></ScaleIcon>,
    button: "Try me!",
    href: "/weight",
    bg: "bg-teal-700",
  },

  {
    title: "BMI",
    icon: <Radar className="w-12 h-12" />,
    button: "Try me!",
    href: "/bmi",
    bg: "bg-teal-500",
  },

  {
    title: "Water filler",
    icon: <CupSoda className="w-12 h-12"></CupSoda>,
    button: "Try me!",
    href: "/water",
    bg: "bg-sky-500",
  },
  {
    title: "Journal",
    icon: <BookMarked className="w-12 h-12"></BookMarked>,
    button: "Try me!",
    href: "/journal",
    bg: "bg-sky-600",
  },
  {
    title: "Blood Pressure",
    icon: <HeartPulse className="w-12 h-12" />,
    button: "Try me!",
    href: "/bloodPressure",
    bg: "bg-teal-500",
  },
];

const ServiceCard = ({ index, title, icon, button,href,bg }) => (
  <Tilt className="xs:w-[250px] w-[300px] mx-2">
    <motion.div
      variants={fadeIn("right", "spring", index * 0.5, 0.75)}
      className="w-full  rounded-[20px] shadow-card drop-shadow-2xl "
    >
      <div
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className={`${bg}  rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col mb-5`}
      >
        <div  className="w-12 h-12 text-white object-contain">
          {icon}
        </div>
        

        <h1 className="text-white text-2xl font-bold text-center">
          {title}
        </h1>

        <Link href={href} className="bg-gray-200 p-2 rounded-lg drop-shadow-lg ">
          {button}
        </Link>
      </div>
    </motion.div>
  </Tilt>
);

const Services = () => {
  return (
    <motion.div
      variants={textVariant()}
      initial="hidden"
      animate="show"
      className="mt-20 flex flex-wrap gap-10 justify-center"
    >
      {services.map((service, index) => (
        <ServiceCard key={service.title} index={index} {...service} />
      ))}
    </motion.div>
  );
};


export default Services