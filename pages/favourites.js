import { useAtom } from "jotai";
import { favouritesAtom } from "@/store";
import ArtworkCard from "@/components/ArtworkCard";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

export default function Favourites() {
	const [favouritesList] = useAtom(favouritesAtom);
	if (!favouritesList) return null;

	return (
		<>
			<Row className="gy-4">
				{favouritesList.length > 0 ? (
					favouritesList.map((objectID) => (
						<Col lg={3} key={objectID}>
							<ArtworkCard objectID={objectID} />
						</Col>
					))
				) : (
					<Col>
						<Card>
							<Card.Body>
								<h4>Nothing Here</h4>
								Try adding some new artwork to the list.
							</Card.Body>
						</Card>
					</Col>
				)}
			</Row>
		</>
	);
}
