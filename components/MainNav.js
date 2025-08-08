import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useAtom } from "jotai";
import { searchHistoryAtom } from "@/store";
import { addToHistory } from "@/lib/userData";
import { removeToken, readToken } from "@/lib/authenticate";

export default function MainNav() {
	const [searchField, setSearchField] = useState("");
	const [isExpanded, setIsExpanded] = useState(false);
	const [token, setToken] = useState(null);
	const router = useRouter();
	const [, setSearchHistory] = useAtom(searchHistoryAtom);

	// Update token on mount & whenever route changes
	useEffect(() => {
		setToken(readToken());
	}, [router.pathname]);

	async function handleSubmit(e) {
		e.preventDefault();

		if (searchField.trim() !== "") {
			const queryString = `title=true&q=${encodeURIComponent(searchField)}`;
			setSearchHistory(await addToHistory(queryString));
			router.push(`/artwork?${queryString}`);
			setSearchField("");
			setIsExpanded(false);
		}
	}

	function logout() {
		setIsExpanded(false);
		removeToken();
		router.push("/login");
	}

	return (
		<>
			<Navbar
				expanded={isExpanded}
				expand="lg"
				className="fixed-top navbar-dark bg-dark"
			>
				<Container fluid>
					<Navbar.Brand>Naveed Ahmed Syed</Navbar.Brand>
					<Navbar.Toggle
						aria-controls="navbarScroll"
						onClick={() => setIsExpanded(!isExpanded)}
					/>
					<Navbar.Collapse id="navbarScroll">
						<Nav className="me-auto my-2 my-lg-0" navbarScroll>
							<Link href="/" legacyBehavior passHref>
								<Nav.Link
									active={router.pathname === "/"}
									onClick={() => setIsExpanded(false)}
								>
									Home
								</Nav.Link>
							</Link>

							{token && (
								<Link href="/search" legacyBehavior passHref>
									<Nav.Link
										active={router.pathname === "/search"}
										onClick={() => setIsExpanded(false)}
									>
										Advanced Search
									</Nav.Link>
								</Link>
							)}
						</Nav>

						{token && (
							<>
								&nbsp;
								<Form className="d-flex" onSubmit={handleSubmit}>
									<Form.Control
										type="search"
										placeholder="Search"
										className="me-2"
										aria-label="Search"
										value={searchField}
										onChange={(e) => setSearchField(e.target.value)}
									/>
									<Button type="submit" variant="outline-success">
										Search
									</Button>
								</Form>
								&nbsp;
								<Nav>
									<NavDropdown
										title={token?.userName || "User"}
										id="user-dropdown"
										align="end"
									>
										<Link href="/favourites" legacyBehavior passHref>
											<NavDropdown.Item onClick={() => setIsExpanded(false)}>
												Favourites
											</NavDropdown.Item>
										</Link>
										<Link href="/history" legacyBehavior passHref>
											<NavDropdown.Item onClick={() => setIsExpanded(false)}>
												Search History
											</NavDropdown.Item>
										</Link>
										<NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
									</NavDropdown>
								</Nav>
							</>
						)}

						{!token && (
							<Nav className="ms-auto">
								<Link href="/register" legacyBehavior passHref>
									<Nav.Link
										active={router.pathname === "/register"}
										onClick={() => setIsExpanded(false)}
									>
										Register
									</Nav.Link>
								</Link>
								<Link href="/login" legacyBehavior passHref>
									<Nav.Link
										active={router.pathname === "/login"}
										onClick={() => setIsExpanded(false)}
									>
										Login
									</Nav.Link>
								</Link>
							</Nav>
						)}
					</Navbar.Collapse>
				</Container>
			</Navbar>
			<br />
			<br />
		</>
	);
}
