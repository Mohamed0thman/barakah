import agent from "@/api";
import { Category, Product } from "@/types";
import { useQuery } from "@tanstack/react-query";

// category

export const useCategoryList = () => {
  return useQuery<Category[]>({
    queryKey: ["category"],
    queryFn: agent.ProductsApi.category,
  });
};

export const useByCategory = (category: Category) => {
  return useQuery<Product[]>({
    queryKey: ["byCategory"],
    queryFn: () => agent.ProductsApi.byCategory(category),
  });
};

// Hook for fetching the list of posts
export const useProductList = (category: Category) => {
  return useQuery<Product[]>({
    queryKey: ["products", category],

    queryFn: () =>
      category !== "all"
        ? agent.ProductsApi.byCategory(category)
        : agent.ProductsApi.list(),
  });
};

// Hook for fetching post details
export const usePostDetails = (id: number) => {
  return useQuery<Product>({
    queryKey: ["productDetails"],
    queryFn: () => agent.ProductsApi.product(id),
  });
};
