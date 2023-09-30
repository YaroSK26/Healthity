"use client";
import { ArrowLeft, ArrowRight, Plus, Settings } from "lucide-react";
import Link from "next/link";
import { useState,useEffect } from "react";
import { useClerk } from "@clerk/clerk-react";
import axios from "axios";


const FoodLobby = () => {
  const [active, setActive] = useState("overview");
  const [foodSettings, setFoodSettings] = useState("");
  const [loading, setLoading] = useState(false);

    
  const [date, setDate] = useState(new Date());
   const clerk = useClerk();
   const userId = clerk.user ? clerk.user.id : null;

  const getCurrentDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleDateChange = (days) => {
    setDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setDate(prevDate.getDate() + days);
      return newDate;
    });
  };

  const handleInputChange = (event) => {
    setDate(new Date(event.target.value));
  };

 useEffect(() => {
   // Check if the user is logged in
   if (userId) {
     // Make API call only if the user is logged in
     setLoading(true); // Set loading to true before making the API call
     axios
       .get(`/api/foodSettings?userId=${userId}`)
       .then((response) => {
         // Check if the response contains data and the user ID matches
         if (
           response.data.FoodSetting &&
           response.data.FoodSetting[0]?.userId === userId
         ) {
           setFoodSettings(response.data.FoodSetting[0]);
           console.log(response.data.FoodSetting[0]);
         } else {
           console.error("Invalid data or user ID mismatch");
         }
       })
       .catch((error) => {
         console.error("Error loading food settings:", error);
       })
       .finally(() => {
         setLoading(false); // Set loading to false after API call completion
       });
   }
 }, [userId]);

  const sum = [
    {
      title: "Sum",
      kcal: 100, 
      fromKcal: foodSettings.sum || 2000,
      percent: function () {
        return ((this.kcal / this.fromKcal) * 100).toFixed(0);
      },
    },
  ];

  const totalG = [
    {
      title: "Protein",
      g: 100,
      fromG: foodSettings.protein || 120,
      percent: function () {
        return ((this.g / this.fromG) * 100).toFixed(0);
      },
    },
    {
      title: "Carbs",
      g: 12,
      fromG: foodSettings.carbs || 250,
      percent: function () {
        return ((this.g / this.fromG) * 100).toFixed(0);
      },
    },
    {
      title: "Fat",
      g: 11,
      fromG: foodSettings.fat ||50,
      percent: function () {
        return ((this.g / this.fromG) * 100).toFixed(0);
      },
    },
    {
      title: "Roughage",
      g: 50,
      fromG: foodSettings.roughage || 20,
      percent: function () {
        return ((this.g / this.fromG) * 100).toFixed(0);
      },
    },
  ];


  const food = [
    {
      title: "Breakfast",
      kcal: 0,
      food: "",
    },
    {
      title: "Snack",
      kcal: 20,
      food: "",
    },
    {
      title: "Lunch",
      kcal: 0,
      food: "",
    },
    {
      title: "Olovrant",
      kcal: 0,
      food: "",
    },
    {
      title: "Dinner",
      kcal: 200,
      food: "",
    },
    {
      title: "Second dinner",
      kcal: 2000,
      food: "",
    },

  ]

  


  return (
    <div className="flex flex-col justify-center items-center mt-5 gap-5 ">
      <h1 className="text-center text-3xl font-bold mb-4">Food tracker</h1>

      <div className="flex flex-col gap-5 border-2 border-black w-[310px] justify-start items-center h-[500px] rounded-2xl mb-5">
        <div className="flex relative gap-5 mt-2">
          <div className="absolute right-48">
            <Link href={"/food-settings"}>
              <Settings />
            </Link>
          </div>
          <h2
            onClick={() => setActive("overview")}
            className={`text-lg font-bold ${
              active === "overview" ? "underline" : ""
            } cursor-pointer`}
          >
            Overview
          </h2>
          <h2
            onClick={() => setActive("food")}
            className={`text-lg font-bold ${
              active === "food" ? "underline" : ""
            } cursor-pointer`}
          >
            Food
          </h2>
        </div>
        <div>
          <div className="flex gap-10">
            <ArrowLeft onClick={() => handleDateChange(-1)} />
            <div className="flex gap-2">
              <input
                type="date"
                value={getCurrentDate(date)}
                onChange={handleInputChange}
              />
            </div>

            <ArrowRight onClick={() => handleDateChange(1)} />
          </div>
          {loading && <p className="text-center">Loading...</p>}
          {active === "overview" && (
            <div>
              <div className="grid grid-cols-2 mt-4 gap-5 w-68 relative mx-auto">
                <div className="border-2 rounded-2xl  border-black pl-1 ">
                  <p className="text-sm p-1">Intake</p>
                  <p className="font-bold text-lg p-1">{1110} kcal</p>
                  <Link
                    href="food"
                    className="absolute left-[100px] bottom-5 text-white bg-sky-500 rounded-full"
                  >
                    <Plus />
                  </Link>
                </div>
                <div className="border-2 rounded-2xl  border-black pl-1">
                  <p className="text-sm p-1">Activites</p>
                  <p className="font-bold text-lg p-1">-{56} kcal</p>
                  <Link
                    href="food"
                    className="absolute left-[252px] bottom-5 text-white bg-sky-500 rounded-full"
                  >
                    <Plus />
                  </Link>
                </div>
              </div>
              <div className="flex gap-2 mt-8 ">
                {sum.map((item) => (
                  <div
                    className="flex justify-center items-center gap-2"
                    key={item.title}
                  >
                    <div className="rounded-full  bg-sky-500 w-[55px] h-[55px] flex justify-center items-center">
                      <div className="rounded-full  bg-white w-10 h-10 text-gray-900 p-1 justify-center flex items-center">
                        {item.percent()}%
                      </div>
                    </div>
                    <div>
                      <p>Sum</p>
                      <p className="font-bold text-lg">
                        {item.kcal} kcal&nbsp;
                        <span className="font-normal text-sm">
                          from {item.fromKcal} kcal
                        </span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-1">
                {totalG.map((item) => (
                  <div className="flex gap-2 mt-8 " key={item.title}>
                    <div className="rounded-full  bg-sky-500 w-[55px] h-[55px] flex justify-center items-center mt-2">
                      <div className="rounded-full  bg-white w-10 h-10 text-gray-900 p-1 justify-center flex items-center">
                        {item.percent()}%
                      </div>
                    </div>
                    <div>
                      <p>{item.title}</p>
                      <p className="font-bold flex flex-col ">
                        {item.g} g
                        <span className="font-normal text-sm">
                          from {item.fromG} g
                        </span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {active === "food" && (
            <div className="mt-4 flex flex-col gap-2">
              {food.map((item) => (
                <div
                  key={item.title}
                  className=" bg-gray-200 rounded-xl p-1 text-black flex justify-between items-center"
                >
                  <label htmlFor="ranajky">{item.title} </label>
                  <div className="flex gap-2  ">
                    {item.kcal} kcal
                    <Link
                      href="food"
                      className=" text-white bg-sky-500 rounded-full"
                    >
                      <Plus />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FoodLobby;
