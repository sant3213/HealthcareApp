export class AuthUser{
    id?:string;
    userName:string;
    password?:string;
    email:string;    
    canAccessPublications: boolean;
    canAccessAccount: boolean;
    canAccessComments: boolean;
    canAccessMyPublications: boolean;
    pin?: string;
    specialization?: string;
    qualification?: string;
    city?: string;
    eps?: string;
    university?: string;
    experience?: string;
    state?: boolean;
    token?: [];
}