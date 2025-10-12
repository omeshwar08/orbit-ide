"use server";

import { currentuser } from "@/modules/auth/actions";
import { db } from "@/lib/db";

export const getAllPlaygroundForUser = async () => {
	const user = await currentuser();
	try {
		const playground = db.playground.findMany({
			where: {
				userId: user?.id,
			},
			include: {
				user: true,
			},
		});
		return playground;
	} catch (error) {
		console.log(error);
	}
};
