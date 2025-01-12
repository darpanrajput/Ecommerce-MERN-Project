import React from "react";
import { Announcement } from "../components/Announcement";
import { Categories } from "../components/Categories";
import Footer from "../components/Footer";
import { Newsletter } from "../components/Newsletter";
import Products from "../components/Products";
import Slider from "../components/Slider";
import HomePageModal from "../components/HomePageModal";
import { Navbar } from "../Navbar/Navbar";

export const Home = () => {
  return (
    <div>
      <Announcement />
      <Navbar />
      <Slider />
      <Categories />
      <Products />
      <Newsletter />
      <Footer />
      <HomePageModal/>
    </div>
  );
};
