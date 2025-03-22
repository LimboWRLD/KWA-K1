import { Transakcija } from "./Transakcija";

export interface Klijent{
    id : number;
    ime: string;
    prezime: string;
    transakcije?:Transakcija[];
}