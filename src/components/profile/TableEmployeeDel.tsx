import useEmployeeByStore from "@/hooks/useEmployeeByStore";
import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import useDelEmployeeByStore from "@/hooks/useDelEmployeeByStore";

const TableEmployeeDel = ({ storeId }: any) => {
  const emStoreId: number = storeId;
  const employees = useEmployeeByStore(emStoreId).data;
  const [stEmployees, setStEmployees] = useState([]);

  useEffect(() => {
    employees && setStEmployees(employees);
  }, [employees]);

  const onDeleteEmployee = (employee: any) => {
    const idEmployee = employee.id;
    useDelEmployeeByStore(emStoreId, idEmployee).then((res) => {
      if (res) {
        setStEmployees(stEmployees.filter((e: any) => e.id !== idEmployee));
      }
    });
  };

  return (
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 bg-white">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" className="px-6 py-3">
            Nombre
          </th>
          <th scope="col" className="px-6 py-3">
            Username
          </th>
          <th scope="col" className="px-6 py-3">
            Rol
          </th>
          <th scope="col" className="px-6 py-3">
            Acción
          </th>
        </tr>
      </thead>
      <tbody>
        {employees &&
          stEmployees.map((employee: any, index: number) => {
            return (
              <tr
                className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                key={index}
              >
                <td
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {employee.name}
                </td>
                <td className="px-6 py-4">{employee.username}</td>
                <td className="px-6 py-4">{employee.role}</td>
                <td className="px-6 py-4">
                  <Button
                    onClick={() => onDeleteEmployee(employee)}
                    sx={{ color: "red" }}
                  >
                    Eliminar
                  </Button>
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};

export default TableEmployeeDel;
