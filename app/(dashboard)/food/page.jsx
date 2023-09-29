"use client"

import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useClerk } from "@clerk/clerk-react";
import { Pencil, Trash2 } from "lucide-react";
import Link from "next/link";


const Weight = () => {
  const [weight, setWeight] = useState("");
  const [loading, setLoading] = useState(false);
  const [realProduct, setRealProduct] = useState([]);
  const clerk = useClerk();
  const userId = clerk.user ? clerk.user.id : null;


useEffect(() => {
  setLoading(true); // Nastavte loading na true predtým, ako začnete načítavať dáta
  axios
    .get("/api/weight")
    .then((response) => {
      const data = response.data;
      const dataWeights = data.Weights;

      const matchingEntries = dataWeights.filter(
        (entry) => entry.userId === userId
      );

      setRealProduct(matchingEntries);
      setLoading(false); // Nastavte loading na false až po tom, ako sa úspešne načítajú dáta
    })
    .catch((error) => {
      console.error("Errror with loading your weight:", error);
      setLoading(false); // Nastavte loading na false aj v prípade chyby
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

    if (!weight) {
      return;
    }

    try {
      const data = {
        weight,
        date: getCurrentDate(),
        userId,
      };
      setLoading(true);

      // Kontrola, či používateľ nemá žiadny existujúci produkt
      if (data) {
        // Odeslání dat na server
        const res = await axios.post("/api/weight", data);

        const refreshPage = () => {
          setTimeout(() => {
            window.location.reload();
          }, 500); // Zmena na 500 ms (pol sekundy)
        };

        if (res) {
          toast.success("Saved!");
          setWeight("");
          refreshPage();
          setLoading(false);
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
      <form onSubmit={handleSubmit}>
        <h1 className="text-center text-3xl font-bold mb-4">
          Enter your weight
        </h1>
        <input
          onChange={(e) => setWeight(e.target.value)}
          value={weight}
          className="border border-teal-700 m-1 pl-1 p-1 rounded-lg w-56"
          type="number"
          step="0.1"
          placeholder="Your Weight today (kg/lbs)"
          min={1}
          max={150}
        />
        <button
          className="bg-black p-1 rounded-lg text-white"
        >
          Submit
        </button>
      </form>


      {loading === false &&
        realProduct.map((e) => (
          <div key={e._id} className="static">
            <p className="m-0 p-0 static flex gap-3">
              {e.date}: <span className="font-bold">{e.weight}kg</span>{" "}
              <Link href={"/edit/" + e._id} className="hover:cursor-pointer">
                <Pencil />
              </Link>
              <Link href={"/delete/" + e._id} className="hover:cursor-pointer">
                <Trash2 color="#ff0000" />
              </Link>
            </p>
          </div>
        ))}

      {loading === true && <div>Loading...</div>}
      {realProduct.length === 0 && (
        <div>No weight found.</div>
      )}

    </div>
  );
};

export default Weight;