export enum ChargesTab {
    Rates,
    Meters,
    Readings
}

export const getTabName = (tab: ChargesTab): string => {
    switch (tab) {
        case ChargesTab.Meters:
            return 'Liczniki';
        case ChargesTab.Rates:
            return 'Stawki';
        case ChargesTab.Readings:
            return 'Odczyty';
    }
}