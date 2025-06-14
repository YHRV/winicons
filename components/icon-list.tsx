"use client";

import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import CategorySidebar from "./category-sidebar";

interface IconListProps {
  searchQuery: string;
}

export default function IconList({ searchQuery }: IconListProps) {
  const [icons, setIcons] = useState<any[] | null>(null);
  const [filteredIcons, setFilteredIcons] = useState<any[] | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true); // For handling loading state
  const [error, setError] = useState<string | null>(null); // For handling errors

  const supabase = createClient();

  useEffect(() => {
    const getIcons = async () => {
      try {
        let query = supabase.from("icons").select(`
          id,
          name,
          description,
          file_url,
          download_count,
          created_at,
          category_id,
          category:category_id (
            id,
            name
          )
        `);

        if (selectedCategory) {
          query = query.eq("category_id", selectedCategory);
        }

        const { data, error } = await query;

        if (error) throw new Error(error.message);

        // Update state with fetched data
        setIcons(data);
        setFilteredIcons(data);
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };

    getIcons();
  }, [selectedCategory]); // Runs once when component mounts

  useEffect(() => {
    if (icons) {
      const filtered = icons.filter((icon) =>
        icon.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredIcons(filtered);
    }
  }, [searchQuery, icons]);

  const handleDownload = async (icon: any) => {
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
    } catch (error) {
      console.error("Error downloading icon:", error);
      alert("There was an error downloading the icon. Please try again.");
    }
  };

  // While data is loading
  if (loading) return <p>Loading icons...</p>;

  // If there's an error
  if (error) return <p>Error loading icons: {error}</p>;

  return (
    <div className="flex min-h-screen">
      <CategorySidebar
        selectedCategory={selectedCategory}
        onCategorySelect={setSelectedCategory}
      />
      <div className="flex-1 container mx-auto px-4 py-8 lg:pl-8">
        <h1 className="text-2xl lg:text-3xl font-bold mb-8 mt-16 lg:mt-0">
          Available Icons
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-6 min-h-[400px]">
          {filteredIcons?.length === 0 ? (
            <div className="col-span-full flex items-center justify-center h-full">
              <p className="text-gray-500 dark:text-gray-400">
                No icons available
              </p>
            </div>
          ) : (
            filteredIcons?.map((icon) => (
              <div key={icon.id}>
                <AlertDialog.Root>
                  <AlertDialog.Trigger asChild>
                    <button className="w-full">
                      <div className="border rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer h-48 flex flex-col items-center justify-between dark:border-gray-800 dark:hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                        <img
                          src={icon.file_url}
                          alt={icon.name}
                          className="w-16 h-16 mx-auto mb-4 object-contain"
                        />
                        <h3 className="text-lg font-semibold text-center mb-2 dark:text-gray-100">
                          {icon.name}
                        </h3>
                        <p className="text-sm text-gray-600 text-center dark:text-gray-400">
                          {icon.description}
                        </p>
                      </div>
                    </button>
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
                                Description
                              </h4>
                              <p className="text-gray-900 dark:text-gray-100">
                                {icon.description || "No description"}
                              </p>
                            </div>

                            <div>
                              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                Category
                              </h4>
                              <p className="text-gray-900 dark:text-gray-100">
                                {icon.category?.name || "No category"}
                              </p>
                            </div>

                            <div>
                              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                Format
                              </h4>
                              <p className="text-gray-900 dark:text-gray-100">
                                SVG
                              </p>
                            </div>

                            <div>
                              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                Creation Date
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
                            Cancel
                          </button>
                        </AlertDialog.Cancel>
                        <button
                          onClick={() => handleDownload(icon)}
                          className="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium bg-blue-500 text-white hover:bg-blue-600"
                        >
                          Download Icon
                        </button>
                      </div>
                    </AlertDialog.Content>
                  </AlertDialog.Portal>
                </AlertDialog.Root>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
