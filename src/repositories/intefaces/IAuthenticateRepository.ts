import { DocumentData } from "firebase/firestore"

export interface DTOAuthenticate {
    collect: string
    param: string
    search: string

}

export interface IAuthenticateRepository {

    alreadyExist(collect:string, param:string, search:string): Promise<boolean>

    findOne(collect:string, param:string, search:string): Promise<DocumentData>

    findAll(collect: string): Promise<DocumentData>

    update(collect:string, id:string, data:object): Promise<void>

}