import csvParser from "csv-parser";
import fs from 'fs';

export interface CropData {
	N: number; // '78',
	P: number; // '35',
	K: number; // '44',
	temperature: number; // '26.54348085',
	humidity: number; // '84.67353597',
	ph: number; // '7.072655622',
	rainfall: number; // '183.6222657',
	label: string; // 'rice'
};

export default async function loadData(): Promise<CropData[]> {
	const results: CropData[] = []
	return new Promise((resolve, reject) => {
		fs.createReadStream('crop_recommendation.csv')
			.pipe(csvParser())
			.on('data', (data) => {
				results.push({
					N: Number(data.N),
					P: Number(data.P),
					K: Number(data.K),
					temperature: Number(data.temperature),
					humidity: Number(data.humidity),
					ph: Number(data.ph),
					rainfall: Number(data.rainfall),
					label: String(data.label),
				})
			})
			.on('end', () => {
				resolve(results);
			});
	})
	
}