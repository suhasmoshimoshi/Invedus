import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../HomePage/HomePage.css";
import inveduslogo from "../../images/invedus-logo.png";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";

function HomePage() {
  const [showContact, setShowContact] = useState(false);
  const [contactList, setContactList] = useState([]);
  const [show, setShow] = useState(false);
  const [deleteID, setDeleteID] = useState("");
  const [reloadPage, setReloadPage] = useState(1);

  const handleClose = () => setShow(false);
  const navigation = useNavigate();

  useEffect(() => {
    const localData = JSON.parse(localStorage.getItem("contacts"));
    if (localData == null) {
      setShowContact(true);
    } else {
      setShowContact(false);
      const localData = JSON.parse(localStorage.getItem("contacts"));
      if (localData.length == 0) {
        setShowContact(true);
      } else {
        setShowContact(false);
        const ascendingOrder = localData?.sort((a, b) =>
          a.name > b.name ? 1 : -1
        );
        setContactList(ascendingOrder);
      }
    }
  }, [reloadPage]);

  /*** handleShowDelete  ***/

  const handleShowDelete = (id) => {
    setDeleteID(id);
    setShow(true);
  };

  /*** handleDelete  ***/

  const handleDelete = () => {
    const data = JSON.parse(localStorage.getItem("contacts"));
    const one = data.filter(function (value, ind) {
      return ind != deleteID;
    });
    localStorage.setItem("contacts", JSON.stringify(one));
    const updatedData = JSON.parse(localStorage.getItem("contacts"));
    setContactList(updatedData);
    setShow(false);
    setReloadPage(reloadPage + 1);
  };

  /*** handleUpdatew  ***/

  const handleUpdatew = (ele, id) => {
    const objectData = {
      data: ele,
      id: id,
    };
    navigation("/edit-contact", { state: objectData });
  };

  return (
    <div className="main-div">
      <div className="row g-0 p-3" style={{ backgroundColor: "#20b2aa" }}>
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
        <div>
          {showContact === true ? (
            <div className="row justify-content-center mt-5 text-center">
              <div className="card col-3 mt-5 p-5">
                <h5>“ no contacts saved ”</h5>
                <Link to="/add-contact">
                  <button className="btn btn-primary">Add Contact</button>
                </Link>
              </div>
            </div>
          ) : (
            <div className=" justify-content-center mt-5 text-center">
              <Link to="/add-contact">
                {" "}
                <Button type="button" className="btn btn-danger">
                  Add Contact
                </Button>
              </Link>
            </div>
          )}
        </div>
        <div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            {contactList.map((ele, ind) => {
              return (
                <div className="mt-4" style={{ margin: "auto" }}>
                  <div
                    className="card"
                    style={{
                      width: "450px",
                      height: "auto",
                      justifyContent: "center",
                      alignSelf: "auto",
                      padding: "5% 5%",
                    }}
                  >
                    <div className="row g-0">
                      <div className="col-md-6">
                        <img
                          src={ele.profilepicture}
                          width="100%"
                          height="156px"
                        />
                      </div>
                      <div className="col-md-6" style={{ paddingLeft: "6%" }}>
                        <div style={{ marginTop: "5px" }}>
                          <b>Name:</b> <b>{ele?.name}</b>
                        </div>
                        <div style={{ marginTop: "5px" }}>
                          <b>Phone:</b> <b>{ele?.phone}</b>
                        </div>{" "}
                        <div style={{ marginTop: "5px" }}>
                          <b>Type:</b> <b>{ele?.type}</b>
                        </div>{" "}
                        <div style={{ marginTop: "5px" }}>
                          <b>isWhatsapp:</b> <b>{ele?.iswhatsapp}</b>
                        </div>
                        <div style={{ marginTop: "5px" }}>
                          <Button
                            className="btn btn-primary"
                            onClick={() => handleUpdatew(ele, ind)}
                          >
                            Update
                          </Button>
                          <Button
                            className="btn btn-danger"
                            onClick={() => handleShowDelete(ind)}
                            style={{ marginLeft: "5px" }}
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Are You Confirm to Delete</Modal.Title>
          </Modal.Header>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              No
            </Button>
            <Button className="btn btn-danger" onClick={handleDelete}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default HomePage;
