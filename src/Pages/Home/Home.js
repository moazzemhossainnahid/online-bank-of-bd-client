import React from "react";
import NoticeFromBank from "../../Components/Components.Arif/NoticeFromBank/NoticeFromBank";
import BannerCarousel from "../../Components/Components.Masud/BannerCarousel";
import FetureHome from "../../Components/Components.Masud/FetureHome";
import AboutCounter from "../AboutUs/About/AboutCounter";
import Banner from "./Banner";
import Blogs from "./Blogs";
import BusinessSummary from "./BusinessSummary";
import GetLoan from "./GetLoan";
import OruTrustedPartners from "./OruTrustedPartners";
import TrustedCFeedback from "./TrustedCFeedback";
import WhyChooseOBB from "./WhyChooseOBB";
import WhyWaiting from "./WhyWaiting";

const Home = () => {
  return (

    <div>
      <BannerCarousel></BannerCarousel>
      {/* <Banner /> */}
      <OruTrustedPartners/>
      <AboutCounter></AboutCounter>
      <NoticeFromBank />
      <WhyChooseOBB />
      <GetLoan/>
      <BusinessSummary />
      <WhyWaiting/>
      <TrustedCFeedback/>
      <Blogs/>
    </div>
  );
};

export default Home;
