export interface Property {
    id: number;
    title: string;
    price: number;
    location: string;
    description: string;
    sourceUrl: string;
    dateAdded: Date;
    userId: string;
    images: string[];
    source: 'Leboncoin' | 'SeLoger' | 'LogicImmo' | 'PapFr' | 'Other';
}