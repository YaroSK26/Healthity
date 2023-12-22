"use client"
import { useEffect, useState } from "react";

const TestAPI = () => {
  const [quote, setQuote] = useState({
    text: "Loading...",
    author: "Loading...",
  });
  useEffect(() => {
    const getQuote = async () => {
      try {
        const response = await fetch("/quotes.json");
        const data = await response.json(); // 'data' now contains the whole JSON object
        const quotesArray = data.quotes; // Access the 'quotes' array from the JSON object
        const randomQuote =
          quotesArray[Math.floor(Math.random() * quotesArray.length)];
        setQuote(randomQuote);
      } catch (error) {
        console.error("Error fetching quote:", error);
        setQuote({ text: "Failed to load quote", author: "" });
      }
    };

    getQuote();
  }, []); // Empty dependency array to run once on mount

  useEffect(() => {
    console.log(quote);
  }, [quote]); // This will log the quote every time it changes

  return (
    <div className="flex flex-col items-center lg:w-[30rem] w-[20rem] ">
      <h1 className="font-bold text-2xl my-4 text-center font-barlow">
        {quote.text}  
      </h1>
      <p className="italic">{quote.author}</p>
    </div>
  );
};

export default TestAPI;
