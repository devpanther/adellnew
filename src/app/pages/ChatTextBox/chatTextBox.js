import React from 'react';
import TextField from '@material-ui/core/TextField';
import Send from '@material-ui/icons/Send';
import styles from './styles';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { withStyles } from '@material-ui/core/styles';
const firebase = require("firebase");


class ChatTextBoxComponent extends React.Component {

  constructor() {
    super();
    this.state = {
      chatText: '',
      isLoading: false
    };
  }

  componentDidMount(){
    
  }
  

  render() {
    
    let sendButtonIcon = <i className={"material-icons"}>send</i>;
    const { classes } = this.props;
    var loadingClass = this.state.isLoading ? 'chatApp__convButton--loading' : '';
    return(
      <div className={"chatApp__convSendMessage clearfix"}>
    
      <div style={{display: 'flex'}} className={classes.chatTextBoxContainer}>
          <input
              value={this.state.chatText}
              type="text"
              onChange={e => this.setState({chatText: e.target.value})}
              placeholder='Type your message..' 
              onKeyUp={(e) => this.userTyping(e)}
              className={"chatApp__convInput"}
              onFocus={this.userClickedInput}
              tabIndex="0"
          />
        <div className={'chatApp__convButton ' + loadingClass} onClick={this.submitMessage}>
                {sendButtonIcon}
                </div>
                <AddCircleIcon style={{ fontSize: '3rem', marginLeft: '10px' }}/>
        {/* <Send onClick={this.submitMessage} className={classes.sendBtn}></Send> */}
      </div>
      </div>
    );
  }

  buildDocKey = (friend) => [this.props.email, friend].sort().join(':');

  messageClicked = () => {
    const chatIndex = this.props.selectedChat;
    const docKey = this.buildDocKey(this.props.chats[chatIndex].users.filter(_usr => _usr !== this.props.email)[0]);
    if(this.state.chatText !== ''){
      firebase
      .firestore().collection(`chats`)
        .doc(docKey)
        .update({ receiverIsTyping: true });
		  }else{
        firebase
        .firestore().collection(`chats`)
        .doc(docKey)
        .update({ receiverIsTyping: false });
      }
    }
      
  userTyping = (e) => {
    if (e.keyCode === 13) {this.submitMessage()
    }else{
      this.setState({ chatText: e.target.value });
      this.messageClicked()
    }
  }
  messageValid = (txt) => txt && txt.replace(/\s/g, '').length;
  userClickedInput = () => this.props.userClickedInputFn();
  submitMessage = () => {
    if(this.messageValid(this.state.chatText)) {
      this.props.submitMessageFn(this.state.chatText);
      this.setState({chatText: ''})
      document.getElementsByClassName('chatApp__convInput').value = '';
    }
  }
  
}

export default withStyles(styles)(ChatTextBoxComponent);