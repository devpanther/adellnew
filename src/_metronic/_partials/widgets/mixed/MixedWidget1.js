/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React, {useMemo, useEffect} from "react";
import SVG from "react-inlinesvg";
import objectPath from "object-path";
import ApexCharts from "apexcharts";
import {Dropdown} from "react-bootstrap";
import {toAbsoluteUrl} from "../../../_helpers";
import {useHtmlClassService} from "../../../layout";
import {DropdownMenu2} from "../../dropdowns";
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import firebase from 'firebase';
import { connect } from 'react-redux'


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

function MixedWidget1({ className, auth }) {
  const initialFormData = Object.freeze({
    name: "",
    email: "",
    phone: "",
    relationship: ""
  });
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const uiService = useHtmlClassService();
  const [open, setOpen] = React.useState(false);
  const [formData, updateFormData] = React.useState(initialFormData);

  const handleChange = (e) => {
    updateFormData({
      ...formData,

      // Trimming any whitespace
      [e.target.name]: e.target.value.trim()
    });
  };

  const layoutProps = useMemo(() => {
    return {
      colorsGrayGray500: objectPath.get(
        uiService.config,
        "js.colors.gray.gray500"
      ),
      colorsGrayGray200: objectPath.get(
        uiService.config,
        "js.colors.gray.gray200"
      ),
      colorsGrayGray300: objectPath.get(
        uiService.config,
        "js.colors.gray.gray300"
      ),
      colorsThemeBaseDanger: objectPath.get(
        uiService.config,
        "js.colors.theme.base.danger"
      ),
      fontFamily: objectPath.get(uiService.config, "js.fontFamily")
    };
  }, [uiService]);


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


  useEffect(() => {
    const element = document.getElementById("kt_mixed_widget_1_chart");
    if (!element) {
      return;
    }

    const options = getChartOptions(layoutProps);

    const chart = new ApexCharts(element, options);
    chart.render();
    return function cleanUp() {
      chart.destroy();
    };
  }, [layoutProps]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
    <div className={`card card-custom bg-gray-100 ${className}`}>
      {/* Header */}
      <div className="card-header border-0 bg-danger py-5">
        <h3 className="card-title font-weight-bolder text-white">Stats</h3>
        {/* <div className="card-toolbar">
          <Dropdown className="dropdown-inline" drop="down" alignRight>
            <Dropdown.Toggle
              className="btn btn-transparent-white btn-sm font-weight-bolder dropdown-toggle px-5"
              variant="transparent"
              id="dropdown-toggle-top">
              Export
            </Dropdown.Toggle>
            <Dropdown.Menu className="dropdown-menu dropdown-menu-sm dropdown-menu-right">
              <DropdownMenu2 />
            </Dropdown.Menu>
          </Dropdown>
        </div> */}
      </div>
      {/* Body */}
      <div className="card-body p-0 position-relative overflow-hidden">
        {/* Chart */}
        <div
          id="kt_mixed_widget_1_chart"
          className="card-rounded-bottom bg-danger"
          style={{ height: "200px" }}
        ></div>

        {/* Stat */}
        <div className="card-spacer mt-n25">
          <div className="row m-0">
            {/* <div className="col bg-light-warning px-6 py-8 rounded-xl mr-7 mb-7">
              <span className="svg-icon svg-icon-3x svg-icon-warning d-block my-2">
                <SVG
                  src={toAbsoluteUrl("/media/svg/icons/Media/Equalizer.svg")}
                ></SVG>
              </span>
              <a
                href="#"
                className="text-warning font-weight-bold font-size-h6"
              >
                Weekly Sales
              </a>
            </div> */}
            
            <div className="col bg-light-primary px-6 py-8 rounded-xl mb-7" style={{marginTop: '120px'}} onClick={handleOpen}>
            <a
                href="#"
                className="text-primary font-weight-bold font-size-h6 mt-2"
              >
              <span className="svg-icon svg-icon-3x svg-icon-primary d-block my-2">
                <SVG
                  src={toAbsoluteUrl(
                    "/media/svg/icons/Communication/Add-user.svg"
                  )}
                ></SVG>
              </span>

                Add Family Member
                </a>
            </div>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
            >
              {body}
            </Modal>
          </div>
          {/* <div className="row m-0">
            <div className="col bg-light-danger px-6 py-8 rounded-xl mr-7">
              <span className="svg-icon svg-icon-3x svg-icon-danger d-block my-2">
                <SVG
                  src={toAbsoluteUrl("/media/svg/icons/Design/Layers.svg")}
                ></SVG>
              </span>
              <a
                href="#"
                className="text-danger font-weight-bold font-size-h6 mt-2"
              >
                Item Orders
              </a>
            </div>
            <div className="col bg-light-success px-6 py-8 rounded-xl">
              <span className="svg-icon svg-icon-3x svg-icon-success d-block my-2">
                <SVG
                  src={toAbsoluteUrl(
                    "/media/svg/icons/Communication/Urgent-mail.svg"
                  )}
                ></SVG>
              </span>
              <a
                href="#"
                className="text-success font-weight-bold font-size-h6 mt-2"
              >
                Bug Reports
              </a>
            </div>
          </div> */}
        </div>

        {/* Resize */}
        <div className="resize-triggers">
          <div className="expand-trigger">
            <div style={{ width: "411px", height: "461px" }} />
          </div>
          <div className="contract-trigger" />
        </div>
      </div>
    </div>
  );
}

