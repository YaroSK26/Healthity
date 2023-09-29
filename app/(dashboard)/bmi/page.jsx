"use client"
import axios from "axios"
    import { useEffect, useState } from "react"
    import { useClerk } from "@clerk/clerk-react";

const BmiPage = () => {
    const [weight, setWeight] = useState(null)
    const [height, setHeight] = useState(null)
    const [bmi, setBMI] = useState(null)
    const [lastWeight, setLastWeight] = useState(null)
      const clerk = useClerk();
      const userId = clerk.user ? clerk.user.id : null;

    const handleSubmit = (e) => {
        e.preventDefault()
       const parsedWeight = parseFloat(weight || lastWeight);
       if (!isNaN(parsedWeight)) {
         const BMI = parsedWeight / ((height / 100) * (height / 100));
         setBMI(BMI.toFixed(2));
       } else {
         // Ak váha nie je číslo, nastavíme BMI na null alebo inú hodnotu podľa potreby
         setBMI(null);
       }
    }

  const bmiPerson = () => {
    if (bmi < 18.5) {
      return "Underweight";
    } else if (bmi > 18.5 && bmi < 24.9) {
      return "Healthy";
    } else if (bmi > 24.9 && bmi < 29.9) {
      return "Overweight";
    } else if (bmi > 29.9 && bmi < 34.9) {
      return "Obese";
    } else if (bmi > 34.9) {
      return "Extremely obese";
    }
  };

useEffect(() => {
  // Načítanie existujúcich váh používateľa
  axios.get("/api/weight").then((response) => {
    const data = response.data;
    const dataWeights = data.Weights;

    const matchingEntries = dataWeights.filter(
      (entry) => entry.userId === userId
    );

    // Zoradíme záznamy podľa dátumu zostupne
    matchingEntries.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Skontrolujte, či existuje aspoň jeden záznam váhy
    if (matchingEntries.length > 0) {
      // Získať prvý (najnovší) záznam váhy
      const latestWeight = matchingEntries[0].weight;
      setLastWeight(latestWeight);
    } else {
      // Ak nie sú žiadne záznamy váhy, nastavte lastWeight na null alebo inú hodnotu podľa potreby
      setLastWeight(null);
    }
  });
}, [userId]);

     

  return (
    <div className="flex flex-col justify-center w-full items-center mt-5 gap-5">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center gap-2"
      >
        <h1 className="text-center text-3xl font-bold mb-4">
          Enter your weight to see your BMI
        </h1>
        <input
          className="border border-teal-500  m-1 pl-1 p-1 rounded-lg w-56"
          type="number"
          step="0.1"
          placeholder="Your Weight (kg)"
          min={1}
          max={150}
          required
          value={lastWeight || weight}
          onChange={(e) =>
            setWeight(e.target.value) || setLastWeight(e.target.value)
          }
        />
        <input
          className="border border-teal-500 m-1 pl-1 p-1 rounded-lg w-56"
          type="number"
          step="1"
          placeholder="Your Height (cm)"
          min={1}
          max={250}
          required
          value={height}
          onChange={(e) => setHeight(e.target.value)}
        />
        <div>
          <button className="bg-teal-500 p-1 rounded-lg text-white w-56">
            Submit
          </button>
        </div>
      </form>
      {bmi !== null && bmiPerson !== null && (
        <h2 className="text-teal-500">
          Your BMI is {bmi} . {bmiPerson()} weight.
        </h2>
      )}
    </div>
  );
}

export default BmiPage
