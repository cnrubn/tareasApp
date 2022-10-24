export interface Usuario {
    
    email: string;
    password: string;
    nombre?: string;
    tareas?: string;
    
}

export interface Tarea {
    
    tit: string;
    txt: string;
    tags: string;
    id?: number;
    
}