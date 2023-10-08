import {redirect} from "next/navigation";

export default function Home() {
  redirect("/login");

  return (
    <div className="flex flex-col items-center md:flex-row md:h-screen"></div>
  )
}
