"use client";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";

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

import { useEffect, useState } from "react";
import debounce from "lodash.debounce";
import { LucideStickyNote, SearchIcon } from "lucide-react";

export default function EventList() {
  const { eventsList, currentPage, totalPages, fetchEvents, loading } =
    useEvents();
  const [searchQuery, setSearchQuery] = useState("");

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages && page !== currentPage) {
      fetchEvents(page, searchQuery);
    }
  };

  const debouncedFetchEvents = debounce((value: string) => {
    fetchEvents(1, value);
  }, 300);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchQuery(value);
    debouncedFetchEvents(value);
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const searchFromUrl = params.get("search");
    if (searchFromUrl) {
      setSearchQuery(searchFromUrl);
    }
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    params.set("search", searchQuery);
    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}?${params.toString()}`
    );
  }, [searchQuery]);

  return (
    <div className="relative">
      <div>
        <div className="flex justify-between items-center mb-4 max-w-[480px] relative">
          <Input
            type="text"
            value={searchQuery}
            className="pr-10"
            onChange={handleSearchChange}
            placeholder="Search events"
          />
          <SearchIcon className="size-5 absolute top-1/2 right-2 -translate-y-1/2" />
        </div>
        {eventsList.length > 0 ? (
          <>
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
                      className={`hover:cursor-pointer ${i + 1 === currentPage ? "bg-gray-100" : ""}`}
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
          </>
        ) : (
          <div>
            {loading ? (
              <div className="flex justify-center items-center h-96">
                <span className="loader"></span>
              </div>
            ) : (
              <div className="flex justify-center items-center h-96">
                    No events found
                    <LucideStickyNote className="size-10 ml-2" />
                    
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
