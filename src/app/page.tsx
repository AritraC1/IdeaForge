import Navbar from "../components/layout/Navbar";
import Hero from "../components/sections/Hero";
import IdeaForm from "../components/sections/IdeaForm";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f7f8fb]">
      <Navbar />
      <Hero />
      <IdeaForm />
    </main>
  );
}