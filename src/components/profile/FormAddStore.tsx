import React, { use, useState } from "react";
import TextField from "@mui/material/TextField";
import TableEmployeesG from "./TableEmployeesG";
import { Button } from "@mui/material";
import useAddStore from "@/hooks/useAddStore";

const FormAddStore = ({ handleClose }: any) => {
  const [employees, setEmployees]: any = useState([]);
  const [nameStore, setNameStore] = useState("");

  const handleNameStore = (e: any) => {
    setNameStore(e.target.value);
  };

  const onAddStore = () => {
    useAddStore({ nameStore, employees });
    handleClose();
  };

  const updateNewEmployees = (newEmployees: any) => {
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
