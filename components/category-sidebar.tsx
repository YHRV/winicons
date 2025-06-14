"use client";

import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";

interface Category {
  id: string;
  name: string;
}

interface CategorySidebarProps {
  onCategorySelect: (categoryId: string | null) => void;
  selectedCategory: string | null;
}

export default function CategorySidebar({
  onCategorySelect,
  selectedCategory,
}: CategorySidebarProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
        setLoading(false);
      } catch (err) {
        setError("Error al cargar categorías");
        setLoading(false);
      }
    };

    getCategories();
  }, []);

  if (loading) return <div className="w-72 p-4">Loading categories...</div>;
  if (error)
    return (
      <div className="w-72 p-4 text-red-500">Error fetching categories</div>
    );

  return (
    <>
      {/* Botón de menú para móvil */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-white/80 dark:bg-black/80 shadow-md hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Menú lateral */}
      <div
        className={`
          ${isMobileMenuOpen ? "fixed z-40" : "lg:static"}
          inset-0 transform transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          w-72 border-r dark:border-gray-900 shadow-lg lg:shadow-none
        `}
      >
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-gray-100">
            Categories
          </h2>
          <div className="space-y-3">
            <button
              onClick={() => {
                onCategorySelect(null);
                setIsMobileMenuOpen(false);
              }}
              className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                !selectedCategory
                  ? "bg-blue-100 dark:bg-gray-900 text-blue-700 dark:text-blue-400 font-medium"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900"
              }`}
            >
              All categories
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => {
                  onCategorySelect(category.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  selectedCategory === category.id
                    ? "bg-blue-100 dark:bg-gray-900 text-blue-700 dark:text-blue-400 font-medium"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Overlay para móvil */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
}
