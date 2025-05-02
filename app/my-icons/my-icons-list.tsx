"use client";

import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Pencil, Trash2, Download, Save, X } from "lucide-react";

interface MyIconsListProps {
  userId: string;
}

interface Icon {
  id: string;
  name: string;
  description: string;
  category_id: string;
  file_url: string;
  created_at: string;
  user_id: string;
  category: {
    name: string;
  };
}

interface Category {
  id: string;
  name: string;
}

export default function MyIconsList({ userId }: MyIconsListProps) {
  const [icons, setIcons] = useState<Icon[] | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingIcon, setEditingIcon] = useState<Icon | null>(null);
  const [editForm, setEditForm] = useState({
    name: "",
    description: "",
    category_id: "",
  });

  const supabase = createClient();

  useEffect(() => {
    const getCategories = async () => {
      try {
        const { data, error } = await supabase
          .from("categories")
          .select("id, name")
          .order("name");

        if (error) throw error;
        setCategories(data || []);
      } catch (err) {
        console.error("Error al cargar categorías:", err);
      }
    };

    getCategories();
  }, []);

  useEffect(() => {
    const getMyIcons = async () => {
      try {
        // Realiza la consulta a la tabla 'icons' en Supabase filtrando por user_id
        const { data, error } = await supabase
          .from("icons")
          .select(
            `
            *,
            category:category_id (
              name
            )
          `
          )
          .eq("user_id", userId);

        if (error) throw new Error(error.message);

        // Actualiza el estado con los datos obtenidos
        setIcons(data);
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };

    getMyIcons();
  }, [userId, supabase]);

  const handleDownload = async (icon: Icon) => {
    try {
      const response = await fetch(icon.file_url);
      const blob = await response.blob();

      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = `${icon.name}.ico`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.URL.revokeObjectURL(downloadUrl);
      toast.success("Icono descargado correctamente");
    } catch (error) {
      console.error("Error al descargar el icono:", error);
      toast.error("Error al descargar el icono");
    }
  };

  const handleEdit = (icon: Icon) => {
    setEditingIcon(icon);
    setEditForm({
      name: icon.name,
      description: icon.description || "",
      category_id: icon.category_id,
    });
  };

  const handleSaveEdit = async () => {
    if (!editingIcon) return;

    try {
      const { error } = await supabase
        .from("icons")
        .update({
          name: editForm.name,
          description: editForm.description,
          category_id: editForm.category_id,
        })
        .eq("id", editingIcon.id);

      if (error) throw error;

      // Actualizar la lista de iconos
      setIcons((prevIcons) => {
        if (!prevIcons) return null;
        return prevIcons.map((icon) =>
          icon.id === editingIcon.id
            ? {
                ...icon,
                name: editForm.name,
                description: editForm.description,
                category_id: editForm.category_id,
                category:
                  categories.find((c) => c.id === editForm.category_id) ||
                  icon.category,
              }
            : icon
        );
      });

      setEditingIcon(null);
      toast.success("Icono actualizado correctamente");
    } catch (error) {
      console.error("Error al actualizar el icono:", error);
      toast.error("Error al actualizar el icono");
    }
  };

  const handleDelete = async (iconId: string) => {
    if (!confirm("¿Estás seguro de que quieres eliminar este icono?")) return;

    try {
      const { error } = await supabase.from("icons").delete().eq("id", iconId);

      if (error) throw error;

      // Actualizar la lista de iconos
      setIcons((prevIcons) => {
        if (!prevIcons) return null;
        return prevIcons.filter((icon) => icon.id !== iconId);
      });

      toast.success("Icono eliminado correctamente");
    } catch (error) {
      console.error("Error al eliminar el icono:", error);
      toast.error("Error al eliminar el icono");
    }
  };

  // Mientras se cargan los datos
  if (loading) return <p>Cargando iconos...</p>;

  // Si hay algún error
  if (error) return <p>Error al cargar los iconos: {error}</p>;

  // Si no hay iconos
  if (!icons || icons.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-lg mb-4">No tienes ningún icono subido.</p>
        <Button asChild>
          <a href="/protected">Subir un nuevo icono</a>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {icons.map((icon) => (
        <div
          key={icon.id}
          className="border rounded-lg p-4 hover:shadow-lg transition-shadow"
        >
          <div className="relative">
            <img
              src={icon.file_url}
              alt={icon.name}
              className="w-16 h-16 mx-auto mb-4 object-contain"
            />
            <div className="absolute top-0 right-0 flex gap-1">
              <button
                onClick={() => handleEdit(icon)}
                className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
                title="Editar"
              >
                <Pencil className="h-4 w-4" />
              </button>
              <button
                onClick={() => handleDelete(icon.id)}
                className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
                title="Eliminar"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
          <h3 className="text-lg font-semibold text-center mb-2">
            {icon.name}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 text-center mb-2">
            {icon.description || "Sin descripción"}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500 text-center mb-3">
            {icon.category?.name || "Sin categoría"}
          </p>
          <div className="flex justify-center">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleDownload(icon)}
              className="flex items-center gap-1"
            >
              <Download className="h-4 w-4" />
              <span>Descargar</span>
            </Button>
          </div>
        </div>
      ))}

      {/* Modal de edición */}
      {editingIcon && (
        <AlertDialog.Root
          open={!!editingIcon}
          onOpenChange={() => setEditingIcon(null)}
        >
          <AlertDialog.Portal>
            <AlertDialog.Overlay className="fixed inset-0 bg-black/50" />
            <AlertDialog.Content className="fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-2xl translate-x-[-50%] translate-y-[-50%] rounded-lg bg-white dark:bg-gray-800 p-6 shadow-lg focus:outline-none">
              <div className="flex justify-between items-start mb-4">
                <AlertDialog.Title className="text-2xl font-bold">
                  Editar Icono
                </AlertDialog.Title>
                <AlertDialog.Cancel asChild>
                  <button className="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <X className="h-4 w-4" />
                  </button>
                </AlertDialog.Cancel>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-name">Nombre</Label>
                  <Input
                    id="edit-name"
                    value={editForm.name}
                    onChange={(e) =>
                      setEditForm({ ...editForm, name: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-category">Categoría</Label>
                  <select
                    id="edit-category"
                    value={editForm.category_id}
                    onChange={(e) =>
                      setEditForm({ ...editForm, category_id: e.target.value })
                    }
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
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
                  <Label htmlFor="edit-description">Descripción</Label>
                  <textarea
                    id="edit-description"
                    value={editForm.description}
                    onChange={(e) =>
                      setEditForm({ ...editForm, description: e.target.value })
                    }
                    className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <AlertDialog.Cancel asChild>
                  <Button variant="outline">Cancelar</Button>
                </AlertDialog.Cancel>
                <Button
                  onClick={handleSaveEdit}
                  className="flex items-center gap-1"
                >
                  <Save className="h-4 w-4" />
                  <span>Guardar</span>
                </Button>
              </div>
            </AlertDialog.Content>
          </AlertDialog.Portal>
        </AlertDialog.Root>
      )}
    </div>
  );
}
