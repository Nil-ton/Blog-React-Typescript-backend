import { compare } from "bcrypt"
import { connect, Schema, model, Document } from "mongoose"
import { IAuthenticateRepository } from "./intefaces/IAuthenticateRepository"
import { config } from "dotenv"
config()


interface IModel extends Document {
	username?: string
	password?: string
}

connect(process.env.MONGO_CONNECT)
const AdmSchema = new Schema({ username: String, password: String })
export const Adm = model<IModel>("adm", AdmSchema)


export class MongoDBAuthenticateRepository implements IAuthenticateRepository {

	async alreadyExist(username: string, password: string): Promise<boolean> {

		const admAlreadyExist = await Adm.exists({ username })

		if (admAlreadyExist) {

			const adm = await Adm.findOne({ username })

			const matchPassword = await compare(password, adm.password)

			if (matchPassword) return true
		}

		else return false
	}
}
