import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { searchHistoryAtom } from "@/store";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import styles from "@/styles/History.module.css";
import { removeFromHistory } from "@/lib/userData";

export default function History() {
	const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
	const router = useRouter();
	if (!searchHistory) return null;

	let parsedHistory = [];
	searchHistory.forEach((h) => {
		let params = new URLSearchParams(h);
		let entries = params.entries();
		parsedHistory.push(Object.fromEntries(entries));
	});

	function historyClicked(e, index) {
		router.push(`/artwork?${searchHistory[index]}`);
	}

	//made this one asynchronous...

	async function removeHistoryClicked(e, index) {
		e.stopPropagation();
		setSearchHistory(await removeFromHistory(searchHistory[index]));
	}

	return (
		<>
			<h1>Search History</h1>
			{parsedHistory.length === 0 ? (
				<Card>
					<Card.Body>
						<h4>Nothing Here</h4>
						Try searching for some artwork.
					</Card.Body>
				</Card>
			) : (
				<ListGroup>
					{parsedHistory.map((historyItem, index) => (
						<ListGroup.Item
							key={index}
							onClick={(e) => historyClicked(e, index)}
							className={styles.historyListItem}
						>
							{Object.keys(historyItem).map((key) => (
								<span key={key}>
									{key}: <strong>{historyItem[key]}</strong>&nbsp;
								</span>
							))}
							<Button
								variant="danger"
								size="sm"
								className="float-end"
								onClick={(e) => removeHistoryClicked(e, index)}
								aria-label="Remove search history item"
							>
								&times;
							</Button>
						</ListGroup.Item>
					))}
				</ListGroup>
			)}
		</>
	);
}
