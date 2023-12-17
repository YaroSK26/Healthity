"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useClerk } from "@clerk/clerk-react";
import { Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import Footer from "../../../components/Footer";

const Journal = () => {
  const [journal, setJournal] = useState("");
  const [theme, setTheme] = useState("");
  const [problem, setProblem] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [realProduct, setRealProduct] = useState([]);
  const clerk = useClerk();
  const userId = clerk.user ? clerk.user.id : null;

useEffect(() => {
  setLoading(true); // Nastavte loading na true predtým, ako začnete načítavať dáta
  axios
    .get("/api/journal")
    .then((response) => {
      const data = response.data;
      const dataJournals = data.Journals;

      const matchingEntries = dataJournals.filter(
        (entry) => entry.userId === userId
      );

      setRealProduct(matchingEntries);
      setLoading(false); // Nastavte loading na false až po tom, ako sa úspešne načítajú dáta
    })
    .catch((error) => {
      console.error("Error with loading your journal:", error);
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

    if (!journal || !theme || !problem || !result || !userId) {
      return;
    }

    try {
      const data = {
        theme,
        journal,
        problem,
        result,
        date: getCurrentDate(),
        userId,
      };
      setLoading(true);

      // Kontrola, či používateľ nemá žiadny existujúci produkt
      if (data) {
        // Odeslání dat na server
        const res = await axios.post("/api/journal", data);

        const refreshPage = () => {
          setTimeout(() => {
            window.location.reload();
          }, 500); // Zmena na 500 ms (pol sekundy)
        };

        if (res) {
          toast.success("Saved!");
          setJournal("");
          setTheme("");
          setProblem("");
          setResult("");
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
    <div className="flex flex-col justify-center items-center mt-5 gap-5 my-0">
      <form onSubmit={handleSubmit}>
        <h1 className="text-center text-3xl font-bold mb-4">
          Start your journal
        </h1>
        <div className="flex flex-col ">
          <label htmlFor="a" className="text-center font-bold text-lg">
            Theme
          </label>
          <textarea
            id="a"
            onChange={(e) => setTheme(e.target.value)}
            value={theme}
            className="border border-sky-600 m-1 pl-1 p-1 rounded-lg  resize-none h-32"
            type="text"
            placeholder="what do you want to write about, what is your topic? "
            required
          />
          <label htmlFor="b" className="text-center font-bold text-lg">
            Problem
          </label>
          <textarea
            id="b"
            onChange={(e) => setProblem(e.target.value)}
            value={problem}
            className="border border-sky-600 m-1 pl-1 p-1 rounded-lg resize-none h-32"
            type="text"
            required
            placeholder="what problem forced you to start writing this journal?  "
          />
          <label htmlFor="c" className="text-center font-bold text-lg">
            Journal
          </label>
          <textarea
            id="c"
            onChange={(e) => setJournal(e.target.value)}
            value={journal}
            className="border border-sky-600 m-1 pl-1 p-1 rounded-lg resize-none h-32"
            type="text"
            required
            placeholder="Write the thoughts you have in your head here."
          />
          <label htmlFor="d" className="text-center font-bold text-lg">
            Result
          </label>
          <textarea
            id="d"
            onChange={(e) => setResult(e.target.value)}
            value={result}
            className="border border-sky-600 m-1 pl-1 p-1 rounded-lg resize-none h-32"
            type="text"
            required
            placeholder="What have you come to? what did you learn after you wrote? what did you do wrong?"
          />

          <button className="bg-sky-600 p-2 rounded-lg mt-1 text-white">
            Submit
          </button>
        </div>
      </form>

      <h1 className="font-bold text-3xl mt-10">Your Journals</h1>

      {loading === false &&
        realProduct.map((e) => (
          <div
            key={e._id}
            className="static border border-sky-600 shadow-xl p-4 rounded-lg  w-[300px] sm:w-[500px]"
          >
            <h1 className="font-bold text-2xl mb-2">{e.date}</h1>

            <p>
              <span className="font-bold">Theme: </span>
              {e.theme}
            </p>
            <p>
              <span className="font-bold">Problem: </span>
              {e.problem}
            </p>
            <p>
              <span className="font-bold">Journal: </span>
              {e.journal}
            </p>
            <p>
              <span className="font-bold">Result: </span>
              {e.result}
            </p>

            <div className="flex mt-5 justify-center items-center gap-2">
              <Link
                href={"/edit-journal/" + e._id}
                className="hover:cursor-pointer"
              >
                <Pencil className="w-12 h-12" />
              </Link>
              <Link
                href={"/delete-journal/" + e._id}
                className="hover:cursor-pointer"
              >
                <Trash2 color="#ff0000" className="w-12 h-12" />
              </Link>
            </div>
          </div>
        ))}

      {loading === true && <div>Loading...</div>}
      {realProduct.length === 0 && <div>No journal found.</div>}

      <footer className="text-gray-200 w-full h-16 bg-teal-600 text-lg flex justify-center items-center">
        <div className="">
          &copy; Copyright all right reserved. Created by{" "}
          <Link
            target="_blank"
            href={"https://jaroslav-portfolio.vercel.app/"}
            className="underline"
          >
            Jaroslav Barabáš
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default Journal;
