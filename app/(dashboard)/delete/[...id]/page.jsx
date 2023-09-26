"use client"

import { useClerk } from "@clerk/nextjs";
import axios from "axios";
import { useEffect, useState } from "react"
import { toast } from "react-hot-toast";
import { withSwal } from "react-sweetalert2";

const DeletePage = ({swal}) => {


    const [value, setValue] = useState("");
    const [id, setId] = useState("");
    const [loading,setLoading] = useState(true);
     const clerk = useClerk();

 

    const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Leden je 0
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
    };

    useEffect(() => {
     
      const DeleteAxios = axios.get(`/api/weight`); 
   

      DeleteAxios.then((response) => {
        const data = response.data; // Získajte údaje z odpovede
        const dataWeights = data.Weights;
            setLoading(true);

        // Filtrujte podľa _id
        const matchingDeleteId = dataWeights.filter(
          (entry) =>
            `http://localhost:3000/delete/${entry._id}` ===
            window.location.href
        );
        if (matchingDeleteId.length > 0) {
          setId(matchingDeleteId[0]._id);
          setValue(matchingDeleteId[0].weight); // Nastavte hodnotu na prvý nájdený záznam (predpokladáme, že ide o unikátne ID)
          setLoading(false);
        
        }

        
      });
    }, []);
    
const handleDelete = () => {
  swal
    .fire({
      title: "Are you sure you want to delete this weight?",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Yes, delete",
      reverseButtons: true,
    })
    .then(function (result) {
      if (result.isConfirmed) {
        // If the user confirms the deletion
        axios
          .delete(`/api/weight?id=${id}`) // Assuming the endpoint includes the ID
          .then((response) => {
            // Handle success or display a message to the user
            toast.success("Deleted!");

            // Check if there are any other weight entries for the current day
            axios.get("/api/weight").then((response) => {
              const data = response.data;
              const dataWeights = data.Weights;

              if (!clerk.user) {
                return null; // Případně můžete zobrazit nějakou chybu, pokud uživatel není přihlášen
              }
              const userId = clerk.user.id;

              const hasEntriesForCurrentDay = dataWeights.some(
                (entry) =>
                  entry.date === getCurrentDate() && entry.userId === userId
              );

             if (!hasEntriesForCurrentDay) {
                // If there are no more entries for the current day, set canSubmit to true
                if (userId === response.data.userId ) {
                  return
                }
                
              }

              // Redirect to the weight page
              window.location.href = "http://localhost:3000/weight";
            });
          });
      }
    });
};


    

  return (
    <div className=" flex-col flex   items-center justify-center mt-10 gap-2">
      <h1 className="text-center text-3xl font-bold mb-4">
 
          Delete weight
      </h1>
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
}

export default withSwal( DeletePage)
