import { useState } from 'react';
import { IRate, MeterType, RateType } from '../../features/billings/billingTypes';
import styles from './EditRateModal.module.scss';
import { useAppSelector } from '../../app/hooks';
import { selectSelectedCommunity } from '../../features/communities/sharedDataSlice';
import { Button } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { AddRate } from '../../features/rates/addRate';

export type AddRateProps = {
    setModalOn: React.Dispatch<React.SetStateAction<boolean>>;
    refetchRates: () => void;
}

const rateSchema = Yup.object().shape({
    name: Yup.string().required('Nazwa nie może być pusta'),
    effective_date: Yup.date().required('Data jest wymagana'),
    rate_per_unit: Yup.number().moreThan(0, 'Stawka za jednostkę musi być większa niż 0').required('Stawka za jednostkę jest wymagana'),
    type: Yup.mixed().oneOf(Object.keys(RateType)).required('Typ jest wymagany'),
    applies_to: Yup.mixed().oneOf(Object.keys(MeterType)).required('Dotyczy jest wymagane'),
});

export const AddRateModal = ({ setModalOn, refetchRates }: AddRateProps) => {
    const hoaID = useAppSelector(selectSelectedCommunity) || -1;

    const formik = useFormik({
        initialValues: {
            name: '',
            effective_date: '',
            rate_per_unit: 0,
            type: 'unit', // Use key of RateType
            applies_to: 'cold_water', // Use key of MeterType
        },
        validationSchema: rateSchema,
        onSubmit: async (values) => {
            const newRate: IRate = {
                ...values,
                hoa: hoaID,
                type: values.type as RateType,
                applies_to: values.applies_to as MeterType,
            };
            await AddRate(newRate);
            refetchRates();
            setModalOn(false);
        },
    });

    return (
        <div className={styles.container}>
            <h1>Dodaj nową stawkę</h1>
            <form onSubmit={formik.handleSubmit}>
                <div className={styles.form_control}>
                    <label>Nazwa:</label>
                    <input
                        type="text"
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.name && formik.errors.name ? (
                        <div className={styles.error}>{formik.errors.name}</div>
                    ) : null}
                </div>
                <div className={styles.form_control}>
                    <label>Data obowiązywania:</label>
                    <input
                        type="date"
                        name="effective_date"
                        value={formik.values.effective_date}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.effective_date && formik.errors.effective_date ? (
                        <div className={styles.error}>{formik.errors.effective_date}</div>
                    ) : null}
                </div>
                <div className={styles.form_control}>
                    <label>Stawka za jednostkę:</label>
                    <input
                        type="number"
                        name="rate_per_unit"
                        value={formik.values.rate_per_unit}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.rate_per_unit && formik.errors.rate_per_unit ? (
                        <div className={styles.error}>{formik.errors.rate_per_unit}</div>
                    ) : null}
                </div>
                <div className={styles.form_control}>
                    <label>Typ:</label>
                    <select
                        name="type"
                        value={formik.values.type}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    >
                        {Object.entries(RateType).map(([key, value]) => (
                            <option key={key} value={key}>{value}</option>
                        ))}
                    </select>
                </div>
                {formik.values.type === 'unit' && (
                    <div className={styles.form_control}>
                        <label>Dotyczy:</label>
                        <select
                            name="applies_to"
                            value={formik.values.applies_to}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        >
                            {Object.entries(MeterType).map(([key, value]) => (
                                <option key={key} value={key}>{value}</option>
                            ))}
                        </select>
                    </div>
                )}
                <div>
                    <button type="submit">Zapisz</button>
                </div>
            </form>
        </div>
    );
};