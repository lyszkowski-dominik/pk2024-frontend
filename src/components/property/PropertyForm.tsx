import * as Yup from 'yup';
import { useAppSelector } from '../../app/hooks';
import { selectSelectedCommunity } from '../../features/communities/sharedDataSlice';
import type { SearchDropdownOption } from '../ui/search/SearchDropdown';
import SearchDropdown from '../ui/search/SearchDropdown';
import {
  PropertyFormType,
  PropertyType,
  PropertyTypeDisplayNames,
} from './types';
import { useNotifications } from '../alerts/NotificationContext';
import { useCreateProperty } from '../../features/properties/useCreateProperty';
import FormikWrapper, {
  FormikWrapperProps,
} from '../common/forms/form/FormikWrapper';
import TextInputLiveFeedback from '../common/forms/textInputLiveFeedback/TextInputLiveFeedback';
import { useGetProperty } from '../../features/properties/useGetProperty';
import { useGetProperties } from '../../features/properties/useGetProperties';
import {
  BuildingsRequest,
  Property,
} from '../../features/properties/propertiesTypes';
import { canBeParent, mustHaveParent } from './propertyUtils';
import { useEditProperty } from '../../features/properties/useEditProperty';
import Spinner from '../ui/spinner/Spinner';
import { useGetBuildings } from '../../features/properties/useGetBuildings';
import { useEffect, useState } from 'react';

