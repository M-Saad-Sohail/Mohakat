import React from "react";

interface IProps {
  children: React.ReactNode;
}
const MainLayout: React.FC<IProps> = ({ children }) => {
  return (
    <section
      className={
        "bg-center bg-no-repeat bg-cover  max-w-full h-screen bg-hero dark:bg-heroDark dark:bg-dark"
      }
    >
      {children}
    </section>
  );
};

export default MainLayout;
