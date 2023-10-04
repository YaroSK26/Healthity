"use client";
import { ArrowLeft, ArrowRight, Plus, Settings, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useClerk } from "@clerk/clerk-react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { withSwal } from "react-sweetalert2";


const FoodLobby = ({swal}) => {
  const [active, setActive] = useState("overview");
  const [foodSettings, setFoodSettings] = useState("");
  const [loading, setLoading] = useState(false);
  const [activities, setActivities] = useState([]);

  const [date, setDate] = useState(new Date());
  const clerk = useClerk();
  const userId = clerk.user ? clerk.user.id : null;

  const getCurrentDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleDateChange = (days) => {
    setDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setDate(prevDate.getDate() + days);
      return newDate;
    });
  };

  const handleInputChange = (event) => {
    setDate(new Date(event.target.value));
  };

  const [breakfast, setBreakfast] = useState([]);
  const [snack, setSnack] = useState([]);
  const [lunch, setLunch] = useState([]);
  const [olovrant, setOlovrant] = useState([]);
  const [dinner, setDinner] = useState([]);
  const [secondDinner, setSecondDinner] = useState([]);

  useEffect(() => {
   if (userId) {
     setLoading(true);

     const currentDate = getCurrentDate(date);

     // Fetch activities based on user ID and date
   axios
     .get(`/api/activities?userId=${userId}&date=${currentDate}`)
     .then((response) => {
       const activitiesData = response.data.Activity;
       const matchingEntriesActivities = activitiesData.filter(
         (entry) =>
           entry.userId === userId &&
           entry.date === currentDate
       );
       setActivities(matchingEntriesActivities);
     })
     .catch((error) => {
       console.error("Error fetching activities:", error);
     })
     .finally(() => {
       setLoading(false);
     });

     axios
       .get(`/api/food?userId=${userId}`)
       .then((response) => {
         const matchingEntriesBreakfast = response.data.Foods.filter(
           (entry) =>
             entry.time === "Breakfast" &&
             entry.userId === userId &&
             entry.date === currentDate
         );

         const matchingEntriesSnack = response.data.Foods.filter(
           (entry) =>
             entry.time === "Snack" &&
             entry.userId === userId &&
             entry.date === currentDate
         );
         const matchingEntriesLunch = response.data.Foods.filter(
           (entry) =>
             entry.time === "Lunch" &&
             entry.userId === userId &&
             entry.date === currentDate
         );
         const matchingEntriesOlovrant = response.data.Foods.filter(
           (entry) =>
             entry.time === "Olovrant" &&
             entry.userId === userId &&
             entry.date === currentDate
         );
         const matchingEntriesDinner = response.data.Foods.filter(
           (entry) =>
             entry.time === "Dinner" &&
             entry.userId === userId &&
             entry.date === currentDate
         );
         const matchingEntriesSecondDinner = response.data.Foods.filter(
           (entry) =>
             entry.time === "Second dinner" &&
             entry.userId === userId &&
             entry.date === currentDate
         );

         setBreakfast(matchingEntriesBreakfast);
         setSnack(matchingEntriesSnack);
         setLunch(matchingEntriesLunch);
         setOlovrant(matchingEntriesOlovrant);
         setDinner(matchingEntriesDinner);
         setSecondDinner(matchingEntriesSecondDinner);
       })
       .catch((error) => {
         console.error("Error fetching food data:", error);
       });
   }


   
  }, [userId,date]);


  const handleDelete = (entryId) => {
    // Send a request to your API to delete the entry
    axios.delete(`/api/food?id=${entryId}`); // Use "id" instead of "userId" in the query parameter
    swal
      .fire({
        title: "Are you sure you want to delete this?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, delete",
        reverseButtons: true,
      })
      .then((response) => {
        // Update state to remove the deleted entry
        setBreakfast((prevBreakfast) =>
          prevBreakfast.filter((item) => item.id !== entryId)
        );
        setSnack((prevSnack) =>
          prevSnack.filter((item) => item.id !== entryId)
        );
        setLunch((prevLunch) =>
          prevLunch.filter((item) => item.id !== entryId)
        );
        setOlovrant((prevOlovrant) =>
          prevOlovrant.filter((item) => item.id !== entryId)
        );
        setDinner((prevDinner) =>
          prevDinner.filter((item) => item.id !== entryId)
        );
        setSecondDinner((prevSecondDinner) =>
          prevSecondDinner.filter((item) => item.id !== entryId)
        );

        toast.success("Deleted!");
        // You may need to do similar updates for other meal categories
      })
      .catch((error) => {
        console.error("Error deleting entry:", error);
      })
      .finally(() => {
        location.reload();
      });

    axios.delete(`/api/activities?id=${entryId}`); // Use "id" instead of "userId" in the query parameter
    swal
      .fire({
        title: "Are you sure you want to delete this?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, delete",
        reverseButtons: true,
      })
      .then((response) => {
        // Update state to remove the deleted entry
   
         setActivities((prevActivities) =>
           prevActivities.filter((item) => item.id !== entryId)
         );
        toast.success("Deleted!");
        // You may need to do similar updates for other meal categories
      })
      .catch((error) => {
        console.error("Error deleting entry:", error);
      })
      .finally(() => {
        location.reload();
      });

   
  };

  const sum = [
    {
      title: "Sum",
      kcal: 100,
      fromKcal: foodSettings.sum || 2000,
      percent: function () {
        return (
          ((totalKcal +
            totalKcal2 +
            totalKcal3 +
            totalKcal4 +
            totalKcal5 +
            totalKcal6 +
            activities.reduce((acc, activity) => acc + activity.kcal, 0)) /
            this.fromKcal) *
          100
        ).toFixed(0);
      },
    },
  ];

  const totalG = [
    {
      title: "Protein",
      g: 100,
      fromG: foodSettings.protein || 120,
      percent: function () {
        return ((this.g / this.fromG) * 100).toFixed(0);
      },
    },
    {
      title: "Carbs",
      g: 12,
      fromG: foodSettings.carbs || 250,
      percent: function () {
        return ((this.g / this.fromG) * 100).toFixed(0);
      },
    },
    {
      title: "Fat",
      g: 11,
      fromG: foodSettings.fat || 50,
      percent: function () {
        return ((this.g / this.fromG) * 100).toFixed(0);
      },
    },
    {
      title: "Roughage",
      g: 50,
      fromG: foodSettings.roughage || 20,
      percent: function () {
        return ((this.g / this.fromG) * 100).toFixed(0);
      },
    },
  ];

 

  let totalKcal = 0;
  let totalKcal2 = 0;
  let totalKcal3 = 0;
  let totalKcal4 = 0;
  let totalKcal5 = 0;
  let totalKcal6 = 0;

  let totalP = 0;
  let totalP2 = 0;
  let totalP3 = 0;
  let totalP4 = 0;
  let totalP5 = 0;
  let totalP6 = 0;

  let totalC = 0;
  let totalC2 = 0;
  let totalC3 = 0;
  let totalC4 = 0;
  let totalC5 = 0;
  let totalC6 = 0;

  let totalF = 0;
  let totalF2 = 0;
  let totalF3 = 0;
  let totalF4 = 0;
  let totalF5 = 0;
  let totalF6 = 0;

  let totalR = 0;
  let totalR2 = 0;
  let totalR3 = 0;
  let totalR4 = 0;
  let totalR5 = 0;
  let totalR6 = 0;

  breakfast.forEach((item) => {
    totalKcal += item.kcal;
    totalP += item.protein;
    totalC += item.carbs;
    totalF += item.fat;
    totalR += item.roughage;
  });

  snack.forEach((item) => {
    totalKcal2 += item.kcal;
    totalP2 += item.protein;
    totalC2 += item.carbs;
    totalF2 += item.fat;
    totalR2 += item.roughage;
    
  });

  lunch.forEach((item) => {
    totalKcal3 += item.kcal;
    totalP3 += item.protein;
    totalC3 += item.carbs;
    totalF3 += item.fat;
    totalR3 += item.roughage;
  });

  olovrant.forEach((item) => {
    totalKcal4 += item.kcal;
    totalP4 += item.protein;
    totalC4 += item.carbs;
    totalF4 += item.fat;
    totalR4 += item.roughage;
  });

  dinner.forEach((item) => {
    totalKcal5 += item.kcal;
    totalP5 += item.protein;
    totalC5 += item.carbs;
    totalF5 += item.fat;
    totalR5 += item.roughage;
  });

  secondDinner.forEach((item) => {
    totalKcal6 += item.kcal;
    totalP6 += item.protein;
    totalC6 += item.carbs;
    totalF6 += item.fat;
    totalR6 += item.roughage;
  });
  

  return (
    <div className="flex flex-col justify-center items-center mt-5 gap-5  ">
      <h1 className="text-center text-3xl font-bold mb-4">Food tracker</h1>

      <div className="flex flex-col gap-5 border-2 p-1 border-black w-[320px] justify-start items-center max-h-[475px]  min-h-[350px] overflow-auto rounded-2xl mb-5">
        <div className="flex relative gap-5 mt-2">
          <div className="absolute right-48">
            <Link href={"/food-settings"}>
              <Settings />
            </Link>
          </div>
          {loading === false && (
            <div className="flex gap-5">
              <h2
                onClick={() => setActive("overview")}
                className={`text-lg font-bold ${
                  active === "overview" ? "underline" : ""
                } cursor-pointer`}
              >
                Overview
              </h2>
              <h2
                onClick={() => setActive("food")}
                className={`text-lg font-bold ${
                  active === "food" ? "underline" : ""
                } cursor-pointer`}
              >
                Food
              </h2>
            </div>
          )}
        </div>
        <div>
          <div className="flex gap-10">
            <ArrowLeft onClick={() => handleDateChange(-1)} />
            <div className="flex gap-2">
              <input
                type="date"
                value={getCurrentDate(date)}
                onChange={handleInputChange}
              />
            </div>

            <ArrowRight onClick={() => handleDateChange(1)} />
          </div>
          {loading && <p className="text-center">Loading...</p>}
          {active === "overview" && (
            <div>
              <div className="grid grid-cols-2 mt-4 gap-5 w-68 relative mx-auto">
                <div className="border-2 rounded-2xl  border-black pl-1 ">
                  <p className="text-sm p-1">Intake</p>
                  <p className="font-bold text-lg p-1">
                    {totalKcal +
                      totalKcal2 +
                      totalKcal3 +
                      totalKcal4 +
                      totalKcal5 +
                      totalKcal6}
                    kcal
                  </p>
                  <Link
                    href="/food"
                    className="absolute left-[100px] bottom-5 text-white bg-sky-500 rounded-full"
                  >
                    <Plus />
                  </Link>
                </div>
                <div className="border-2 rounded-2xl  border-black pl-1">
                  <p className="text-sm p-1">Activities</p>
                  <p className="font-bold text-lg p-1">
                    {activities.reduce(
                      (acc, activity) => acc + activity.kcal,
                      0
                    )}
                    kcal
                  </p>
                  <Link
                    href="/activities"
                    className="absolute left-[252px] bottom-5 text-white bg-sky-500 rounded-full"
                  >
                    <Plus />
                  </Link>
                </div>
              </div>
              <div className="flex gap-2 mt-8 ">
                {sum.map((item) => (
                  <div
                    className="flex justify-center items-center gap-2"
                    key={item.title}
                  >
                    <div className="rounded-full  bg-sky-500 w-[55px] h-[55px] flex justify-center items-center">
                      <div className="rounded-full  bg-white w-10 h-10 text-gray-900 p-1 justify-center flex items-center">
                        {item.percent()}%
                      </div>
                    </div>
                    <div>
                      <p>Sum</p>
                      <p className="font-bold text-lg">
                        {totalKcal +
                          totalKcal2 +
                          totalKcal3 +
                          totalKcal4 +
                          totalKcal5 +
                          totalKcal6 +
                          activities.reduce(
                            (acc, activity) => acc + activity.kcal,
                            0
                          )}
                        kcal&nbsp;
                        <span className="font-normal text-sm">
                          from {item.fromKcal} kcal
                        </span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-1">
                <div className="flex gap-2 mt-6 mb-2">
                  <div className="rounded-full  bg-sky-500 w-[55px] h-[55px] flex justify-center items-center mt-2">
                    <div className="rounded-full  bg-white w-10 h-10 text-gray-900 p-1 justify-center flex items-center">
                      {totalG.length > 0 &&
                        `${(
                          ((totalP +
                            totalP2 +
                            totalP3 +
                            totalP4 +
                            totalP5 +
                            totalP6) /
                            totalG[0].fromG) *
                          100
                        ).toFixed(0)}%`}
                    </div>
                  </div>
                  <div>
                    <p>Protein</p>
                    <p className="font-bold flex flex-col ">
                      {totalP + totalP2 + totalP3 + totalP4 + totalP5 + totalP6}{" "}
                      g
                    </p>
                    {totalG.map((item, index) => (
                      <span key={item.title} className="font-normal text-sm">
                        {index === 0 && `from ${item.fromG} g`}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2 mt-6 mb-2">
                  <div className="rounded-full  bg-sky-500 w-[55px] h-[55px] flex justify-center items-center mt-2">
                    <div className="rounded-full  bg-white w-10 h-10 text-gray-900 p-1 justify-center flex items-center">
                      {totalG.length > 0 &&
                        `${(
                          ((totalC +
                            totalC2 +
                            totalC3 +
                            totalC4 +
                            totalC5 +
                            totalC6) /
                            totalG[1].fromG) *
                          100
                        ).toFixed(0)}%`}
                    </div>
                  </div>
                  <div>
                    <p>Carbs</p>
                    <p className="font-bold flex flex-col ">
                      {totalC + totalC2 + totalC3 + totalC4 + totalC5 + totalC6}{" "}
                      g
                    </p>
                    {totalG.map((item, index) => (
                      <span key={item.title} className="font-normal text-sm">
                        {index === 1 && `from ${item.fromG} g`}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2 mt-6 mb-2">
                  <div className="rounded-full  bg-sky-500 w-[55px] h-[55px] flex justify-center items-center mt-2">
                    <div className="rounded-full  bg-white w-10 h-10 text-gray-900 p-1 justify-center flex items-center">
                      {totalG.length > 0 &&
                        `${(
                          ((totalF +
                            totalF2 +
                            totalF3 +
                            totalF4 +
                            totalF5 +
                            totalF6) /
                            totalG[2].fromG) *
                          100
                        ).toFixed(0)}%`}
                    </div>
                  </div>
                  <div>
                    <p>Fat</p>
                    <p className="font-bold flex flex-col ">
                      {totalF + totalF2 + totalF3 + totalF4 + totalF5 + totalF6}{" "}
                      g
                    </p>
                    {totalG.map((item, index) => (
                      <span key={item.title} className="font-normal text-sm">
                        {index === 2 && `from ${item.fromG} g`}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2 mt-6 mb-2">
                  <div className="rounded-full  bg-sky-500 w-[55px] h-[55px] flex justify-center items-center mt-2">
                    <div className="rounded-full  bg-white w-10 h-10 text-gray-900 p-1 justify-center flex items-center">
                      {totalG.length > 0 &&
                        `${(
                          ((totalR +
                            totalR2 +
                            totalR3 +
                            totalR4 +
                            totalR5 +
                            totalR6) /
                            totalG[3].fromG) *
                          100
                        ).toFixed(0)}%`}
                    </div>
                  </div>
                  <div>
                    <p>Roughage</p>
                    <p className="font-bold flex flex-col ">
                      {totalR + totalR2 + totalR3 + totalR4 + totalR5 + totalR6}{" "}
                      g
                    </p>
                    {totalG.map((item, index) => (
                      <span key={item.title} className="font-normal text-sm">
                        {index === 3 && `from ${item.fromG} g`}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {active === "food" && (
            <div className="mt-4 flex flex-col gap-2">
              <div className=" bg-gray-200 rounded-xl p-1 text-black flex justify-between items-center">
                <label htmlFor="ranajky">Breakfast </label>
                <div className="flex gap-2  ">
                  <p>{totalKcal} kcal</p>
                  <Link
                    href="/food"
                    className=" text-white bg-sky-500 rounded-full"
                  >
                    <Plus />
                  </Link>
                </div>
              </div>
              {breakfast.map((item) => (
                <p className="flex justify-between" key={item._id}>
                  {item.title} &nbsp;
                  <span className="text-gray-500">
                    {item.quantity} * {item.option}g/ml &nbsp; {item.kcal} kcal
                    &nbsp;
                  </span>
                  <Trash2
                    onClick={() => handleDelete(item._id)}
                    style={{ cursor: "pointer" }}
                    color="#ff0000"
                  />
                </p>
              ))}
              <div className=" bg-gray-200 rounded-xl p-1 text-black flex justify-between items-center">
                <label htmlFor="ranajky">Snack </label>
                <div className="flex gap-2  ">
                  <p>{totalKcal2} kcal</p>
                  <Link
                    href="/food"
                    className=" text-white bg-sky-500 rounded-full"
                  >
                    <Plus />
                  </Link>
                </div>
              </div>
              {snack.map((item) => (
                <p className="flex justify-between" key={item._id}>
                  {item.title} &nbsp;
                  <span className="text-gray-500">
                    {item.quantity} * {item.option}g/ml &nbsp; {item.kcal} kcal
                    &nbsp;
                  </span>
                  <Trash2
                    onClick={() => handleDelete(item._id)}
                    style={{ cursor: "pointer" }}
                    color="#ff0000"
                  />
                </p>
              ))}
              <div className=" bg-gray-200 rounded-xl p-1 text-black flex justify-between items-center">
                <label htmlFor="ranajky">Lunch </label>
                <div className="flex gap-2  ">
                  <p>{totalKcal3} kcal</p>

                  <Link
                    href="/food"
                    className=" text-white bg-sky-500 rounded-full"
                  >
                    <Plus />
                  </Link>
                </div>
              </div>
              {lunch.map((item) => (
                <p key={item._id} className="flex justify-between">
                  {item.title} &nbsp;
                  <span className="text-gray-500 ">
                    {item.quantity} * {item.option}g/ml &nbsp; {item.kcal} kcal
                    &nbsp;
                  </span>
                  <Trash2
                    onClick={() => handleDelete(item._id)}
                    style={{ cursor: "pointer" }}
                    color="#ff0000"
                  />
                </p>
              ))}
              <div className=" bg-gray-200 rounded-xl p-1 text-black flex justify-between items-center">
                <label htmlFor="ranajky">Olovrant </label>
                <div className="flex gap-2  ">
                  <p>{totalKcal4} kcal</p>
                  <Link
                    href="/food"
                    className=" text-white bg-sky-500 rounded-full"
                  >
                    <Plus />
                  </Link>
                </div>
              </div>
              {olovrant.map((item) => (
                <p className="flex justify-between" key={item._id}>
                  {item.title} &nbsp;
                  <span className="text-gray-500">
                    {item.quantity} * {item.option}g/ml &nbsp; {item.kcal} kcal
                    &nbsp;
                  </span>
                  <Trash2
                    onClick={() => handleDelete(item._id)}
                    style={{ cursor: "pointer" }}
                    color="#ff0000"
                  />
                </p>
              ))}
              <div className=" bg-gray-200 rounded-xl p-1 text-black flex justify-between items-center">
                <label htmlFor="ranajky">Dinner </label>
                <div className="flex gap-2  ">
                  <p>{totalKcal5} kcal</p>
                  <Link
                    href="/food"
                    className=" text-white bg-sky-500 rounded-full"
                  >
                    <Plus />
                  </Link>
                </div>
              </div>
              {dinner.map((item) => (
                <p className="flex justify-between" key={item._id}>
                  {item.title} &nbsp;
                  <span className="text-gray-500">
                    {item.quantity} * {item.option}g/ml &nbsp; {item.kcal} kcal
                    &nbsp;
                  </span>
                  <Trash2
                    onClick={() => handleDelete(item._id)}
                    style={{ cursor: "pointer" }}
                    color="#ff0000"
                  />
                </p>
              ))}
              <div className=" bg-gray-200 rounded-xl p-1 text-black flex justify-between items-center">
                <label htmlFor="ranajky">Second dinner </label>
                <div className="flex gap-2  ">
                  <p>{totalKcal6} kcal</p>
                  <Link
                    href="/food"
                    className=" text-white bg-sky-500 rounded-full"
                  >
                    <Plus />
                  </Link>
                </div>
              </div>
              {secondDinner.map((item) => (
                <p className="flex" key={item._id}>
                  {item.title} &nbsp;
                  <span className="text-gray-500">
                    {item.quantity} * {item.option}g/ml &nbsp; {item.kcal} kcal
                    &nbsp;
                  </span>
                  <Trash2
                    onClick={() => handleDelete(item._id)}
                    style={{ cursor: "pointer" }}
                    color="#ff0000"
                  />
                </p>
              ))}

              <div className=" bg-gray-200 rounded-xl p-1 text-black flex justify-between items-center">
                <label htmlFor="ranajky">Activities </label>
                <div className="flex gap-2  ">
                  <p>
                    {activities
                      .filter((entry) => entry.userId === userId)
                      .reduce((acc, activity) => acc + activity.kcal, 0) ||
                      0}{" "}
                    kcal
                  </p>
                  <Link
                    href="/activities"
                    className=" text-white bg-sky-500 rounded-full"
                  >
                    <Plus />
                  </Link>
                </div>
              </div>
              {activities
                .filter((entry) => entry.userId === userId)
                .map((activity) => (
                  <div key={activity.id} className="flex gap-3 justify-between">
                    <p>{activity.title}</p>
                    <p className="text-gray-500">{activity.kcal} kcal</p>
                    <Trash2
                      onClick={() => handleDelete(activity._id)}
                      style={{ cursor: "pointer" }}
                      color="#ff0000"
                    />
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default withSwal(FoodLobby);
