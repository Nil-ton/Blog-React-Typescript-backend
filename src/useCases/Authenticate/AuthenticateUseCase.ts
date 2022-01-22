import { compare } from "bcrypt"
import { sign } from "jsonwebtoken"
import { IAuthenticateRepository } from "../../repositories/intefaces/IAuthenticateRepository"

export interface ILogin {
	username: string
	password: string
}

export class AuthenticateUseCase {
	constructor(private repository: IAuthenticateRepository) { }

	async execute(Login: ILogin) {

		const admAlreadyExist = await this.repository.alreadyExist("adm", "username", Login.username)

		if (!admAlreadyExist) {
			throw new Error("Usuario ou senha invalido")
		}

		const adm = await this.repository.findOne("adm", "username", Login.username)
		
		const matchPassword = await compare(Login.password, adm.password)

		if (!matchPassword) {
			throw new Error("Usuario ou senha invalido")
		}

		const token = sign({_id: adm.id}, process.env.ACESS_TOKEN_SECRET, {expiresIn: "20s"})

		await this.repository.update("adm", adm.id, {jwt: token})

		return token
	}
}