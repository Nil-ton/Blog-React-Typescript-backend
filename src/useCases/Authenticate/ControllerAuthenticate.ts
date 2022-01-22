import { Request, Response } from "express"
import { AuthenticateUseCase } from "./AuthenticateUseCase"

export class ControllerAuthenticate {
	constructor(private authenticatedUseCase: AuthenticateUseCase) { }
	async handle(request: Request, response: Response) {
		try {

			const data = await this.authenticatedUseCase.execute(request.body)
			
			return response.json(data)

		} catch (error) {

			return response.json({ Error: error.message })

		}
	}
}