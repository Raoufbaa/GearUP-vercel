"use client";
import { useState } from "react";
import Image from "next/image";
import style from "./page.module.css";
import Link from "next/link";

import Jacket from "@/assets/category/Jacket.jpg";
import Shoes from "@/assets/category/Shoes.jpg";
import Hoddie from "@/assets/category/Hoodie.jpg";
import diningImage from "@/assets/category/Mask Group.png";
import livingImage from "@/assets/category/Image-living room.png";
import bedroomImage from "@/assets/category/bedroom.png";

export default function Category() {
  const allCategories = [
    { name: "Jacket", image: Jacket },
    { name: "Sport Shoes", image: Shoes },
    { name: "Hoddie", image: Hoddie },
    { name: "Living", image: livingImage },
    { name: "Bedroom", image: bedroomImage },
    { name: "Bedroom", image: bedroomImage },
    { name: "Bedroom", image: bedroomImage },
    { name: "Bedroom", image: bedroomImage },
    { name: "Dining", image: diningImage },
    { name: "Living", image: livingImage },
    { name: "Living", image: livingImage },
  ];

  const [displayedCategories, setDisplayedCategories] = useState(
    allCategories.slice(0, 3)
  );
  const [startIndex, setStartIndex] = useState(0);

  const showNextCategories = () => {
    const newIndex = startIndex + 3;
    if (newIndex < allCategories.length) {
      setDisplayedCategories(allCategories.slice(newIndex, newIndex + 3));
      setStartIndex(newIndex);
    }
  };

  const showPreviousCategories = () => {
    const newIndex = startIndex - 3;
    if (newIndex >= 0) {
      setDisplayedCategories(allCategories.slice(newIndex, newIndex + 3));
      setStartIndex(newIndex);
    }
  };

  return (
    <div>
      <h2 className={style.title}>Browse The Range</h2>
      <p className={style.desc}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </p>
      <div className={style.container}>
        <button
          className={style.btn}
          onClick={showPreviousCategories}
          disabled={startIndex === 0}
        >
          Previous
        </button>
        {displayedCategories.map((category, index) => (
          <div className={style.card} key={index}>
            <Link
              className={style.underline}
              href={`/Categories/${encodeURIComponent(category.name)}`}
            >
              <Image
                src={category.image}
                alt=""
                width={280}
                height={350}
                className={style.imgC}
              />
              <h4 className={style.subtitle}>{category.name}</h4>
            </Link>
          </div>
        ))}
        <button
          onClick={showNextCategories}
          className={style.btn}
          disabled={startIndex + 3 >= allCategories.length}
        >
          Next
        </button>
      </div>
      <div className={style.navigation}></div>
    </div>
  );
}
