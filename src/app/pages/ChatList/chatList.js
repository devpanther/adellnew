import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../_metronic/_helpers";
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import styles from './styles';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import NotificationImportant from '@material-ui/icons/NotificationImportant';

class ChatListComponent extends React.Component {

  render() {

    const { classes } = this.props;

    if(this.props.chats.length > 0) {
      return(<React.Fragment>
        <div style={{background: '#1b1b28',
            padding: '20px',
            height: '85px',
            position: 'fixed',
            display: 'flex',
            zIndex: '1', 
            width: '100%',
            top: '56px'}}>
            <div style={{margin: 'auto 20px'}}>
            <h1 style={{fontWeight: 'bold', color: 'white'}}>Chat List</h1>
            <p style={{color: 'white'}}>Click New Message and Select your Doctor</p>
            </div>
          </div>
          <SVG src={"localhost:3000/media/svg/undraw_new_message_2gfk.svg"}></SVG>
        <div style={{width: '98%', marginTop: '20px', padding: '50px 20px'}} className={classes.root}>
            <Button variant="contained" 
              fullWidth 
              color='primary' 
              onClick={this.newChat} 
              className={classes.newChatBtn}>
                New Message
            </Button>
            
            <List>
              {
                this.props.chats.map((_chat, _index) => {
                  return (
                    <div key={_index}>
                      <ListItem onClick={() => this.selectChat(_index)} 
                        className={classes.listItem} 
                        selected={this.props.selectedChatIndex === _index} 
                        alignItems="flex-start">
                        {/* <ListItemAvatar>
                          <Avatar alt="Remy Sharp">{_chat.users.filter(_user => _user !== this.props.userEmail)[0].split('')[0]}</Avatar>
                        </ListItemAvatar> */}
                        <ListItemText 
                          primary={_chat.users.filter(_user => _user !== this.props.userEmail)[0]}
                          secondary={
                            <React.Fragment>
                              <Typography component='span'
                                color='textPrimary'>
                                  {_chat.messages[_chat.messages.length - 1].message.substring(0, 30) + ' ...'}
                              </Typography>
                            </React.Fragment>
                          }/>
                          {
                            _chat.receiverHasRead === false && !this.userIsSender(_chat) ? 
                            <ListItemIcon><NotificationImportant className={classes.unreadMessage}></NotificationImportant></ListItemIcon> :
                            null
                          }
                      </ListItem>
                      <Divider/>
                    </div>
                  )
                })
              }
            </List>
        </div></React.Fragment>
      );
    } else {
      return(
        <div className={classes.root}>
          <Button variant="contained" 
            fullWidth 
            color='primary' 
            onClick={this.newChat} 
            className={classes.newChatBtn}>
              New Message
          </Button>
          <List></List>
        </div>
      );
    }
  }
  userIsSender = (chat) => chat.messages[chat.messages.length - 1].sender === this.props.userEmail;
  newChat = () => this.props.newChatBtnFn();
  selectChat = (index) => this.props.selectChatFn(index);
}

export default withStyles(styles)(ChatListComponent);













// import React from 'react';
// import './chatList.css';

// class ChatListComponent extends React.Component {
//   render() {
//     if(this.props.chats.length > 0) {
//       return(
//         <div className='chat-list-container'>
//           <button onClick={this.newChat} className='add-new-chat-button'>New Message</button>
//           {
//             this.props.chats.map((_chat, _index) => {
//               return (
//                 <div onClick={() => this.selectChat(_index)} key={_index} className={`individual-chat-container ${this.props.selectedChatIndex === _index ? 'selected-chat' : ''}`}>
//                   <h5>{_chat.users.filter(_user => _user !== this.props.userEmail)[0]}</h5>
//                   <p>{_chat.messages[_chat.messages.length - 1].message.substring(0, 30) + ' ...'}</p>
//                 </div>
//               )
//             })
//           }
//         </div>
//       );
//     } else {
//       return(
//         <div className='chat-list-container'>
//           <button onClick={this.newChat} className='add-new-chat-button'>New Message</button>
//         </div>
//       );
//     }
//   }
//   newChat = () => this.props.newChatBtnFn();
//   selectChat = (index) => this.props.selectChatFn(index);
// }

// export default ChatListComponent;