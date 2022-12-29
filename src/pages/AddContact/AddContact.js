import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../AddContact/AddContact.css";
import inveduslogo from "../../images/invedus-logo.png";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import profile from "../../images/profile.jpeg";
import { Button } from "react-bootstrap";
import { ToastContainer, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddContact() {
  const [addContacts, setAddContacts] = useState({
    name: "",
    phone: "",
    type: "",
    iswhatsapp: true,
    profilepicture: profile,
  });
  const [addContactsError, setAddContactsError] = useState({
    name: "",
    phone: "",
    type: "",
    iswhatsapp: "",
    profilepicture: profile,
  });
  const navigate = useNavigate();

  /*** handleChange  ***/

  const handleChange = (e) => {
    if (e.target.name == "profilepicture") {
      const image = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.addEventListener("load", () => {
        setAddContacts({
          ...addContacts,
          [e.target.name]: reader.result,
        });
      });
    } else if (e.target.name == "name") {
      setAddContacts({
        ...addContacts,
        [e.target.name]: e.target.value.toUpperCase(),
      });
    } else {
      setAddContacts({
        ...addContacts,
        [e.target.name]: e.target.value,
      });
    }
    setAddContactsError({
      ...addContactsError,
      [e.target.name]: null,
    });
  };

  /*** handleSubmit  ***/

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedData = JSON.parse(localStorage.getItem("contacts")) || [];
    storedData.push(addContacts);
    localStorage.setItem("contacts", JSON.stringify(storedData));
    toast.success("Successfully Added");
    setAddContacts({
      ...addContacts,
      name: "",
      phone: "",
      type: "",
      iswhatsapp: "",
      profilepicture: "",
    });
    setTimeout(() => {
      navigate("/home-page");
    }, 1000);
  };

  /*** handleCleare  ***/

  const handleCleare = () => {
    setAddContacts({
      ...addContacts,
      name: "",
      phone: "",
      type: "",
      iswhatsapp: "",
      profilepicture: "",
    });
  };

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar
        transition={Zoom}
        delay={1000}
        limit={1}
      />
      <div className="main-div">
        <div className="row g-0 p-3">
          <div className="col-md-2 row justify-content-md-start text-white">
            <div className="logo-div">
              <img src={inveduslogo} width="130px" />
            </div>
          </div>
          <div className="col-md-10  row row justify-content-end text-white">
            <div class="col-8 text-end">
              <Link
                to="/home-page"
                style={{ textDecoration: "none", color: "white" }}
              >
                {" "}
                <span>Home</span>
              </Link>
              <Link
                to="/add-contact"
                style={{ textDecoration: "none", color: "white" }}
              >
                {" "}
                <span className="m-5">Add Contact</span>
              </Link>
              <Link
                to="/edit-contact"
                style={{ textDecoration: "none", color: "white" }}
              >
                {" "}
                <span>Edit Contact</span>
              </Link>
            </div>
          </div>
          <div
            className="card mt-5"
            style={{ width: "600px", margin: "auto", height: "430px" }}
          >
            <b className="text-center mt-2">ADD CONTACT FORM</b>
            <div className="row g-0">
              <div className="col-5 p-2">
                <img
                  src={
                    addContacts?.profilepicture == ""
                      ? profile
                      : addContacts?.profilepicture
                  }
                  width="100%"
                  height="365px"
                />
              </div>
              <div className="col-7">
                <div className="p-4">
                  <Form onSubmit={handleSubmit}>
                    <Form.Group
                      as={Row}
                      className="mb-4"
                      controlId="formPlaintextPassword"
                    >
                      <Form.Label column sm="">
                        Name
                      </Form.Label>
                      <Col sm="8">
                        <Form.Control
                          type="text"
                          name="name"
                          value={addContacts.name}
                          onChange={handleChange}
                          placeholder="please enter name"
                          autoComplete="off"
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group
                      as={Row}
                      className="mb-4"
                      controlId="formPlaintextPassword"
                    >
                      <Form.Label column sm="">
                        Phone
                      </Form.Label>
                      <Col sm="8">
                        <Form.Control
                          type="number"
                          placeholder="please enter number"
                          name="phone"
                          value={addContacts.phone}
                          onChange={handleChange}
                          autoComplete="off"
                          maxLength={10}
                          onInput={(e) => {
                            if (e.target.value > e.target.maxLength) {
                              e.target.value = e.target.value.slice(
                                0,
                                e.target.maxLength
                              );
                            }
                          }}
                          onWheelCapture={(e) => e.target.blur()}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group
                      as={Row}
                      className="mb-4"
                      controlId="formPlaintextPassword"
                    >
                      <Form.Label column sm="">
                        Type
                      </Form.Label>
                      <Col sm="8">
                        <Form.Select
                          aria-label="Default select example"
                          name="type"
                          onChange={handleChange}
                          value={addContacts.type}
                          autoComplete="off"
                        >
                          <option>select type</option>
                          <option value="personal">personal</option>
                          <option value="office">office</option>
                        </Form.Select>
                      </Col>
                    </Form.Group>

                    <Form.Group
                      as={Row}
                      className="mb-4"
                      controlId="formPlaintextPassword"
                    >
                      <Form.Label column sm="">
                        isWhatsapp
                      </Form.Label>
                      <Col sm="8" className="d-flex mt-2">
                        <Form.Check
                          type="radio"
                          name="iswhatsapp"
                          label="Yes"
                          value="true"
                          onChange={handleChange}
                        />
                        <Form.Check
                          type="radio"
                          name="iswhatsapp"
                          label="No"
                          value="false"
                          onChange={handleChange}
                          style={{ marginLeft: "5px" }}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group
                      as={Row}
                      className="mb-4"
                      controlId="formPlaintextPassword"
                    >
                      <Form.Label column sm="">
                        Profile
                      </Form.Label>
                      <Col sm="8">
                        <Form.Control
                          type="file"
                          placeholder="please enter name"
                          name="profilepicture"
                          onChange={handleChange}
                          autoComplete="off"
                        />
                      </Col>
                    </Form.Group>
                    <div className="row">
                      <div className="col">
                        <Button className="bg-secondary" onClick={handleCleare}>
                          Reset
                        </Button>
                      </div>
                      <div className="col">
                        <Button type="submit">Submit</Button>
                      </div>
                    </div>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddContact;
