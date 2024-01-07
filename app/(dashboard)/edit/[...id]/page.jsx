"use client";
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
      .get(`${API_BASE_URL}/api/weight`)
      .then((response) => {
        const data = response.data;
        if (data && data.Weights && Array.isArray(data.Weights)) {
          const dataWeights = data.Weights;

          const currentUrl = window.location.href;
          const matchingEditId = dataWeights.find(
            (entry) =>
              `${window.location.origin}/edit/${entry._id}` === currentUrl
          );

          if (matchingEditId) {
            setId(matchingEditId._id);
            setValue(matchingEditId.weight);
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
      .put(`${API_BASE_URL}/api/weight?id=${id}`, { weight: value })
      .then(() => {
        toast.success("Edited!");
        window.location.href = `${window.location.origin}/weight`;
      })
      .catch(() => {
        swal.fire("Error", "Failed to edit the weight.", "error");
      });
  };

  return (
    <div>
      <div className="flex flex-col justify-center items-center  gap-5 min-h-screen ">
        <h1 className="text-center text-3xl font-bold mb-4">Edit weight</h1>
        <div>
          <input
            className="border border-teal-500 m-1 pl-1 p-1 rounded-lg w-56"
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Enter weight"
          />
          <button
            className="bg-teal-700 p-1 rounded-lg text-white w-16"
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
