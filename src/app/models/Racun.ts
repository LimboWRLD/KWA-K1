import { Transakcija } from "./Transakcija";

export interface Racun{
    id: number;
    brojRacuna: string;
    stanje:number;
    transakcije?: Transakcija[];
}