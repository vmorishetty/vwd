import { Link } from "wouter";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
}

const Pagination = ({ currentPage, totalPages, basePath }: PaginationProps) => {
  // Generate array of page numbers to display
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;
    
    if (totalPages <= maxPagesToShow) {
      // If total pages is less than max to show, display all pages
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Always include first page
      pageNumbers.push(1);
      
      // Calculate start and end of page range
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, start + 2);
      
      // Adjust start if end is too close to totalPages
      if (end === totalPages - 1) {
        start = Math.max(2, end - 2);
      }
      
      // Add ellipsis if needed
      if (start > 2) {
        pageNumbers.push("ellipsis");
      }
      
      // Add middle pages
      for (let i = start; i <= end; i++) {
        pageNumbers.push(i);
      }
      
      // Add ellipsis if needed
      if (end < totalPages - 1) {
        pageNumbers.push("ellipsis");
      }
      
      // Always include last page
      pageNumbers.push(totalPages);
    }
    
    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();

  return (
    <nav className="inline-flex shadow-sm rounded-md" aria-label="Pagination">
      <Link
        href={currentPage > 1 ? `${basePath}?page=${currentPage - 1}` : "#"}
        className={`relative inline-flex items-center rounded-l-md px-3 py-2 text-sm font-medium ${
          currentPage > 1
            ? "text-gray-500 border border-gray-300 hover:bg-gray-50"
            : "text-gray-300 border border-gray-300 cursor-not-allowed"
        }`}
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="sr-only">Previous</span>
      </Link>
      
      {pageNumbers.map((page, index) => (
        page === "ellipsis" ? (
          <span
            key={`ellipsis-${index}`}
            className="relative inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 border border-gray-300"
          >
            ...
          </span>
        ) : (
          <Link
            key={`page-${page}`}
            href={`${basePath}?page=${page}`}
            className={`relative inline-flex items-center px-3 py-2 text-sm font-medium ${
              currentPage === page
                ? "text-white bg-blue-600 border border-blue-600"
                : "text-gray-700 border border-gray-300 hover:bg-gray-50"
            }`}
          >
            {page}
          </Link>
        )
      ))}
      
      <Link
        href={currentPage < totalPages ? `${basePath}?page=${currentPage + 1}` : "#"}
        className={`relative inline-flex items-center rounded-r-md px-3 py-2 text-sm font-medium ${
          currentPage < totalPages
            ? "text-gray-500 border border-gray-300 hover:bg-gray-50"
            : "text-gray-300 border border-gray-300 cursor-not-allowed"
        }`}
      >
        <ChevronRight className="h-4 w-4" />
        <span className="sr-only">Next</span>
      </Link>
    </nav>
  );
};

export default Pagination;
