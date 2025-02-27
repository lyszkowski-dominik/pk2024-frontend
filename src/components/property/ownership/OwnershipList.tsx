import propertiesStyles from '../../../pages/properties/Properties.module.scss';
import Spinner from '../../ui/spinner/Spinner';
import { useGetOwnerships } from '../../../features/ownerships/useGetOwnerships';
import type { Ownership } from '../../../features/ownerships/ownershipTypes';
import usePagination from '../../../hooks/usePagination';
import List from '../../common/list/List';
import { columns, getData } from './ownershipUtils';

export interface IProps {
  propertyId: number;
  onRowClicked: (id: number) => void;
  onRowDelete: (id: number) => void;
  isEditable: boolean;
}

const OwnershipList = ({
  propertyId,
  onRowClicked,
  onRowDelete,
  isEditable,
}: IProps) => {
  const { page, setPage, pageSize } = usePagination();

  const { data, error, isLoading } = useGetOwnerships({
    page,
    pageSize,
    propertyId,
  });

  const changePage = (pageNumber: number) => {
    setPage(pageNumber);
  };

  if (isLoading) return <Spinner />;
  if (error) return <div>Błąd przy wczytywaniu danych</div>;
  return (
    <>
      {data && data?.results?.length > 0 ? (
        isEditable ? (
          <List
            data={getData(data)}
            columns={columns}
            onPageChange={changePage}
            page={page}
            pageSize={pageSize}
            onRowClick={(ownership) => onRowClicked(ownership.id)}
            onDelete={(ownership) => onRowDelete(ownership.id)}
          />
        ) : (
          data.results?.map((ownership: Ownership) => (
            <div key={ownership.id} className={propertiesStyles.details}>
              <b>Właściciele: </b>
              {ownership.owners?.map((owner: any) => (
                <div key={owner.id} className={propertiesStyles.owners_details}>
                  <b>Imię: </b> {owner.first_name}
                  <br />
                  <b>Nazwisko: </b> {owner.last_name}
                  <br />
                  <b>E-mail: </b> {owner.email}
                  <br />
                </div>
              ))}
              <b>Data nabycia: </b>{' '}
              {new Date(ownership.start || '').toLocaleString()}
              <br />
              <b>Data zbycia: </b>
              {ownership?.end && ownership?.end !== ''
                ? new Date(ownership.end || '').toLocaleString()
                : '-'}
              <br />
            </div>
          ))
        )
      ) : (
        <div>Brak przypisanych właścicieli</div>
      )}
    </>
  );
};

export default OwnershipList;
