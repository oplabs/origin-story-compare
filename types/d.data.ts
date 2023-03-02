interface SalesByDayDataItem {
    date: string;
    value: number;
    ethVolume: number;
    sales: number;
    averagePrice: number;
}

interface DataItem {
    date: string;
    value: number;
}

export type { SalesByDayDataItem, DataItem }