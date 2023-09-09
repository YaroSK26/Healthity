"use client"

import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useClerk } from "@clerk/clerk-react";
import { Pencil, Trash2 } from "lucide-react";
import Link from "next/link";


const Weight = () => {
  const [weight, setWeight] = useState("");
  const [canSubmit, setCanSubmit] = useState(true);
  const [loading, setLoading] = useState(false);
  const [realProduct, setRealProduct] = useState([]);
  const clerk = useClerk();
  const userId = clerk.user ? clerk.user.id : null;


  useEffect(() => {
    // Načítanie existujúcich váh používateľa
    axios
      .get("/api/weight")
      .then((response) => {
        const data = response.data;
        const dataWeights = data.Weights;

        const matchingEntries = dataWeights.filter(
          (entry) => entry.userId === userId
        );

        setRealProduct(matchingEntries);

        // Kontrola stavu canSubmit
        if (matchingEntries.length === 0) {
          setCanSubmit(true); // Ak používateľ nemá žiadny existujúci produkt, môže pridávať váhu
        } else {
          setCanSubmit(false); // Ak používateľ už má produkt, nemôže pridávať váhu
        }
      })
      .catch((error) => {
        console.error("Chyba při načítaní váh:", error);
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
      if (canSubmit) {
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
          setCanSubmit(false);
        } else {
          throw new Error("Error");
        }
      } else {
        toast.error("You already submitted your weight today.");
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
          className="border border-teal-500 m-1 pl-1 p-1 rounded-lg w-56"
          type="number"
          step="0.1"
          placeholder="Your Weight today (kg/lbs)"
          min={1}
          max={150}
        />
        <button
          className="bg-black p-1 rounded-lg text-white"
          disabled={!canSubmit}
        >
          Submit
        </button>
      </form>

      {canSubmit ? (
        <p>You can submit your weight now.</p>
      ) : (
        <p>You already submitted your weight today.</p>
      )}

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

      <iframe
        className=" shadow-lg mb-2 "
        width="640"
        height="480"
        src="https://charts.mongodb.com/charts-healthity-hfgnz/embed/charts?id=64f48268-cd93-4215-89ef-198706220d4b&maxDataAge=60&theme=light&autoRefresh=true"
      ></iframe>
    </div>
  );
};

export default Weight;