import { Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import useNotify from "@/hooks/useNotify";
import NotifyData from "@/types/NotifyData";

const CardAalarm = () => {
  const router = useRouter();
  const [alarms, setAlarms] = useState<number | null>(null);
  useEffect(() => {
    const getAlarms = async () => {
      const response = await useNotify.useGetNotify();
      const alarms: NotifyData[] = response.data;
      console.log(alarms.length);

      setAlarms(alarms.length);
    };
    getAlarms();
  }, []);

  return (
    <div className="shadow-md rounded-xl p-6 flex flex-col justify-center">
      <div className="text-center font-bold text-lg">Numero de Alarmas</div>
      <div className="text-center text-xl">{alarms}</div>
      <div className="flex flex-row justify-center gap-3 mt-5">
        <Button onClick={() => router.push("/notify")}>
          Gestionar Ordenes
        </Button>
      </div>
    </div>
  );
};

export default CardAalarm;
