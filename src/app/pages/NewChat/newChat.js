import React from 'react';
import { FormControl, InputLabel, Input, Button, Paper, withStyles, CssBaseline, Typography, Select, MenuItem } from '@material-ui/core';
import styles from './styles';
import {Form, InputGroup, Col, Row} from "react-bootstrap";
import { makeStyles } from '@material-ui/core/styles';
const firebase = require("firebase");

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

class NewChatComponent extends React.Component {

  constructor() {
    super();
    this.state = {
      username: null,
      message: null,
      doctor: []
    };
  }

  handleChange = (event) => {
    this.setState({doctor: event.target.value});
  };

  componentDidMount(){
    firebase
    .firestore()
    .collection('users')
    .where('roles', '==', 'Doctor')
    .onSnapshot(async res => {
      const chats = res.docs.map(_doc => _doc.data());
          this.setState({doctor: chats})
    })
  }

  yourChangeHandler(event){
    this.setState({username: event.target.value})
  }

  render() {

    const { classes } = this.props;
    return(
      <main className={classes.main}>
        <CssBaseline/>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h5">Send A Message!</Typography>
          <form className={classes.form} onSubmit={(e) => this.submitNewChat(e)}>
            <FormControl fullWidth variant="outlined" className={classes.formControl}>
            <Form.Group style={{marginBottom: '0'}} controlId="exampleForm.ControlSelect1">
              <Form.Label>Select Doctors</Form.Label>
              <Form.Control as="select" onChange={this.yourChangeHandler.bind(this)}>
              <option selected disabled>Select Here</option>
              {this.state.doctor.slice(0).reverse().map(
                messageItem => (
                <option value={messageItem.email}>{messageItem.fullName}</option>
                ))}
              </Form.Control>
              </Form.Group>
              {/* <Input required 
                className={classes.input}
                autoFocus 
                onChange={(e) => this.userTyping('username', e)} 
                id='new-chat-username'>
              </Input> */}
            </FormControl>
            <FormControl fullWidth>
              <InputLabel htmlFor='new-chat-message'>
                  Enter Your Message
              </InputLabel>
              <Input required 
                className={classes.input}
                onChange={(e) => this.userTyping('message', e)} 
                id='new-chat-message'>
              </Input>
            </FormControl>
            <Button fullWidth variant='contained' color='primary' className={classes.submit} type='submit'>Send</Button>
          </form>
          {
            this.state.serverError ? 
            <Typography component='h5' variant='h6' className={classes.errorText}>
              Unable to locate the user
            </Typography> :
            null
          }
        </Paper>
      </main>
    );
  }

  componentWillMount() {
    if(!firebase.auth().currentUser)
      this.props.history.push('/login');
  }

  userTyping = (inputType, e) => {
    switch (inputType) {
      case 'username':
        this.setState({ username: e.target.value });
        break;
      
      case 'message':
        this.setState({ message: e.target.value });
        break;

      default:
        break;
    }
  }

  submitNewChat = async (e) => {
    e.preventDefault();
    const userExists = await this.userExists();
    if(userExists) {
      const chatExists = await this.chatExists();
      chatExists ? this.goToChat() : this.createChat();
    }
  }

  buildDocKey = () => [firebase.auth().currentUser.email, this.state.username].sort().join(':');

  createChat = () => {
    this.props.newChatSubmitFn({
      sendTo: this.state.username,
      message: this.state.message
    });
  }

  goToChat = () => this.props.goToChatFn(this.buildDocKey(), this.state.message);

  chatExists = async () => {
    const docKey = this.buildDocKey();
    const chat = await 
      firebase
      .firestore()
      .collection('chats')
      .doc(docKey)
      .get();
    return chat.exists;
  }
  userExists = async () => {
    const usersSnapshot = await 
    firebase
      .firestore()
      .collection('users')
      .get();
    const exists = usersSnapshot
      .docs
        .map(_doc => _doc.data().email)
        .includes(this.state.username);
    this.setState({ serverError: !exists });
    return exists;
  }

  getDoctor = async () => {
    await firebase
    .firestore()
    .collection('users')
    .where('roles', '==', 'Doctor')
    .onSnapshot(async res => {
      const chats = res.docs.map(_doc => _doc.data());
      chats.slice(0).reverse().map(
        messageItem => (
          this.setState({doctor: messageItem})
        ))
    })
    console.log(this.state.doctor)
  }
}

export default withStyles(styles)(NewChatComponent);