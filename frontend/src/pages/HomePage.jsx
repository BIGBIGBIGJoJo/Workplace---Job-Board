import { useEffect } from "react";
import HomeHero from "../components/HomeHero";
import WelcomeNav from "../components/WelcomeNav";
import HomeJobListing from "../components/HomeJobListing";

const HomePage = () => {
  useEffect(() => {
    document.title = "Home Page - Workplace";
  });

  return (
    <>
      <div className="shadow-md shadow-gray-300 hover:shadow-lg hover:shadow-gray-400 transition duration-200">
        <HomeHero />
      </div>
      <HomeJobListing />
      <WelcomeNav />
    </>
  );
};


export default HomePage;
