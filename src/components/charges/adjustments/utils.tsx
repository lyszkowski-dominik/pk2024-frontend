import * as Yup from 'yup';

export const validationSchema = Yup.object({
  date: Yup.string().required('Data jest wymagana'),
  rates: Yup.array().of(
    Yup.object().shape({
      rates: Yup.array().of(
        Yup.object().shape({
          rate_per_unit: Yup.number()
            .required('Stawka jest wymagana')
            .positive('Stawka musi być większa od zera'),
        }),
      ),
    }),
  ),
});
