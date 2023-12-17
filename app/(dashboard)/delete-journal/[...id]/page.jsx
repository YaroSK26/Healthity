"use client"

import { useClerk } from "@clerk/nextjs";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { withSwal } from "react-sweetalert2";

const DeletePage = ({ swal }) => {
  const [value, setValue] = useState("");
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(true);
  const clerk = useClerk();

  // Base URL for API requests
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/journal`).then((response) => {
      const data = response.data;
      const dataJournals = data.Journals;
      setLoading(true);

      const currentUrl = window.location.href;
      const matchingDeleteId = dataJournals.filter(
        (entry) =>
          `${window.location.origin}/delete-journal/${entry._id}` === currentUrl
      );

      if (matchingDeleteId.length > 0) {
        setId(matchingDeleteId[0]._id);
        setValue(matchingDeleteId[0].date);
        setLoading(false);
      }
    });
  }, []);

  const handleDelete = () => {
    swal
      .fire({
        title: "Are you sure you want to delete this journal?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, delete",
        reverseButtons: true,
      })
      .then(function (result) {
        if (result.isConfirmed) {
          axios.delete(`${API_BASE_URL}/api/journal?id=${id}`).then(() => {
            toast.success("Deleted!");
            axios.get(`${API_BASE_URL}/api/journal`).then((response) => {
              const data = response.data;
              const dataJournals = data.Journals;
              if (!clerk.user) return null;

              const userId = clerk.user.id;
              const hasEntriesForCurrentDay = dataJournals.some(
                (entry) =>
                  entry.date === getCurrentDate() && entry.userId === userId
              );

              if (hasEntriesForCurrentDay) {
                console.log(dataJournals);
              }

              window.location.href = `${window.location.origin}/journal`;
            });
          });
        }
      });
  };

  return (
    <div className=" flex-col flex   items-center justify-center mt-10 gap-2">
      <h1 className="text-center text-3xl font-bold mb-4">Delete journal</h1>
      <div>
        <input
          className="border border-teal-500 m-1 pl-1 p-1 bg-gray-200 rounded-lg w-56"
          type="text"
          value={value}
          disabled
          placeholder="Loading..."
        />
        <button
          className="bg-red-600 p-1 rounded-lg text-white w-16"
          disabled={loading}
          onClick={() => handleDelete()}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default withSwal( DeletePage)
