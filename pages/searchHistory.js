import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { searchHistoryAtom } from "@/store";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

export default function SearchHistory() {
	const [searchHistory] = useAtom(searchHistoryAtom);
	const router = useRouter();

	function handleClick(query) {
		router.push(`/artwork?title=true&q=${encodeURIComponent(query)}`);
	}

	return (
		<>
			<h1>Search History</h1>
			{searchHistory.length === 0 ? (
				<Card>
					<Card.Body>
						<h4>Nothing Here</h4>
						No search history yet. Go find some art!
					</Card.Body>
				</Card>
			) : (
				<Row>
					<Col lg={6} md={8} sm={10}>
						<ListGroup>
							{searchHistory.map((query, idx) => (
								<ListGroup.Item
									key={idx}
									action
									onClick={() => handleClick(query)}
									style={{ cursor: "pointer" }}
									title={`Search for "${query}"`}
								>
									{query}
								</ListGroup.Item>
							))}
						</ListGroup>
					</Col>
				</Row>
			)}
		</>
	);
}
