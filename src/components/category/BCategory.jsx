import Image from "next/image";
import style from "./page.module.css";
import Link from "next/link";

import diningImage from "@/assets/category/Mask Group.png";
import livingImage from "@/assets/category/Image-living room.png";
import bedroomImage from "@/assets/category/bedroom.png";
import Adidas from "@/assets/category/logo-adidas.jpg";
import Ea7 from "@/assets/category/ea7-1.png";
import Prada from "@/assets/category/prada.jpg";
import Gucci from "@/assets/category/gucci.jpg";
import Boss from "@/assets/category/boss.jpg";
import Fendi from "@/assets/category/fendi.png";
import calvin from "@/assets/category/calvin.jpg";

export default function Category() {
  const categories = [
    { name: "Adidas", image: Adidas },
    { name: "Ea7", image: Ea7 },
    { name: "Prada", image: Prada },
    { name: "Gucci", image: Gucci },
    { name: "Boss", image: Boss },
    { name: "Fendi", image: Fendi },
    { name: "calvin", image: calvin },
  ];

  return (
    <div>
      <h2 className={style.title}>Supported Brands</h2>
      <p className={style.desc}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </p>
      <div className={style.bcontainer}>
        {categories.map((category, index) => (
          <Link
            href={`/Categories/${encodeURIComponent(category.name)}`}
            key={index}
            className={style.Ccard}
          >
            <Image
              src={category.image}
              alt=""
              width={150}
              height={320}
              className={style.imgbC}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
