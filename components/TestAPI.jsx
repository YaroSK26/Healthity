"use client"
import {useEffect, useState } from "react";

const TestAPI = () => {
  const [quote, setQuote] = useState("Loading...");
  const [author, setAuthor] = useState("Loading...");

  const url = "https://api.themotivate365.com/stoic-quote";

  const getQuote = async () => {
    const response = await fetch(url);
    const data = await response.json();
    const finalQuote = data["quote"];
    const FinalAuthor = data["author"];
    setQuote(finalQuote);
    setAuthor(FinalAuthor);
    
  };

  useEffect(() => {
    getQuote();
  }, []);

  return (
    <div className="flex flex-col items-center lg:w-[30rem] w-[20rem] ">
      <h1 className="font-bold text-2xl my-4 text-center  font-barlow ">{quote}</h1>
      <p className="italic">{author}</p>
    </div>
  );
}



export default TestAPI;
