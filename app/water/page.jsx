"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useClerk } from "@clerk/clerk-react";
import { Pencil, Trash2 } from "lucide-react";
import Link from "next/link";

const Water = () => {
  const [water, setWater] = useState("250");
  const [loading, setLoading] = useState(false);
  const [realProduct, setRealProduct] = useState([]);
  const [dailyTarget, setDailyTarget] = useState(() => {
    // Retrieve the daily target from localStorage, or use the default if not present
    const storedDailyTarget = localStorage.getItem("dailyTarget");
    return storedDailyTarget ? parseFloat(storedDailyTarget) : 1.5;
  });
  const clerk = useClerk();
  const userId = clerk.user ? clerk.user.id : null;

  useEffect(() => {
    // Load existing water entries for the user
    axios
      .get("/api/water")
      .then((response) => {
        const data = response.data;
        const dataWaters = data.Waters;

        const matchingEntries = dataWaters.filter(
          (entry) => entry.userId === userId
        );

        setRealProduct(matchingEntries);
      })
      .catch((error) => {
        console.error("Error loading water entries:", error);
      });
  }, [userId]);

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!water) {
      return;
    }

    try {
      const data = {
        water,
        date: getCurrentDate(),
        userId,
      };
      setLoading(true);

      // Odeslání dat na server
      const res = await axios.post("/api/water", data);

      const refreshPage = () => {
        setTimeout(() => {
          window.location.reload();
        }, 500); // Zmena na 500 ms (pol sekundy)
      };

      if (res) {
        toast.success("Saved!");
        setWater("");
        refreshPage();
        setLoading(false);
      } else {
        throw new Error("Error");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const todayWaterEntries = realProduct.filter(
    (entry) => entry.date === getCurrentDate()
  );

  const calculateTotalWaterIntake = () => {
    return todayWaterEntries.reduce(
      (total, entry) => total + parseFloat(entry.water),
      0
    );
  };

  const calculatePercentage = () => {
    const totalWaterIntake = calculateTotalWaterIntake();
    return (totalWaterIntake / (dailyTarget * 1000)) * 100; // Convert dailyTarget to milliliters (1 liter = 1000 ml)
  };

  // Save the selected daily target to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("dailyTarget", dailyTarget.toString());
  }, [dailyTarget]);

  return (
    <div className="flex flex-col justify-center items-center mt-5 gap-5">
      <form onSubmit={handleSubmit}>
        <h1 className="text-center text-3xl font-bold mb-4">
          Fill your water cup
        </h1>
        <select
          onChange={(e) => setWater(e.target.value)}
          value={water}
          className="border border-sky-500 m-1 pl-1 p-1 rounded-lg w-56"
          type="number"
          step="0.1"
          placeholder="How much you drank?"
        >
          <option>250</option>
          <option>500</option>
          <option>750</option>
          <option>1000</option>
        </select>
        <button className="bg-black p-1 rounded-lg text-white">Submit</button>
      </form>

      {loading === false &&
        todayWaterEntries.map((e) => (
          <div key={e._id} className="static">
            <p className="m-0 p-0 static flex gap-3">
              {e.date}: <span className="font-bold">{e.water}ml</span>{" "}
              <Link
                href={"/edit-water/" + e._id}
                className="hover:cursor-pointer"
              >
                <Pencil />
              </Link>
              <Link
                href={"/delete-water/" + e._id}
                className="hover:cursor-pointer"
              >
                <Trash2 color="#ff0000" />
              </Link>
            </p>
          </div>
        ))}

      {loading === true && <div>Loading...</div>}

      <h1 className="font-bold text-xl text-sky-500">
        Your daily drink Target
        <select
          className="outline rounded-xl ml-1 text-white bg-sky-500"
          onChange={(e) => setDailyTarget(parseFloat(e.target.value))}
          value={dailyTarget}
        >
          <option value={1.5}>1.5l</option>
          <option value={2}>2l</option>
          <option value={2.5}>2.5l</option>
          <option value={3}>3l</option>
        </select>
      </h1>

      <div className="relative ">
        <div className="w-64 bg-black h-3 rounded-xl"></div>
        <div className="w-64 bg-black h-2 rounded-lg rotate-[80deg] absolute right-20 top-32"></div>
        <div className="w-64 bg-black h-2 rounded-lg rotate-[-80deg] absolute left-20 top-32"></div>
        <div className="">
          <p className="  mt-20 left-[6.2rem]  text-center font-bold text-2xl  text-sky-500 ">
            {calculatePercentage().toFixed(2)}%
          </p>
        </div>
        <div className="w-[120px] bg-black h-2 rounded-lg absolute left-[69px] top-[250px]"></div>
      </div>

      <div className="relative w-[20rem] text-center font-bold text-xl  text-sky-500 ">
        {calculatePercentage().toFixed(2) >= 100 && (
          <h1 className="absolute top-32  ">
            Congratulations, you&apos;ve reached your daily drinking goal!
          </h1>
        )}
      </div>
    </div>
  );
};

export default Water;
