import { Card, Form, Button, Alert } from "react-bootstrap";
import { useState } from "react";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { favouritesAtom, searchHistoryAtom } from "@/store";
import { authenticateUser } from "@/lib/authenticate";
import { getFavourites, getHistory } from "@/lib/userData";

export default function Login() {
	const router = useRouter();
	const [user, setUser] = useState("");
	const [password, setPassword] = useState("");
	const [warning, setWarning] = useState(null);
	const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
	const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

	async function updateAtoms() {
		setFavouritesList(await getFavourites());
		setSearchHistory(await getHistory());
	}

	async function handleSubmit(e) {
		e.preventDefault();
		if (!user || !password) {
			setWarning("Error: No input entered");
			return;
		}

		try {
			await authenticateUser(user, password);
			await updateAtoms();
			router.push("/favourites");
		} catch (err) {
			setWarning(err.message);
		}
	}

	return (
		<>
			<Card bg="light">
				<Card.Body>
					<h2>Login</h2>
					<p>Enter your login information below:</p>
				</Card.Body>
			</Card>
			<br />
			<Form onSubmit={handleSubmit}>
				<Form.Group>
					<Form.Label>User:</Form.Label>
					<Form.Control
						type="text"
						value={user}
						id="userName"
						name="userName"
						onChange={(e) => setUser(e.target.value)}
					/>
				</Form.Group>
				<br />
				<Form.Group>
					<Form.Label>Password:</Form.Label>
					<Form.Control
						type="password"
						value={password}
						id="password"
						name="password"
						onChange={(e) => setPassword(e.target.value)}
					/>
				</Form.Group>
				<br />
				<Button variant="primary" className="pull-right" type="submit">
					Login
				</Button>
			</Form>

			{warning && (
				<>
					<br />
					<Alert variant="danger">{warning}</Alert>
				</>
			)}
		</>
	);
}
