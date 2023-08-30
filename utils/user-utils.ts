import { CreatorType } from "@/types";

export const getUsers = async (): Promise<CreatorType[]> => {
	const res = await fetch(`${process.env.BASE_URL}/api/users`);

	if (!res.ok) {
		throw new Error("Could not retrieve the list of topics.");
	}

	return res.json();
};

export const getUser = async (id: string): Promise<CreatorType> => {
	const res = await fetch(`${process.env.BASE_URL}/api/users/${id}`);

	if (!res.ok) {
		throw new Error("Could not retrieve the list of topics.");
	}

	return res.json();
};
