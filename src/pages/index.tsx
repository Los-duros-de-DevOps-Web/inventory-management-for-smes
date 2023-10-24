import React from "react";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import Dashboard from "./dashboard";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
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

const Index = () => {
  return <Dashboard />;
};

export default Index;
