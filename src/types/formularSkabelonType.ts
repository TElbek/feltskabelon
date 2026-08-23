import type { scenarieEnum } from "./scenarieEnumType"

export type formularSkabelonType = {
    id:number,
    scenarie: scenarieEnum,
    oprettelsesDato: Date,
    oprettetAf: number,
    aendringsDato: Date,
    aendretAf: number
}

export type formularSkabelonFeltType = {
    id: number,
    formularSkabelonId: number,
    erMinimumsFelt: boolean,
    licenshaverId: number,
    feltNavn: string
}