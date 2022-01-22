import { NextFunction, Request, Response } from "express"
import { verify } from "jsonwebtoken"
import { config } from "dotenv"
config()

export function EnsureAuthenticate(
	request: Request,
	response: Response,
	next: NextFunction
) {

	const authToken = request.headers.authorization?.split(" ")[1]

	if (!authToken) {

		return response.status(401).json({ message: "Token is missing" })
		
	}
	
	try {
		verify(authToken, process.env.ACESS_TOKEN_SECRET)

		return next()

	} catch (error) {

		return response.status(401).json({ message: "Token invalid" })

	}
}