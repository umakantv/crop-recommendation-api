import * as tf from "@tensorflow/tfjs";
import {KNNClassifier} from '@tensorflow-models/knn-classifier'
import loadData, { CropData } from "./loadData";

export type CropInput = Omit<CropData, "label">

function cropDatatoTensor(item: CropInput) {
	return tf.tensor([
		Number(item.N),
		Number(item.P),
		Number(item.K),
		Number(item.temperature),
		Number(item.humidity),
		Number(item.ph),
		Number(item.rainfall),
	])
}

export default class CropPredictionClassifier {
	private classifier: KNNClassifier;
	constructor() {
		this.classifier	= new KNNClassifier();
	}
	public async train(): Promise<void> {
		const data = await loadData();
		for(const item of data) {
			this.classifier.addExample(cropDatatoTensor(item), item.label)
		}
  }

	public async predict(input: CropInput): Promise<string> {
		const prediction = await this.classifier.predictClass(cropDatatoTensor(input))
		return prediction.label;
	}
}