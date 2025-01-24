import { IRate, MeterType, RateType } from '../../features/billings/billingTypes';
import styles from './EditRateModal.module.scss';
import { Button } from '@mui/material';
import { Rate } from '../../features/rates/ratesTypes';
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export type EditRateProps = {
    data: Rate;
    UpdateRate: (updatedRate: IRate) => void;
    setModalOn: React.Dispatch<React.SetStateAction<boolean>>;
    refetchRates: () => void;
}


export const EditRateModal = ({ data, UpdateRate, setModalOn, refetchRates }: EditRateProps) => {
    const validationSchema = Yup.object({
        name: Yup.string().required('Nazwa jest wymagana'),
        effective_date: Yup.date().required('Data obowiązywania jest wymagana'),
        rate_per_unit: Yup.number().required('Stawka za jednostkę jest wymagana'),
        end_date: Yup.date().nullable(),
        type: Yup.string().required('Typ jest wymagany'),
        applies_to: Yup.string().nullable(),
    });

    const formik = useFormik({
        initialValues: {
            name: data.name,
            effective_date: data.effective_date,
            rate_per_unit: data.rate_per_unit,
            end_date: data.end_date,
            type: data.type as RateType,
            applies_to: data.applies_to as MeterType | undefined,
        },
        validationSchema,
        onSubmit: async (values) => {
            console.log("submitting");
            const updatedRate = { ...data, ...values };
            if (updatedRate.type as string !== 'unit') {
                delete updatedRate?.applies_to;
            }
            await UpdateRate(updatedRate);
            refetchRates();
            setModalOn(false);
        },
    });

    return (
        <div className={styles.container}>
            <h1>{data.id === 0 ? 'Dodaj nową stawkę' : `Edycja stawki: ${formik.values.name}`}</h1>
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
                    <label>Data zakończenia:</label>
                    <input
                        type="date"
                        name="end_date"
                        value={formik.values.end_date}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.end_date && formik.errors.end_date ? (
                        <div className={styles.error}>{formik.errors.end_date}</div>
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
                        <option value="unit">Unit</option>
                        <option value="other">Other</option>
                    </select>
                    {formik.touched.type && formik.errors.type ? (
                        <div className={styles.error}>{formik.errors.type}</div>
                    ) : null}
                </div>
                {formik.values.type as string === 'unit' && (
                    <div className={styles.form_control}>
                        <label>Dotyczy:</label>
                        <select
                            name="applies_to"
                            value={formik.values.applies_to}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        >
                            <option value="meter1">Meter 1</option>
                            <option value="meter2">Meter 2</option>
                        </select>
                        {formik.touched.applies_to && formik.errors.applies_to ? (
                            <div className={styles.error}>{formik.errors.applies_to}</div>
                        ) : null}
                    </div>
                )}
                <div>
                    <Button variant="contained" type="submit">Zapisz</Button>
                    <Button type="reset" style={{ color: '#e074c1' }} onClick={() => setModalOn(false)}>Anuluj</Button>
                </div>
            </form>
        </div>
    );
};