"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { withSwal } from "react-sweetalert2";

const EditPage = ({swal}) => {
  const [value, setValue] = useState("");
  const [id, setId] = useState("");

useEffect(() => {
  const DeleteAxios = axios.get(`/api/weight`);

  DeleteAxios.then((response) => {
    const data = response.data; // Get data from the response
    const dataWeights = data.Weights;

    // Filter by _id and extract the first match
    const matchingEditId = dataWeights.find(
      (entry) =>
        `http://localhost:3000/edit/${entry._id}` === window.location.href
    );

    if (matchingEditId) {
      setId(matchingEditId._id); // Set the id state with the found id
      setValue(matchingEditId.weight); // Set the value state
    }
  });
}, []);


  const handleEdit = () => {
          axios
            .put(`/api/weight?id=${id}`, { weight: value })
            .then((response) => {
              // Handle success or display a message to the user
              toast.success("Edited!");
              window.location.href = "http://localhost:3000/weight";
            })
            .catch((error) => {
              // Handle errors or display an error message to the user
              swal.fire("Error", "Failed to delete the weight.", "error");
            });
  };

  return (
    <div className=" flex-col flex   items-center justify-center mt-10 gap-2">
      <h1 className="text-center text-3xl font-bold mb-4">Edit Weight</h1>
      <div>
        <input
          className="border border-teal-500 m-1 pl-1 p-1  rounded-lg w-56"
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}

          placeholder="Loading..."
        />
        <button
          className="bg-black p-1 rounded-lg text-white w-16"
          onClick={() => handleEdit()}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default withSwal(EditPage);
