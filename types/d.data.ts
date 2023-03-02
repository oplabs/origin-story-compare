interface SalesByDayDataItem {
    date: string;
    value: number;
    ethVolume: number;
    sales: number;
    averagePrice: number;
}

interface ComparativeSalesByDayData {
    label: string;
    date?: string | undefined;
    dataPoints: {
        label: string;
        value: number;
    }[];
}
interface DataItem {
    date?: string;
    value: number;
    label?: string;
}

export type { SalesByDayDataItem, ComparativeSalesByDayData, DataItem }