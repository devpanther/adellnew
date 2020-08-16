import React from 'react';
import styles from './styles';
import { connect } from 'react-redux'
import DoneAllIcon from '@material-ui/icons/DoneAll';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { withStyles } from '@material-ui/core/styles';
const firebase = require("firebase");

class ChatViewComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
    };
  }

  render() {
    // get users remove present user and return other user
    let array = this.props.chat.users
    const index = array.indexOf(this.props.profile.email);
    if (index > -1) {
      array.splice(index, 1);
    }

    firebase
    .firestore()
    .collection('users')
    .where('email', '==', array[0])
    .onSnapshot(async res => {
      const chats = res.docs.map(_doc => _doc.data());
      chats.slice(0).reverse().map(
        messageItem => (
          this.setState({name: messageItem.fullName})
        ))
    })
    

    const { classes } = this.props;
    if(this.props.chat === undefined) {
      return(<main className={classes.content}></main>);
    } else if(this.props.chat !== undefined) {
      return(
        <div>
          <div style={{background: '#1b1b28',
            padding: '20px',
            height: '95px',
            position: 'fixed',
            display: 'flex',
            zIndex: '1', 
            width: '100%',
            top: '56px'}}>
            <div style={{margin: 'auto 20px', flexGrow: '1'}}>
              <h1 style={{fontWeight: 'bold', color: 'white'}}>{this.state.name}</h1>
            <p style={{color: 'white'}}>Oncologist {this.props.chat.receiverIsTyping ? 
            
            <svg style={{width: '20px'}} version="1.1" id="L5"  x="0px" y="0px"
              viewBox="0 0 100 100" enableBackground="new 0 0 0 0">
              <circle fill="#fff" stroke="none" cx="6" cy="50" r="6">
                <animateTransform 
                  attributeName="transform" 
                  dur="1s" 
                  type="translate" 
                  values="0 15 ; 0 -15; 0 15" 
                  repeatCount="indefinite" 
                  begin="0.1"/>
              </circle>
              <circle fill="#fff" stroke="none" cx="30" cy="50" r="6">
                <animateTransform 
                  attributeName="transform" 
                  dur="1s" 
                  type="translate" 
                  values="0 10 ; 0 -10; 0 10" 
                  repeatCount="indefinite" 
                  begin="0.2"/>
              </circle>
              <circle fill="#fff" stroke="none" cx="54" cy="50" r="6">
                <animateTransform 
                  attributeName="transform" 
                  dur="1s" 
                  type="translate" 
                  values="0 5 ; 0 -5; 0 5" 
                  repeatCount="indefinite" 
                  begin="0.3"/>
              </circle>
            </svg>
            : null}</p>
            
            </div>
            <ArrowBackIcon onClick={this.props.action} style={{flexGrow: '1', fontSize: '30px', margin: 'auto', color: 'white', cursor: 'pointer'}}/>
          </div>
          <main id='chatview-container' className={classes.content}>
            {
              this.props.chat.messages.map((_msg, _index) => {
                let messagePosition = (( _msg.sender === this.props.user ) ? 'chatApp__convMessageItem--right' : 'chatApp__convMessageItem--left');
                  return (
                      <div key={_index} className={"chatApp__convMessageItem " + messagePosition + " clearfix"}>
                          <img src={_msg.senderAvatar} alt={_msg.sender} className="chatApp__convMessageAvatar" />
                          <div className="chatApp__convMessageValue" dangerouslySetInnerHTML={{__html: _msg.message}}></div>
                      </div>
                  );
              })
            }
          </main>
        </div>
      );
    } else {
      return (<div className='chatview-container'>Loading...</div>);
    }
  }
}

const mapStateToProps = (state) => {
  return{
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  }
}

export default connect(mapStateToProps)(withStyles(styles)(ChatViewComponent))