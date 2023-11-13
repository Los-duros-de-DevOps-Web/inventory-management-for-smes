import NotifyData from "@/types/NotifyData";
import { Button } from "@mui/material";
import React from "react";

interface ActiveNotifyProps {
  notify: NotifyData;
  onDeletedAlarm: (notify: NotifyData) => void;
}

const ActiveNotify = ({ notify, onDeletedAlarm }: ActiveNotifyProps) => {
  return (
    <div className="flex flex-row justify-center">
      <div className="bg-white p-7 mt-4 w-[70%] shadow-lg">
        <div>
          Alarma: <span className="font-bold">{notify.id}</span>
          <div className="flex flex-col gap-5 mt-3">
            <div className="flex flex-row justify-around">
              <div>
                ProductoID:{" "}
                <span className="font-bold">{notify.productId}</span>
              </div>
              <div>
                Fecha:{" "}
                <span className="font-bold">{notify.date.toString()}</span>
              </div>
            </div>
            <div>
              <span className="font-bold">Detalles: </span>
              <span>{notify.description}</span>
            </div>
          </div>
        </div>
        <Button onClick={() => onDeletedAlarm(notify)}>Eliminar Alarma</Button>
      </div>
    </div>
  );
};

export default ActiveNotify;
