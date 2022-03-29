export interface registro {
    id?: number,
    lenguaje: string,
    codigo: string,
    stdout: string,
    stderr: string,
    valor_retorno: number,
    fecha: Date
}

type language = {
    lenguaje: string;
}

export type languageList = language[];
