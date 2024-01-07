"use client"

import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { withSwal } from "react-sweetalert2";
import Footer from "../../../../components/Footer";

const EditPage = ({ swal }) => {
  const [value, setValue] = useState("");
  const [id, setId] = useState("");

  // Base URL for API requests
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/api/water`)
      .then((response) => {
        const data = response.data;
        if (data && data.Waters && Array.isArray(data.Waters)) {
          const dataWaters = data.Waters;

          const currentUrl = window.location.href;
          const matchingEditId = dataWaters.find(
            (entry) =>
              `${window.location.origin}/edit-water/${entry._id}` === currentUrl
          );

          if (matchingEditId) {
            setId(matchingEditId._id);
            setValue(matchingEditId.water);
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
      .put(`${API_BASE_URL}/api/water?id=${id}`, { water: value })
      .then(() => {
        toast.success("Edited!");
        window.location.href = `${window.location.origin}/water`;
      })
      .catch(() => {
        swal.fire("Error", "Failed to edit the water cup.", "error");
      });
  };

  return (
    <div>
      <div className="flex-col flex items-center justify-center min-h-screen gap-2">
        <h1 className="text-center text-3xl font-bold mb-4">Edit water cup</h1>
        <div>
          <select
            className="border border-teal-500 m-1 pl-1 p-1 rounded-lg w-56"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          >
            <option value="250">250</option>
            <option value="500">500</option>
            <option value="750">750</option>
            <option value="1000">1000</option>
          </select>
          <button
            className="bg-black p-1 rounded-lg text-white w-16"
            onClick={() => handleEdit()}
          >
            Save
          </button>
        </div>
      </div>
        <Footer></Footer>
    </div>
  );
};

export default withSwal(EditPage);
