import React from "react";

import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import MainDashboard from "@/components/dashbaord/MainDashboard";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}

const Dashboard = () => {
  const router = useRouter();
  const logout = async () => {
    await signOut({ redirect: false });
    router.push("/");
  };

  return (
    <div>
      <MainDashboard />
    </div>
  );
};

export default Dashboard;
