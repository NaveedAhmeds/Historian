/*********************************************************************************
 *  WEB422 – Assignment 6
 *
 *  I declare that this assignment is my own work in accordance with Seneca's
 *  Academic Integrity Policy:
 *
 *  https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
 *
 *  Name: Naveed Ahmed Syed   Student ID: 149739237   Date: 7th August
 *  link: historian-two.vercel.app
 *
 ********************************************************************************/

import { Row, Col, Image } from "react-bootstrap";
import { authenticateUser, isAuthenticated } from "../lib/authenticate";
import { getFavourites, addToFavourites } from "../lib/userData";

export default function Home() {
  return (
    <>
      <Image
        src="https://upload.wikimedia.org/wikipedia/commons/3/30/Metropolitan_Museum_of_Art_%28The_Met%29_-_Central_Park%2C_NYC.jpg"
        fluid
        rounded
      />
      <br />
      <br />
      <Row>
        <Col lg={6}>
          <p>
            The Metropolitan Museum of Art of New York City, colloquially &quot;the
            Met&quot;, is the largest art museum in the Americas. Its permanent
            collection contains over two million works, divided among 17
            curatorial departments. The main building at 1000 Fifth Avenue,
            along the Museum Mile on the eastern edge of Central Park on
            Manhattan&apos;s Upper East Side, is by area one of the world&apos;s largest
            art museums. A much smaller second location, The Cloisters at Fort
            Tryon Park in Upper Manhattan, contains an extensive collection of
            art, architecture, and artifacts from medieval Europe. <br />
            <br />
            The Metropolitan Museum of Art was founded in 1870 with its
            mission to bring art and art education to the American people. The
            museum&apos;s permanent collection consists of works of art from
            classical antiquity and ancient Egypt, paintings, and sculptures
            from nearly all the European masters, and an extensive collection of
            American and modern art. The Met maintains extensive holdings of
            African, Asian, Oceanian, Byzantine, and Islamic art. The museum is
            home to encyclopedic collections of musical instruments, costumes,
            and accessories, as well as antique weapons and armor from around
            the world. Several notable interiors, ranging from 1st-century Rome
            through modern American design, are installed in its galleries.
          </p>
        </Col>
        <Col lg={6}>
          <p>
            The main building at 1000 Fifth Avenue is by area one of the world&apos;s
            largest art galleries. A must-visit for art lovers, it was founded
            in 1870 and opened its doors to the public in 1872.
            <a
              href="https://en.wikipedia.org/wiki/Metropolitan_Museum_of_Art"
              target="_blank"
              rel="noreferrer"
            >
              {" "}
              Learn more on Wikipedia
            </a>
            .
          </p>
        </Col>
      </Row>
    </>
  );
}
