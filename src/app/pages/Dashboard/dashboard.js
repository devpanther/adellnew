import React from 'react';
import { connect } from 'react-redux'
import NewChatComponent from '../NewChat/newChat';
import ChatListComponent from '../ChatList/chatList';
import ChatViewComponent from '../ChatView/chatView';
import ChatTextBoxComponent from '../ChatTextBox/chatTextBox';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import {Spinner} from "react-bootstrap";
import styles from './styles';
import './index.css'
import { Button, withStyles } from '@material-ui/core';
const firebase = require("firebase");



function rand() {
  return Math.round(Math.random() * 20) - 10;
}



// I need to investigate why sometimes
// two messages will send instead of just
// one. I dont know if there are two instances
// of the chat box component or what...

// I will be using both .then and async/await
// in this tutorial to give a feel of both.

class DashboardComponent extends React.Component {

  constructor() {
    super();
    this.state = {
      selectedChat: null,
      newChatFormVisible: false,
      email: null,
      friends: [],
      chats: [],
      open: true
    };
  }

  componentDidMount = () => {
    const container = document.getElementById('chatview-container');
    if(container)
      container.scrollTo(0, container.scrollHeight);
  }
  componentDidUpdate = () => {
    const container = document.getElementById('chatview-container');
    if(container)
      container.scrollTo(0, container.scrollHeight);
  }
  

  render() {

    const { classes } = this.props;
    // const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    // const [modalStyle] = React.useState(getModalStyle);
    // const [open, setOpen] = React.useState(false);
  
    const handleOpen = () => {
      this.setState({open : true})
    };

    const handler = () => {
      this.setState({selectedChat : null});
      this.getOut()
    }
    
    const handleClose = () => {
      this.setState({newChatFormVisible : false})
    };
    if(this.state.email) {
      return(
        <React.Fragment>
        <div className='dashboard-container' id='dashboard-container'>
          {this.state.selectedChat === null ? <ChatListComponent history={this.props.history} 
            userEmail={this.state.email} 
            selectChatFn={this.selectChat} 
            chats={this.state.chats} 
            selectedChatIndex={this.state.selectedChat}
            newChatBtnFn={this.newChatBtnClicked}>
          </ChatListComponent> : ''}
          
          <div style={{width: '100%'}}>
            {this.state.selectedChat === null ? '' : <div>
          {
            this.state.newChatFormVisible ? null : <ChatViewComponent 
              user={this.state.email}
              action={handler}
              chat={this.state.chats[this.state.selectedChat]}>
            </ChatViewComponent>
          }
          { 
            this.state.selectedChat !== null && !this.state.newChatFormVisible ? <ChatTextBoxComponent email={this.state.email} chats={this.state.chats} email={this.state.email} selectedChat={this.state.selectedChat} userClickedInputFn={this.messageRead} submitMessageFn={this.submitMessage}></ChatTextBoxComponent> : null 
          }</div>}
            
          </div>
          {
            this.state.newChatFormVisible ? 
                <React.Fragment>
                <Modal
                  open={this.state.open}
                  onClose={handleClose}
                  className='gfhfh'
                  aria-labelledby="simple-modal-title"
                  aria-describedby="simple-modal-description"
                >
                <NewChatComponent goToChatFn={this.goToChat} newChatSubmitFn={this.newChatSubmit}></NewChatComponent>
                </Modal></React.Fragment>
             : null
          }
        </div></React.Fragment>
      );
    } else {
      return(  <Spinner animation="border" variant="primary" />
      );
    }
  }

  signOut = () => firebase.auth().signOut();

  submitMessage = (msg) => {
    const docKey = this.buildDocKey(this.state.chats[this.state.selectedChat]
      .users
      .filter(_usr => _usr !== this.state.email)[0])
    firebase
      .firestore()
      .collection('chats')
      .doc(docKey)
      .update({
        messages: firebase.firestore.FieldValue.arrayUnion({
          sender: this.state.email,
          senderAvatar: this.props.profile.avatar,
          message: msg,
          timestamp: Date.now()
        }),
        receiverHasRead: false,
        receiverIsTyping: false
      }).then(()=>{
        console.log("Data saved successfully.");
      }).catch((error)=> {
        console.log("Data could not be saved." + error);
      });
  }

  getOut = () => {
    const chatIndex = this.state.selectedChat;
      const docKey = this.buildDocKey(this.state.chats[chatIndex].users.filter(_usr => _usr !== this.state.email)[0]);
        firebase
        .firestore().collection(`chats`)
          .doc(docKey)
          .update({ receiverIsTyping: false });
  }

  // Always in alphabetical order:
  // 'user1:user2'
  buildDocKey = (friend) => [this.state.email, friend].sort().join(':');

  newChatBtnClicked = () => this.setState({ newChatFormVisible: true, selectedChat: null });

  newChatSubmit = async (chatObj) => {
    const docKey = this.buildDocKey(chatObj.sendTo);
    await 
      firebase
        .firestore()
        .collection('chats')
        .doc(docKey)
        .set({
          messages: [{
            sender: this.state.email,
            senderAvatar: this.props.profile.avatar,
            message: chatObj.message,
            timestamp: Date.now()
          }],
          users: [this.state.email, chatObj.sendTo],
          receiverHasRead: false
        })
    this.setState({ newChatFormVisible: false });
    this.selectChat(this.state.chats.length - 1);
  }

  selectChat = async (chatIndex) => {
    await this.setState({ selectedChat: chatIndex, newChatFormVisible: false });
    this.messageRead();
  }

  goToChat = async (docKey, msg) => {
    const usersInChat = docKey.split(':');
    const chat = this.state.chats.find(_chat => usersInChat.every(_user => _chat.users.includes(_user)));
    this.setState({ newChatFormVisible: false });
    await this.selectChat(this.state.chats.indexOf(chat));
    this.submitMessage(msg);
  }

  // Chat index could be different than the one we are currently on in the case
  // that we are calling this function from within a loop such as the chatList.
  // So we will set a default value and can overwrite it when necessary.
  messageRead = () => {
    const chatIndex = this.state.selectedChat;
    const docKey = this.buildDocKey(this.state.chats[chatIndex].users.filter(_usr => _usr !== this.state.email)[0]);
    if(this.clickedMessageWhereNotSender(chatIndex)) {
      firebase
        .firestore()
        .collection('chats')
        .doc(docKey)
        .update({ receiverHasRead: true });
    }
  }

  clickedMessageWhereNotSender = (chatIndex) => this.state.chats[chatIndex].messages[this.state.chats[chatIndex].messages.length - 1].sender !== this.state.email;

  componentWillMount = () => {
      firebase.auth().onAuthStateChanged(async _usr => {
        if(!_usr)
          this.props.history.push('/login');
        else {
          await firebase
            .firestore()
            .collection('chats')
            .where('users', 'array-contains', _usr.email)
            .onSnapshot(async res => {
              const chats = res.docs.map(_doc => _doc.data());
              await this.setState({
                email: _usr.email,
                chats: chats,
                friends: []
              });
            })
        }
    });
  }
}


const mapStateToProps = (state) => {
  return{
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  }
}

export default connect(mapStateToProps)(withStyles(styles)(DashboardComponent))