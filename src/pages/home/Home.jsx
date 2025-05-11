import React from "react";
import Hero from "./Hero";
import Title from "../shareit/Title";
import ContactSection from "./ContactSection";
import Review from "./Review";
import TaskCard from "./TaskCard";
import Categories from "./Categories/Categories";

const Home = () => {
  return (
    <div>
      <Hero />
      <Title />
      <TaskCard />
      <Review />
      <Categories />
      <ContactSection />
    </div>
  );
};

export default Home;
