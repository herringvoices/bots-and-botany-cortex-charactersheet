import React, { useState } from "react";
import {
  Button,
  Offcanvas,
  Navbar,
  Nav,
  Container,
  Row,
  Col,
} from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import "./GameRules";
import ScrollToHash from "./ScrollToHash"; // Import ScrollToHash for hash-based scrolling

const TechnologyPage = () => {
  const [show, setShow] = useState(false); // State to toggle the Offcanvas

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Container fluid>
      {/* ScrollToHash handles scrolling for hash navigation */}
      <ScrollToHash />

      {/* Sticky Row with Navigation Button */}
      <Row className="sticky-top">
        <Col className="text-center py-2">
          <Button
            onClick={handleShow}
            aria-controls="technology-sidebar"
            aria-expanded={show}
            className="btn-edit btn-technology"
          >
            Technology Navigation
          </Button>
        </Col>
      </Row>

      {/* Offcanvas Component */}
      <Offcanvas
        show={show}
        onHide={handleClose}
        placement="start" /* Sidebar slides out from the left */
        scroll
        backdrop
        className="overlay-offcanvas"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Technology in Bots and Botany</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Navbar expand="lg" className="flex-column align-items-start">
            <Nav className="flex-column">
              <Nav.Link href="#hub-system-overview">
                Hub System Overview
              </Nav.Link>

              <Nav.Link href="#nanites">Nanites</Nav.Link>

              <Nav.Link href="#hardware-and-software">
                Hardware and Software
              </Nav.Link>

              <Nav.Link href="#translation-software">
                Translation Software
              </Nav.Link>

              <Nav.Link href="#cloud-computing-and-ether">
                Cloud Computing and the Ether
              </Nav.Link>

              <Nav.Link href="#skill-pills-and-perks">
                Skill Pills and Perks
              </Nav.Link>

              <Nav.Link href="#grav-drive">Grav-Drive</Nav.Link>

              <Nav.Link href="#e-gates">E-Gates</Nav.Link>

              <Nav.Link href="#limited-intelligences">
                Limited Intelligences (LIs)
              </Nav.Link>

              <Nav.Link href="#medical-and-utility-nanites">
                Medical and Utility Nanites
              </Nav.Link>

              <Nav.Link href="#weaponry-and-defense">
                Weaponry and Defense
              </Nav.Link>
            </Nav>
          </Navbar>
        </Offcanvas.Body>
      </Offcanvas>

      <Row>
        <Col
          md={{ span: 10, offset: 1 }}
          className="p-3 dark-container technology-content"
        >
          <div id="hub-system">
            <h2>Technology in Bots and Botany</h2>
            <h3>Hub System Overview</h3>
            <p>
              The hub system represents the pinnacle of user interface
              technology in the Bots and Botany universe. Traditional hardware
              like laptops and keyboards have been rendered obsolete by the
              advent of nanite-based interaction. These nanites, dispersed
              through the water supply of habitable planets, interface directly
              with the user's brain, creating virtual displays and input methods
              that feel tangible.
            </p>
          </div>

          <div id="nanites">
            <h3>Nanites</h3>
            <p>
              Nanites act as the medium for the hub interface, translating
              neural signals into digital interactions and vice versa. Present
              in all sentient beings, these microscopic machines allow users to
              experience and interact with virtual environments seamlessly.
            </p>
          </div>

          <div id="hardware-software">
            <h3>Hardware and Software</h3>
            <p>
              The hub hardware consists of advanced computers that control and
              manage the nanites, facilitating the connection between the user's
              brain and the virtual interfaces. The software, akin to internet
              browsers, tailors user experiences with various features and
              customization options.
            </p>
          </div>

          <div id="translation-software">
            <h3>Translation Software</h3>
            <p>
              One of the most notable examples of this is translation software.
              Translation software creates real-time subtitles, facilitating
              seamless communication across different languages and species,
              ensuring clear understanding and interaction among the galaxy's
              inhabitants. However, many species find that their sense of
              hearing, sight, or smell aren't broad or strong enough to
              comprehend all languages. Humans, for example, need to purchase
              permanent perks to enable them to see into infrared and
              ultraviolet if they want to communicate with the calxis; or to
              hear broadly enough to communicate with the amorfs; or to smell
              well enough to communicate more intimately with the flora and
              vearin.
            </p>
          </div>

          <div id="cloud-computing">
            <h3>Cloud Computing and the Ether</h3>
            <p>
              Cloud infrastructure, facilitated by the galaxy-spanning internet
              known as the ether, allows for extensive data processing and
              storage, enhancing the hub's capabilities. This connectivity
              enables real-time interactions and access to remote services,
              expanding the hub's potential beyond the limitations of local
              hardware.
            </p>
          </div>

          <div id="skill-pills">
            <h3>Skill Pills and Perks</h3>
            <h4>Skill Pills</h4>
            <p>
              Skill Pills are advanced medical nanites that restructure the
              brain to teach new skills. They come in two varieties:
            </p>
            <ul>
              <li>
                <strong>Temporary Skill Pills:</strong> Moderately priced, these
                provide skills for a limited duration.
              </li>
              <li>
                <strong>Permanent Skill Pills:</strong> High-end pills that
                permanently impart skills, offering a long-term solution for
                skill acquisition.
              </li>
            </ul>
            <h4>Perks</h4>
            <p>
              Perks are enhancements that alter the body to grant specific
              abilities or improvements. These modifications include things like
              enhanced senses, water breathing, and increased strength.
            </p>
          </div>

          <div id="grav-drive">
            <h3>Grav-Drive</h3>
            <p>
              Grav-drives are revolutionary propulsion systems manipulating the
              Ether, a dimension where universal information is stored. They
              warp space-time locally, creating an artificial gravity. This
              enables vehicles to achieve rapid movement by constantly
              accelerating ("falling") in any direction specified by the
              grav-drive.
            </p>
            <p>
              These drives are integral to both space travel and maintaining
              artificial gravity on ships and space stations. On small devices,
              such as floating cameras, the grav-drives aren't housed locally on
              the device. This requires more compute power, but the result is
              that there is no size restriction on what a grav-drive can affect.
            </p>
          </div>

          <div id="e-gates">
            <h3>E-Gates (Faster-Than-Light Travel)</h3>
            <p>
              E-Gates utilize ether manipulation to facilitate faster-than-light
              travel. By conflating space and information, these gates create
              pathways through the ether, optimizing travel times based on
              information density.
            </p>
            <p>
              <strong>Gate Placement:</strong> E-Gates are strategically placed
              far from inhabited star systems to avoid interference.
            </p>
            <p>
              <strong>Potential Risks:</strong> Navigating high-density
              information regions requires advanced systems and skilled pilots.
            </p>
          </div>

          <div id="limited-intelligences">
            <h3>Limited Intelligences (LIs)</h3>
            <p>
              LIs are programs designed by the machina to avoid attaining
              sentience, regulated to perform specific tasks. These
              intelligences play crucial roles in operating hub computers and
              other controlled environments, maintaining safety and
              predictability.
            </p>
          </div>

          <div id="medical-nanites">
            <h3>Medical and Utility Nanites</h3>
            <p>
              Nanites are extensively used in medicine, performing tasks from
              targeting diseases to reviving the dead. Specialized medical
              nanites are programmed for temporary deployment within patients to
              ensure targeted treatment without long-term interference. Medical
              nanites cannot reproduce and die off in a matter of weeks.
            </p>
            <h4>Some other uses of medical nanites include</h4>
            <ul>
              <li>
                <strong>Lazy-Tanks:</strong> Devices used for bringing back the
                dead.
              </li>
              <li>
                <strong>Methusapods:</strong> Devices reversing the aging
                process.
              </li>
            </ul>
          </div>

          <div id="weaponry-defense">
            <h3>Weaponry and Defense</h3>
            <ul>
              <li>
                <strong>Freezers:</strong> Weapons that freeze targets to near
                absolute zero with a laser. After each shot, the user must eject
                a heat-sink from the weapon quickly, installing another one in
                place before firing off another shot.
              </li>
              <li>
                <strong>Vibro-Weapons:</strong> Tools that incapacitate targets
                instantly through vibrating pulses.
              </li>
              <li>
                <strong>Grav-Grenades:</strong> Devices creating localized
                gravitational chaos.
              </li>
              <li>
                <strong>Pepper Shields:</strong> Defenses that disperse kinetic
                energy from high-velocity projectiles, reviving close-quarters
                combat.
              </li>
            </ul>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default TechnologyPage;
