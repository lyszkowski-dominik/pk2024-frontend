import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const usePagination = (initialPage = 1) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [pageSize, setPageSize] = useState(10);
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

  return { page, nextPage, prevPage, setPage, pageSize, setPageSize };
};

export default usePagination;
