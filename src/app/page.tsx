import { redirect } from "next/navigation";
import { signOut } from "next-auth/react";

export default function Home() {
  return (
    <div className="flex flex-col items-center md:flex-row md:h-screen">
      Hola
      <button onClick={() => signOut()}>Cerrar sesión</button>
    </div>
  );
}
