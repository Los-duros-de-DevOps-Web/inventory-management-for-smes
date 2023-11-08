import React, { ChangeEvent, useState } from "react";
import UserData from "@/types/UserData";
import TextField from "@mui/material/TextField";
import TableEmployeesG from "./TableEmployeesG";
import { Button } from "@mui/material";
import { toast } from "react-hot-toast";
import useStore from "@/hooks/useStore";

interface FormAddStoreProps {
  handleClose: () => void;
  onUpdateProfile: () => void;
}

const FormAddStore = ({ handleClose, onUpdateProfile }: FormAddStoreProps) => {
  const [employees, setEmployees]: any = useState<UserData[]>([]);
  const [nameStore, setNameStore] = useState<string | null>(null);

  const handleNameStore = (e: ChangeEvent<HTMLInputElement>) => {
    setNameStore(e.target.value);
  };

  const onAddStore = async () => {
    if (!nameStore) return toast.error("Ingresa el nombre de la tienda");

    await useStore.useAddStore(nameStore, employees);
    onUpdateProfile();
    handleClose();
  };

  const updateNewEmployees = (newEmployees: UserData[]) => {
    setEmployees(newEmployees);
  };

  return (
    <div>
      <TextField
        id="outlined-basic"
        label="Nombre de la Tienda"
        variant="outlined"
        onChange={handleNameStore}
        sx={{ marginTop: 2, width: "100%" }}
      />
      <p className="text-center text-xl mt-3 font-bold mb-3">
        Gestion de Empleados Disponibles
      </p>
      <TableEmployeesG updateNewEmployees={updateNewEmployees} />
      <div className="flex justify-center mt-5">
        <Button className="items-center" onClick={onAddStore}>
          Añadir Tienda
        </Button>
      </div>
    </div>
  );
};

export default FormAddStore;
