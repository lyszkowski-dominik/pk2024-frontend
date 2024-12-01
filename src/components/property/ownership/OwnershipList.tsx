import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import type { User } from '../../../features/users/usersTypes';
import styles from '../../../styles/Table.module.scss';
import propertiesStyles from '../../../pages/properties/Properties.module.scss';
import Spinner from '../../ui/spinner/Spinner';
import { useGetOwnerships } from '../../../features/ownerships/useGetOwnerships';
import type { IOwnership } from '../../../features/ownerships/ownershipTypes';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { setUpdatedOwnerships } from '../../../features/properties/propertiesState';
import IconButton from '../../ui/iconButton/IconButton';

/**
 * @property {number} propertyId - The `propertyId` property represents the id of the property.
 * @property {function} onRowClicked - The `onRowClicked` property represents the function to be called when a row is clicked.
 * @property {function} onRowDelete - The `onRowDelete` property represents the function to be called when a row is deleted.
 * @property {boolean} isEditable - The `isEditable` property represents whether the list is editable.
 */
export interface IProps {
  propertyId: number;
  onRowClicked: (id: number) => void;
  onRowDelete: (id: number) => void;
  isEditable: boolean;
}

/**
 *
 * @param {IProps} params
 * @returns {JSX.Element} The `OwnershipList` component returns a list of ownerships.
 */
const OwnershipList = ({
  propertyId,
  onRowClicked,
  onRowDelete,
  isEditable,
}: IProps) => {
  const [page, setPage] = useState(1);
  const [ownerships, setOwnerships] = useState([]);
  const shouldUpdate = useAppSelector(
    (state) => state.propertiesState.updatedOwnerships,
  );
  const dispatch = useAppDispatch();
  const pageSize = 20;
  const {
    data,
    error,
    isLoading,
    refetch: refreshPage,
  } = useGetOwnerships({
    page,
    pageSize,
  });

  useEffect(() => {
    refreshPage();
    if (data) {
      setOwnerships(
        propertyId
          ? data?.results
              ?.filter(
                (ownership: IOwnership) => ownership.property === propertyId,
              )
              .sort(
                (a: IOwnership, b: IOwnership) =>
                  new Date(b.start).getTime() - new Date(a.start).getTime(),
              )
          : data?.results.sort(
              (a: IOwnership, b: IOwnership) =>
                new Date(b.start).getTime() - new Date(a.start).getTime(),
            ),
      );
    }
  }, [page, data, refreshPage, propertyId]);

  useEffect(() => {
    if (shouldUpdate) {
      refreshPage();
      dispatch(setUpdatedOwnerships(false));
    }
  }, [shouldUpdate]);

  const handlePageClick = (selectedItem: { selected: number }) => {
    setPage(selectedItem.selected + 1);
    refreshPage();
  };

  const getOwners = (owners: User[]) => {
    return owners?.map((owner) => (
      <p key={owner.id}>
        {owner.first_name} {owner.last_name}
      </p>
    ));
  };

  if (isLoading) return <Spinner />;
  if (error) return <div>Błąd przy wczytywaniu danych</div>;
  if (ownerships.length <= 0) return <div>Brak przypisanych właścicieli</div>;

  return isEditable ? (
    <div className={styles.tableContainer}>
      <table className={styles.clickableTable}>
        <thead>
          <tr>
            <th>Właściciele</th>
            <th>Data nabycia</th>
            <th>Data zbycia</th>
            {isEditable && <th></th>}
          </tr>
        </thead>
        <tbody>
          {ownerships?.map((ownership: IOwnership) => (
            <tr key={ownership.id} onClick={() => onRowClicked(ownership.id)}>
              <td>{getOwners(ownership.owners)}</td>
              <td>{ownership.start}</td>
              <td>{ownership.end}</td>
              {isEditable && (
                <td>
                  <IconButton
                    iconName="delete"
                    onClick={(event: any) => {
                      event.stopPropagation();
                      onRowDelete(ownership.id);
                    }}
                    altText="Usuń właściciela"
                  />
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <ReactPaginate
        previousLabel={'<'}
        nextLabel={'>'}
        breakLabel={'...'}
        breakClassName={'break-me'}
        pageCount={Math.ceil((data?.count ?? 0) / pageSize)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={styles.pagination}
        activeClassName={styles.active}
      />
    </div>
  ) : (
    ownerships?.map((ownership: IOwnership) => (
      <div key={ownership.id} className={propertiesStyles.details}>
        <b>Właściciele: </b>
        {ownership.owners?.map((owner: User) => (
          <div key={owner.id} className={propertiesStyles.owners_details}>
            <b>Imię: </b> {owner.first_name}
            <br />
            <b>Nazwisko: </b> {owner.last_name}
            <br />
            <b>E-mail: </b> {owner.email}
            <br />
          </div>
        ))}
        <b>Data nabycia: </b> {new Date(ownership.start || '').toLocaleString()}
        <br />
        <b>Data zbycia: </b>
        {ownership?.end && ownership?.end !== ''
          ? new Date(ownership.end || '').toLocaleString()
          : '-'}
        <br />
      </div>
    ))
  );
};

export default OwnershipList;
