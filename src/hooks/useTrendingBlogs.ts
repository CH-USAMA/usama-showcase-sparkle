import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { BlogPost } from "@/data/blogs";

export const useTrendingBlogs = () => {
  return useQuery<BlogPost[]>({
    queryKey: ["trending-blogs"],
    queryFn: async () => {
      try {
        const { data, error } = await supabase.functions.invoke("fetch-blogs");
        if (error || !data?.success) return [];
        return data.posts as BlogPost[];
      } catch {
        return [];
      }
    },
    staleTime: 1000 * 60 * 60, // 1 hour
    retry: 1,
  });
};
