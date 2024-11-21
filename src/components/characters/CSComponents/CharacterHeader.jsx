// CharacterHeader.js
import React, { useState } from "react";
import { Button, Col, Row, Image, Form, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { updateCharacter } from "../../../services/Service";
import PPItem from "./PPItem";
import { handleProfilePictureUpload } from "../../../services/cloudinaryService";

export const CharacterHeader = ({ character, setCharacter }) => {
  const [edit, setEdit] = useState(false);
  const [imageSelected, setImageSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(character?.image || null);

  const handleFileChange = (e) => {
    setImageSelected(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    if (!imageSelected) {
      alert("Please select an image first.");
      return;
    }

    setLoading(true);

    try {
      const optimizedUrl = await handleProfilePictureUpload(imageSelected);
      setImageUrl(optimizedUrl);
      const updatedCharacter = { ...character, image: optimizedUrl };
      await updateCharacter(updatedCharacter);
      setCharacter(updatedCharacter);
      alert("Image uploaded and character updated successfully!");
    } catch (error) {
      console.error("Image upload failed", error);
      alert("Failed to upload image. Please try again.");
      e.target.value = "";
    }

    setLoading(false);
  };

  // Handle changes to form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCharacter((prevCharacter) => ({
      ...prevCharacter,
      [name]: value,
    }));
  };

  const handleSave = () => {
    updateCharacter(character)
      .then((updatedCharacter) => {
        setCharacter(updatedCharacter); // Update state with the new character data
        setEdit(false); // Toggle edit mode off
      })
      .catch((error) => {
        console.error("Error saving character:", error);
      });
  };

  return (
    <Row>
      <Col>
        <Row className="dark-container text-center mt-5 align-items-start">
          <Col xs={4} md={2} className="image-column">
            <Image
              roundedCircle
              className="character-image"
              src={character?.image}
            />
            {edit ? (
              <Form>
                <Form.Group controlId="formFile">
                  <Form.Label>Upload Image</Form.Label>
                  <Form.Control type="file" onChange={handleFileChange} />
                </Form.Group>
                <Button
                  variant="primary"
                  onClick={handleUpload}
                  disabled={loading}
                  className="my-2"
                >
                  {loading ? (
                    <>
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />
                      Uploading...
                    </>
                  ) : (
                    "Upload Image"
                  )}
                </Button>
              </Form>
            ) : (
              ""
            )}
          </Col>
          <Col xs={6} md={5} className="my-auto text-start">
            {edit ? (
              <Form>
                <Form.Group controlId="characterName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={character?.name}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group controlId="characterPronouns" className="mt-2 mb-2">
                  <Form.Label>Pronouns</Form.Label>
                  <Form.Control
                    type="text"
                    name="pronouns"
                    value={character?.pronouns}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Form>
            ) : (
              <div>
                <h1>{character?.name}</h1>
                {character?.pronouns}
              </div>
            )}
          </Col>
          <Col className=" text-start p-2">
            {edit ? (
              <Button className="btn-edit" onClick={handleSave}>
                <FontAwesomeIcon icon="fa-solid fa-floppy-disk" />
              </Button>
            ) : (
              <Button className="btn-edit" onClick={() => setEdit(true)}>
                <FontAwesomeIcon icon="fa-solid fa-pen-to-square" />
              </Button>
            )}
          </Col>
          <Col md={3}>
            <PPItem
              setter={setCharacter}
              updater={updateCharacter}
              character={character}
            />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
