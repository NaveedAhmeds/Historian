import { getToken } from "./authenticate";

const authHeader = () => ({
	Authorization: `Bearer ${getToken()}`,
	"Content-Type": "application/json",
});

export const getFavourites = async () => {
	const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favourites`, {
		headers: authHeader(),
	});
	if (res.status === 200) return res.json();
	return [];
};

export const addToFavourites = async (id) => {
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/favourites/${id}`,
		{
			method: "PUT",
			headers: authHeader(),
		}
	);
	if (res.status === 200) return res.json();
	return [];
};

export const removeFromFavourites = async (id) => {
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/favourites/${id}`,
		{
			method: "DELETE",
			headers: authHeader(),
		}
	);
	if (res.status === 200) return res.json();
	return [];
};

export const getHistory = async () => {
	const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history`, {
		headers: authHeader(),
	});
	if (res.status === 200) return res.json();
	return [];
};

export const addToHistory = async (id) => {
	const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history/${id}`, {
		method: "PUT",
		headers: authHeader(),
	});
	if (res.status === 200) return res.json();
	return [];
};

export const removeFromHistory = async (id) => {
	const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history/${id}`, {
		method: "DELETE",
		headers: authHeader(),
	});
	if (res.status === 200) return res.json();
	return [];
};
