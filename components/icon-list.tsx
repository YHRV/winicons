"use client";

import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import * as AlertDialog from "@radix-ui/react-alert-dialog";

export default function IconList() {
  const [icons, setIcons] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(true); // Para manejar el estado de carga
  const [error, setError] = useState<string | null>(null); // Para manejar errores

  const supabase = createClient();

  useEffect(() => {
    const getIcons = async () => {
      try {
        // Realiza la consulta a la tabla 'icons' en Supabase
        const { data, error } = await supabase.from("icons").select();

        if (error) throw new Error(error.message);

        // Actualiza el estado con los datos obtenidos
        setIcons(data);
        setLoading(false); // Finaliza el estado de carga
      } catch (err: any) {
        setError(err.message); // Captura errores si los hay
        setLoading(false);
      }
    };

    getIcons();
  }, []); // Se ejecuta una vez cuando el componente se monta

  const handleDownload = async (icon: any) => {
    try {
      const response = await fetch(icon);
      const blob = await response.blob();

      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = `${icon.name}.ico`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error("Error al descargar el icono:", error);
      alert(
        "Hubo un error al descargar el icono. Por favor, inténtalo de nuevo."
      );
    }
  };

  // Mientras se cargan los datos
  if (loading) return <p>Loading icons...</p>;

  // Si hay algún error
  if (error) return <p>Error loading icons: {error}</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Iconos Disponibles</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {icons?.map((icon) => (
          <div key={icon.id}>
            <AlertDialog.Root>
              <AlertDialog.Trigger asChild>
                <div className="border rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer">
                  <img
                    src={icon.file_url}
                    alt={icon.name}
                    className="w-16 h-16 mx-auto mb-4 object-contain"
                  />
                  <h3 className="text-lg font-semibold text-center mb-2">
                    {icon.name}
                  </h3>
                  <p className="text-sm text-gray-600 text-center">
                    {icon.description}
                  </p>
                </div>
              </AlertDialog.Trigger>

              <AlertDialog.Portal>
                <AlertDialog.Overlay className="fixed inset-0 bg-black/50" />
                <AlertDialog.Content className="fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-2xl translate-x-[-50%] translate-y-[-50%] rounded-lg bg-white dark:bg-gray-800 p-6 shadow-lg focus:outline-none">
                  <div className="flex justify-between items-start mb-4">
                    <AlertDialog.Title className="text-2xl font-bold">
                      {icon.name}
                    </AlertDialog.Title>
                    <AlertDialog.Cancel asChild>
                      <button className="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 15 15"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                        >
                          <path
                            d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
                            fill="currentColor"
                            fillRule="evenodd"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </button>
                    </AlertDialog.Cancel>
                  </div>

                  <div className="mt-4">
                    <div className="flex gap-6">
                      <div className="w-40 flex-shrink-0">
                        <img
                          src={icon.file_url}
                          alt={icon.name}
                          className="w-full h-40 object-contain bg-gray-50 dark:bg-gray-900 rounded-lg p-4"
                        />
                      </div>

                      <div className="flex-1 space-y-4">
                        <div>
                          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            Descripción
                          </h4>
                          <p className="text-gray-900 dark:text-gray-100">
                            {icon.description || "Sin descripción"}
                          </p>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            Categoría
                          </h4>
                          <p className="text-gray-900 dark:text-gray-100">
                            {icon.category || "Sin categoría"}
                          </p>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            Formato
                          </h4>
                          <p className="text-gray-900 dark:text-gray-100">
                            SVG
                          </p>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            Fecha de creación
                          </h4>
                          <p className="text-gray-900 dark:text-gray-100">
                            {new Date(
                              icon.created_at || ""
                            ).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end gap-3">
                    <AlertDialog.Cancel asChild>
                      <button className="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600">
                        Cancelar
                      </button>
                    </AlertDialog.Cancel>
                    <button
                      onClick={() => handleDownload(icon)}
                      className="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium bg-blue-500 text-white hover:bg-blue-600"
                    >
                      Descargar Icono
                    </button>
                  </div>
                </AlertDialog.Content>
              </AlertDialog.Portal>
            </AlertDialog.Root>
          </div>
        ))}
      </div>
    </div>
  );
}
