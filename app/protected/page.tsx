"use client";

import { createClient } from "@/utils/supabase/client";
import { InfoIcon, UploadIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const ALLOWED_FILE_TYPES = ["png", "svg", "ico"];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

interface Category {
  id: string;
  name: string;
}

function UploadForm() {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    category_id: "",
    description: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const loadCategories = async () => {
      const { data, error } = await supabase
        .from("categories")
        .select("id, name")
        .order("name");

      if (error) {
        toast.error("Error al cargar las categorías");
        return;
      }

      setCategories(data || []);
    };

    loadCategories();
  }, [supabase]);

  const validateFile = (file: File) => {
    const extension = file.name.split(".").pop()?.toLowerCase() || "";

    if (!ALLOWED_FILE_TYPES.includes(extension)) {
      toast.error("Por favor, selecciona un archivo PNG, SVG o ICO válido");
      return false;
    }

    if (file.size > MAX_FILE_SIZE) {
      toast.error("El archivo no debe superar los 5MB");
      return false;
    }

    return true;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (validateFile(selectedFile)) {
        setFile(selectedFile);
      }
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (validateFile(droppedFile)) {
        setFile(droppedFile);
      }
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      toast.error("Por favor, selecciona un archivo");
      return;
    }

    if (!formData.category_id) {
      toast.error("Por favor, selecciona una categoría");
      return;
    }

    setLoading(true);

    try {
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();
      if (sessionError) throw sessionError;
      if (!session) throw new Error("No hay sesión activa");

      const fileExt = file.name.split(".").pop()?.toLowerCase() || "";
      const filePath = `${session.user.id}/${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("icons")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) throw uploadError;

      const { data } = await supabase.storage
        .from("icons")
        .getPublicUrl(filePath);

      if (!data.publicUrl) throw new Error("Error al obtener la URL pública");

      const { error: dbError } = await supabase.from("icons").insert({
        name: formData.name,
        description: formData.description,
        file_url: data.publicUrl,
        user_id: session.user.id,
        category_id: formData.category_id,
        download_count: 0,
      });

      if (dbError) throw dbError;

      toast.success("Icono subido correctamente");
      router.push("/my-icons");
      router.refresh();
    } catch (error: any) {
      console.error("Error al subir el icono:", error);
      toast.error(error.message || "Error al subir el icono");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 w-full flex flex-col gap-12 p-4 sm:p-8">
      <div className="w-full max-w-4xl mx-auto">
        <div className="bg-accent text-sm p-3 px-5 rounded-md text-foreground flex gap-3 items-center mb-8">
          <InfoIcon size="16" strokeWidth={2} />
          Aquí puedes subir nuevos iconos a la colección
        </div>

        <div className="bg-card text-card-foreground rounded-lg p-6 shadow-lg border">
          <h2 className="text-2xl font-bold mb-6">Subir Nuevo Icono</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre del Icono</Label>
              <Input
                id="name"
                type="text"
                placeholder="Nombre descriptivo del icono"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Categoría</Label>
              <select
                id="category"
                className={cn(
                  "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                  "disabled:cursor-not-allowed disabled:opacity-50"
                )}
                value={formData.category_id}
                onChange={(e) =>
                  setFormData({ ...formData, category_id: e.target.value })
                }
                required
              >
                <option value="">Selecciona una categoría</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descripción</Label>
              <textarea
                id="description"
                className={cn(
                  "flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                  "disabled:cursor-not-allowed disabled:opacity-50"
                )}
                rows={3}
                placeholder="Breve descripción del icono"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Archivo de Icono</Label>
              <div
                className={cn(
                  "border-2 border-dashed rounded-lg p-8 text-center transition-colors",
                  "hover:bg-accent hover:bg-opacity-50",
                  dragActive && "bg-accent bg-opacity-50",
                  "cursor-pointer"
                )}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() =>
                  document
                    .querySelector<HTMLInputElement>("#file-input")
                    ?.click()
                }
              >
                <div className="flex flex-col items-center gap-2">
                  <UploadIcon className="h-12 w-12 text-muted-foreground" />
                  {file ? (
                    <>
                      <p className="text-sm font-medium">
                        Archivo seleccionado:
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {file.name}
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="text-sm font-medium">
                        Arrastra y suelta tu archivo aquí o haz clic para
                        seleccionar
                      </p>
                      <p className="text-sm text-muted-foreground">
                        PNG, SVG, ICO (máx. 5MB)
                      </p>
                    </>
                  )}
                </div>
                <input
                  id="file-input"
                  type="file"
                  className="hidden"
                  accept=".png,.svg,.ico"
                  onChange={handleFileChange}
                />
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Subiendo..." : "Subir Icono"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function ProtectedPage() {
  return <UploadForm />;
}
