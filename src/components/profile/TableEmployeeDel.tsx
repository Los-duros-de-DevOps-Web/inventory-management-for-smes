import React, { useState, useEffect } from "react";
import useEmployee from "@/hooks/useEmployee";
import UserData from "@/types/UserData";
import { toast } from "react-hot-toast";
import { Button } from "@mui/material";

interface TableEmployeeDelProps {
  storeId: number;
  onUpdateProfile: () => void;
}

const TableEmployeeDel = ({
  storeId,
  onUpdateProfile,
}: TableEmployeeDelProps) => {
  const emStoreId: number = storeId;
  const [employees, setEmployees]: any = useState<UserData[]>([]);
  const [posEmployees, setPosEmployees]: any = useState<UserData[]>([]);

  const fetchEmployeesByStore = async () => {
    const response = await useEmployee.useEmployeeByStore(emStoreId);
    const employees = response.data;
    setEmployees(employees);
    try {
    } catch (error) {
      toast.error("Error al cargar los empleados");
    }
  };

  const fetchPosEmployees = async () => {
    try {
      const response = await useEmployee.useAvailableEmp();
      const employees = response.data;
      setPosEmployees(employees);
    } catch (error) {
      toast.error("Error al cargar los empleados");
    }
  };

  useEffect(() => {
    fetchEmployeesByStore();
    fetchPosEmployees();
  });

  const onAddNewEmployee = async (employee: UserData) => {
    const idEmployeeAdd = employee.id;
    setPosEmployees(posEmployees.filter((e: UserData) => e.id !== employee.id));
    await useEmployee.useAddEmployeeToStore(emStoreId, idEmployeeAdd);
    setEmployees((prevEmployees: UserData[]) => [...prevEmployees, employee]);
    onUpdateProfile();
  };

  const onDeleteEmployee = async (employee: UserData) => {
    const idEmployee = employee.id;
    await useEmployee.useDelEmployeeByStore(emStoreId, idEmployee);
    setEmployees(employees.filter((e: UserData) => e.id !== idEmployee));
    setPosEmployees((prevEmployees: UserData[]) => [
      ...prevEmployees,
      employee,
    ]);
    onUpdateProfile();
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
          employees.map((employee: any, index: number) => {
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
        {posEmployees &&
          posEmployees.map((employee: any, index: number) => {
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
                    onClick={() => onAddNewEmployee(employee)}
                    sx={{ color: "blue" }}
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

export default TableEmployeeDel;
