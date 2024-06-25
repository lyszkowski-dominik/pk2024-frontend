import styles from './Owners.module.scss';
import { useEffect, useState } from 'react';
import { useGetOwners } from '../../hooks/useGetOwners';
import type { OwnersResponse } from '../../types/OwnersTypes';
import OwnersList from './OwnersList';
import Spinner from '../ui/spinner/Spinner';

interface OwnersProps {
  type: string;
}

const Owners = ({ type }: OwnersProps) => {
  const [owners, setOwners] = useState<OwnersResponse | null>(null);
  // get current url value
  const path = window.location.pathname; // /hoa/1
  const hoaID = parseInt(path.split('/').pop() || '', 10); // 1
  const [page, setPage] = useState(1);

  const changePage = (pageNumber: number) => {
    setPage(pageNumber);
    refreshPage();
  };

  const { isLoading, data, error, refetch: refreshPage } = useGetOwners({
    role: type,
    hoaID,
    page
  });

  useEffect(() => {
    refreshPage();
    setOwners(data);
  }, [page, data, hoaID]);

  if (isLoading) return <Spinner />;
  if (error) return <div>Błąd ładowania danych</div>;

  return (
    <div className={styles.info}>
      <OwnersList ownersData={owners} changePage={changePage} />
    </div>
  );
};

export default Owners;