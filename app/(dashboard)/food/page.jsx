"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useClerk } from "@clerk/clerk-react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

const Food = () => {
  
const food = [
  {
    id: "1",
    title: "Chicken soup",
    src: "https://img.aktuality.sk/foto/OTIweDUyMC9zbWFydC9pbWc=/qrkzJIm1Tij4VjutiSk4VA.jpg?st=sHTdgt8aeoIibEm9ZFW1Jhx25f7K3o3UsLDGyoVs_Vo&ts=1459766861&e=0",
    opt1: "250ml",
    opt2: "300ml",
    opt3: "350ml",
    time: "Lunch",
    kcal: 109,
    protein: 3.8,
    carbs: 15,
    fat: 3.8,
    roughage: 0.25,
  },
  {
    id: "2",
    title: "Tomato soup",
    src: "https://www.foodandwine.com/thmb/j1vJdgrMdu64ElBpxMzmvqpyt5U=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/creamy-tomato-soup-buttery-croutons-hero-02-49b419d00f854db78838a79c8df9a23f.jpg",
    opt1: "250ml",
    opt2: "300ml",
    opt3: "350ml",
    time: "Lunch",
    kcal: 35,
    protein: 0.8,
    carbs: 7,
    fat: 0.3,
    roughage: 0.6,
  },
  {
    id: "3",
    title: "Gulas soup",
    src: "https://food-images.files.bbci.co.uk/food/recipes/beef_goulash_soup_gulyas_16159_16x9.jpg",
    opt1: "250ml",
    opt2: "300ml",
    opt3: "350ml",
    time: "Lunch",
    kcal: 112,
    protein: 5.6,
    carbs: 9,
    fat: 6,
    roughage: 0.5,
  },
  {
    id: "4",
    title: "Chicken breast",
    src: "https://static01.nyt.com/images/2023/06/02/multimedia/02GRILL-BASICSrex4-chicken-lcwm/07GRILL-BASICSrex4-chicken-lcwm-superJumbo.jpg",
    opt1: "100g",
    opt2: "150g",
    opt3: "200g",
    time: "Lunch",
    kcal: 184,
    protein: 28.9,
    carbs: 0.6,
    fat: 7.4,
    roughage: 0,
  },
  {
    id: "5",
    title: "Grilled pork",
    src: "https://assets.epicurious.com/photos/54e7ad824f77a310045d7835/16:9/w_2000,h_1125,c_limit/EP-201502-Pork-6x4.jpg",
    opt1: "100g",
    opt2: "150g",
    opt3: "200g",
    time: "Lunch",
    kcal: 252,
    protein: 18,
    carbs: 0,
    fat: 20,
    roughage: 0,
  },
  {
    id: "6",
    title: "Beef",
    src: "https://www.allrecipes.com/thmb/Qch2UpqrMAdaLPi6WwJxPHzz6BY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/sous-vide-brisket-mfs-193-4x3-1-24930daf16854a9091eaff1503aac157.jpg",
    opt1: "100g",
    opt2: "150g",
    opt3: "200g",
    time: "Lunch",
    kcal: 139,
    protein: 21,
    carbs: 0,
    fat: 5.3,
    roughage: 0,
  },
  {
    id: "7",
    title: "Fried potatoes",
    src: "https://cdn.apartmenttherapy.info/image/upload/f_jpg,q_auto:eco,c_fill,g_auto,w_1500,ar_4:3/k%2FPhoto%2FRecipes%2F2020-10-Crispy-Skillet-Fried-Potatoes%2Fkitchn-crispy-skillet-fried-potatoes-2",
    opt1: "100g",
    opt2: "150g",
    opt3: "200g",
    time: "Lunch",
    kcal: 119,
    protein: 2.5,
    carbs: 20,
    fat: 3,
    roughage: 2,
  },
  {
    id: "8",
    title: "Basmati rice",
    src: "https://www.noracooks.com/wp-content/uploads/2021/04/sq-4.jpg",
    opt1: "100g",
    opt2: "150g",
    opt3: "200g",
    time: "Lunch",
    kcal: 121,
    protein: 3.8,
    carbs: 25.2,
    fat: 0.4,
    roughage: 0.4,
  },
  {
    id: "9",
    title: "Pasta",
    src: "https://img.cas.sk/cas/1280px-c2/3934577.jpg",
    opt1: "100g",
    opt2: "150g",
    opt3: "200g",
    time: "Lunch",
    kcal: 133,
    protein: 3.5,
    carbs: 23.7,
    fat: 2.5,
    roughage: 1.2,
  },
  {
    id: "10",
    title: "Scrambled eggs",
    src: "https://img.aktuality.sk/foto/MHgxNTQ6NTQ3NXgzMjMxL2ZpdC1pbi85MjB4NTE4L2ltZw==/cURN0B3kTgXVhOGMXR0Slg.jpg?st=zPXx9u--vAbB1Kn7w27EWljt3qlzzMLhsqzLdSsM8M8&ts=1517484772&e=0",
    opt1: "100g",
    opt2: "150g",
    opt3: "200g",
    time: "Breakfast",
    kcal: 166,
    protein: 12.4,
    carbs: 2.2,
    fat: 11.9,
    roughage: 0,
  },
  {
    id: "11",
    title: "Sausage",
    src: "https://tesco.sk/imgglobal/content_platform/recipes/main/7d/sized/756x426-100-fff-0-0/7daba3533312f805675f35c030c2be8d.jpg",
    opt1: "100g",
    opt2: "150g",
    opt3: "200g",
    time: "Breakfast",
    kcal: 288,
    protein: 14,
    carbs: 4,
    fat: 24,
    roughage: 0,
  },
  {
    id: "12",
    title: "Fried egg",
    src: "https://d2c9wzes5ckfvo.cloudfront.net/blog/vajicka%20na%20ranajky-676835-medium.jpg",
    opt1: "100g",
    opt2: "150g",
    opt3: "200g",
    time: "Breakfast",
    kcal: 195,
    protein: 13.5,
    carbs: 1.4,
    fat: 15,
    roughage: 0,
  },
  {
    id: "13",
    title: "Bread",
    src: "https://chutodnaty.sk/wp-content/uploads/2019/12/IMG_1837-1120x747.jpg",
    opt1: "50g",
    opt2: "100g",
    opt3: "150g",
    time: "Dinner",
    kcal: 244,
    protein: 8,
    carbs: 45,
    fat: 1.1,
    roughage: 4,
  },
  {
    id: "14",
    title: "Baguette",
    src: "https://dobrotyzkuchyne.sk/wp-content/uploads/2019/06/Bageta-1300x794.jpeg",
    opt1: "50g",
    opt2: "100g",
    opt3: "150g",
    time: "Dinner",
    kcal: 257,
    protein: 10.6,
    carbs: 42.3,
    fat: 4,
    roughage: 5,
  },
  {
    id: "15",
    title: "Ham with cheese pastry",
    src: "https://i3.oferomat.com/images/340c8e14ed01f53947b04ef34771b1c0.jpg",
    opt1: "50g",
    opt2: "100g",
    opt3: "150g",
    time: "Dinner",
    kcal: 313,
    protein: 8,
    carbs: 30,
    fat: 17.5,
    roughage: 2.5,
  },

  {
    id: "16",
    title: "Apple pie",
    src: "https://www.kingarthurbaking.com/sites/default/files/2022-11/Apple-Pie-Classic-Hero_0114-1.jpg",
    opt1: "50g",
    opt2: "100g",
    opt3: "150g",
    time: "Olovrant",
    kcal: 227,
    protein: 4.4,
    carbs: 17,
    fat: 15,
    roughage: 3.5,
  },
  {
    id: "17",
    title: "Cake",
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJeDxxlEre38idIMovfGO7hyEehNWUJMlnGg&usqp=CAU",
    opt1: "50g",
    opt2: "100g",
    opt3: "150g",
    time: "Olovrant",
    kcal: 219,
    protein: 2.8,
    carbs: 31.5,
    fat: 8.7,
    roughage: 0,
  },
  {
    id: "18",
    title: "Peppa pig cake",
    src: "https://www.twosisterscrafting.com/wp-content/uploads/2015/06/peppa-pig-cake-1200-featured-720x720.jpg",
    opt1: "50g",
    opt2: "100g",
    opt3: "150g",
    time: "Olovrant",
    kcal: 200,
    protein: 2.5,
    carbs: 25,
    fat: 8,
    roughage: 0,
  },
  {
    id: "19",
    title: "Yoghurt",
    src: "https://food-images.files.bbci.co.uk/food/recipes/berry_yoghurt_95274_16x9.jpg",
    opt1: "50g",
    opt2: "100g",
    opt3: "150g",
    time: "Second dinner",
    kcal: 200,
    protein: 4.5,
    carbs: 32,
    fat: 5.5,
    roughage: 3,
  },
  {
    id: "20",
    title: "Greek yoghurt",
    src: "https://cdn.metro-group.com/sk/sk_pim_724559001001_00?format=jpg&quality=90",
    opt1: "50g",
    opt2: "100g",
    opt3: "150g",
    time: "Second dinner",
    kcal: 58,
    protein: 10,
    carbs: 3.5,
    fat: 0.3,
    roughage: 0,
  },
  {
    id: "21",
    title: "Cereals",
    src: "https://i0.wp.com/images-prod.healthline.com/hlcmsresource/images/AN_images/are-breakfast-cereals-healthy-1296x728-feature.jpg?w=1155&h=1528",
    opt1: "50g",
    opt2: "100g",
    opt3: "150g",
    time: "Second dinner",
    kcal: 426,
    protein: 6,
    carbs: 73,
    fat: 10,
    roughage: 5,
  },
  {
    id: "22",
    title: "Crisp",
    src: "https://ipravda.sk/res/2015/04/18/thumbs/cipsy-chips-chipsy-clanokW.jpg",
    opt1: "50g",
    opt2: "100g",
    opt3: "150g",
    time: "Snack",
    kcal: 552,
    protein: 5.5,
    carbs: 50,
    fat: 30,
    roughage: 3,
  },
  {
    id: "23",
    title: "Chocolate",
    src: "https://static.hnonline.sk/images/slike/2023/05/25/2956255.jpg",
    opt1: "50g",
    opt2: "100g",
    opt3: "150g",
    time: "Snack",
    kcal: 520,
    protein: 6,
    carbs: 60,
    fat: 28,
    roughage: 1.8,
  },
  {
    id: "24",
    title: "Candy",
    src: "https://www.portablepress.com/wp-content/uploads/2017/02/iStock-503250450.jpg",
    opt1: "50g",
    opt2: "100g",
    opt3: "150g",
    time: "Snack",
    kcal: 344,
    protein: 7.3,
    carbs: 79,
    fat: 0,
    roughage: 0,
  },
  {
    id: "25",
    title: "Apple",
    src: "https://assets.zdravopedia.sk/images/Ovocie/_1200x675_crop_center-center_none/jablka.jpg",
    opt1: "50g",
    opt2: "100g",
    opt3: "150g",
    time: "Olovrant",
    kcal: 66,
    protein: 0.6,
    carbs: 14,
    fat: 0.2,
    roughage: 3.5,
  },
  {
    id: "26",
    title: "Pear",
    src: "https://d2c9wzes5ckfvo.cloudfront.net/blog/pear-1496151_1920.jpg",
    opt1: "50g",
    opt2: "100g",
    opt3: "150g",
    time: "Olovrant",
    kcal: 58,
    protein: 0.4,
    carbs: 13.5,
    fat: 0.3,
    roughage: 3.3,
  },
  {
    id: "27",
    title: "Raspberries",
    src: "https://ipravda.sk/res/2023/08/25/thumbs/maliny-clanokW.jpg",
    opt1: "50g",
    opt2: "100g",
    opt3: "150g",
    time: "Olovrant",
    kcal: 66,
    protein: 1,
    carbs: 13.9,
    fat: 0.3,
    roughage: 4,
  },
  {
    id: "28",
    title: "Banana",
    src: "https://www.ta3.com/cdn/2023/06/09/607374/16x9-big/jeden_banan_denne_ked_zistite_co_sa_stane_s_vasim_telom_zacnete_s_tym_hned_od_zajtra.jpg?v=123034",
    opt1: "50g",
    opt2: "100g",
    opt3: "150g",
    time: "Olovrant",
    kcal: 94,
    protein: 1.2,
    carbs: 22,
    fat: 0.2,
    roughage: 2,
  },
  {
    id: "29",
    title: "Cucumber",
    src: "https://www.zahrada.sk/wp-content/uploads/2023/05/druhy-odrody-uhoriek.jpg",
    opt1: "50g",
    opt2: "100g",
    opt3: "150g",
    time: "Olovrant",
    kcal: 16,
    protein: 0.8,
    carbs: 2.3,
    fat: 0.2,
    roughage: 0.9,
  },
  {
    id: "30",
    title: "Tomato",
    src: "https://www.zdravy-recept.sk/image/0/2061351.jpg",
    opt1: "50g",
    opt2: "100g",
    opt3: "150g",
    time: "Olovrant",
    kcal: 25,
    protein: 1,
    carbs: 4,
    fat: 0.2,
    roughage: 1.6,
  },
];


  const [foodDates, setFoodDates] = useState({});
  const [filterLetter, setFilterLetter] = useState("");
  const [filteredFood, setFilteredFood] = useState(food);
    const [foodSelections, setFoodSelections] = useState({});
  const [loading, setLoading] = useState(false);

  const clerk = useClerk();
  const userId = clerk.user ? clerk.user.id : null;
  const [date, setDate] = useState(new Date());

  
const handleAddFood = async (e, item) => {
  e.preventDefault();

  try {
    const optionHundred =
      parseFloat(foodSelections[item.id]?.option || item.opt1) / 100;
    const quantityFinal = parseFloat(foodSelections[item.id]?.quantity || 1);

    const data = {
      title: item.title,
      date: foodDates[item.title] || selectedDate,
      userId,
      foodId: item.id,
      quantity: quantityFinal,
      option: parseFloat(foodSelections[item.id]?.option || item.opt1),
      time: foodSelections[item.id]?.time || selectedTime,
      kcal: item.kcal && (item.kcal * optionHundred * quantityFinal).toFixed(1),
      protein:
        item.protein &&
        (item.protein * optionHundred * quantityFinal).toFixed(1),
      carbs:
        item.carbs && (item.carbs * optionHundred * quantityFinal).toFixed(1),
      fat: item.fat && (item.fat * optionHundred * quantityFinal).toFixed(1),
      roughage:
        item.roughage &&
        (item.roughage * optionHundred * quantityFinal).toFixed(1),
    };


    setLoading(true);

    // Odeslání dat na server
    const res = await axios.post("/api/food", data);

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
    setFoodDates((prevDates) => {
      const currentFoodDate = prevDates[item.title] || date;
      const newDate = new Date(currentFoodDate);
      newDate.setDate(newDate.getDate() + days);
      return { ...prevDates, [item.title]: newDate };
    });
  };

  const handleInputChange = (event, item) => {
    const { value } = event.target;
    setFoodDates((prevDates) => ({
      ...prevDates,
      [item.title]: value,
    }));
  };

  const filterFood = (letter) => {
    const filtered = food.filter((item) =>
      item.title.toLowerCase().includes(letter.toLowerCase())
    );
    setFilteredFood(filtered);
  };
  useEffect(() => {
    filterFood(filterLetter);
  }, [filterLetter]);


    const [selectedTime, setSelectedTime] = useState("");
    const [selectedDate, setSelectedDate] = useState(getCurrentDate());



  return (
    <div className="flex flex-col justify-center items-center mt-5 gap-5 relative">
      <Link href={"food-lobby"} className="absolute left-3 top-2">
        <ArrowLeft />
      </Link>
      <h1 className="text-center text-3xl font-bold mb-4">Food menu</h1>
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
        {filteredFood.map((item) => (
          <form key={item.title} onSubmit={(e) => handleAddFood(e, item)}>
            <div className="w-60 h-[350px] border border-sky-500 rounded-xl flex flex-col items-center gap-3">
              <img
                className="rounded-xl p-1 w-60 h-36 "
                src={item.src}
                alt=""
              />
              <p className="text-lg font-bold text-center">{item.title}</p>
              <div className="flex">
                <label>Eating time: </label>&nbsp;
                <select
                  className="w-28 bg-gray-200 rounded-xl text-center"
                  value={foodSelections[item.id]?.time || ""}
                  onChange={(e) => {
                    setFoodSelections((prevSelections) => ({
                      ...prevSelections,
                      [item.id]: {
                        ...prevSelections[item.id],
                        time: e.target.value,
                      },
                    }));
                  }}
                  required
                >
                  <option value="" disabled>
                    Select
                  </option>
                  <option value="Breakfast">Breakfast</option>
                  <option value="Snack">Snack</option>
                  <option value="Lunch">Lunch</option>
                  <option value="Olovrant">Olovrant</option>
                  <option value="Dinner">Dinner</option>
                  <option value="Second dinner">Second dinner</option>
                </select>
              </div>

              <div className="flex  gap-2">
                <ArrowLeft onClick={() => handleDateChange(-1, item)} />
                <div className="flex gap-2 ">
                  <input
                    className="bg-gray-200 rounded-xl text-center"
                    type="date"
                    value={foodDates[item.title] || selectedDate}
                    onChange={(e) => handleInputChange(e, item)}
                  />
                </div>

                <ArrowRight onClick={() => handleDateChange(1, item)} />
              </div>

              <div className="flex">
                <div>
                  <label htmlFor="quantity">Quantity: </label>
                  <input
                    className="bg-gray-200 rounded-xl w-12 text-center"
                    type="number"
                    min={1}
                    value={foodSelections[item.id]?.quantity || 1}
                    onChange={(e) => {
                      setFoodSelections((prevSelections) => ({
                        ...prevSelections,
                        [item.id]: {
                          ...prevSelections[item.id],
                          quantity: e.target.value,
                        },
                      }));
                    }}
                  />{" "}
                  ×
                  <select
                    className="bg-gray-200 rounded-xl"
                    value={foodSelections[item.id]?.option || ""}
                    onChange={(e) => {
                      setFoodSelections((prevSelections) => ({
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

export default Food;
