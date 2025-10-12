"use server";

import { currentuser } from "@/modules/auth/actions";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const getAllPlaygroundForUser = async () => {
	const user = await currentuser();
	try {
		const playground = db.playground.findMany({
			where: {
				userId: user?.id,
			},
			include: {
				user: true,
				Starmark: {
					where: {
						// eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
						userId: user?.id!,
					},
					select: {
						isMarked: true,
					},
				},
			},
		});
		return playground;
	} catch (error) {
		console.log(error);
	}
};

export const createPlayground = async (data: {
	title: string;
	template: "REACT" | "NEXTJS" | "EXPRESS" | "VUE" | "HONO" | "ANGULAR";
	description?: string;
}) => {
	const user = await currentuser();
	const { title, template, description } = data;
	try {
		const playground = await db.playground.create({
			data: {
				title: title,
				description: description,
				template: template,
				// eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
				userId: user?.id!,
			},
		});
		return playground;
	} catch (error) {
		console.log(error);
	}
};

export const deleteProjectById = async (id: string) => {
	try {
		await db.playground.delete({
			where: { id },
		});
		revalidatePath("/dashboard");
	} catch (error) {
		console.log(error);
	}
};

export const editProjectById = async (
	id: string,
	data: { title: string; description: string }
) => {
	try {
		await db.playground.update({
			where: {
				id,
			},
			data: data,
		});
	} catch (error) {
		console.log(error);
	}
};

export const duplicateProjectById = async (id: string) => {
	try {
		const originalPlayground = await db.playground.findUnique({
			where: { id },
			//todo: template files
		});
		if (!originalPlayground) {
			throw new Error("Original playground not found");
		}

		const duplicatePlayground = await db.playground.create({
			data: {
				title: `${originalPlayground.title}-Copy`,
				description: originalPlayground.description,
				template: originalPlayground.template,
				userId: originalPlayground.userId,
			},
		});

		revalidatePath("/playground");
		return duplicatePlayground;
	} catch (error) {
		console.log(error);
	}
};

export const toogleStarMarked = async (
	playgroundId: string,
	isChecked: boolean
) => {
	const user = await currentuser();
	const userId = user?.id;
	if (!userId) {
		throw new Error("User ID is required");
	}
	try {
		if (isChecked) {
			await db.starMark.create({
				data: {
					userId: userId!,
					playgroundId,
					isMarked: isChecked,
				},
			});
		} else {
			await db.starMark.delete({
				where: {
					userId_playgroundId: {
						userId,
						playgroundId: playgroundId,
					},
				},
			});
		}
		revalidatePath("/dashboard");
		return { success: true, isMarked: isChecked };
	} catch (error) {
		console.log(error);
		return { success: false, error: "Failed to update problem" };
	}
};
