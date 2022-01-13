import express from 'express'
import cors from 'cors'
import CropPredictionClassifier, { CropInput } from "./cropPredictionClassifier";

const app = express();
app.use(cors());
app.use(express.json());
const classifier = new CropPredictionClassifier();

app.post( "/classify", ( req, res ) => {

	const cropInput = req.body;
	classifier.predict(cropInput as CropInput)
	.then(prediction => {
		res.send({
			crop: prediction
		})
	})
	
});

classifier.train().then(
	() => {
		app.listen(3001, () => {
			console.log('Server started at 3001')
		})
	}
)
