import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import MyIconsList from "./my-icons-list";

export default async function MyIconsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <div className="container mx-auto py-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Mis Iconos</h1>
        <MyIconsList userId={user.id} />
      </div>
    </div>
  );
}
