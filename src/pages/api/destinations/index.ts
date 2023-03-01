import { NextApiRequest, NextApiResponse } from "next";

import ApiResponse from "../apiResponse";
import Destination from "./destination";

import data from "data/destinations.json";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	// The response object.
	let response: ApiResponse = {
		statusCode: 200,
		statusMessage: "OK",
		data: null,
		timestamp: new Date().toISOString(),
	};

	// Check the method.
	if (req.method === "GET") {
		// Run api logic.
		try {
			// Get the destinations and map them to the destination interface.
			const destinations: Destination[] = data.map(destination => {
				return {
					id: destination.id,
					image: destination.image,
					title: destination.title,
				};
			});

			// Shuffle the destinations.
			destinations.sort(() => Math.random() - 0.5);

			// Get the destinations that should be excluded.
			const excludeHeader = req.headers.exclude as string;

			// Convert the exclude string to an array of numbers.
			if (excludeHeader) {
				const exclude = excludeHeader.split(",").map(id => parseInt(id));

				// Remove the destinations that should be excluded.
				exclude.forEach((id: number) => {
					const index = destinations.findIndex(
						destination => destination.id === id
					);

					if (index !== -1) {
						destinations.splice(index, 1);
					}
				});
			}

			// Get the number of destinations to return.
			const limitHeader = req.headers.limit as string;

			// Convert the limit to a number.
			if (limitHeader) {
				const limit = parseInt(limitHeader);

				// Limit the destinations.
				destinations.splice(limit);
			}

			// Set the data.
			response.data = destinations;
		} catch (error) {
			// Set the error.
			response.statusCode = 500;
			response.statusMessage = "Internal Server Error";

			// Log the error.
			console.error(error);
		}
	} else {
		// Set the error.
		response.statusCode = 405;
		response.statusMessage = "Method Not Allowed";
	}

	// Send the response.
	res.status(200).json(response);
}
