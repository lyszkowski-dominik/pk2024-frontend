import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

/**
 * The usePagination function manages pagination state including page number, page size,
 * and navigation functions.
 * @param [initialPage=1] - The `initialPage` parameter in the `usePagination` function is used to set
 * the initial page number when the pagination component is first rendered. If no initial page is
 * provided, it defaults to page 1.
 * @returns The `usePagination` function returns an object with the following properties and methods:
 * - `page`: the current page number
 * - `nextPage`: a function to navigate to the next page
 * - `prevPage`: a function to navigate to the previous page
 * - `setPage`: a function to set a specific page
 * - `pageSize`: the number of items per page
 * - `setPageSize`: a function to set the number of items per page
 */
const usePagination = (initialPage = 1) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [pageSize, setPageSize] = useState(3);
  const page = parseInt(searchParams.get('page') || initialPage.toString(), 10);

  const setPage = (newPage: number) => {
    const pageStr = newPage.toString();
    setSearchParams({ page: pageStr });
  };

  const nextPage = () => {
    setPage(page + 1);
  };

  const prevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return {
    page,
    nextPage,
    prevPage,
    setPage,
    pageSize,
    setPageSize,
  };
};

export default usePagination;
