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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "bootstrap/dist/css/bootstrap.min.css";
import "./gameRules.scss";
import ScrollToHash from "./ScrollToHash"; // Import ScrollToHash for hash-based scrolling

const RulesPage = () => {
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
            aria-controls="rules-sidebar"
            aria-expanded={show}
            className="btn-edit btn-rules"
          >
            Rules Navigation
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
          <Offcanvas.Title>Game Rules</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Navbar expand="lg" className="flex-column align-items-start">
            <Nav className="flex-column">
              <Nav.Link href="#gameplay-basics">Gameplay Basics</Nav.Link>

              <Nav.Link href="#dice">Dice</Nav.Link>

              <Nav.Link href="#traits-die-ratings">
                Traits and Die Ratings
              </Nav.Link>

              <Nav.Link href="#stepping-up">
                Stepping Up and Stepping Down
              </Nav.Link>

              <Nav.Link href="#hitches-botches">Hitches and Botches</Nav.Link>

              <Nav.Link href="#plot-points">Plot Points</Nav.Link>

              <Nav.Link href="#stress">Stress</Nav.Link>

              <Nav.Link href="#tests">Tests</Nav.Link>

              <Nav.Link href="#contests">Contests</Nav.Link>

              <Nav.Link href="#challenges">Challenges</Nav.Link>

              <Nav.Link href="#recovering-stress">Recovering Stress</Nav.Link>

              <Nav.Link href="#trauma">Trauma</Nav.Link>
            </Nav>
          </Navbar>
        </Offcanvas.Body>
      </Offcanvas>

      {/* Main Content */}
      <Row>
        <Col
          md={{ span: 10, offset: 1 }}
          className="p-3 dark-container rules-content"
        >
          <div id="gameplay-basics">
            <h2>Gameplay Basics</h2>
            <p>
              Dice, traits, and stress work together to create the mechanics of
              Bots and Botany. This section introduces the foundational concepts
              that will guide gameplay.
            </p>
          </div>

          <div id="dice">
            <h3>Dice</h3>
            <p>
              We use five different kinds of dice in Bots and Botany: d4, d6,
              d8, d10, and d12. The number tells you how many sides the die has;
              the more sides, the bigger the numbers. A handful of dice together
              is called a dice pool. Roll all the dice in a dice pool together,
              right out in the open—even if you’re the Narrator!
            </p>
            <p>
              Any time you roll a die, the number you get on the die is called
              the result. Usually, you choose two results to add together to get
              a total. Adding two or more results together is about the only
              math you need to do in Bots and Botany. A third die from your dice
              pool, called the effect die, might be chosen to show the impact of
              your success.
            </p>
            <p>
              Dice are used to resolve tests, contests, and challenges. They let
              you know if your PC succeeds, fails, or turns the story in their
              favor.
            </p>
          </div>

          <div id="traits-die-ratings">
            <h3>Traits and Die Ratings</h3>
            <p>
              All characters in Bots and Botany, whether they’re PCs or NCs, are
              described using game traits. Traits cover a range of descriptive
              elements, grouped into trait sets. These include attributes,
              values, distinctions, assets, and specialties.
            </p>
            <p>
              Every trait in the game is rated with a die, called a die rating.
              Whenever you use a trait, you pick up a die of that many sides for
              your dice pool. In this way, your dice pool is made up of all of
              the traits that might affect how successful your PC is in doing
              what you want them to do.
            </p>
            <p>
              The die rating tells you how much of an effect that trait has on
              the outcome of any given test, contest, or challenge. They’re a
              useful shorthand for how strong, smart, serious, or skilled your
              character is.
            </p>
          </div>

          <div id="stepping-up">
            <h3>Stepping Up and Stepping Down</h3>
            <p>
              Sometimes you swap out one or more dice in your dice pool for dice
              with more or fewer sides. This is called stepping up or stepping
              down a die rating.
            </p>
            <p>
              To step up a die by one, swap it for a die that’s one step bigger
              than the original, like a d6 to a d8. To step down a die by one,
              swap it out for a die that’s one step smaller, like a d6 to a d4.
            </p>
            <p>
              Die ratings can only have five possible steps, from d4 to d12. If
              you step a d12 in a dice pool up by one, it remains at d12, but
              you can step up another die in your dice pool by one step instead.
              If you step a d4 down by one, it’s removed from the dice pool.
            </p>
            <p>
              If you’re asked to step up a d12 that isn’t currently in a dice
              pool, it remains at d12, but you gain a d6 alongside it. Wherever
              that d12 goes, the d6 goes with it.
            </p>
          </div>

          <div id="hitches-botches">
            <h3>Hitches and Botches</h3>
            <p>
              Any die that comes up with a result of 1 is called a hitch. Set
              hitches aside; they can’t be included in a total and they count as
              zeroes. The Narrator has the special ability to activate hitches;
              this is covered later. When the Narrator rolls a hitch, it’s
              called an opportunity. Why the different terms? It’s because some
              game effects apply only to hitches, and some only apply to
              opportunities.
            </p>
            <p>
              If all your dice come up as 1, that’s a botch and it’s a sign of
              trouble, as your total is effectively zero. Failing a dice roll
              isn’t that bad most of the time. The story moves forward, just not
              how your PC might like it to. With a botch, there’s no
              ambiguity—things are bad for your PC, and their story hits a brick
              wall for a moment.
            </p>
          </div>

          <div id="plot-points">
            <h3>Plot Points</h3>
            <p>
              Plot points (PP) are a way for players to affect the tale beyond
              the roll of the dice or their own choices. Plot points can be
              spent to give yourself more dice for your dice pool, make the dice
              you have more powerful, or activate certain traits or trait
              special effects (SFX) on your character sheet.
            </p>
            <p>
              You need a way to keep track of plot points. One way is to write
              them in your character sheet as tally marks. Another option is to
              use poker chips or some other kind of token (pennies, paperclips,
              glass beads… you get the idea). Keep a pile of them in the middle
              of the table for everyone to draw from. Toss them back into the
              pile when they’re spent.
            </p>
          </div>

          <div id="stress">
            <h3>Stress</h3>
            <p>
              When bad things happen to your PC or to the NCs they’re dealing
              with, we use a kind of trait called stress to keep track of the
              consequences. Stress comes in six different types: Afraid, Angry,
              Corrupted, Exhausted, Injured, and Insecure.
            </p>
            <ul>
              <li>
                <strong>Afraid:</strong> This is the stress of fear and panic.
                Once this exceeds a d12, you are gripped in the clutches of
                terror.
              </li>
              <li>
                <strong>Angry:</strong> This is the stress of rage and
                frustration. Once this exceeds a d12, you are lost to your
                wrath.
              </li>
              <li>
                <strong>Corrupted:</strong> This is the stress of selfishness
                and greed. Once this exceeds a d12, you are a slave to your
                self-interest.
              </li>
              <li>
                <strong>Exhausted:</strong> This is the stress of fatigue and
                weariness. Once this exceeds a d12, you can no longer remain
                awake.
              </li>
              <li>
                <strong>Injured:</strong> This is the stress of pain and
                wounding. Once this exceeds a d12, you collapse unconscious and
                may die (don't worry: it's the future and death is temporary).
              </li>
              <li>
                <strong>Insecure:</strong> This is the stress of apprehension
                and worry. Once this exceeds a d12, you succumb to insecurity.
              </li>
            </ul>
          </div>

          <div id="tests">
            <h3>Tests</h3>
            <p>
              A test is the simplest dice roll in Bots and Botany and can handle
              many situations. Examples of tests include:
            </p>
            <ul>
              <li>Trying to climb a wall</li>
              <li>Carving a statue out of wood</li>
              <li>Using complicated technology</li>
              <li>Searching a room for a missing locket</li>
              <li>Deciphering a mysterious inscription in a book</li>
              <li>Strong-arming a guard out of a doorway</li>
            </ul>
            <p>
              The period of time the test covers can be short, like a few
              seconds, or it can span a lengthy period of time, like a whole
              afternoon. It depends entirely on the nature of the problem.
            </p>
          </div>

          <div id="contests">
            <h3>Contests</h3>
            <p>
              In Bots and Botany, you may find yourself in conflict with a major
              Narrator character—a catalyst—over something important. You may
              even find yourself at odds with another player character—how dare
              they! In these situations, a test isn’t enough. What’s needed is a
              contest.
            </p>
            <p>Examples of contests include:</p>
            <ul>
              <li>
                Dueling an avia noble on a grav-drive platform, the battlefield
                shifting with every pulse.
              </li>
              <li>
                Arguing your case against a Warbly-Carrot executive before a
                machina judge.
              </li>
              <li>
                Competing with a vearin warrior for a god-tree seed that could
                terraform a moon.
              </li>
              <li>
                Negotiating with a Calxis merchant for a fusion battery, their
                glowing patterns revealing hidden cues.
              </li>
            </ul>
          </div>
          <div id="challenges">
            <h3>Challenges</h3>
            <p>
              Sometimes, a simple test or even a back-and-forth contest doesn’t
              represent the effort required to overcome a problem. Some problems
              are many-faceted, presenting different, smaller problems to tackle
              before being fully resolved. Other problems are just so big or
              take so much time that a different approach is needed. That’s
              where the Narrator brings in the challenge.
            </p>
            <p>Examples of challenges include:</p>
            <ul>
              <li>Sneaking past a camp filled with dangerous guards</li>
              <li>Confronting a group of hungry beasts</li>
              <li>Negotiating a truce among troubled kingdoms</li>
            </ul>
            <p>
              Challenges take place over several rounds. Each round represents
              some passage of time; it could be a few seconds, or it could be
              hours or even days. Fighting your way out of a water-logged tunnel
              filled with tiny amorf animals might use rounds of only a few
              seconds each, but trying to hack into a well-defended computer
              system might take rounds of several hours to achieve.
            </p>
            <p>
              The challenge doesn’t sit back and wait for the players to resolve
              it. It gets to act, almost like it was a character itself, and can
              either get worse or create problems for the PCs in response.
            </p>
          </div>

          <div id="recovering-stress">
            <h3>Recovering Stress</h3>
            <p>
              During any scene in which your character spends most of the time
              sleeping, resting, or otherwise taking care of themselves, all of
              your stress dice (except for CORRUPTED stress) step down by one.
              At the end of every session, all of your stress dice also step
              down by one, unless the Narrator decides there’s some reason for
              the stress to persist (such as ending the session on a
              cliffhanger). You can also recover stress dice in other ways,
              usually by seeking out somebody or something to step them down
              more.
            </p>
            <p>
              Activating one of the Narrator’s hitches lets you step down a
              stress die by one. Other characters can attempt to recover your
              stress by making a test against an opposition pool based on a
              difficulty die equal in size to the stress die being recovered. If
              they succeed, compare their effect die to your stress die. If it’s
              larger, your stress goes away. If it’s equal to or less, your
              stress steps down by one.
            </p>
          </div>

          <div id="trauma">
            <h3>Trauma</h3>
            <p>
              Trauma is like long-term stress. Any time a PC’s stress is stepped
              up past d12, they’re stressed out of the scene they’re in, and
              they gain d6 trauma of the same type as the stress that just
              increased. Trauma functions just like stress but is much harder to
              recover.
            </p>
            <p>
              During any scene in which your character is stressed out and has
              taken trauma, additional stress of that same type to your
              character goes directly to trauma of that type. This won’t happen
              often! You’re already out of the scene, after all. But it might
              occur under some circumstances. Once trauma is stepped up beyond
              d12, your character is permanently out of options—they’re dead,
              hopelessly incoherent, lost to their own psyche, or whatever seems
              most appropriate.
            </p>
            <p>
              Recovering trauma requires somebody else to make the tests to help
              you. This works like recovering stress but the effect die isn’t
              used, as follows:
            </p>
            <ul>
              <li>
                If the player beats the difficulty, the trauma is stepped down
                by one.
              </li>
              <li>
                If the player fails to beat the difficulty, the trauma does not
                get any better or worse. The player can’t try to recover that
                trauma again until time passes, although another friendly
                character might try to help.
              </li>
              <li>
                If the player rolls a hitch on a successful attempt to recover
                trauma, the Narrator may hand over a PP and inflict stress of a
                different type than the trauma that’s being recovered, starting
                at d6 (or stepping up by one if the PC already had stress of
                that type).
              </li>
              <li>
                If the player rolls a hitch on a failed attempt, the trauma gets
                worse, stepping up by one for each hitch rolled. If this steps
                the trauma up past d12, that’s all, folks.
              </li>
            </ul>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default RulesPage;
