"use client"
import { Header } from "./Components/Header/Header";
import { Section1 } from "./Components/Section1/Section1";
import { Section2 } from "./Components/Section2/Section2";
import { Section3 } from "./Components/Section3/Section3";
import { NewProduct } from "./Components/NewProduct/NewProduct";
import { Section4 } from "./Components/Section4/Section4";
import { TopBrands } from "./Components/TopBrands/TopBrands";
import { Banner } from "./Components/Banner/Banner";

export default function Home() {
  return (
    <>
      <Section1/>
      <Section2/>
      <Section3/>
      <NewProduct/>
      <Section4/>
      <NewProduct/>
      <TopBrands/>
      <Banner/>
    </>
  );
}
