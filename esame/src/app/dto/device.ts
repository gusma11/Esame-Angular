import { Categoria } from "./categoria";

export interface Device {
    id: number,
    confirmCode: String,
    category: Categoria,
    startDate: Date,
    hours: number,
    nominative: string,
}