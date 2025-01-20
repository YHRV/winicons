import Hero from "@/components/hero";
import IconList from "@/components/icon-list";

export default async function Home() {
  return (
    <>
      <Hero />
      <main className="flex-1 flex flex-col gap-6 px-4">
        <IconList />
      </main>
    </>
  );
}
