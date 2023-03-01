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
			// Define the destination.
			let destination: Destination | undefined;

			// Find the destination.
			destination = data.find(
				destination => destination.id === parseInt(req.query.id as string)
			);

			// Check if the destination was found.
			if (!destination) {
				// If not, set the error.
				response.statusCode = 404;
				response.statusMessage = "Not Found";
			} else {
				// If so, set the data.
				response.data = destination;
			}
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
