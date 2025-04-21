import { useCallback } from "react";
import { useLocation } from "wouter";
import { cn } from "@/lib/utils";

interface CategoryBadgeProps {
  categoryName: string;
  categorySlug: string;
  className?: string;
  size?: "small" | "medium";
}

const CategoryBadge = ({
  categoryName,
  categorySlug,
  className,
  size = "medium",
}: CategoryBadgeProps) => {
  const [, navigate] = useLocation();
  
  const handleClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/category/${categorySlug}`);
  }, [categorySlug, navigate]);
  
  return (
    <span
      onClick={handleClick}
      className={cn(
        "inline-block px-3 py-1 text-xs font-medium bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition-colors cursor-pointer",
        size === "small" && "px-2 py-0.5 text-xs",
        className
      )}
    >
      {categoryName}
    </span>
  );
};

export default CategoryBadge;
