import { Router } from "express"
import dotenv from "dotenv"
import { controllerAuthenticate } from "./useCases/Authenticate"
import { EnsureAuthenticate } from "./middware/EnsureAuthenticate"

dotenv.config()
const router = Router()


router.post("/authenticate", (req, res) => {

	return controllerAuthenticate.handle(req, res)

})

router.get("/authenticate/ensure", EnsureAuthenticate, (req,res) => {

	return res.json(true)

})

export default router