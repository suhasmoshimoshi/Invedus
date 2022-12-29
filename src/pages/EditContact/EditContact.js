import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import "../AddContact/AddContact.css";
import inveduslogo from "../../images/invedus-logo.png";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import profile from "../../images/profile.jpeg";
import { Button } from "react-bootstrap";
import { ToastContainer, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function EditContact(props) {
  const { state } = useLocation();
  const [addContacts, setAddContacts] = useState({
    name: "",
    phone: "",
    type: "",
    iswhatsapp: true,
    profilepicture: "",
  });
  const [addContactsError, setAddContactsError] = useState({
    name: "",
    phone: "",
    type: "",
    iswhatsapp: "",
    profilepicture: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    setAddContacts({
      ...addContacts,
      name: state?.data?.name,
      phone: state?.data?.phone,
      type: state?.data?.type,
      iswhatsapp: state?.data?.iswhatsapp,
      profilepicture: state?.data?.profilepicture,
    });
  }, [state]);

  /*** handleChange ***/

  const handleChange = (e) => {
    if (e.target.name == "profilepicture") {
      const url = URL.createObjectURL(e.target.files[0]);
      setAddContacts({
        ...addContacts,
        [e.target.name]: url,
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

  /*** handleSubmit ***/

  const handleSubmit = (e) => {
    e.preventDefault();
    if (state?.id != undefined) {
      const data = JSON.parse(localStorage.getItem("contacts"));
      const ascendingOrder = data?.sort((a, b) => (a.name > b.name ? 1 : -1));
      const one = ascendingOrder.filter(function (value, ind) {
        return ind != state.id;
      });
      localStorage.setItem("contacts", JSON.stringify(one));
      const storedData = JSON.parse(localStorage.getItem("contacts")) || [];
      storedData.push(addContacts);
      localStorage.setItem("contacts", JSON.stringify(storedData));
      toast.success("Successfully Updated");
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
    } else {
      toast.error("please select the contact to update");
    }
  };

  /*** handleCleare ***/

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
            <b className="text-center mt-2">Edit CONTACT FORM</b>
            <div className="row g-0">
              <div className="col-5 p-2">
                <img
                  src={
                    addContacts.profilepicture == ""
                      ? profile
                      : addContacts.profilepicture
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
                      <Col sm="8" className="mt-2 d-flex">
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
                          // value={addContacts.profilepicture}
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

export default EditContact;
