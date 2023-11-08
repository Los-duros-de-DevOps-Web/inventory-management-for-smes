import useCurrentUser from "@/hooks/useCurrentUser";
import { ClipLoader } from "react-spinners";
import MainProducts from "@/components/products/MainProducts";

import React from "react";

const ProductsPage = () => {
  const UserData = useCurrentUser().data;

  if (!UserData) {
    return (
      <div className="flex justify-center items-center h-full">
        <ClipLoader color="lightblue" size={80} />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">{UserData && <MainProducts />}</div>
  );
};

export default ProductsPage;
