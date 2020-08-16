
import React from "react";
import ReactDOM from "react-dom";
import { PDFExport, savePDF } from "@progress/kendo-react-pdf";
import { Grid, GridColumn as Column } from "@progress/kendo-react-grid";
import {toAbsoluteUrl} from "../../../../_metronic/_helpers";
import { FormattedMessage, injectIntl } from "react-intl";
import { connect } from "react-redux";
import './pdf.css';
import Fab from '@material-ui/core/Fab';
import { login, signUp } from "../_redux/authCrud";
import firebase from '../../config/fbConfig'
import { drawDOM, exportPDF } from '@progress/kendo-drawing';

const labelContent = e => e.category;
let body;
const initialValues = {
    fullname: "",
    email: "",
    username: "",
    password: "",
    changepassword: "",
    acceptTerms: false,
  };

class generatePDF extends React.Component {
    constructor() {
        super();
        this.state = {
            values: '',
            type: '',
            email: '',
            password: '',
            fullName: '',
            switch: 'Patient',
            mdcn: '',
            specialty: ''
        };
      }

      handleSubmit = () => {
        this.props.signUp(this.state)
      }

      componentDidMount(){
          this.setState({values: this.props.location.state.key})
          this.setState({type: this.props.location.state.type})
          this.setState({email: this.props.location.state.key.email})
          this.setState({password: this.props.location.state.key.password})
          this.setState({fullName: `${this.props.location.state.key.firstName} ${this.props.location.state.key.Surname} ${this.props.location.state.key.otherName}`})
          this.setState({switch: this.props.location.state.type})
      }

