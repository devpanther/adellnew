import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { injectIntl } from "react-intl";
import { signUp } from "../_redux/authCrud";
import { Redirect } from 'react-router-dom'

const initialValues = {
  fullname: "",
  email: "",
  username: "",
  password: "",
  changepassword: "",
  acceptTerms: false,
};

class Registration extends Component {
  state = {
    email: '',
    password: '',
    fullName: '',
    specialty: '',
    mdcn: '',
    avatar: '',
    switch: 'Doctor'
  }
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.signUp(this.state)
  }
  // const { intl } = props;
  // const [loading, setLoading] = useState(false);
  // const RegistrationSchema = Yup.object().shape({
  //   fullname: Yup.string()
  //     .min(3, "Minimum 3 symbols")
  //     .max(50, "Maximum 50 symbols")
  //     .required(
  //       intl.formatMessage({
  //         id: "AUTH.VALIDATION.REQUIRED_FIELD",
  //       })
  //     ),
  //   email: Yup.string()
  //     .email("Wrong email format")
  //     .min(3, "Minimum 3 symbols")
  //     .max(50, "Maximum 50 symbols")
  //     .required(
  //       intl.formatMessage({
  //         id: "AUTH.VALIDATION.REQUIRED_FIELD",
  //       })
  //     ),
  //   username: Yup.string()
  //     .min(3, "Minimum 3 symbols")
  //     .max(50, "Maximum 50 symbols")
  //     .required(
  //       intl.formatMessage({
  //         id: "AUTH.VALIDATION.REQUIRED_FIELD",
  //       })
  //     ),
  //   password: Yup.string()
  //     .min(3, "Minimum 3 symbols")
  //     .max(50, "Maximum 50 symbols")
  //     .required(
  //       intl.formatMessage({
  //         id: "AUTH.VALIDATION.REQUIRED_FIELD",
  //       })
  //     ),
  //   changepassword: Yup.string()
  //     .required(
  //       intl.formatMessage({
  //         id: "AUTH.VALIDATION.REQUIRED_FIELD",
  //       })
  //     )
  //     .when("password", {
  //       is: (val) => (val && val.length > 0 ? true : false),
  //       then: Yup.string().oneOf(
  //         [Yup.ref("password")],
  //         "Password and Confirm Password didn't match"
  //       ),
  //     }),
  //   acceptTerms: Yup.bool().required(
  //     "You must accept the terms and conditions"
  //   ),
  // });

  // const enableLoading = () => {
  //   setLoading(true);
  // };

  // const disableLoading = () => {
  //   setLoading(false);
  // };

  // const getInputClasses = (fieldname) => {
  //   if (formik.touched[fieldname] && formik.errors[fieldname]) {
  //     return "is-invalid";
  //   }

  //   if (formik.touched[fieldname] && !formik.errors[fieldname]) {
  //     return "is-valid";
  //   }

  //   return "";
  // };

  // const formik = useFormik({
  //   initialValues,
  //   validationSchema: RegistrationSchema,
  //   onSubmit: (values, { setStatus, setSubmitting }) => {
  //     enableLoading();
  //     register(values.email, values.fullname, values.username, values.password)
  //       .then(({ data: { accessToken } }) => {
  //         props.register(accessToken);
  //         disableLoading();
  //       })
  //       .catch(() => {
  //         setSubmitting(false);
  //         setStatus(
  //           intl.formatMessage({
  //             id: "AUTH.VALIDATION.INVALID_LOGIN",
  //           })
  //         );
  //         disableLoading();
  //       });
  //   },
  // });
 
render(){
  const { auth, authError } = this.props;
    if (auth.uid) return <Redirect to='/' /> 
  return (
    <div className="login-form login-signin" style={{ display: "block" }}>
      
      <div className="text-center mb-10 mb-lg-20">
        <h3 className="font-size-h1">
          Sign Up as a Doctor
        </h3>
        <p className="text-muted font-weight-bold">
          Enter your details to create your account
        </p>
        
      </div>
       <form
        id="kt_login_signin_form"
        className="form fv-plugins-bootstrap fv-plugins-framework animated animate__animated animate__backInUp"
        onSubmit={this.handleSubmit}
      >
        {/* begin: Alert */}
        { authError ? <div className="mb-10 alert alert-custom alert-light-danger alert-dismissible">
            <div className="alert-text ">
              {authError}
            </div>
          </div> : null }
        {/* end: Alert */}

        {/* begin: Fullname */}
        <div className="form-group fv-plugins-icon-container">
          <input
            placeholder="Full name"
            type="text" id='fullName' onChange={this.handleChange}
            className={`form-control form-control-solid h-auto py-5 px-6`}
            name="fullname"

          />

        </div>
        {/* end: Fullname */}

        {/* avataR */}

        

        {/* avataR */} 

        {/* begin: Email */}
        <div className="form-group fv-plugins-icon-container">
          <input
            placeholder="Email"
            type="email" id='email' onChange={this.handleChange}
            className={`form-control form-control-solid h-auto py-5 px-6`}
            name="email"
          />
          
        </div>
        {/* end: Email */}


        {/* begin: Password */}
        <div className="form-group fv-plugins-icon-container">
          <input
            placeholder="Password"
            type="password" id='password' onChange={this.handleChange}
            className={`form-control form-control-solid h-auto py-5 px-6`}
            name="password"
          />
         
        </div>
        {/* end: Password */}

        {/* begin: Confirm Password */}
        {/* <div className="form-group fv-plugins-icon-container">
          <input
            placeholder="Confirm Password"
            type="password"
            className={`form-control form-control-solid h-auto py-5 px-6`}
            name="changepassword"
          />
          
        </div> */}
        {/* end: Confirm Password */}

        {/* begin: Fullname */}
        <div className="form-group fv-plugins-icon-container">
          <input
            placeholder="Specialty"
            type="text" id='specialty' onChange={this.handleChange}
            className={`form-control form-control-solid h-auto py-5 px-6`}
            name="specialty"
           
          />

        </div>
        {/* end: Fullname */}

        {/* begin: Fullname */}
        <div className="form-group fv-plugins-icon-container">
          <input
            placeholder="MDCN Reg No."
            type="text" id='mdcn' onChange={this.handleChange}
            className={`form-control form-control-solid h-auto py-5 px-6`}
            name="mdcn"
           
          />

        </div>
        {/* end: Fullname */}

        {/* begin: Terms and Conditions */}
        <div className="form-group">
          <label className="checkbox">
            <input
              type="checkbox"
              name="acceptTerms"
              className="m-1"
            />
            <Link to="/terms" target="_blank" className="mr-1" rel="noopener noreferrer">
            I agree the Terms & Conditions
            </Link>
            <span />
          </label>
         
        </div>
        {/* end: Terms and Conditions */}
        <div className="form-group d-flex flex-wrap flex-center">
          <button
            type="submit"
            className="btn btn-primary font-weight-bold px-9 py-4 my-3 mx-4"
          >
            <span>Submit</span>
            
          </button>

          <Link to="/auth/login">
            <button
              type="button"
              className="btn btn-light-primary font-weight-bold px-9 py-4 my-3 mx-4"
            >
              Go Back To Login
            </button>
          </Link>
        </div>
      </form>
    </div>
  )};
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

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(Registration));
