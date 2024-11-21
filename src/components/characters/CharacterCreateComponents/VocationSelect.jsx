import React, { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import {
  getSFX,
  getAdjectiveSFX,
  getJobs,
  getJobSFX,
  getAdjectives,
} from "../../../services/Service";
import { VocationItem } from "./VocationItem";
import { getQuirks, getQuirkSFX } from "../../../services/distinctionsService";

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
