import style from "./page.module.css";
import SingleProductPage from "@/components/SingleProductPage/SingleProductPage";

export default function Page({ params }) {
  return (
    <div>
      <SingleProductPage params={params} />
    </div>
  );
}
