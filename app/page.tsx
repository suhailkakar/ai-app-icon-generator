import Hero from "@/components/hero";
import Navbar from "@/components/nav";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex h-screen flex-col items-center justify-center  bg-white">
        <Hero />
      </main>
    </>
  );
}
