import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import ChatbotIcon from "../ChatbotIcon";

const PublicLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      <ChatbotIcon />
    </>
  );
};

export default PublicLayout;