function getChartOptions(layoutProps) {
  const strokeColor = "#D13647";

  const options = {
    series: [
      {
        name: "Net Profit",
        data: [30, 45, 32, 70, 40, 40, 40]
      }
    ],
    chart: {
      type: "area",
      height: 200,
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false
      },
      sparkline: {
        enabled: true
      },
      dropShadow: {
        enabled: true,
        enabledOnSeries: undefined,
        top: 5,
        left: 0,
        blur: 3,
        color: strokeColor,
        opacity: 0.5
      }
    },
    plotOptions: {},
    legend: {
      show: false
    },
    dataLabels: {
      enabled: false
    },
    fill: {
      type: "solid",
      opacity: 0
    },
    stroke: {
      curve: "smooth",
      show: true,
      width: 3,
      colors: [strokeColor]
    },
    xaxis: {
      categories: ["Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
      labels: {
        show: false,
        style: {
          colors: layoutProps.colorsGrayGray500,
          fontSize: "12px",
          fontFamily: layoutProps.fontFamily
        }
      },
      crosshairs: {
        show: false,
        position: "front",
        stroke: {
          color: layoutProps.colorsGrayGray300,
          width: 1,
          dashArray: 3
        }
      }
    },
    yaxis: {
      min: 0,
      max: 80,
      labels: {
        show: false,
        style: {
          colors: layoutProps.colorsGrayGray500,
          fontSize: "12px",
          fontFamily: layoutProps.fontFamily
        }
      }
    },
    states: {
      normal: {
        filter: {
          type: "none",
          value: 0
        }
      },
      hover: {
        filter: {
          type: "none",
          value: 0
        }
      },
      active: {
        allowMultipleDataPointsSelection: false,
        filter: {
          type: "none",
          value: 0
        }
      }
    },
    tooltip: {
      style: {
        fontSize: "12px",
        fontFamily: layoutProps.fontFamily
      },
      y: {
        formatter: function(val) {
          return "$" + val + " thousands";
        }
      },
      marker: {
        show: false
      }
    },
    colors: ["transparent"],
    markers: {
      colors: layoutProps.colorsThemeBaseDanger,
      strokeColor: [strokeColor],
      strokeWidth: 3
    }
  };
  return options;
}

const mapStateToProps = (state) => {
  return{
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  }
}

export default connect(mapStateToProps)(MixedWidget1)