const PropertyForm = ({
  onClose,
  propertyId,
  addToParent,
}: {
  onClose: () => void;
  propertyId?: number;
  addToParent?: number;
}) => {
  const { addNotification } = useNotifications();
  const hoaId = useAppSelector(selectSelectedCommunity) || -1;
  const createProperty = useCreateProperty(hoaId, addToParent);
  const editProperty = useEditProperty(hoaId, propertyId, addToParent);
  const { data: existingProperty, isPending } = useGetProperty(propertyId ?? 0);
  const mutation = propertyId ? editProperty : createProperty;
  const [selectedBuilding, setSelectedBuilding] = useState('');
  const { isLoading: isLoadingOptions, data: parentsOptions } =
    useGetProperties({
      page: 1,
      pageSize: 50,
      hoaId,
    });
  const [propertySchema, setPropertySchema] = useState(
    Yup.object({
      type: Yup.mixed<PropertyType>()
        .oneOf(Object.values(PropertyType))
        .required('Wybierz rodzaj lokalu'),
      building: Yup.string(),
      number: Yup.string().required('Podaj numer'),
      floor: Yup.number()
        .required('Podaj piętro')
        .integer('Podaj liczbę całkowitą'),
      total_area: Yup.number()
        .positive('Powierzchnia musi być > 0')
        .required('Podaj powierzchnię całkowitą lokalu'),
      usable_area: Yup.number()
        .positive('Powierzchnia musi być > 0')
        .required('Podaj powierzchnię użytkową lokalu')
        .test(
          'usable-area-max',
          'Powierzchnia użytkowa nie może być większa niż całkowita',
          function (value) {
            const { total_area } = this.parent;
            return total_area == null || value == null || value <= total_area;
          },
        ),
      description: Yup.string(),
      inhabitants: Yup.number().when('type', ([type], sch) => {
        return type === PropertyType.Flat
          ? sch
              .required('Podaj liczbę osób zamieszkujących mieszkanie')
              .positive('Liczba mieszkańców musi być > 0')
          : sch.nullable();
      }),
      parent: Yup.number().when('type', ([type], sch) => {
        return mustHaveParent(type)
          ? sch.required('Wybierz lokal nadrzędny')
          : sch.nullable();
      }),
    }),
  );
  const { data: allBuildings, isLoading: isLoadingBuildings } = useGetBuildings(
    { page: 1, pageSize: 50, hoaId },
  );

  useEffect(() => {
    const minFloor = allBuildings?.results.find(
      (building: BuildingsRequest) => building.id === Number(selectedBuilding),
    )?.floor_min;
    const maxFloor = allBuildings?.results.find(
      (building: BuildingsRequest) => building.id === Number(selectedBuilding),
    )?.floor_max;
    if (minFloor && maxFloor) {
      setPropertySchema(
        Yup.object({
          type: Yup.mixed<PropertyType>()
            .oneOf(Object.values(PropertyType))
            .required('Wybierz rodzaj lokalu'),
          building: Yup.string(),
          number: Yup.string().required('Podaj numer'),
          floor: Yup.number()
            .required('Podaj piętro')
            .integer('Podaj liczbę całkowitą')
            .min(minFloor, `Piętro musi być większe niż ${minFloor}`)
            .max(maxFloor, `Piętro musi być mniejsze niż ${maxFloor}`),
          total_area: Yup.number()
            .positive('Powierzchnia musi być > 0')
            .required('Podaj powierzchnię całkowitą lokalu'),
          usable_area: Yup.number()
            .positive('Powierzchnia musi być > 0')
            .required('Podaj powierzchnię użytkową lokalu')
            .test(
              'usable-area-max',
              'Powierzchnia użytkowa nie może być większa niż całkowita',
              function (value) {
                const { total_area } = this.parent;
                return (
                  total_area == null || value == null || value <= total_area
                );
              },
            ),
          description: Yup.string(),
          inhabitants: Yup.number().when('type', ([type], sch) => {
            return type === PropertyType.Flat
              ? sch
                  .required('Podaj liczbę osób zamieszkujących mieszkanie')
                  .positive('Liczba mieszkańców musi być > 0')
              : sch.nullable();
          }),
          parent: Yup.number().when('type', ([type], sch) => {
            return mustHaveParent(type)
              ? sch.required('Wybierz lokal nadrzędny')
              : sch.nullable();
          }),
        }),
      );
    }
  }, [selectedBuilding, allBuildings]);

  useEffect(() => {
    if (propertyId) {
      setSelectedBuilding(existingProperty!.building);
    }
  }, [existingProperty, propertyId]);

  const filterTypes =
    (existingProperty && mustHaveParent(existingProperty.type)) ||
    (!existingProperty && !!addToParent);

  const initialValues =
    propertyId && existingProperty
      ? {
          type: existingProperty.type,
          building: existingProperty.building,
          number: existingProperty.number,
          floor: existingProperty.floor,
          total_area: existingProperty.total_area,
          usable_area: existingProperty.usable_area,
          inhabitants: existingProperty.inhabitants || 0,
          parent: existingProperty.parent || null,
          description: existingProperty.description || '',
        }
      : {
          type: '' as PropertyType,
          building: '',
          number: '',
          floor: '',
          total_area: '',
          usable_area: '',
          inhabitants: '',
          parent: addToParent || null,
          description: '',
        };

  const parentDropdownOptions: SearchDropdownOption[] = parentsOptions
    ? parentsOptions.results
        ?.filter((property: Property) => canBeParent(property.type))
        .map((property: Property) => ({
          value: property.id,
          label: `${property.building} ${property.number} ${property.floor}`,
          key: property.id,
        }))
    : [];

  const buildingsDropdownOptions: SearchDropdownOption[] = allBuildings
    ? allBuildings.results.map((building: BuildingsRequest) => ({
        value: building.id,
        label: `${building.address.street} ${building.address.number}`,
        key: building.id,
      }))
    : [];

  const formikProps: FormikWrapperProps<Partial<PropertyFormType>> = {
    header: propertyId ? 'Edytuj lokal' : 'Dodaj lokal',
    submitLabel: propertyId ? 'Zapisz zmiany' : 'Dodaj',
    initialValues,
    onSubmit: (values, { setSubmitting, setErrors }) => {
      const numericValues = {
        ...values,
        floor: Number(values.floor),
        total_area: Number(values.total_area),
        usable_area: Number(values.usable_area),
        inhabitants:
          values.type === PropertyType.Flat ? Number(values.inhabitants) : null,
        parent: values.parent ? Number(values.parent) : null,
        hoa: hoaId,
      };

      mutation.mutate(
        { ...(propertyId && { id: propertyId }), ...numericValues },
        {
          onSuccess: () => {
            onClose();
            addNotification(
              propertyId ? 'Zmieniono lokal' : 'Nowy lokal został dodany',
              'success',
            );
          },
          onError: (error: any) => {
            setErrors(error);
            setSubmitting(false);
          },
        },
      );
    },
    onCancel: onClose,
    validationSchema: propertySchema,
  };

  if (propertyId && isPending) return <Spinner />;
  return (
    <FormikWrapper {...formikProps}>
      {(formik) => (
        <>
          <>
            <SearchDropdown
              name="type"
              isLoading={false}
              placeholder="Wybierz rodzaj"
              label="Typ"
              options={Object.values(PropertyType)
                .filter((type) => !filterTypes || mustHaveParent(type))
                .map((type) => ({
                  key: type,
                  value: type,
                  label: PropertyTypeDisplayNames[type],
                }))}
              disabled={!!existingProperty}
            />
          </>
          <SearchDropdown
            name="building"
            isLoading={isLoadingBuildings}
            label="Budynek"
            options={buildingsDropdownOptions}
            onChange={(selectedOption: any) => {
              setSelectedBuilding(selectedOption?.value);
            }}
          />
          <TextInputLiveFeedback label="Numer" type="text" name="number" />
          <TextInputLiveFeedback label="Piętro" type="number" name="floor" />
          <TextInputLiveFeedback
            label="Powierzchnia całkowita"
            type="number"
            name="total_area"
            units="m²"
          />
          <TextInputLiveFeedback
            label="Powierzchnia użytkowa"
            type="number"
            name="usable_area"
            units="m²"
          />
          <TextInputLiveFeedback
            label="Liczba mieszkańców"
            type="number"
            name="inhabitants"
            disabled={formik.values.type !== PropertyType.Flat}
          />
          <SearchDropdown
            name="parent"
            isLoading={isLoadingOptions}
            label="Przynależy do lokalu:"
            options={parentDropdownOptions}
            disabled={
              !formik.values.type ||
              !mustHaveParent(formik.values.type) ||
              !!addToParent
            }
            cleanOnDisabling={!addToParent}
          />
        </>
      )}
    </FormikWrapper>
  );
};

export default PropertyForm;
