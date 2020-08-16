/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React, {useState} from "react";
import { Nav, Tab } from "react-bootstrap";
import SVG from "react-inlinesvg";
import {toAbsoluteUrl} from "../../../_helpers";
import { connect } from 'react-redux';
import firebase from 'firebase';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import swal from 'sweetalert';


function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 45 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 300,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function AdvanceTablesWidget2({ className, profile, auth }) {
  const [key, setKey] = useState("Month");
  const initialFormData = Object.freeze({
    name: "",
    email: "",
    phone: "",
    relationship: ""
  });
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [formData, updateFormData] = React.useState(initialFormData);

  const handleChange = (e) => {
    updateFormData({
      ...formData,

      // Trimming any whitespace
      [e.target.name]: e.target.value.trim()
    });
  };

  const addUser = (e) => {
    e.preventDefault();
    if(formData.name === "" && formData.email === "" && formData.phone === ""){
      
    }else{
      firebase
    .firestore()
    .collection('users')
    .doc(auth.uid)
    .update({ members: 
      firebase.firestore.FieldValue.arrayUnion({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        relationship: formData.relationship
      })
    })
    setOpen(false);
    }
    console.log(formData);
  }

  const handleOpen = (membe, id) => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const completeClick = (membe, id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this card!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        firebase.firestore().collection('users')
        .doc(auth.uid)
        .update({
          capital: firebase.firestore.FieldValue.delete()
        });
        swal("Your card has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Your card is safe!");
      }
    });
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
       <div className="text-center mb-10 mb-lg-20">
        <h3 className="font-size-h1">
          Add Members
        </h3>
        <p className="text-muted font-weight-bold">
          Enter details to add your family member
        </p>
        </div>
      <form
        id="kt_login_signin_form"
        onSubmit={addUser}
        className="form fv-plugins-bootstrap fv-plugins-framework animated animate__animated animate__backInUp"
      >
      {/* begin: Email */}
      <div className="form-group fv-plugins-icon-container">
          <input
            placeholder="Name"
            type="text" id='name'
            onChange={handleChange}
            className={`form-control form-control-solid h-auto py-5 px-6`}
            name="name"
          />
          
        </div>
        {/* end: Email */}


        {/* begin: Password */}
        <div className="form-group fv-plugins-icon-container">
          <input
            placeholder="Email"
            type="email" id='email'
            onChange={handleChange}
            className={`form-control form-control-solid h-auto py-5 px-6`}
            name="email"
          />
         
        </div>

         {/* begin: Phone Number */}
         <div className="form-group fv-plugins-icon-container">
          <input
            placeholder="Phone Number"
            type="phone" id='phone'
            onChange={handleChange}
            className={`form-control form-control-solid h-auto py-5 px-6`}
            name="phone"
          />
         
        </div>

         {/* begin: Relationship */}
         <div className="form-group fv-plugins-icon-container">
          <input
            placeholder="Relationship"
            type="relationship" id='relationship'
            onChange={handleChange}
            className={`form-control form-control-solid h-auto py-5 px-6`}
            name="relationship"
          />
         
        </div>
        <button
            type="submit"
            className="btn btn-primary font-weight-bold px-9 py-4 my-3 mx-4"
          >
            <span>Submit</span>
            
          </button>
        </form>
        {/* end: Password */}
    </div>
  );

  
  return (
    <div className={`card card-custom ${className}`}>
      {/* Head */}
      <div className="card-header border-0 pt-5">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label font-weight-bolder text-dark">
            Family Members
          </span>
          <span className="text-muted mt-3 font-weight-bold font-size-sm">
            You can add 3 new members
          </span>
        </h3>
        {/* <div className="card-toolbar">
          <Tab.Container defaultActiveKey={key}>
            <Nav
              as="ul"
              onSelect={_key => setKey(_key)}
              className="nav nav-pills nav-pills-sm nav-dark-75"
            >
              <Nav.Item className="nav-item" as="li">
                <Nav.Link
                  eventKey="Month"
                  className={`nav-link py-2 px-4 ${
                    key === "Month" ? "active" : ""
                  }`}
                >
                  Month
                </Nav.Link>
              </Nav.Item>
              <Nav.Item className="nav-item" as="li">
                <Nav.Link
                  eventKey="Week"
                  className={`nav-link py-2 px-4 ${
                    key === "Week" ? "active" : ""
                  }`}
                >
                  Week
                </Nav.Link>
              </Nav.Item>
              <Nav.Item className="nav-item" as="li">
                <Nav.Link
                  eventKey="Day"
                  className={`nav-link py-2 px-4 ${
                    key === "Day" ? "active" : ""
                  }`}
                >
                  Day
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Tab.Container>
        </div> */}
      </div>
      {/* Body */}
      <div className="card-body pt-3 pb-0">
        <div className="table-responsive">
          <table className="table table-borderless table-vertical-center">
            <thead>
              <tr>
                <th className="p-0" style={{ width: "50px" }} />
                <th className="p-0" style={{ minWidth: "500px" }} />
                <th className="p-0" style={{ minWidth: "75px" }} />
              </tr>
            </thead>
            <tbody>
              {profile.members ? 
                  profile.members.map((membe, id) => (
                      <tr>
                        <td className="pl-0 py-4">
                          <div className="symbol symbol-50 symbol-light mr-1">
                            <span className="symbol-label">
                              <SVG
                                src={toAbsoluteUrl("/media/svg/misc/006-plurk.svg")}
                                className="h-50 align-self-center"
                              ></SVG>
                            </span>
                          </div>
                        </td>
                        <td className="pl-0">
                          <a
                            href="#"
                            className="text-dark-75 font-weight-bolder text-hover-primary mb-1 font-size-lg"
                          >
                            {membe.name}
                          </a>
                          <div>
                            <span className="font-weight-bolder">Relationship: </span>{" "}
                            <a
                              className="text-muted font-weight-bold text-hover-primary"
                              href="#"
                            >
                              {membe.relationship}
                            </a>
                          </div>
                        </td>
                        {/* <td className="text-right">
                          <span className="text-dark-75 font-weight-bolder d-block font-size-lg">
                            $2,000,000
                          </span>
                          <span className="text-muted font-weight-bold">Paid</span>
                        </td> */}
                        {/* <td className="text-right">
                          <span className="text-muted font-weight-500">
                            ReactJs, HTML
                          </span>
                        </td> */}
                        
                        <td className="text-right pr-0">
                          <a onClick={handleOpen} href="#" className="btn btn-icon btn-light btn-sm mx-3">
                            <span className="svg-icon svg-icon-md svg-icon-primary">
                              <SVG
                                src={toAbsoluteUrl(
                                  "/media/svg/icons/Communication/Write.svg"
                                )}
                              ></SVG>
                            </span>
                          </a>
                          <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="simple-modal-title"
                            aria-describedby="simple-modal-description"
                          >
                            {body}
                          </Modal>
                          <a href="#" onClick={() => completeClick(membe, id)}  className="btn btn-icon btn-light btn-sm">
                            <span className="svg-icon svg-icon-md svg-icon-primary">
                              <SVG
                                src={toAbsoluteUrl(
                                  "/media/svg/icons/General/Trash.svg"
                                )}
                              ></SVG>
                            </span>
                          </a>
                        </td>
                      </tr>
                    )
                  ) : null}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return{
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  }
}

export default connect(mapStateToProps)(AdvanceTablesWidget2)