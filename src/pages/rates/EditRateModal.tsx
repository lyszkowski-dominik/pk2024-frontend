import { useState } from 'react';
import { IRate, MeterType, RateType } from '../../features/billings/billingTypes';
import styles from './EditRateModal.module.scss';
import { Button } from '@mui/material';
import { Rate } from '../../features/rates/ratesTypes';

export type EditRateProps = {
    data: Rate;
    UpdateRate: (updatedRate: Rate) => void;
    setModalOn: React.Dispatch<React.SetStateAction<boolean>>;
    refetchRates: () => void;
}
export const EditRateModal = ({ data, UpdateRate, setModalOn, refetchRates }: EditRateProps) => {
    const [formData, setFormData] = useState({
        name: data.name,
        effective_date: data.effective_date,
        rate_per_unit: data.rate_per_unit,
        type: data.type as RateType,
        applies_to: data.applies_to,
    });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const updatedRate = { ...data, ...formData };
        await UpdateRate(updatedRate);
        refetchRates();
        setModalOn(false);
    };
    return (
        <div className={styles.container}>
            <h1>{data.id === 0 ? 'Dodaj nową stawkę' : `Edycja stawki: ${formData.name}`}</h1>
            <form onSubmit={handleSubmit}>
                <div className={styles.form_control}>
                    <label>Nazwa:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>
                <div className={styles.form_control}>
                    <label>Data obowiązywania:</label>
                    <input
                        type="date"
                        name="effective_date"
                        value={formData.effective_date}
                        onChange={handleChange}
                    />
                </div>
                <div className={styles.form_control}>
                    <label>Stawka za jednostkę:</label>
                    <input
                        type="number"
                        name="rate_per_unit"
                        value={formData.rate_per_unit}
                        onChange={handleChange}
                    />
                </div>
                <div className={styles.form_control}>
                    <label>Typ:</label>
                    <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                    >
                        {Object.entries(RateType).map(([key, value]) => (
                            <option key={key} value={key}>{value}</option>
                        ))}
                    </select>
                </div>
                {formData.type === RateType.unit && (
                    <div className={styles.form_control}>
                        <label>Dotyczy:</label>
                        <select
                            name="applies_to"
                            value={formData.applies_to}
                            onChange={handleChange}
                        >
                            {Object.entries(MeterType).map(([key, value]) => (
                                <option key={key} value={key}>{value}</option>
                            ))}
                        </select>
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