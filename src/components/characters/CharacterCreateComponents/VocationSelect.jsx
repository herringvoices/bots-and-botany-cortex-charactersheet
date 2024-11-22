import React, { useEffect, useState } from "react";
import { Button, Row, Modal, Col } from "react-bootstrap";
import {
  getSFX,
  getAdjectiveSFX,
  getJobs,
  getJobSFX,
  getAdjectives,
} from "../../../services/Service";
import { VocationItem } from "./VocationItem";
import { getQuirks, getQuirkSFX } from "../../../services/distinctionsService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const VocationSelect = ({
  vocationDistinction,
  setVocationDistinction,
  quirkDistinction,
  setQuirkDistinction,
  setReady,
  values, // Shared values from parent
  setModifiedValues, // Function to update modifiedValues in parent
  characterSFX,
}) => {
  const [adjectives, setAdjectives] = useState([]);
  const [selectedAdjective, setSelectedAdjective] = useState(null);

  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);

  const [quirks, setQuirks] = useState([]);
  const [selectedQuirk, setSelectedQuirk] = useState(null);

  const [jobSFX, setJobSFX] = useState([]);
  const [adjectiveSFX, setAdjectiveSFX] = useState([]);
  const [quirkSFX, setQuirkSFX] = useState([]);

  const [show, setShow] = useState(false);

  // Fetch data for adjectives, jobs, and quirks from the server
  useEffect(() => {
    Promise.all([
      getJobs(),
      getSFX(), // Fetch job-related special effects
      getJobSFX(), // Fetch job-to-SFX mapping
      getAdjectives(),
      getAdjectiveSFX(), // Fetch adjective-to-SFX mapping
      getQuirks(),
      getQuirkSFX(), // Fetch quirk-to-SFX mapping
    ])
      .then(
        ([jobs, sfx, jobSfx, adjectives, adjectiveSfx, quirks, quirkSfx]) => {
          setJobs(jobs);
          setAdjectives(adjectives);
          setQuirks(quirks);
        }
      )
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // Update modifiedValues when the selected adjective changes
  useEffect(() => {
    if (selectedAdjective) {
      const foundValue = values.find(
        (item) => item.id === selectedAdjective.valueId
      );
      setModifiedValues((prev) =>
        prev.map((val) =>
          val.id === 3 ? { ...val, valueId: foundValue?.id || 0 } : val
        )
      );
    }
  }, [selectedAdjective, values, setModifiedValues]);

  // Set the selected adjective when the adjective ID changes
  useEffect(() => {
    setSelectedAdjective(
      adjectives.find(
        (item) => item.id === parseInt(vocationDistinction.adjectiveId)
      )
    );
  }, [adjectives, vocationDistinction.adjectiveId]);

  // Update modifiedValues when the selected job changes
  useEffect(() => {
    if (selectedJob) {
      const foundValue = values.find((item) => item.id === selectedJob.valueId);
      setModifiedValues((prev) =>
        prev.map((val) =>
          val.id === 4 ? { ...val, valueId: foundValue?.id || 0 } : val
        )
      );
    }
  }, [selectedJob, values, setModifiedValues]);

  // Set the selected job when the job ID changes
  useEffect(() => {
    setSelectedJob(
      jobs.find((item) => item.id === parseInt(vocationDistinction.jobId))
    );
  }, [jobs, vocationDistinction.jobId]);

  // Update modifiedValues when the selected quirk changes
  useEffect(() => {
    if (selectedQuirk) {
      const foundValue = values.find(
        (item) => item.id === selectedQuirk.valueId
      );
      setModifiedValues((prev) =>
        prev.map((val) =>
          val.id === 5 ? { ...val, valueId: foundValue?.id || 0 } : val
        )
      );
    }
  }, [selectedQuirk, values, setModifiedValues]);

  // Set the selected quirk when the quirk ID changes
  useEffect(() => {
    setSelectedQuirk(
      quirks.find((item) => item.id === parseInt(quirkDistinction.quirkId))
    );
  }, [quirks, quirkDistinction.quirkId]);

  // Update readiness state based on whether all required selections are made
  useEffect(() => {
    if (
      vocationDistinction.adjectiveId &&
      vocationDistinction.jobId &&
      quirkDistinction.quirkId
    ) {
      setReady(4);
    } else {
      setReady(3);
    }

    if (characterSFX) {
      setAdjectiveSFX(characterSFX[6]);
      setJobSFX(characterSFX[7]);
      setQuirkSFX(characterSFX[8]);
    }
  }, [vocationDistinction, quirkDistinction]);

  return (
    <>
      {/* Modal for Rules and Information */}
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Rules and Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Distinctions</h4>
          <p>
            Distinctions (Kindred, Vocation, and Quirk) all start at a d8. They
            represent your character's background: where they come from, what
            they do, and what quirk makes them unique.
          </p>
          <h4>Vocation Distinction</h4>
          <p>
            Step 2: Choose an <strong>adjective</strong> and a{" "}
            <strong>job</strong> to be your{" "}
            <strong>Vocation Distinction</strong>. It will be something like
            "Adaptable Artist." Your Kindred Distinction was all about your
            past. Your <strong>Vocation Distinction</strong> describes who you
            are <em>now</em> and what you are <em>doing</em>. It answers the
            small talk question, “What do you do?” Once you’ve picked your{" "}
            <strong>adjective</strong>
            and <strong>job</strong>, step up the associated{" "}
            <strong>Values</strong> by one.
          </p>
          <h4>Quirk Distinction</h4>
          <p>
            Step 3: Select your <strong>Quirk Distinction</strong>. No small
            talk here. Your <strong>Quirk Distinction</strong> is something
            people have to get to know you to figure out. Once you’ve selected
            your <strong>quirk</strong> step up the associated{" "}
            <strong>value</strong> by 1.
          </p>
        </Modal.Body>
      </Modal>

      {/* Header Row with Modal Trigger Button */}
      <Row className="align-items-center">
        <Col>
          <h1>Vocation Selection</h1>
        </Col>
        <Col xs="auto">
          <Button className="btn-edit" onClick={() => setShow(true)}>
            <FontAwesomeIcon icon="fa-solid fa-question" />
          </Button>
        </Col>
      </Row>

      {/* Vocation Selection */}
      <Row>
        {/* Dropdown for Adjectives */}
        <VocationItem
          item={"Adjectives"}
          sfx={adjectiveSFX} // Placeholder for special effects
          array={adjectives} // Options for the dropdown
          setter={(value) =>
            setVocationDistinction({
              ...vocationDistinction,
              adjectiveId: value,
            })
          }
          value={vocationDistinction.adjectiveId} // Currently selected value
          selectedValue={values.find(
            (item) => item.id === selectedAdjective?.valueId
          )}
        />

        {/* Dropdown for Jobs */}
        <VocationItem
          item={"Jobs"}
          sfx={jobSFX} // Placeholder for special effects
          array={jobs} // Options for the dropdown
          setter={(value) =>
            setVocationDistinction({
              ...vocationDistinction,
              jobId: value,
            })
          }
          value={vocationDistinction.jobId} // Currently selected value
          selectedValue={values.find(
            (item) => item.id === selectedJob?.valueId
          )}
        />
      </Row>

      {/* Quirk Selection */}
      <h1>Quirk Selection</h1>
      <Row>
        {/* Dropdown for Quirks */}
        <VocationItem
          item={"Quirks"}
          sfx={quirkSFX} // Placeholder for special effects
          array={quirks} // Options for the dropdown
          setter={(value) =>
            setQuirkDistinction({
              ...quirkDistinction,
              quirkId: value,
            })
          }
          value={quirkDistinction.quirkId} // Currently selected value
          selectedValue={values.find(
            (item) => item.id === selectedQuirk?.valueId
          )}
        />
      </Row>
    </>
  );
};
