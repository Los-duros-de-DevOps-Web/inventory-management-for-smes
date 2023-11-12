import MainNotify from "@/components/notify/MainNotify";
import React from "react";

const NotifyPage = () => {
  return (
    <div className="flex flex-col text-center">
      <div className="font-bold text-2xl mt-5">
        Sistema de Notificaciones y Vista de Stocks
      </div>
      <div className="mt-5">
        <MainNotify />
      </div>
    </div>
  );
};

export default NotifyPage;