    render() {
        console.log(this.state)
        
        if (this.state.values.firstName) {

            let body1 = (
            <div>
            <div className="text-center">
            <img
                alt="Logo"
                className="max-h-120px text-center"
                src={toAbsoluteUrl("/media/roth.jpg")}
            />
            </div>
            <h4>FAMILY ENROLLMENT FORM</h4>
            <table className="pdf">
                <thead>
                <tr>
                    <th>Principal Member Passport</th>
                    <th>Spouse Passport</th>
                    <th>Child 1 Passport</th>
                    <th>Child 2 Passport</th>
                    <th>Child 3 Passport</th>
                    <th>Child 4 Passport</th>
                </tr>
            </thead>
           </table>
           <p><span style={{fontWeight: 'bold', fontStyle: 'italic'}}>NOTE:</span> kindly affix recent photographs, following sequence as stated.</p>
           <div style={{fontSize: '12px'}}>
            <div className="row d-flex justify-content-between">
                <div className="col-7">
                    <p>Company Name: <span style={{textDecoration: 'underline' }}>{this.state.values.company}</span></p>
                </div>
                <div className="col-5">
                <p>Staff ID/Number: <span style={{textDecoration: 'underline' }}>{this.state.values.staffID}</span></p>
                </div>
            </div>
            <div className="row d-flex justify-content-between">
                <div className="col-5"><p>Enrollee Name: Surname <span style={{textDecoration: 'underline' }}>{this.state.values.Surname}</span></p></div>
                <div className="col-3"><p>First Name: <span style={{textDecoration: 'underline' }}>{this.state.values.firstName}</span></p></div>
                <div className="col-4"><p>Other Name: <span style={{textDecoration: 'underline' }}>{this.state.values.otherName}</span></p></div>
            </div>
            <div className="row d-flex justify-content-between">
                <div className="col-4"><p>Birth Date (DD/MM/YYYY): <span style={{textDecoration: 'underline' }}>{this.state.values.dob.toLocaleString()}</span></p></div>
                <div className="col-3"><p>Religion: <span style={{textDecoration: 'underline' }}>{this.state.values.Religion}</span></p></div>
                <div className="col-4"><p>Marital Status: <span style={{textDecoration: 'underline' }}>{this.state.values.Marital}</span></p></div>
                <div className="col-1"><p>Sex: <span style={{textDecoration: 'underline' }}>{this.state.values.gender}</span></p></div>
            </div>
            <div className="row d-flex justify-content-between">
                <div className="col-3"><p>Job Title: <span style={{textDecoration: 'underline' }}>{this.state.values.company}</span></p></div>
                <div className="col-5"><p>Mobile No: (1) <span style={{textDecoration: 'underline' }}>{this.state.values.mobileNo1}</span></p></div>
                <div className="col-4"><p>(2) <span style={{textDecoration: 'underline' }}>{this.state.values.mobileNo2}</span></p></div>
            </div>
            <div>
                <p>Residential Address: <span style={{textDecoration: 'underline' }}>{this.state.values.Address}</span></p>
            </div>
            <div className="row d-flex justify-content-between">
                <div className="col-5"><p>Email: <span style={{textDecoration: 'underline' }}>{this.state.values.email}</span></p></div>
                <div className="col-4"><p>Health Plan type: __________</p></div>
                <div className="col-3"><p> Genotype &amp; Blood Group: <span style={{textDecoration: 'underline' }}>{this.state.values.Genotype}</span></p></div>
            </div>
            <div>
                <p>Choice of Hospital: <span style={{textDecoration: 'underline' }}>{this.state.values.Hospital}</span></p>
            </div>
            <div>
                <p>State any Pre-Existing Medical Condition (Diabetics, Hypertension, Sickle cell, Cancer, Kidney Issue, Other…) : <span style={{textDecoration: 'underline' }}>{this.state.values.medical}</span></p>
            </div>
            <div >
                <p style={{fontWeight: 'bold'}}>DECLARATION</p>
                <p>I, <span style={{fontWeight: 'bold'}}>{`${this.state.values.Surname}  ${this.state.values.firstName}  ${this.state.values.otherName} `}</span>the assured, do hereby declare</p>
                <p>that all the foregoing answers are true, that I have not concealed nor withheld anything with which the assurer should be acquainted</p>
                <p>with in order to assess my eligibility for health insurance. Are there any additional facts affecting the risk of assurance</p>
                <p>on your health of which the company should be made aware? Yes_____ No ______ If Yes, State details:  ___________</p>
            </div>
            <p>I agree that these and all statements I have made or shall make to the assurer or to its medical examiner(s) in connection with this or
 previous proposal(s) shall be the basis of this contract.</p>
            <div className="row">
                <div className="col-6">
                    <div>
                    Client Signature ________________________________________ 
                    </div>
                </div>
                <div className="col-6">
                    <div>
                    Date: {new Date().toLocaleString()}
                    </div>
                </div>
            </div>
            <h3>ROTHAUGE HEALTHCARE LIMITED</h3>
        </div>
        </div>);
 
        let body2 = (<div>
        <div className="text-center">
        <img
            alt="Logo"
            className="max-h-120px text-center"
            src={toAbsoluteUrl("/media/roth.jpg")}
        />
        </div>
        <h4>FAMILY ENROLLMENT FORM</h4>
        <table className="pdf">
            <thead>
            <tr>
                <th>Principal Member Passport</th>
                <th>Spouse’s Passport</th>
                <th>Child 1 Passport</th>
                <th>Child 2 Passport</th>
                <th>Child 3 Passport</th>
                <th>Child 4 Passport</th>
            </tr>
        </thead>
       </table>
       <p><span style={{fontWeight: 'bold', fontStyle: 'italic'}}>NOTE:</span> kindly affix recent photographs, following sequence as stated.</p>
       <div style={{fontSize: '12px'}}>
        <div className="row d-flex justify-content-between">
            <div className="col-7">
                <p>Company Name: <span style={{textDecoration: 'underline' }}>{this.state.values.company}</span></p>
            </div>
            <div className="col-5">
            <p>Staff ID/Number: <span style={{textDecoration: 'underline' }}>{this.state.values.staffID}</span></p>
            </div>
        </div>
        <div className="row d-flex justify-content-between">
            <div className="col-5"><p>Enrollee Name: Surname <span style={{textDecoration: 'underline' }}>{this.state.values.Surname}</span></p></div>
            <div className="col-3"><p>First Name: <span style={{textDecoration: 'underline' }}>{this.state.values.firstName}</span></p></div>
            <div className="col-4"><p>Other Name: <span style={{textDecoration: 'underline' }}>{this.state.values.otherName}</span></p></div>
        </div>
        <div className="row d-flex justify-content-between">
            <div className="col-4"><p>Birth Date (DD/MM/YYYY): <span style={{textDecoration: 'underline' }}>{this.state.values.dob.toLocaleString()}</span></p></div>
            <div className="col-3"><p>Religion: <span style={{textDecoration: 'underline' }}>{this.state.values.Religion}</span></p></div>
            <div className="col-4"><p>Marital Status: <span style={{textDecoration: 'underline' }}>{this.state.values.Marital}</span></p></div>
            <div className="col-1"><p>Sex: <span style={{textDecoration: 'underline' }}>{this.state.values.gender}</span></p></div>
        </div>
        <div className="row d-flex justify-content-between">
            <div className="col-3"><p>Job Title: <span style={{textDecoration: 'underline' }}>{this.state.values.company}</span></p></div>
            <div className="col-5"><p>Mobile No: (1) <span style={{textDecoration: 'underline' }}>{this.state.values.mobileNo1}</span></p></div>
            <div className="col-4"><p>(2) <span style={{textDecoration: 'underline' }}>{this.state.values.mobileNo2}</span></p></div>
        </div>
        <div>
            <p>Residential Address: <span style={{textDecoration: 'underline' }}>{this.state.values.Address}</span></p>
        </div>
        <div className="row d-flex justify-content-between">
            <div className="col-5"><p>Email: <span style={{textDecoration: 'underline' }}>{this.state.values.email}</span></p></div>
            <div className="col-4"><p>Health Plan type: __________</p></div>
            <div className="col-3"><p> Genotype &amp; Blood Group: <span style={{textDecoration: 'underline' }}>{this.state.values.Genotype}</span></p></div>
        </div>
        <div>
            <p>Choice of Hospital: <span style={{textDecoration: 'underline' }}>{this.state.values.Hospital}</span></p>
        </div>
        <div>
            <p>State any Pre-Existing Medical Condition (Diabetics, Hypertension, Sickle cell, Cancer, Kidney Issue, Other…) : <span style={{textDecoration: 'underline' }}>{this.state.values.medical}</span></p>
        </div>
        <div>
            <p style={{fontWeight: 'bold'}}>Dependents Details</p>
        </div>
        <div className="row">
            <div className="col-6">
            <div>
                <p style={{fontWeight: 'bold'}}>SPOUSE</p>
                <div>
                    <p>Full Name: <span style={{textDecoration: 'underline' }}>{this.state.values.spouseName}</span></p>
                </div>
                <div style={{display: 'flex'}}>
                    <p>Birth Date (DD/MM/YYYY): <span style={{textDecoration: 'underline' }}>{this.state.values.spouseDob.toLocaleString()}</span></p>
                    <p>Sex: <span style={{textDecoration: 'underline' }}>{this.state.values.spouseGender}</span></p>
                </div>
                <div>
                    <p>Choice of Hospital: <span style={{textDecoration: 'underline' }}>{this.state.values.spouseHospital}</span></p>
                </div>
                <div>
                    <p>Pre-existing conditions: <span style={{textDecoration: 'underline' }}>{this.state.values.spouseMedical}</span></p>
                </div>
                <div>
                    <p>Occupation: <span style={{textDecoration: 'underline' }}>{this.state.values.spouseOccupation}</span></p>
                </div>
                <div>
                    <p>Telephone No: <span style={{textDecoration: 'underline' }}>{this.state.values.spouseMobileNo}</span></p>
                </div>
            </div>
            </div>
            <div className="col-6">
            <div>
                <p style={{fontWeight: 'bold'}}>CHILD 1</p>
                <div>
                    <p>Full Name: <span style={{textDecoration: 'underline' }}>{this.state.values.childName}</span></p>
                </div>
                <div className="row">
                    <p className="col-6">Birth Date (DD/MM/YYYY): <span style={{textDecoration: 'underline' }}>{this.state.values.childDob.toLocaleString()}</span></p>
                    <p className="col-6">Sex: <span style={{textDecoration: 'underline' }}>{this.state.values.childGender}</span></p>
                </div>
                <div>
                    <p>Choice of Hospital: <span style={{textDecoration: 'underline' }}>{this.state.values.childHospital}</span></p>
                </div>
                <div>
                    <p>Pre-existing conditions: <span style={{textDecoration: 'underline' }}>{this.state.values.childMedical}</span></p>
                </div>
                <div>
                    <p>Telephone No: <span style={{textDecoration: 'underline' }}>{this.state.values.childMobileNo}</span></p>
                </div>
            </div>
            </div>
        </div>
        
        <div className="row">
            <div className="col-6">
            <div>
                <p style={{fontWeight: 'bold'}}>CHILD 2</p>
                <div>
                    <p>Full Name: <span style={{textDecoration: 'underline' }}>{this.state.values.child2Name}</span></p>
                </div>
                <div className="row">
                    <p className="col-6">Birth Date (DD/MM/YYYY): <span style={{textDecoration: 'underline' }}>{this.state.values.child2Dob.toLocaleString()}</span></p>
                    <p className="col-6">Sex: <span style={{textDecoration: 'underline' }}>{this.state.values.child2Gender}</span></p>
                </div>
                <div>
                    <p>Choice of Hospital: <span style={{textDecoration: 'underline' }}>{this.state.values.child2Hospital}</span></p>
                </div>
                <div>
                    <p>Pre-existing conditions: <span style={{textDecoration: 'underline' }}>{this.state.values.child2Medical}</span></p>
                </div>
                <div>
                    <p>Telephone No: <span style={{textDecoration: 'underline' }}>{this.state.values.child2MobileNo}</span></p>
                </div>
            </div>
            </div>
            <div className="col-6">
            <div>
                <p style={{fontWeight: 'bold'}}>CHILD 3</p>
                <div>
                    <p>Full Name: <span style={{textDecoration: 'underline' }}>{this.state.values.child3Name}</span></p>
                </div>
                <div className="row">
                    <p className="col-6">Birth Date (DD/MM/YYYY): <span style={{textDecoration: 'underline' }}>{this.state.values.child3Dob.toLocaleString()}</span></p>
                    <p className="col-6">Sex: <span style={{textDecoration: 'underline' }}>{this.state.values.child3Gender}</span></p>
                </div>
                <div>
                    <p>Choice of Hospital: <span style={{textDecoration: 'underline' }}>{this.state.values.child3Hospital}</span></p>
                </div>
                <div>
                    <p>Pre-existing conditions: <span style={{textDecoration: 'underline' }}>{this.state.values.child3Medical}</span></p>
                </div>
                <div>
                    <p>Telephone No: <span style={{textDecoration: 'underline' }}>{this.state.values.child3MobileNo}</span></p>
                </div>
            </div>
            </div>
        </div>
 
        <div className="row">
            <div className="col-6">
            <div>
                <p style={{fontWeight: 'bold'}}>CHILD 4</p>
                <div>
                    <p>Full Name: <span style={{textDecoration: 'underline' }}>{this.state.values.child4Name}</span></p>
                </div>
                <div className="row">
                    <p className="col-6">Birth Date (DD/MM/YYYY): <span style={{textDecoration: 'underline' }}>{this.state.values.child4Dob.toLocaleString()}</span></p>
                    <p className="col-6">Sex: <span style={{textDecoration: 'underline' }}>{this.state.values.child4Gender}</span></p>
                </div>
                <div>
                    <p>Choice of Hospital: <span style={{textDecoration: 'underline' }}>{this.state.values.child4Hospital}</span></p>
                </div>
                <div>
                    <p>Pre-existing conditions: <span style={{textDecoration: 'underline' }}>{this.state.values.child4Medical}</span></p>
                </div>
                <div>
                    <p>Telephone No: <span style={{textDecoration: 'underline' }}>{this.state.values.child4MobileNo}</span></p>
                </div>
            </div>
            </div>
            <div className="col-6">
            <div>
                <p style={{fontWeight: 'bold'}}>DECLARATION</p>
                <p>I, <span style={{fontWeight: 'bold'}}>{`${this.state.values.Surname}  ${this.state.values.firstName}  ${this.state.values.otherName} `}</span>the assured, do hereby declare</p>
                <p>that all the foregoing answers are true, that I have not concealed</p>
                <p>nor withheld anything with which the assurer should be acquainted</p>
                <p>with in order to assess my eligibility for health insurance.</p>
                <p>Are there any additional facts affecting the risk of assurance</p>
                <p>on your health of which the company should be made aware?</p>
                <p>Yes_____ No ______ If Yes, State details:  ___________</p>
            </div>
            </div>
        </div>
        <p>I agree that these and all statements I have made or shall make to the assurer or to its medical examiner(s) in connection with this or
 previous proposal(s) shall be the basis of this contract.</p>
        <div className="row">
            <div className="col-6">
                <div>
                Client Signature ________________________________________ 
                </div>
            </div>
            <div className="col-6">
                <div>
                Date: {new Date().toLocaleString()}
                </div>
            </div>
        </div>
        <h3>ROTHAUGE HEALTHCARE LIMITED</h3>
    </div>
    </div>);
 
     if(this.state.type === 'individual'){
         body = body1
     }else{
         body = body2
     }
    
    return (
        <div>
            <div className="border rounded p-2">

            </div>
            <div className="example-config" style={{textAlign: 'center', marginTop: '10px'}}>
                <Fab variant="extended" color="secondary" aria-label="Add" style={{padding: '0 80px'}} onClick={this.exportPDFWithMethod}>
                    Sign Up
                </Fab>
            </div>
        </div>
    );
}
}

exportPDFWithMethod = () => {
    // savePDF(ReactDOM.findDOMNode(this.container), {
    //     paperSize: "auto",
    //     margin: 40,
    //     fileName: `Report for ${new Date().getFullYear()}`
    // })
    drawDOM(ReactDOM.findDOMNode(this.container), { 
        paperSize: "A2",
        margin: 100,
        fileName: `Application Form for ${this.state.values.firstName} ${this.state.values.Surname}`
        }).then((group) => {
        return exportPDF(group);
    }).then((dataUri) => {
        // Create a root reference
        var storageRef = firebase.storage().ref();

        // Create a reference to 'mountains.jpg'
        var pdfRef = storageRef.child(`PDF/Application Form for ${this.state.values.firstName} ${this.state.values.Surname}.pdf`);

        pdfRef.putString(dataUri.split(';base64,')[1], 'base64').then(function(snapshot) {
            console.log('Uploaded PDF');
        });
        this.handleSubmit()
    });
    };

}

const mapStateToProps = (state) => {
    return {
      auth: state.firebase.auth,
      authError: state.auth.authError
    }
  }
  
  const mapDispatchToProps = (dispatch)=> {
    return {
      signUp: (creds) => dispatch(signUp(creds))
    }
  }
  
export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(generatePDF));