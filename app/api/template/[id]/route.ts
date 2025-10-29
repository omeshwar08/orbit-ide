import { db } from "@/lib/db";
import { templatePaths } from "@/lib/template";
import path from "path";
import fs from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import {
	readTemplateStructureFromJson,
	saveTemplateStructureToJson,
} from "@/modules/playground/lib/path-to-json";

function validateJsonStructure(data: unknown): boolean {
	try {
		JSON.parse(JSON.stringify(data)); // Ensures it's serializable
		return true;
	} catch (error) {
		console.error("Invalid JSON structure:", error);
		return false;
	}
}

export async function GET(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	const { id } = await params;
	if (!id) {
		return NextResponse.json(
			{ error: "Missing playground id" },
			{ status: 400 }
		);
	}
	const playground = await db.playground.findUnique({
		where: {
			id,
		},
	});
	if (!playground) {
		return NextResponse.json(
			{ error: "Playground not found" },
			{ status: 400 }
		);
	}

	const templateKey = playground.template as keyof typeof templatePaths;
	const templatePath = templatePaths[templateKey];
	if (!templatePath) {
		return NextResponse.json(
			{ error: "Invalid Template Path" },
			{ status: 404 }
		);
	}
	try {
		const inputPath = path.join(process.cwd(), templatePath);
		const outputFile = path.join(process.cwd(), `output/${templateKey}.json`);

		console.log("InputPath: ", inputPath);
		console.log("OutputFile: ", outputFile);

		await saveTemplateStructureToJson(inputPath, outputFile);
		const result = await readTemplateStructureFromJson(outputFile);
		if (!validateJsonStructure(result.items)) {
			return NextResponse.json(
				{ error: "Invalid JSON Structure" },
				{ status: 500 }
			);
		}
		await fs.unlink(outputFile);
		return NextResponse.json(
			{ success: true, templateJson: result },
			{ status: 200 }
		);
	} catch (error) {
		console.log("Error generating template: ", error);
		return NextResponse.json(
			{ error: "Failed to generate template" },
			{ status: 500 }
		);
	}
}
