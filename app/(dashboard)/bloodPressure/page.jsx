"use client"

import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useClerk } from "@clerk/clerk-react";
import { Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import Footer from "../../../components/Footer";


const BloodPressure = () => {
  const [bloodPressureUp, setBloodPressureUp] = useState("");
  const [bloodPressureDown, setBloodPressureDown] = useState("");
  const [loading, setLoading] = useState(false);
  const [realProduct, setRealProduct] = useState([]);
  const clerk = useClerk();
  const userId = clerk.user ? clerk.user.id : null;


useEffect(() => {
  setLoading(true); // Nastavte loading na true predtým, ako začnete načítavať dáta
  axios
    .get("/api/bloodPressure")
    .then((response) => {
      const data = response.data;
      const dataBloodPressures = data.BloodPressures;

      const matchingEntries = dataBloodPressures.filter(
        (entry) => entry.userId === userId
      );

      setRealProduct(matchingEntries);
      setLoading(false); // Nastavte loading na false až po tom, ako sa úspešne načítajú dáta
    })
    .catch((error) => {
      console.error("Errror with loading your blood Pressure:", error);
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

    if (!bloodPressureUp || !bloodPressureDown) {
      return;
    }

    try {
      const data = {
        bloodPressureUp,
        bloodPressureDown,
        date: getCurrentDate(),
        userId,
      };
      setLoading(true);

      // Kontrola, či používateľ nemá žiadny existujúci produkt
      if (data) {
        // Odeslání dat na server
        const res = await axios.post("/api/bloodPressure", data);

        const refreshPage = () => {
          setTimeout(() => {
            window.location.reload();
          }, 500); // Zmena na 500 ms (pol sekundy)
        };

        if (res) {
          toast.success("Saved!");
          setBloodPressureUp("");
          setBloodPressureDown("");
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
          Enter your blood pressure
        </h1>
        <div className="w-52  flex flex-col  justify-center items-center m-auto">
          <label htmlFor="up" className="mr-auto font-semibold ">
            Your high blood pressure
          </label>
          <input
            id="up"
            onChange={(e) => setBloodPressureUp(e.target.value)}
            value={bloodPressureUp}
            className="border border-teal-700 m-1 pl-1 p-1 rounded-lg w-56"
            type="number"
            step="1"
            placeholder="Your upper blood pressure"
            min={60}
            max={200}
          />
          <label htmlFor="down" className="mr-auto font-semibold ">
            Your low blood pressure
          </label>
          <input
            id="down"
            onChange={(e) => setBloodPressureDown(e.target.value)}
            value={bloodPressureDown}
            className="border border-teal-700 m-1 pl-1 p-1 rounded-lg w-56"
            type="number"
            step="1"
            placeholder="Your lower blood pressure"
            min={40}
            max={130}
          />

          <button className="bg-teal-500 p-1 mt-2 rounded-lg text-white w-full">
            Submit
          </button>
        </div>
      </form>

      {loading === false &&
        realProduct.map((e) => (
          <div key={e._id} className="static">
            <p className="m-0 p-0 static flex gap-3">
              {e.date}:
              <span className="font-bold">
                {e.bloodPressureUp} / {e.bloodPressureDown}
              </span>
              <Link
                href={"/edit-bloodPressure/" + e._id}
                className="hover:cursor-pointer"
              >
                <Pencil />
              </Link>
              <Link
                href={"/delete-bloodPressure/" + e._id}
                className="hover:cursor-pointer"
              >
                <Trash2 color="#ff0000" />
              </Link>
            </p>
          </div>
        ))}

      {loading === true && <div>Loading...</div>}
      {realProduct.length === 0 && <div>No blood pressure found.</div>}
      <Footer></Footer>
    </div>
  );
};

export default BloodPressure;