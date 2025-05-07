// utils/projectUtils.ts
export const getCategoryColor = (category: string): string => {
    const colors: Record<string, string> = {
      Ekologia: "bg-green-100 text-green-800 hover:bg-green-200",
      Infrastruktura: "bg-blue-100 text-blue-800 hover:bg-blue-200",
      Kultura: "bg-purple-100 text-purple-800 hover:bg-purple-200",
      Edukacja: "bg-amber-100 text-amber-800 hover:bg-amber-200",
      Zdrowie: "bg-red-100 text-red-800 hover:bg-red-200",
      Sport: "bg-orange-100 text-orange-800 hover:bg-orange-200",
    };
    return colors[category] || "bg-gray-100 text-gray-800 hover:bg-gray-200";
  };
  
  export const getStatusColor = (status: string): string => {
    const colors: Record<string, string> = {
      Nowy: "bg-blue-100 text-blue-800",
      Weryfikacja: "bg-amber-100 text-amber-800",
      Zaakceptowany: "bg-green-100 text-green-800",
      Odrzucony: "bg-red-100 text-red-800",
      "W realizacji": "bg-purple-100 text-purple-800",
      Zakończony: "bg-gray-100 text-gray-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };