export interface IReadCsv {
    message?: number;
    weather?: number;
    time: string;
    hexPayload?: string;
}

export interface IFilter {
    sort: string;
}

export interface IChart { [key: string]: number; }
