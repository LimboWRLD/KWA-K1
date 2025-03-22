export interface Transakcija {
    id : number,
    tip: String;
    iznos: number;
    datumTransakcije: String;
    klijentId: number;
    racunId: number;
}