"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useClerk } from "@clerk/clerk-react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

const Activities = () => {
  const activities = [
    {
      id: "1",
      title: "Running",
      src: "https://d2jx2rerrg6sh3.cloudfront.net/images/Article_Images/ImageForArticle_22980_16600577310868068.jpg",
      opt1: "15min",
      opt2: "30min",
      opt3: "60min",
      kcal: -600,
    },
    {
      id: "2",
      title: "Walking",
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSp0flcc_wNO5ciMYfrsXUsSu7xTNq6gjeL9-6rXgtyOKIP7_0MjMV3YG8lOXnYxFLSeeo&usqp=CAU",
      opt1: "15min",
      opt2: "30min",
      opt3: "60min",
      kcal: -257,
    },
    {
      id: "3",
      title: "Exercising",
      src: "https://bestbody.sk/wp-content/uploads/2022/05/Silovy-trening-ucinky-bestbody.jpg",
      opt1: "15min",
      opt2: "30min",
      opt3: "60min",
      kcal: -339,
    },
    {
      id: "4",
      title: "Football training",
      src: "https://mediamanager.ws/images/1337x0xresize/eshop/d/demisport/2021/12/snimka-obrazovky-2021-12-07-o-22-53-19.png",
      opt1: "15min",
      opt2: "30min",
      opt3: "60min",
      kcal: -550,
    },
    {
      id: "5",
      title: "Basketball training",
      src: "https://static.owayo-cdn.com/newhp/img/magazin/basketballworkoutEN/basketball-practice-plan-design-670px.jpg",
      opt1: "15min",
      opt2: "30min",
      opt3: "60min",
      kcal: -600,
    },
    {
      id: "6",
      title: "Hockey training",
      src: "https://thecoachessite.com/wp-content/uploads/2019/02/Oct28_Cover_.png",
      opt1: "15min",
      opt2: "30min",
      opt3: "60min",
      kcal: -750,
    },
    {
      id: "7",
      title: "Swimming",
      src: "https://www.nasezdravie.sk/files/magazin/2021/fitness/plavanie/plavanie-zdravie.jpg",
      opt1: "15min",
      opt2: "30min",
      opt3: "60min",
      kcal: -600,
    },
    {
      id: "8",
      title: "Hiking",
      src: "https://hashtag.zoznam.sk/wp-content/uploads/2022/07/Letna%CC%81-tu%CC%81ra-Zdroj-Unsplash.comToomas-Tartes-1200x550.jpg",
      opt1: "15min",
      opt2: "30min",
      opt3: "60min",
      kcal: -500,
    },
    {
      id: "9",
      title: "Cycling",
      src: "https://cdn.hudy.cz/images/w1920h1200-cover/3/105013.jpg",
      opt1: "15min",
      opt2: "30min",
      opt3: "60min",
      kcal: -420,
    },
    {
      id: "10",
      title: "Sitting",
      src: "https://img.freepik.com/free-photo/picture-stylish-handsome-young-guy-with-fuzzy-beard-voluminous-hairdo-bare-feet-keeping-eyes-closed-falling-asleep-listening-classical-music-enjoying-leisure-time-sitting-couch_343059-1841.jpg",
      opt1: "15min",
      opt2: "30min",
      opt3: "60min",
      kcal: -45,
    },
    {
      id: "11",
      title: "Sleeping",
      src: "https://ichef.bbci.co.uk/news/976/cpsprodpb/141D6/production/_130609328_gettyimages-1449310942.jpg",
      opt1: "15min",
      opt2: "30min",
      opt3: "60min",
      kcal: -100,
    },
    {
      id: "12",
      title: "Eating",
      src: "https://max-website20-images.s3.ap-south-1.amazonaws.com/MHC_Digital_Sit_Down_While_You_Eat_Part_36_925x389pix_200422n_01_d24a490fce.jpg",
      opt1: "15min",
      opt2: "30min",
      opt3: "60min",
      kcal: -20,
    },
  ];

  const [activitiesDates, setActivitiesDates] = useState({});
  const [filterLetter, setFilterLetter] = useState("");
  const [filteredActivities, setFilterActivities] = useState(activities);
  const [activitiesSelections, setActivitiesSelections] = useState({});
  const [loading, setLoading] = useState(false);

  const clerk = useClerk();
  const userId = clerk.user ? clerk.user.id : null;
  const [date, setDate] = useState(new Date());

  const handleAddFood = async (e, item) => {
    e.preventDefault();

    try {
      const optionHundred = parseFloat(
        activitiesSelections[item.id]?.option || item.opt1
      );
      const quantityFinal = parseFloat(
        activitiesSelections[item.id]?.quantity || 1
      );
      const data = {
        title: item.title,
        date: activitiesDates[item.title] || selectedDate,
        userId,
        activityId: item.id,
        quantity: quantityFinal,
        option: optionHundred,
        kcal: item.kcal.toFixed(1),
      };

      setLoading(true);

      // Odeslání dat na server
      const res = await axios.post("/api/activities", data);

      const refreshPage = () => {
        setTimeout(() => {
          window.location.reload();
        }, 500);
      };

      if (res) {
        toast.success("Added!");
        refreshPage();
        setLoading(false);
      } else {
        throw new Error("Error");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getCurrentDate = (date) => {
    if (!date) {
      // If date is undefined, return the current date
      date = new Date();
    }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleDateChange = (days, item) => {
    setActivitiesDates((prevDates) => {
      const currentFoodDate = prevDates[item.title] || date;
      const newDate = new Date(currentFoodDate);
      newDate.setDate(newDate.getDate() + days);
      return { ...prevDates, [item.title]: newDate };
    });
  };

  const handleInputChange = (event, item) => {
    const { value } = event.target;
    setActivitiesDates((prevDates) => ({
      ...prevDates,
      [item.title]: value,
    }));
  };

  const filterActivites = (letter) => {
    const filtered = activities.filter((item) =>
      item.title.toLowerCase().includes(letter.toLowerCase())
    );
    setFilterActivities(filtered);
  };
  useEffect(() => {
    filterActivites(filterLetter);
  }, [filterLetter]);

  const [selectedDate, setSelectedDate] = useState(getCurrentDate());

  const calculateDynamicKcal = (item) => {
    const optionHundred = parseFloat(
      activitiesSelections[item.id]?.option || item.opt1
    );
    const quantityFinal = parseFloat(
      activitiesSelections[item.id]?.quantity || 1
    );

    // Use the initial kcal value from the activities array
    const initialKcal = parseFloat(item.kcal);

    // Calculate dynamic kcal based on quantity and time
    const dynamicKcal = (
      initialKcal *
      quantityFinal *
      (optionHundred / 60)
    ).toFixed(1);

    return `${dynamicKcal} kcal`;
  };
  return (
    <div className="flex flex-col justify-center items-center mt-5 gap-5 relative">
      <Link href={"food-lobby"} className="absolute left-3 top-2">
        <ArrowLeft />
      </Link>
      <h1 className="text-center text-3xl font-bold mb-4">Activities</h1>
      <form>
        <label>Filter: </label>
        <input
          type="text"
          className="bg-gray-200 rounded-xl p-1"
          value={filterLetter}
          onChange={(e) => setFilterLetter(e.target.value)}
        />
      </form>
      <div className="flex gap-3 justify-center  items-center flex-wrap mb-3">
        {filteredActivities.map((item) => (
          <form key={item.title} onSubmit={(e) => handleAddFood(e, item)}>
            <div className="w-60 h-[350px] border border-sky-500 rounded-xl flex flex-col items-center gap-3">
              <img
                className="rounded-xl p-1 w-60 h-36 "
                src={item.src}
                alt=""
              />
              <p className="text-lg font-bold text-center">{item.title}</p>

              <div className="flex  gap-2">
                <ArrowLeft onClick={() => handleDateChange(-1, item)} />
                <div className="flex gap-2 ">
                  <input
                    className="bg-gray-200 rounded-xl text-center"
                    type="date"
                    value={activitiesDates[item.title] || selectedDate}
                    onChange={(e) => handleInputChange(e, item)}
                  />
                </div>

                <ArrowRight onClick={() => handleDateChange(1, item)} />
              </div>

              <div className="flex flex-col">
                <div className="text-xl font-bold mb-3 text-center">
                  {calculateDynamicKcal(item)}
                </div>
                <div className="flex">
                  <label htmlFor="quantity">Quantity: &nbsp; </label>
                  <input
                    className="bg-gray-200 rounded-xl w-12 text-center"
                    type="number"
                    min={1}
                    step={1}
                    value={activitiesSelections[item.id]?.quantity || 1}
                    onChange={(e) => {
                      setActivitiesSelections((prevSelections) => ({
                        ...prevSelections,
                        [item.id]: {
                          ...prevSelections[item.id],
                          quantity: e.target.value,
                        },
                      }));
                    }}
                  />
                  ×
                  <select
                    className="bg-gray-200 rounded-xl"
                    value={activitiesSelections[item.id]?.option || ""}
                    onChange={(e) => {
                      setActivitiesSelections((prevSelections) => ({
                        ...prevSelections,
                        [item.id]: {
                          ...prevSelections[item.id],
                          option: e.target.value,
                        },
                      }));
                    }}
                  >
                    <option>{item.opt1}</option>
                    <option>{item.opt2}</option>
                    <option>{item.opt3}</option>
                  </select>
                </div>
              </div>
              <button className="bg-sky-500 p-1 rounded-lg text-white w-[90%] ">
                Add
              </button>
            </div>
          </form>
        ))}
      </div>
    </div>
  );
};

export default Activities;
