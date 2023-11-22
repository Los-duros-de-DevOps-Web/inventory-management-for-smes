import React, { useRef, useEffect, useState } from "react";
import Chart from "chart.js/auto";
import { toast } from "react-hot-toast";
import useProducts from "@/hooks/useProducts";
import ProductData from "@/types/ProductData";

const Graph = () => {
  const chartRef = useRef(null);

  const getDataProduct = async () => {
    try {
      const response = await useProducts.useGetProducts();
      const productsLabel = response.data.map(
        (product: ProductData) => product.name
      );
      const productsStock = response.data.map(
        (product: ProductData) => product.quantityInStock
      );
      const productsStockAlert = response.data.map(
        (product: ProductData) => product.lowStockRange
      );

      loadGrpah(productsLabel, productsStock, productsStockAlert);
    } catch (error) {
      toast.error("Error al cargar el gráfico de los productos");
    }
  };

  const loadGrpah = (
    productsLabel: string[],
    productsStock: number[],
    productsStockAlert: number[]
  ) => {
    console.log(productsLabel);
    console.log(productsStock);
    console.log(productsStockAlert);

    if (chartRef.current) {
      const ctx = chartRef.current;
      //       labels: data.years,
      //       datasets: [
      //         {
      //           label: data.worldType,
      //           data: data.values,
      //           borderColor: "rgba(75, 192, 192, 1)",
      //           borderWidth: 2,
      //           fill: false,
      //         },
      //       ],
      //     },
      //
      //       },
      //     },
      new Chart(ctx, {
        type: "line",
        data: {
          labels: productsLabel,
          datasets: [
            {
              label: "Stock",
              data: productsStock,
              backgroundColor: "rgb(255, 99, 132)",
              borderWidth: 2,
              fill: false,
            },
            {
              label: "Stock Alerta",
              data: productsStockAlert,
              backgroundColor: "rgb(54, 162, 235)",
              borderWidth: 2,
              fill: false,
            },
          ],
        },
        options: {
          plugins: {
            title: {
              display: true,
              text: "Grafica de Productos",
            },
          },
          scales: {
            x: {
              type: "category",
              position: "bottom",
              title: {
                display: true,
                text: "Productos",
              },
            },
            y: {
              position: "left",
              title: {
                display: true,
                text: "Stock",
              },
            },
          },
        },
      });
    }
  };

  useEffect(() => {
    getDataProduct();
  }, []);

  return (
    <div className="mt-5 mb-10 p-10 m-auto">
      <canvas ref={chartRef} width="400" height="200" />
    </div>
  );
};

export default Graph;
