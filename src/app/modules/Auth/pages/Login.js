import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { FormattedMessage, injectIntl } from "react-intl";
import { signIn } from "../_redux/authCrud";
import { Redirect } from 'react-router-dom'
/*
  INTL (i18n) docs:
  https://github.com/formatjs/react-intl/blob/master/docs/Components.md#formattedmessage
*/

/*
  Formik+YUP:
  https://jaredpalmer.com/formik/docs/tutorial#getfieldprops
*/

const initialValues = {
  email: "admin@demo.com",
  password: "demo",
};


class Login extends Component {

  state = {
    email: '',
    password: '',
    loading: false
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.signIn(this.state)
      this.setState({
      loading: true
      })
  }

  // const { intl } = props;
  // const [loading, setLoading] = useState(false);
  // const LoginSchema = Yup.object().shape({
  //   email: Yup.string()
  //     .email("Wrong email format")
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
  //   validationSchema: LoginSchema,
  //   onSubmit: (values, { setStatus, setSubmitting }) => {
  //     enableLoading();
  //     setTimeout(() => {
  //       // login(values.email, values.password)
  //       //   .then(({ data: { accessToken } }) => {
  //       //     disableLoading();
  //       //     props.login(accessToken);
  //       //   })
  //       //   .catch(() => {
  //       //     disableLoading();
  //       //     setSubmitting(false);
  //       //     setStatus(
  //       //       intl.formatMessage({
  //       //         id: "AUTH.VALIDATION.INVALID_LOGIN",
  //       //       })
  //       //     );
  //       //   });
        
  //       const state = {
  //         email: values.email,
  //         password: values.password
  //       }
  //       console.log(state)
  //       signIn(state)
  //     }, 1000);
  //   },
  // });
render(){
  const {loading} = this.state
  const { authError, auth } = this.props;
    if (auth.uid) return <Redirect to='/' />
  return (
    <div className="login-form login-signin" id="kt_login_signin_form">
      {/* begin::Head */}
      <div className="text-center mb-10 mb-lg-20">
        <h3 className="font-size-h1">
          <FormattedMessage id="AUTH.LOGIN.TITLE" />
        </h3>
        <p className="text-muted font-weight-bold">
          Enter your username and password
        </p>
      </div>
      {/* end::Head */}

      {/*begin::Form*/}
      <form
      
        onSubmit={this.handleSubmit}
        className="form fv-plugins-bootstrap fv-plugins-framework"
      >

          
          { authError ? <div className="mb-10 alert alert-custom alert-light-danger alert-dismissible">
            <div className="alert-text ">
              {authError}
            </div>
          </div> : null }

        <div className="form-group fv-plugins-icon-container">
          <input
            placeholder="Email"
            className={`form-control form-control-solid h-auto py-5 px-6 `}
            name="email"
            type="email" id='email' onChange={this.handleChange}
          />
 
        </div>
        <div className="form-group fv-plugins-icon-container">
          <input
            placeholder="Password"
            type="password" id='password' onChange={this.handleChange}
            className={`form-control form-control-solid h-auto py-5 px-6`}
            name="password"
          />
          
        </div>
        <div className="form-group d-flex flex-wrap justify-content-between align-items-center">
          <Link
            to="/auth/forgot-password"
            className="text-dark-50 text-hover-primary my-3 mr-2"
            id="kt_login_forgot"
          >
            <FormattedMessage id="AUTH.GENERAL.FORGOT_BUTTON" />
          </Link>
          <button
            id="kt_login_signin_submit"
            type="submit"
            className={`btn btn-primary font-weight-bold px-9 py-4 my-3`}
          >
            <span>Sign In</span>
            {loading && !authError && <span className="ml-3 spinner spinner-white"></span>}
          </button>
        </div>
      </form>
      {/*end::Form*/}
    </div>
  )};
}

const mapStateToProps = (state) => {
  return{
    authError: state.auth.authError,
    auth: state.firebase.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (creds) => dispatch(signIn(creds))
  }
}

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(Login));
