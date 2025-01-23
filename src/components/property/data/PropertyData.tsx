import {
  Property,
  PropertyTypeDisplayNames,
} from '../../../features/properties/propertiesTypes';
import { useGetProperty } from '../../../features/properties/useGetProperty';
import styles from './PropertyData.module.scss';
import Spinner from '../../ui/spinner/Spinner';
import { PropertyType } from '../types';
import List from '../../common/list/List';
import { canBeParent, columns, getFormattedData } from '../propertyUtils';
import { useState } from 'react';
import Modal from '../../ui/modal/Modal';
import { ModalType, UserRole } from '../../../types/types';
import { useAppSelector } from '../../../app/hooks';
import { selectRoles } from '../../loginForm/loginFormSlice';
import RemovePropertyConfirmation from './RemovePropertyConfirmation';
import IconButton from '../../ui/iconButton/IconButton';
import PropertyForm from '../PropertyForm';
import { Button } from '@mui/material';

interface IProps {
  propertyId: number;
}

const PropertyData = ({ propertyId }: IProps) => {
  const { isLoading, data: property } = useGetProperty(propertyId);
  const userRole = useAppSelector(selectRoles);
  const isManager =
    userRole === UserRole.Manager || userRole === UserRole.Admin;
  const [isModalVisible, setModalVisible] = useState(false);
  const [openModalType, setOpenModalType] = useState({});
  const [selectedProperty, setSelectedProperty] = useState<number | null>(null);

  const openModal = (propertyId: number | null, modalType: ModalType) => {
    setSelectedProperty(propertyId);
    setModalVisible(true);
    setOpenModalType(modalType);
  };

  const closeModal = () => {
    setSelectedProperty(null);
    setModalVisible(false);
  };

  if (isLoading) return <Spinner />;

  return (
    <div className={styles.propertyView}>
      {isLoading ? (
        <Spinner />
      ) : !property ? (
        <div>Brak danych</div>
      ) : (
        <>
          <div className={styles.headerRow}>
            <h2 className={styles.header}>Lokal {property.number}</h2>
            {isManager && (
              <div className={styles.actionButtons}>
                <Button
                  variant="outlined"
                  type="button"
                  onClick={() => openModal(property.id, ModalType.Edit)}
                >
                  <span>Edytuj</span>
                </Button>
                <Button
                  variant="outlined"
                  type="button"
                  onClick={() => openModal(property.id, ModalType.Delete)}
                  color="error"
                >
                  <span>Usuń</span>
                </Button>
              </div>
            )}
          </div>
          <div className={styles.details}>
            <div className={styles.detailItem}>
              <label>Typ:</label>
              <span>{PropertyTypeDisplayNames[property.type]}</span>
            </div>
            <div className={styles.detailItem}>
              <label>Budynek:</label>
              <span>{property.building || '—'}</span>
            </div>
            <div className={styles.detailItem}>
              <label>Numer:</label>
              <span>{property.number || '—'}</span>
            </div>
            <div className={styles.detailItem}>
              <label>Piętro:</label>
              <span>{property.floor !== undefined ? property.floor : '—'}</span>
            </div>
            <div className={styles.detailItem}>
              <label>Powierzchnia całkowita:</label>
              <span>
                {property.total_area ? `${property.total_area} m²` : '—'}
              </span>
            </div>
            <div className={styles.detailItem}>
              <label>Powierzchnia użytkowa:</label>
              <span>
                {property.usable_area ? `${property.usable_area} m²` : '—'}
              </span>
            </div>
            {property.type === PropertyType.Flat && (
              <div className={styles.detailItem}>
                <label>Liczba mieszkańców:</label>
                <span>{property.inhabitants || '—'}</span>
              </div>
            )}
            {canBeParent(property.type) && (
              <>
                <div className={styles.detailTable}>
                  <label>Przynależne lokale:</label>
                  {isManager && (
                    <div className={styles.iconButtons}>
                      <IconButton
                        iconName="add"
                        onClick={() => openModal(null, ModalType.Add)}
                        altText="Dodaj lokal"
                      />
                    </div>
                  )}
                  {property.properties && property.properties.length > 0 ? (
                    <>
                      <List
                        data={getFormattedData(property.properties)}
                        columns={columns}
                        noPagination={true}
                        {...(isManager && {
                          onDelete: (property: Property) => {
                            openModal(property.id, ModalType.Delete);
                          },
                          onRowClick: (property: Property) =>
                            openModal(property.id, ModalType.Edit),
                        })}
                      />
                    </>
                  ) : (
                    <div>Brak przypisanych lokali</div>
                  )}
                </div>
              </>
            )}
          </div>
        </>
      )}
      {isModalVisible && (
        <>
          {openModalType === ModalType.Add && (
            <Modal>
              <PropertyForm onClose={closeModal} addToParent={propertyId} />
            </Modal>
          )}
          {selectedProperty && (
            <>
              {openModalType === ModalType.Edit && (
                <Modal>
                  <PropertyForm
                    onClose={closeModal}
                    propertyId={selectedProperty}
                    addToParent={propertyId}
                  />
                </Modal>
              )}
              {openModalType === ModalType.Delete && (
                <RemovePropertyConfirmation
                  propertyId={selectedProperty}
                  parentId={property?.id}
                  onClose={closeModal}
                />
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default PropertyData;
