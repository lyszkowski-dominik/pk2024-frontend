import { useNavigate } from 'react-router';

import { useAppSelector } from '../../app/hooks';
import { selectSelectedCommunity } from '../../features/communities/sharedDataSlice';
import usePagination from '../../hooks/usePagination';
import List from '../../components/common/list/List';
import Spinner from '../../components/ui/spinner/Spinner';
import { columns, getResolutionsData } from './utils';
import { useGetResolutions } from '../../features/resolutions/useGetResolutions';

const ResolutionsList = () => {
  const navigate = useNavigate();
  const hoaId = useAppSelector(selectSelectedCommunity) || -1;
  const { page, setPage, pageSize } = usePagination();

  const { isLoading, data } = useGetResolutions({
    hoaId,
    page,
    pageSize,
  });

  const changePage = (pageNumber: number) => {
    setPage(pageNumber);
  };

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        data && (
          <List
            data={getResolutionsData(data)}
            columns={columns}
            onPageChange={changePage}
            page={page}
            pageSize={pageSize}
            onRowClick={(record) =>
              navigate('/hoa/' + hoaId + '/resolutions/' + record.id)
            }
          />
        )
      )}
    </>
  );
};

export default ResolutionsList;
