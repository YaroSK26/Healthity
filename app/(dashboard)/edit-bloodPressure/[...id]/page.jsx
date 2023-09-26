"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { withSwal } from "react-sweetalert2";

const EditPage = ({swal}) => {
  const [value, setValue] = useState("");
  const [value2, setValue2] = useState("");
  const [id, setId] = useState("");

useEffect(() => {
  const DeleteAxios = axios.get(`/api/bloodPressure`);

  DeleteAxios.then((response) => {
    const data = response.data; // Get data from the response
    const dataBloodPressure = data.BloodPressures;

    // Filter by _id and extract the first match
    const matchingEditId = dataBloodPressure.find(
      (entry) =>
        `http://localhost:3000/edit-bloodPressure/${entry._id}` === window.location.href
    );

    if (matchingEditId) {
      setId(matchingEditId._id); // Set the id state with the found id
      setValue(matchingEditId.bloodPressureUp); // Set the value state
      setValue2(matchingEditId.bloodPressureDown); // Set the value state
    }
  });
}, []);


  const handleEdit = () => {
          axios
            .put(`/api/bloodPressure?id=${id}`, {
              bloodPressureUp: value,
              bloodPressureDown: value2,
            })
            .then((response) => {
              // Handle success or display a message to the user
              toast.success("Edited!");
              window.location.href = "http://localhost:3000/bloodPressure";
            })
            .catch((error) => {
              // Handle errors or display an error message to the user
              swal.fire("Error", "Failed to edit the blood pressure.", "error");
            });
  };

  return (
    <div className=" flex-col flex   items-center justify-center mt-10 gap-2">
      <h1 className="text-center text-3xl font-bold mb-4">
        Edit blood pressure
      </h1>
      <div className="w-52  flex flex-col  justify-center items-center m-auto">
        <label htmlFor="up" className="mr-auto font-semibold ">
          Your high blood pressure
        </label>
        <input
          id="up"
          onChange={(e) => setValue(e.target.value)}
          value={value}
          className="border border-teal-700 m-1 pl-1 p-1 rounded-lg w-56"
          type="number"
          step="1"
          placeholder="Your high blood pressure"
          min={60}
          max={200}
        />
        <label htmlFor="down" className="mr-auto font-semibold ">
          Your low blood pressure
        </label>
        <input
          id="down"
          onChange={(e) => setValue2(e.target.value)}
          value={value2}
          className="border border-teal-700 m-1 pl-1 p-1 rounded-lg w-56"
          type="number"
          step="1"
          placeholder="Your low blood pressure"
          min={40}
          max={130}
        />

        <button
          className="bg-black p-1 my-2 rounded-lg text-white w-full"
          onClick={() => handleEdit()}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default withSwal(EditPage);
