import { FirebaseRepository } from "../../repositories/FirebaseRepository"
import { AuthenticateUseCase } from "./AuthenticateUseCase"
import { ControllerAuthenticate } from "./ControllerAuthenticate"


const firebaseRepository = new FirebaseRepository()

const authenticatedUseCase = new AuthenticateUseCase(firebaseRepository)

export const controllerAuthenticate = new ControllerAuthenticate(authenticatedUseCase)