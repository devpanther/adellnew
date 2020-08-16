import React from "react";
import {Alert, Button} from "react-bootstrap";
import { connect } from 'react-redux'
import {
    MixedWidget14,
    ListsWidget9,
    StatsWidget11,
    StatsWidget12,
    ListsWidget1,
    AdvanceTablesWidget4,
    ListsWidget3,
    ListsWidget4,
    ListsWidget8
} from "../widgets";
import MixedWidget1 from '../widgets/mixed/MixedWidget1';
import AdvanceTablesWidget2 from '../widgets/advance-tables/AdvanceTablesWidget2';
function Demo1Dashboard(props) {
    const { auth, profile } = props;
    return (
    <div style={{padding: '20px'}}>
        {!auth.emailVerified ? <Alert variant="danger">
            <Alert.Heading>Your Email is not Verified!</Alert.Heading>
            <p>
                Please, Verify your Email Address so you can access the full functionality of AdellCare
            </p>
            </Alert> : null }
            <div className="row" >
 
                <div className="col-lg-6 col-xxl-4">
                    <MixedWidget14 className="card-stretch gutter-b" />
                </div>
                <div className="col-lg-6 col-xxl-4">
                <MixedWidget1 className="card-stretch gutter-b"/>
                </div>

                <div className="col-lg-6 col-xxl-4">
                <ListsWidget9 className="card-stretch gutter-b"/>
                </div>

                <div className="col-lg-6 col-xxl-4 order-1 order-xxl-1">
                    <ListsWidget1 className="card-stretch gutter-b"/>
                </div>
                <div className="col-xxl-8 order-2 order-xxl-1">
                    <AdvanceTablesWidget2 className="card-stretch gutter-b"/>
                </div>
                {/* <div className="col-lg-6 col-xxl-4 order-1 order-xxl-2">
                    <ListsWidget3 className="card-stretch gutter-b"/>
                </div>
                <div className="col-lg-6 col-xxl-4 order-1 order-xxl-2">
                    <ListsWidget4 className="card-stretch gutter-b"/>
                </div>
                <div className="col-lg-12 col-xxl-4 order-1 order-xxl-2">
                    <ListsWidget8 className="card-stretch gutter-b"/>
                </div> */}
            </div>
            {/* <div className="row">
                <div className="col-lg-8">
                    <AdvanceTablesWidget4 className="card-stretch gutter-b" />
                </div>
            </div> */}
    </div>
    );
}

const mapStateToProps = (state) => {
    // console.log(state);
    return{
      auth: state.firebase.auth,
      profile: state.firebase.profile
    }
  }
  
  export default connect(mapStateToProps)(Demo1Dashboard)