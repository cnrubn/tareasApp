export interface respFirebase {

    displayName?: string;
    email: string;
    expiresIn: string;
    idToken: string;
    kind: string;
    localId: string;
    refeshToken: string;
    registered?: boolean;
    usuario?: string;

}
export interface Usuario {
    
    email: string;
    password: string;
    nombre?: string;
    tareas?: string;
    
}

export interface infoUsuario {

    idu?: string;
    localId?: string;
    nombre?: string;
    tareas?: Tarea[];

}

export interface Tarea {
    
    tit: string;
    txt: string;
    tags: string;
    
}

export interface Redes {
    
    nombre: string;
    logo: string;
    url: string;
    
}