"use client";
import { format } from "date-fns";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";
import Link from "next/link";

import { useEvents } from "@/app/hooks/use-get-events";
import { FaSpinner } from "react-icons/fa";

export default function EventList() {
  const { eventsList, currentPage, totalPages, fetchEvents, loading } =
    useEvents();

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages && page !== currentPage) {
      fetchEvents(page);
    }
  };

  return (
    <div>
      {loading ? (
        <div className="w-full h-full flex items-center justify-center">
          <FaSpinner className="animate-spin h-10 w-10 text-blue-500" />
        </div>
      ) : (
        <div>
          <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10 xl:gap-8 mb-6 xl:mb-20 grid-rows-2">
            {eventsList.map((event) => (
              <li
                key={event.id}
                className="bg-gray-100 shadow-md text-black rounded-sm p-4 min-h-[200px] h-full flex flex-col justify-between">
                <h3 className="font-semibold">{event.title}</h3>
                <p className="line-clamp-2 truncate min-h-5">
                  {event.description}
                </p>

                <div className="grid grid-cols-2 gap-x-5 mt-10 text-sm xl:text-xl font-normal">
                  <Link
                    href={`/register/${event.id}?page=${currentPage}`}
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center duration-150">
                    Register
                  </Link>
                  <Link
                    href={`/events/${event.id}`}
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center duration-150">
                    View
                  </Link>
                </div>
                <span className="text-[10px] mt-2 italic ml-auto">
                  {format(new Date(event.createdAt), "yy.MM/HH:mm")}
                </span>
              </li>
            ))}
          </ul>

          <Pagination>
            <PaginationPrevious
              className="hover:cursor-pointer"
              onClick={() => handlePageChange(currentPage - 1)}
            />
            <PaginationContent>
              {Array.from({ length: totalPages }, (_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink
                    className="hover:cursor-pointer"
                    onClick={() => handlePageChange(i + 1)}>
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
            </PaginationContent>
            <PaginationNext
              className="hover:cursor-pointer"
              onClick={() => handlePageChange(currentPage + 1)}
            />
          </Pagination>
        </div>
      )}
    </div>
  );
}
