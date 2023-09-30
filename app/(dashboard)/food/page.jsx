"use client"

import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useClerk } from "@clerk/clerk-react";
import { ArrowLeft, ArrowRight } from "lucide-react";



const Weight = () => {
      const food = [
        {
          title: "Chicken soup",
          src: "https://img.aktuality.sk/foto/OTIweDUyMC9zbWFydC9pbWc=/qrkzJIm1Tij4VjutiSk4VA.jpg?st=sHTdgt8aeoIibEm9ZFW1Jhx25f7K3o3UsLDGyoVs_Vo&ts=1459766861&e=0",
          opt1: "250ml",
          opt2: "300ml",
          opt3: "350ml",
          time: "Lunch",
        },
        {
          title: "Tomato soup",
          src: "https://www.foodandwine.com/thmb/j1vJdgrMdu64ElBpxMzmvqpyt5U=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/creamy-tomato-soup-buttery-croutons-hero-02-49b419d00f854db78838a79c8df9a23f.jpg",
          opt1: "250ml",
          opt2: "300ml",
          opt3: "350ml",
          time: "Lunch",
        },
        {
          title: "Gulas soup",
          src: "https://food-images.files.bbci.co.uk/food/recipes/beef_goulash_soup_gulyas_16159_16x9.jpg",
          opt1: "250ml",
          opt2: "300ml",
          opt3: "350ml",
          time: "Lunch",
        },
        {
          title: "Chicken breast",
          src: "https://static01.nyt.com/images/2023/06/02/multimedia/02GRILL-BASICSrex4-chicken-lcwm/07GRILL-BASICSrex4-chicken-lcwm-superJumbo.jpg",
          opt1: "100g",
          opt2: "150g",
          opt3: "200g",
          time: "Lunch",
        },
        {
          title: "Grilled pork",
          src: "https://assets.epicurious.com/photos/54e7ad824f77a310045d7835/16:9/w_2000,h_1125,c_limit/EP-201502-Pork-6x4.jpg",
          opt1: "100g",
          opt2: "150g",
          opt3: "200g",
          time: "Lunch",
        },
        {
          title: "Beef",
          src: "https://www.allrecipes.com/thmb/Qch2UpqrMAdaLPi6WwJxPHzz6BY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/sous-vide-brisket-mfs-193-4x3-1-24930daf16854a9091eaff1503aac157.jpg",
          opt1: "100g",
          opt2: "150g",
          opt3: "200g",
          time: "Lunch",
        },
        {
          title: "Fried potatoes",
          src: "https://cdn.apartmenttherapy.info/image/upload/f_jpg,q_auto:eco,c_fill,g_auto,w_1500,ar_4:3/k%2FPhoto%2FRecipes%2F2020-10-Crispy-Skillet-Fried-Potatoes%2Fkitchn-crispy-skillet-fried-potatoes-2",
          opt1: "100g",
          opt2: "150g",
          opt3: "200g",
          time: "Lunch",
        },
        {
          title: "Basmati rice",
          src: "https://www.noracooks.com/wp-content/uploads/2021/04/sq-4.jpg",
          opt1: "100g",
          opt2: "150g",
          opt3: "200g",
          time: "Lunch",
        },
        {
          title: "Pasta",
          src: "https://img.cas.sk/cas/1280px-c2/3934577.jpg",
          opt1: "100g",
          opt2: "150g",
          opt3: "200g",
          time: "Lunch",
        },
        {
          title: "Scrambled eggs",
          src: "https://img.aktuality.sk/foto/MHgxNTQ6NTQ3NXgzMjMxL2ZpdC1pbi85MjB4NTE4L2ltZw==/cURN0B3kTgXVhOGMXR0Slg.jpg?st=zPXx9u--vAbB1Kn7w27EWljt3qlzzMLhsqzLdSsM8M8&ts=1517484772&e=0",
          opt1: "100g",
          opt2: "150g",
          opt3: "200g",
          time: "Breakfast",
        },
        {
          title: "Sausage",
          src: "https://tesco.sk/imgglobal/content_platform/recipes/main/7d/sized/756x426-100-fff-0-0/7daba3533312f805675f35c030c2be8d.jpg",
          opt1: "100g",
          opt2: "150g",
          opt3: "200g",
          time: "Breakfast",
        },
        {
          title: "Fried egg",
          src: "https://d2c9wzes5ckfvo.cloudfront.net/blog/vajicka%20na%20ranajky-676835-medium.jpg",
          opt1: "100g",
          opt2: "150g",
          opt3: "200g",
          time: "Breakfast",
        },
        {
          title: "Bread",
          src: "https://chutodnaty.sk/wp-content/uploads/2019/12/IMG_1837-1120x747.jpg",
          opt1: "50g",
          opt2: "100g",
          opt3: "150g",
          time: "Dinner",
        },
        {
          title: "Baguette",
          src: "https://dobrotyzkuchyne.sk/wp-content/uploads/2019/06/Bageta-1300x794.jpeg",
          opt1: "50g",
          opt2: "100g",
          opt3: "150g",
          time: "Dinner",
        },
        {
          title: "Ham with cheese pastry",
          src: "https://i3.oferomat.com/images/340c8e14ed01f53947b04ef34771b1c0.jpg",
          opt1: "50g",
          opt2: "100g",
          opt3: "150g",
          time: "Dinner",
        },

        {
          title: "Apple pie",
          src: "https://www.kingarthurbaking.com/sites/default/files/2022-11/Apple-Pie-Classic-Hero_0114-1.jpg",
          opt1: "50g",
          opt2: "100g",
          opt3: "150g",
          time: "Olovrant",
        },
        {
          title: "Cake",
          src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJeDxxlEre38idIMovfGO7hyEehNWUJMlnGg&usqp=CAU",
          opt1: "50g",
          opt2: "100g",
          opt3: "150g",
          time: "Olovrant",
        },
        {
          title: "Peppa pig cake",
          src: "https://www.twosisterscrafting.com/wp-content/uploads/2015/06/peppa-pig-cake-1200-featured-720x720.jpg",
          opt1: "50g",
          opt2: "100g",
          opt3: "150g",
          time: "Olovrant",
        },
        {
          title: "Yoghurt",
          src: "https://food-images.files.bbci.co.uk/food/recipes/berry_yoghurt_95274_16x9.jpg",
          opt1: "50g",
          opt2: "100g",
          opt3: "150g",
          time: "Second dinner",
        },
        {
          title: "Greek yoghurt",
          src: "https://cdn.metro-group.com/sk/sk_pim_724559001001_00?format=jpg&quality=90",
          opt1: "50g",
          opt2: "100g",
          opt3: "150g",
          time: "Second dinner",
        },
        {
          title: "Cereals",
          src: "https://i0.wp.com/images-prod.healthline.com/hlcmsresource/images/AN_images/are-breakfast-cereals-healthy-1296x728-feature.jpg?w=1155&h=1528",
          opt1: "50g",
          opt2: "100g",
          opt3: "150g",
          time: "Second dinner",
        },
        {
          title: "Crisp",
          src: "https://ipravda.sk/res/2015/04/18/thumbs/cipsy-chips-chipsy-clanokW.jpg",
          opt1: "50g",
          opt2: "100g",
          opt3: "150g",
          time: "Snack",
        },
        {
          title: "Chocolate",
          src: "https://static.hnonline.sk/images/slike/2023/05/25/2956255.jpg",
          opt1: "50g",
          opt2: "100g",
          opt3: "150g",
          time: "Snack",
        },
        {
          title: "Candy",
          src: "https://www.portablepress.com/wp-content/uploads/2017/02/iStock-503250450.jpg",
          opt1: "50g",
          opt2: "100g",
          opt3: "150g",
          time: "Snack",
        },
      ];


  const [weight, setWeight] = useState("");
  const [foodDates, setFoodDates] = useState({});
  const [filterLetter, setFilterLetter] = useState("");
  const [filteredFood, setFilteredFood] = useState(food);


  const clerk = useClerk();
  const userId = clerk.user ? clerk.user.id : null;
  const [date, setDate] = useState(new Date());


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!weight) {
      return;
    }

    try {
      const data = {
        weight,
        date: getCurrentDate(),
        userId,
      };
      setLoading(true);

      // Kontrola, či používateľ nemá žiadny existujúci produkt
      if (data) {
        // Odeslání dat na server
        const res = await axios.post("/api/weight", data);

        const refreshPage = () => {
          setTimeout(() => {
            window.location.reload();
          }, 500); // Zmena na 500 ms (pol sekundy)
        };

        if (res) {
          toast.success("Saved!");
          setWeight("");
          refreshPage();
          setLoading(false);
        } else {
          throw new Error("Error");
        }
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

    const getCurrentDate = (date) => {
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




  return (
    <div className="flex flex-col justify-center items-center mt-5 gap-5">
      <h1 className="text-center text-3xl font-bold mb-4">Food menu</h1>
      <form>
        <label>Filter: </label>
        <input
          type="text" className="bg-gray-200 rounded-xl p-1"
          value={filterLetter}
          onChange={(e) => setFilterLetter(e.target.value)}
        />
      </form>
      <div className="flex gap-3 justify-center  items-center flex-wrap">
        {filteredFood.map((item) => (
          <form key={item.title} onSubmit={handleSubmit}>
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
                  className="w-28 bg-gray-200 rounded-xl text-center "
                  defaultValue={item.time}
                >
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
                    value={getCurrentDate(foodDates[item.title] || date)}
                    onChange={(e) => handleInputChange(e, item)}
                  />
                </div>

                <ArrowRight onClick={() => handleDateChange(1, item)} />
              </div>

              <div className="flex">
                <div>
                  <label htmlFor="quantity">Quantity: </label>
                  <input
                    id="quantity"
                    className="bg-gray-200 rounded-xl w-12 text-center"
                    type="number"
                    min={1}
                    defaultValue={1}
                  />
                  ×
                  <select className="bg-gray-200 rounded-xl">
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

export default Weight;