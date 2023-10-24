import React, { PropsWithChildren, useState } from "react";
import "../../app/globals.css";
import Navbar from "../navbar/Navbar";
import SideBar from "../sidebar/SideBar";

const Layout = (props: PropsWithChildren) => {
  const [showSideBar, setShowSideBar] = useState(false);
  return (
    <div className="grid min-h-screen grid-rows-header bg-zinc-50">
      <div className="bg-white shadow-sm z-10">
        <Navbar onMenuButtonClick={() => setShowSideBar((prev) => !prev)} />
      </div>
      <div className="grid md:grid-cols-sidebar">
        <SideBar open={showSideBar} setOpen={setShowSideBar} />
        {props.children}
      </div>
    </div>
  );
};

export default Layout;
