import { initializeApp } from "firebase/app"
import { collection, doc, DocumentData, Firestore, getDocs, getFirestore, query, updateDoc, where } from "firebase/firestore"
import { config } from "dotenv"
import { IAuthenticateRepository } from "./intefaces/IAuthenticateRepository"

config()

export class FirebaseRepository implements IAuthenticateRepository {
	private firebaseConfig: { apiKey: string; authDomain: string; projectId: string; storageBucket: string; messagingSenderId: string; appId: string; measurementId: string; }
	private app: object
	private db: Firestore

	constructor() {

		this.firebaseConfig = {

			apiKey: process.env.API_KEY,
			authDomain: process.env.AUTH_DOMAIN,
			projectId: process.env.PROJECT_ID,
			storageBucket: process.env.STORAGE_BUCKET,
			messagingSenderId: process.env.MESSAGING_SENDER_ID,
			appId: process.env.APP_ID,
			measurementId: process.env.MEASUREMENT_ID

		}

		this.app = initializeApp(this.firebaseConfig)

		this.db = getFirestore()

	}

	async alreadyExist(collect, param, search): Promise<boolean> {

		const adm = query(collection(this.db, collect), where(param, "==", search))
		const admSnapshot = await getDocs(adm)

		const admAlreadyExist = admSnapshot.empty

		if (admAlreadyExist) {
			return false
		} else return true

	}

	async findOne(collect, param, search): Promise<DocumentData> {
		const adm = query(collection(this.db, collect), where(param, "==", search))
		const admSnapshot = await getDocs(adm)
		const response = admSnapshot.docs.map(doc => ({id:doc.id,...doc.data()}))[0]
		return response
	}

	async findAll(collect: string): Promise<DocumentData> {
		const data = query(collection(this.db, collect))
		const admSnapshot = await getDocs(data)
		const response = admSnapshot.docs.map(doc => ({id:doc.id,...doc.data()}))
		return response
	}

	async update(collect:string,id: string, data): Promise<void> {
		const updateRef = doc(this.db, collect, id)
		await updateDoc(updateRef, data)
	}
}

