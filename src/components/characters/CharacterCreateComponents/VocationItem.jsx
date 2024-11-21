import React from "react";
import { Col, Form } from "react-bootstrap";

export const VocationItem = ({
  item,
  sfx,
  array,
  setter,
  value,
  selectedValue,
}) => {
  const selectedItem = array.find((opt) => opt.id === parseInt(value));

  return (
    <>
      <Col className="select-column">
        <div className="mt-3 mb-3">
          <Form>
            <Form.Group className="mb-3" controlId={`form${item}`}>
              <Form.Label className="secondary-span">Select {item}</Form.Label>
              <Form.Select
                value={value || ""} // Controlled component
                onChange={(evt) => setter(parseInt(evt.target.value, 10))} // Update parent state
              >
                <option value="" disabled>
                  Select {item.toLowerCase()}
                </option>
                {array.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Form>
          {selectedItem ? (
            <>
              <h2>{selectedItem.name}</h2>
              <p>{selectedItem.description}</p>

              <>
                <h2>SFX</h2>
                <p>
                  <b>{sfx?.name}:</b>
                </p>
                <p>{sfx?.description}</p>
              </>

              {selectedValue && (
                <>
                  <h2>{item} Value</h2>
                  <p>+1 {selectedValue?.name}</p>
                </>
              )}
            </>
          ) : null}
        </div>
      </Col>
    </>
  );
};
