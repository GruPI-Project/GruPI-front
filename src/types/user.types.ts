
export interface Profile {
    polo: string;
    curso: string;
    projeto_integrador: string;
    eixo: string;
    drp: string;
}

export interface User {
    pk: number;
    email: string;
    first_name: string;
    last_name: string;
    profile: Profile;
}
export interface PIOption {
    id: number;
    numero: number;
}
export interface DrpOption {
    id: number;
    numero: number;
}
export interface PolosOption {
    id: number;
    nome: string;
    drp: DrpOption;
}
export interface EixosOption {
    id: number;
    nome: string;
}
export interface CursosOption {
    id: number;
    nome: string;
    eixo: EixosOption;
}
export interface TagsOption {
    id: number;
    nome: string;
}

export interface GroupTag {
    label: string;
    color?: string;
}

export interface Group {
    id: number;
    title: string;
    polo: string;
    description: string;
    tags: GroupTag[];
}