"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { withSwal } from "react-sweetalert2";

const EditPage = ({swal}) => {
 const [journal, setJournal] = useState("");
 const [theme, setTheme] = useState("");
 const [problem, setProblem] = useState("");
 const [result, setResult] = useState("");
const [id, setId] = useState("");

useEffect(() => {
  const DeleteAxios = axios.get(`/api/journal`);

  DeleteAxios.then((response) => {
    const data = response.data; // Get data from the response
    const dataJournals = data.Journals;

    // Filter by _id and extract the first match
    const matchingEditId = dataJournals.find(
      (entry) =>
        `http://localhost:3000/edit-journal/${entry._id}` === window.location.href
    );

    if (matchingEditId) {
      setId(matchingEditId._id); // Set the id state with the found id
      setTheme(matchingEditId.theme); 
      setProblem(matchingEditId.problem); 
      setJournal(matchingEditId.journal); 
      setResult(matchingEditId.result); 
    }
  });
}, []);


  const handleEdit = (event) => {
    event.preventDefault();
    axios
      .put(`/api/journal?id=${id}`, { theme, problem, journal, result })
      .then((response) => {
        // Handle success or display a message to the user
        toast.success("Edited!");
        window.location.href = "http://localhost:3000/journal";
      })
      .catch((error) => {
        // Handle errors or display an error message to the user
        swal.fire("Error", "Failed to edit the  journal.", "error");
      });
  };

  return (
    <div className=" flex-col flex   items-center justify-center mt-10 gap-2">
      <form >
        <h1 className="text-center text-3xl font-bold mb-4">
          Edit your journal
        </h1>
        <div className="flex flex-col">
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

          <button onClick={(event) => handleEdit(event)} className="bg-black p-2 rounded-lg mt-1 text-white">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default withSwal(EditPage);
