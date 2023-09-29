"use client"

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useClerk } from "@clerk/clerk-react";
import { useRouter } from "next/navigation";

const FoodSettings = () => {
    const [sum,setSum] = useState("2000")
    const [protein,setProtein] = useState("100")
    const [carbs,setCarbs] = useState("200")
    const [fat,setFat] = useState("50")
    const [roughage, setRoughage] = useState("20");

    const [loading, setLoading] = useState(false);

      const clerk = useClerk();
      const userId = clerk.user ? clerk.user.id : null;
      const router = useRouter()

     useEffect(() => {
       setLoading(true);
       axios
         .get("/api/foodSettings")
         .then((response) => {
           const data = response.data;
           const dataFoodSetting = data.FoodSetting;
    
           const matchingEntries = dataFoodSetting.filter(
             (entry) => entry.userId === userId
           );

           if (matchingEntries.length > 0) {
             const userEntry = matchingEntries[0];
             setSum(userEntry.sum);
             setProtein(userEntry.protein);
             setCarbs(userEntry.carbs);
             setFat(userEntry.fat);
             setRoughage(userEntry.roughage);
           }

           setLoading(false);
         })
         .catch((error) => {
           console.error("Error with loading your Food Settings:", error);
           setLoading(false);
         });
     }, [userId]);

const handleClick = async (e) => {
  e.preventDefault();

  if (!sum || !protein || !fat || !roughage || !carbs) {
    return;
  }

  try {
    const data = {
      sum: Number(sum),
      protein: Number(protein),
      fat: Number(fat),
      roughage: Number(roughage),
      carbs: Number(carbs),
      userId,
    };

    console.log("Data to be sent:", data); // Log the data being sent

    setLoading(true);

    // Kontrola, či používateľ nemá žiadny existujúci produkt
    if (data) {
      // Odeslání dat na server
      const res = await axios.put("/api/foodSettings", data);

      console.log("Response from server:", res); // Log the response from the server

      if (res) {
        toast.success("Saved!");
        setLoading(false);
        router.push("/food-lobby");
      } else {
        throw new Error("Error");
      }
    } else {
      setLoading(false);
    }
  } catch (error) {
    console.error(error);
  }
};


  return (
    <div className="flex flex-col justify-center items-center mt-5 gap-5">
      <h1 className="text-center text-3xl font-bold mb-4">Food tracker</h1>
      {loading && <p className="text-center">Loading...</p>}
      
      <div className="w-[300px]  h-[300px] rounded-xl border-2 border-black flex flex-col items-center relative ">
        <Link href={"food-lobby"} className="absolute left-2 top-2">
          <ArrowLeft />
        </Link>
        <h1 className="font-bold text-lg mt-2 mb-4">Settings</h1>

        <div className="flex gap-2 flex-col ">
          <div className="flex gap-2 justify-center items-center  ">
            <label htmlFor="protein ">Sum</label>
            <input
              onChange={(e) => setSum(e.target.value)}
              value={sum}
              type="number"
              className=" pl-1 w-48 border-sky-500 border-2 rounded-xl ml-auto"
              placeholder="(kcal)"
              required
            />
          </div>
          <div className="flex gap-2 justify-center items-center">
            <label htmlFor="protein ">Protein</label>
            <input
              onChange={(e) => setProtein(e.target.value)}
              value={protein}
              type="number"
              className=" pl-1 w-48 border-sky-500 border-2 rounded-xl  ml-auto"
              placeholder="(g)"
              required
            />
          </div>
          <div className="flex gap-2 justify-center items-center ">
            <label htmlFor="protein ">Carbs</label>
            <input
              onChange={(e) => setCarbs(e.target.value)}
              value={carbs}
              type="number"
              className=" pl-1 w-48 border-sky-500 border-2 rounded-xl ml-auto"
              placeholder="(g)"
              required
            />
          </div>
          <div className="flex gap-2 justify-center items-center">
            <label htmlFor="protein ">Fat</label>
            <input
              onChange={(e) => setFat(e.target.value)}
              value={fat}
              type="number"
              className=" pl-1 w-48 border-sky-500 border-2 rounded-xl ml-auto"
              placeholder="(g)"
              required
            />
          </div>
          <div className="flex gap-2 justify-center items-center">
            <label htmlFor="protein ">Roughage</label>
            <input
              onChange={(e) => setRoughage(e.target.value)}
              value={roughage}
              type="number"
              className=" pl-1 w-48 border-sky-500 border-2 rounded-xl ml-auto"
              placeholder="(g)"
              required
            />
          </div>
        </div>
        <button
          onClick={handleClick}
          disabled={loading}
          className="bg-sky-500 rounded-2xl text-white w-[90%] mt-4 p-[6px] "
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default FoodSettings
