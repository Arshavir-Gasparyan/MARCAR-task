import Link from "next/link";
import clsx from "clsx";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  order?: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  order,
}: PaginationProps) {
  const generateLink = (page: number) => {
    const params = new URLSearchParams({ page: page.toString() });
    if (order) params.set("order", order);
    return `/?${params.toString()}`;
  };

  const renderPage = (page: number) => (
    <Link
      key={page}
      href={generateLink(page)}
      className={clsx(
        "min-w-9 rounded-full py-2 px-3 text-sm text-center transition-all",
        page === currentPage
          ? "bg-indigo-400 text-black font-semibold shadow-md"
          : "bg-gray-800 text-gray-300 hover:bg-indigo-400 hover:text-black"
      )}
    >
      {page}
    </Link>
  );

  const renderDots = (key: string) => (
    <span key={key} className="px-2 text-gray-400">
      ...
    </span>
  );

  const pages = [];

  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(renderPage(i));
    }
  } else {
    pages.push(renderPage(1));

    if (currentPage > 4) pages.push(renderDots("left-dots"));

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);
    for (let i = start; i <= end; i++) {
      pages.push(renderPage(i));
    }

    if (currentPage < totalPages - 3) pages.push(renderDots("right-dots"));

    pages.push(renderPage(totalPages));
  }

  return (
    <div className="flex flex-wrap gap-1 justify-center items-center mt-6 px-2">
      <Link
        href={generateLink(Math.max(1, currentPage - 1))}
        className={clsx(
          "rounded-full py-1.5 px-3 text-sm transition-all",
          "bg-gray-800 text-gray-300 hover:bg-indigo-400 hover:text-black",
          currentPage === 1 && "pointer-events-none opacity-40"
        )}
      >
        Prev
      </Link>

      {pages}

      <Link
        href={generateLink(Math.min(totalPages, currentPage + 1))}
        className={clsx(
          "rounded-full py-1.5 px-3 text-sm transition-all",
          "bg-gray-800 text-gray-300 hover:bg-indigo-400 hover:text-black",
          currentPage === totalPages && "pointer-events-none opacity-40"
        )}
      >
        Next
      </Link>
    </div>
  );
}
