import React, { useState, useEffect } from "react";
import useEmployee from "@/hooks/useEmployee";
import { toast } from "react-hot-toast";
import UserData from "@/types/UserData";
import { Button } from "@mui/material";
import { ClipLoader } from "react-spinners";

interface TableEmployeesGProps {
  updateNewEmployees: (newEmployees: UserData[]) => void;
}

const TableEmployeesG = ({ updateNewEmployees }: TableEmployeesGProps) => {
  const [stEmployees, setStEmployees] = useState<UserData[]>([]);
  const [newEmployees, setNewEmployee] = useState<UserData[]>([]);

  useEffect(() => {
    const getAvailableEmployees = async () => {
      try {
        const response = await useEmployee.useAvailableEmp();
        const employees = response.data;
        setStEmployees(employees);
      } catch (error) {
        toast.error("Error al cargar los empleados");
      }
    };

    getAvailableEmployees();
  }, []);

  const onAddEmployee = (employee: UserData) => {
    setNewEmployee((prevNewEmployees: UserData[]) => [
      ...prevNewEmployees,
      employee,
    ]);
    setStEmployees(stEmployees.filter((e: UserData) => e.id !== employee.id));
  };

  useEffect(() => {
    updateNewEmployees(newEmployees);
  }, [newEmployees]);

  if (!stEmployees) {
    return (
      <div className="flex justify-center items-center h-full">
        <ClipLoader color="lightblue" size={80} />
      </div>
    );
  }

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
            Agregar empleado
          </th>
        </tr>
      </thead>
      <tbody>
        {stEmployees &&
          stEmployees.map((employee: UserData, index: number) => {
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
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    onClick={() => onAddEmployee(employee)}
                  >
                    Agregar
                  </Button>
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};

export default TableEmployeesG;
