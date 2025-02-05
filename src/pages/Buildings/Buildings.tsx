import { useAppSelector } from "../../app/hooks";
import Spinner from "../../components/ui/spinner/Spinner";
import { selectSelectedCommunity } from "../../features/communities/sharedDataSlice";
import { useGetBuildings } from "../../features/properties/useGetBuildings";
import styles from './Buildings.module.scss';
export const Buildings = () => {
    const hoaId = useAppSelector(selectSelectedCommunity) || -1;
    const { data, isLoading } = useGetBuildings({ page: 1, pageSize: 50, hoaId });
    return (
        <div>
            {isLoading && <Spinner />}
            <div className={styles.container}>
                {data?.results.map((building) => (
                    <div key={building.id} className={styles.card}>
                        <div className={styles.box}>
                            <div className={styles.header}>Dane adresowe</div>
                            <div>

                                <div className={styles.row}>ul. {building.address.street} {building.address.number}</div>
                                <div className={styles.row}>{building.address.city} {building.address.postal_code}</div>
                            </div>
                        </div>
                        <div className={styles.box}>
                            <div className={styles.header}>Dane budynku</div>
                            <div>
                                <div className={styles.row}>Powiechrznia: {building.area} m²</div>
                                <div className={styles.row}>Numer budynku: {building.number}</div>
                                <div className={styles.row}>Najniższe piętro: {building.floor_min}</div>
                                <div className={styles.row}>Najwyższe piętro: {building.floor_max}</div>
                            </div>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
}