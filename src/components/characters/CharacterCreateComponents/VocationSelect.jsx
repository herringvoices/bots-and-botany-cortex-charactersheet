import React, { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import {
  getSFX,
  getAdjectiveSFX,
  getValues,
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
}) => {
  const [adjectives, setAdjectives] = useState([]);
  const [selectedAdjective, setSelectedAdjective] = useState(null);
  const [adjectiveSfx, setAdjectiveSfx] = useState([]);
  const [selectedAdjectiveSfx, setSelectedAdjectiveSfx] = useState([]);

  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [jobSfx, setJobSfx] = useState([]);
  const [selectedJobSfx, setSelectedJobSfx] = useState([]);

  const [quirks, setQuirks] = useState([]); // Add quirks
  const [selectedQuirk, setSelectedQuirk] = useState(null); // Add selected quirk
  const [quirkSfx, setQuirkSfx] = useState([]); // Add quirk SFX
  const [selectedQuirkSfx, setSelectedQuirkSfx] = useState([]); // Add selected quirk SFX
  const [selectedQuirkValue, setSelectedQuirkValue] = useState([]); // Add quirk value

  const [values, setValues] = useState([]);
  const [selectedAdjectiveValue, setSelectedAdjectiveValue] = useState([]);
  const [selectedJobValue, setSelectedJobValue] = useState([]);
  const [sfx, setSfx] = useState([]);

  // Fetch data for jobs, adjectives, quirks, SFX, and values
  useEffect(() => {
    Promise.all([
      getJobs(),
      getSFX(),
      getJobSFX(),
      getAdjectives(),
      getAdjectiveSFX(),
      getQuirks(), // Fetch quirks
      getQuirkSFX(), // Fetch quirk SFX
      getValues(),
    ])
      .then(
        ([
          jobs,
          sfx,
          jobSfx,
          adjectives,
          adjectiveSfx,
          quirks,
          quirkSfx,
          values,
        ]) => {
          setJobs(jobs);
          setSfx(sfx);
          setJobSfx(jobSfx);
          setAdjectives(adjectives);
          setAdjectiveSfx(adjectiveSfx);
          setQuirks(quirks); // Set quirks
          setQuirkSfx(quirkSfx); // Set quirk SFX
          setValues(values);
        }
      )
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // Update selected adjective SFX and value when the selected adjective changes
  useEffect(() => {
    if (adjectiveSfx) {
      const selectedASFX = adjectiveSfx.filter(
        (item) => item?.adjectiveId === selectedAdjective?.id
      );
      const sfxOptions = sfx.filter((item) =>
        selectedASFX.some((selected) => selected.sfxId === item.id)
      );
      setSelectedAdjectiveSfx(sfxOptions);
    }
    if (values) {
      const foundValue = values.find(
        (item) => item.id === selectedAdjective?.valueId
      );
      setSelectedAdjectiveValue(foundValue);
    }
  }, [adjectives, selectedAdjective, sfx, adjectiveSfx]);

  useEffect(() => {
    setSelectedAdjective(
      adjectives.find(
        (item) => item.id === parseInt(vocationDistinction.adjectiveId)
      )
    );
  }, [adjectives, vocationDistinction.adjectiveId]);

  // Update selected job SFX and value when the selected job changes
  useEffect(() => {
    if (jobSfx) {
      const selectedJSFX = jobSfx.filter(
        (item) => item?.jobId === selectedJob?.id
      );
      const sfxOptions = sfx.filter((item) =>
        selectedJSFX.some((selected) => selected.sfxId === item.id)
      );
      setSelectedJobSfx(sfxOptions);
    }
    if (values) {
      const foundValue = values.find(
        (item) => item.id === selectedJob?.valueId
      );
      setSelectedJobValue(foundValue);
    }
  }, [jobs, selectedJob, sfx, jobSfx]);

  useEffect(() => {
    setSelectedJob(
      jobs.find((item) => item.id === parseInt(vocationDistinction.jobId))
    );
  }, [jobs, vocationDistinction.jobId]);

  // Update selected quirk SFX and value when the selected quirk changes
  useEffect(() => {
    if (quirkSfx) {
      const selectedQSFX = quirkSfx.filter(
        (item) => item?.quirkId === selectedQuirk?.id
      );
      const sfxOptions = sfx.filter((item) =>
        selectedQSFX.some((selected) => selected.sfxId === item.id)
      );
      setSelectedQuirkSfx(sfxOptions);
    }
    if (values) {
      const foundValue = values.find(
        (item) => item.id === selectedQuirk?.valueId
      );
      setSelectedQuirkValue(foundValue);
    }
  }, [quirks, selectedQuirk, sfx, quirkSfx]);

  useEffect(() => {
    setSelectedQuirk(
      quirks.find((item) => item.id === parseInt(quirkDistinction.quirkId))
    );
  }, [quirks, quirkDistinction.quirkId]);

  // Update the `ready` state based on whether adjective, job, and quirk are selected
  useEffect(() => {
    if (
      vocationDistinction.adjectiveId &&
      vocationDistinction.jobId &&
      quirkDistinction.quirkId
    ) {
      setReady(4); // All selected, ready to proceed
    } else {
      setReady(3); // Partial selection
    }
  }, [vocationDistinction, quirkDistinction]);

  return (
    <>
      <Row>
        <VocationItem
          item={"Adjectives"}
          sfx={selectedAdjectiveSfx}
          array={adjectives}
          setter={(value) =>
            setVocationDistinction({
              ...vocationDistinction,
              adjectiveId: value,
            })
          }
          value={vocationDistinction.adjectiveId}
          selectedValue={selectedAdjectiveValue}
        />
        <VocationItem
          item={"Jobs"}
          sfx={selectedJobSfx}
          array={jobs}
          setter={(value) =>
            setVocationDistinction({
              ...vocationDistinction,
              jobId: value,
            })
          }
          value={vocationDistinction.jobId}
          selectedValue={selectedJobValue}
        />
        <VocationItem
          item={"Quirks"}
          sfx={selectedQuirkSfx}
          array={quirks}
          setter={(value) =>
            setQuirkDistinction({
              ...quirkDistinction,
              quirkId: value,
            })
          }
          value={quirkDistinction.quirkId}
          selectedValue={selectedQuirkValue}
        />
      </Row>
    </>
  );
};
