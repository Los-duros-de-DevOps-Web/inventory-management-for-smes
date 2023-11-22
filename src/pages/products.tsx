import useCurrentUser from "@/hooks/useCurrentUserData";
import { ClipLoader } from "react-spinners";
import MainProducts from "@/components/products/MainProducts";
import UserData from "@/types/UserData";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ProductsPage = () => {
  const [userData, setUserData]: any = useState<UserData | null>(null);

  const fetchUserData = async () => {
    try {
      const response = await useCurrentUser();
      const userData: UserData = response.data;
      setUserData(userData);
    } catch (error) {
      toast.error("Error al cargar el usuario");
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  if (!userData) {
    return (
      <div className="flex justify-center items-center h-full">
        <ClipLoader color="lightblue" size={80} />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">{userData && <MainProducts />}</div>
  );
};

export default ProductsPage;
