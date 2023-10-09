import React from "react";

import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";

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
      <button onClick={logout}>Cerrar sesión</button>
    </div>
  );
};

export default Dashboard;
