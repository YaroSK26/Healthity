"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { withSwal } from "react-sweetalert2";
import Footer from "../../../../components/Footer";

const EditPage = ({ swal }) => {
  const [value, setValue] = useState("");
  const [value2, setValue2] = useState("");
  const [id, setId] = useState("");

  // Base URL for API requests
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/api/bloodPressure`)
      .then((response) => {
        const data = response.data;
        if (data && data.BloodPressures && Array.isArray(data.BloodPressures)) {
          const dataBloodPressure = data.BloodPressures;

          const currentUrl = window.location.href;
          const matchingEditId = dataBloodPressure.find(
            (entry) =>
              `${window.location.origin}/edit-bloodPressure/${entry._id}` ===
              currentUrl
          );

          if (matchingEditId) {
            setId(matchingEditId._id);
            setValue(matchingEditId.bloodPressureUp);
            setValue2(matchingEditId.bloodPressureDown);
          }
        } else {
          console.error("Unexpected response structure:", data);
        }
      })
      .catch((error) => {
        console.error("API request failed:", error);
      });
  }, []);

  const handleEdit = () => {
    axios
      .put(`${API_BASE_URL}/api/bloodPressure?id=${id}`, {
        bloodPressureUp: value,
        bloodPressureDown: value2,
      })
      .then(() => {
        toast.success("Edited!");
        window.location.href = `${window.location.origin}/bloodPressure`;
      })
      .catch((error) => {
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
          className="bg-teal-500 p-1 my-2 rounded-lg text-white w-full"
          onClick={() => handleEdit()}
        >
          Submit
        </button>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default withSwal(EditPage);
