import { useAppSelector } from '../../../../app/hooks';
import { selectSelectedCommunity } from '../../../../features/communities/sharedDataSlice';
import { useCreateMeter } from '../../../../features/meters/metersDevices/useCreateMeter';
import { useGetMeterTypes } from '../../../../features/meters/meterTypes/useGetMeterTypes';
import { useGetProperties } from '../../../../features/properties/useGetProperties';
import { useNotifications } from '../../../alerts/NotificationContext';
import FormikWrapper, {
  FormikWrapperProps,
} from '../../../common/forms/form/FormikWrapper';
import SearchDropdown from '../../../ui/search/SearchDropdown';
import TextInputLiveFeedback from '../../../common/forms/textInputLiveFeedback/TextInputLiveFeedback';
import Spinner from '../../../ui/spinner/Spinner';
import { validationSchema } from './utils';

const AddMeterDeviceForm = ({
  onClose,
  propertyId,
}: {
  onClose: () => void;
  propertyId?: number;
}) => {
  const { addNotification } = useNotifications();
  const hoaId = useAppSelector(selectSelectedCommunity) || -1;

  const { data: meterTypes, isLoading: loadingTypes } = useGetMeterTypes({
    hoaId,
    page: 1,
    pageSize: 1000,
    isActive: true,
  });

  const { data: properties, isLoading: loadingProperties } = useGetProperties({
    hoaId,
    page: 1,
    pageSize: 1000,
  });

  const createMeterDevice = useCreateMeter(hoaId);
  const propertyOptions =
    properties?.results.map((property) => ({
      key: property.id,
      value: property.id,
      label: `lok.: ${property.number} budynek: ${property.building}`,
      building: property.building,
    })) || [];

  const typeOptions =
    meterTypes?.results.map((type) => ({
      key: type.id,
      value: type.id,
      label: type.label,
    })) || [];

  const formikProps: FormikWrapperProps<any> = {
    header: 'Dodaj licznik',
    submitLabel: 'Dodaj',
    initialValues: {
      property: propertyId ? propertyId : '',
      type: '',
      number: '',
      installation_date: '',
      removal_date: null,
      building: propertyOptions.find((option) => option.key === propertyId)
        ?.building,
    },
    validationSchema,
    onSubmit: (values, { setSubmitting, setErrors }) =>
      createMeterDevice.mutate(values, {
        onSuccess: () => {
          onClose();
          addNotification('Dodano nowy licznik', 'success');
        },
        onError: (error: any) => {
          setErrors(error);
          setSubmitting(false);
        },
      }),
    onCancel: onClose,
  };

  if (loadingTypes || loadingProperties) {
    return <Spinner />;
  }

  return (
    <FormikWrapper {...formikProps}>
      {(formik) => {
        return (
          <>
            <SearchDropdown
              name="property"
              label="Lokal"
              options={propertyOptions}
              isLoading={loadingProperties}
              onChange={(option) => {
                formik.setFieldValue('building', (option as any).building);
              }}
            />
            <SearchDropdown
              name="type"
              label="Typ"
              options={typeOptions}
              isLoading={loadingTypes}
            />
            <TextInputLiveFeedback
              label="Budynek"
              type="text"
              name="building"
              disabled
            />
            <TextInputLiveFeedback label="Numer" type="text" name="number" />
            <TextInputLiveFeedback
              label="Data instalacji"
              type="date"
              name="installation_date"
            />
            <TextInputLiveFeedback
              label="Data demontażu"
              type="date"
              name="removal_date"
            />
          </>
        );
      }}
    </FormikWrapper>
  );
};

export default AddMeterDeviceForm;
