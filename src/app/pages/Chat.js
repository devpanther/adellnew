import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import './chat.css'
import MessageItem from './MessageItem';
import { connect } from 'react-redux'
import {createProject, getProject} from '../modules/Auth/_redux/projectActions'
import {db} from '../modules/config/fbConfig';
import firebase from 'firebase';

/* detect url in a message and add a link tag */
function detectURL(message) {
 	var urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;
 	return message.replace(urlRegex, function(urlMatch) {
 		return '<a href="' + urlMatch + '">' + urlMatch + '</a>';
 	})
}

// class ChatBox extends React.Component {
// 	constructor(props, context) {
//     super(props, context);
//     this.handleSendMessage = this.handleSendMessage.bind(this);
// 		this.handleTyping = this.handleTyping.bind(this);
// 		this.state = {
// 			isLoading: false,
// 			message: '',
// 			id: 0,
// 		};
// 		this.sendMessageLoading = this.sendMessageLoading.bind(this);
// 		var timeout = null;
// 	}
// 	/* catch the sendMessage signal and update the loading state then continues the sending instruction */
// 	sendMessageLoading(sender, senderAvatar, message) {
// 		this.setState({ isLoading: true });
// 		this.props.sendMessage(sender, senderAvatar, message);
// 		setTimeout(() => {
// 			this.setState({ isLoading: false });
// 		}, 400);
//   }
//   handleSendMessage(event) {
// 		event.preventDefault();
// 		/* Disable sendMessage if the message is empty */
// 		if( this.messageInput.value.length > 0 ) {
// 			this.sendMessageLoading(this.ownerInput.value, this.ownerAvatarInput.value, this.messageInput.value);
// 			/* Reset input after send*/
// 			this.messageInput.value = '';
// 		}
// 	}
// 	handleTyping(event) {
// 		/* Tell users when another user has at least started to write */
// 		if( this.messageInput.value.length > 0 ) {
// 			this.props.typing(this.ownerInput.value);
// 		}
// 		else {
// 			/* When there is no more character, the user no longer writes */
// 			this.props.resetTyping(this.ownerInput.value);
// 		}
//   }
  
  
// 	render() {
//     db.collection(`chat/users/${this.props.property.auth.uid}`)
//     .onSnapshot(snapshot => {
//         snapshot.docs.map(doc => (
// 		  this.setState({id: doc.id, message: doc.data()})
// 		))})
// 		console.log(this.state)
//     console.log(this.props.property.profile.messages)
//     var loadingClass = this.props.isLoading ? 'chatApp__convButton--loading' : '';
//     let sendButtonIcon = <i className={"material-icons"}>send</i>;
//     let typersDisplay = '';
// 		let countTypers = 0;
// 		/* for each user writing messages in chatroom */
// 		for ( var key in this.props.isTyping ) {
// 			/* retrieve the name if it isn't the owner of the chatbox */
// 			if( key != this.props.owner && this.props.isTyping[key] ) {
// 				typersDisplay += ', ' + key;
// 				countTypers++;
// 			}
// 		}
// 		/* formatting text */
// 		typersDisplay = typersDisplay.substr(1);
// 		typersDisplay += (( countTypers > 1 ) ? ' are ' : ' is ');
//     console.log(this.props.property)
//     const msg = this.props.property.profile.messages
//     if (this.props.property.profile.email !== undefined) {
// 		return (
      
// 			<div className={"chatApp__conv"}>
// 			<div className={"chatApp__convTimeline"}>
        
// 			{msg.slice(0).reverse().map(
// 				messageItem => (
// 					<MessageItem
// 						key={messageItem.id}
// 						owner={this.props.owner}
// 						sender={messageItem.sender}
// 						senderAvatar={messageItem.senderAvatar}
// 						message={messageItem.message}
// 					/>
// 				)
// 			)}
// 			</div>
//       <div className={"chatApp__convSendMessage clearfix"}>
//       {countTypers > 0 ? <div className={"chatApp__convTyping"}>{typersDisplay} writing
//         <span className={"chatApp__convTypingDot"}></span>
//         </div> : <div className={"chatApp__convTyping"}></div>
//       }
//       <div>
// 					<form onSubmit={this.handleSendMessage}>
// 				<input
// 					type="hidden"
// 					ref={owner => (this.ownerInput = owner)}
// 					value={this.props.owner}
// 				/>
// 				<input
// 					type="hidden"
// 					ref={ownerAvatar => (this.ownerAvatarInput = ownerAvatar)}
// 					value={this.props.ownerAvatar}
// 				/>
// 				<input
// 					type="text"
// 					ref={message => (this.messageInput = message)}
// 					className={"chatApp__convInput"}
// 					placeholder="Text message"
// 					onKeyDown={this.handleTyping}
// 					onKeyUp={this.handleTyping}
// 					tabIndex="0"
// 				/>
// 				<div className={'chatApp__convButton ' + loadingClass} onClick={this.handleSendMessage}>
// 				{sendButtonIcon}
// 				</div>
// 			</form>
// 				</div>
// 			</div>
//       </div>
// 		);
// }else{
//   return <div></div>
// }
// }
// }

function ChatBox(props) {
	const [isLoading, setIsLoading] = useState(false)
	const [messages, setMessages] = useState([]);
	const [input, setInput] = useState('');
		/* catch the sendMessage signal and update the loading state then continues the sending instruction */
		
    const sendMessageLoading = () => {
        setTimeout(() => {
            setIsLoading(false);
        }, 400);
    }

    var loadingClass = isLoading ? 'chatApp__convButton--loading' : '';
    let sendButtonIcon = <i className={"material-icons"}>send</i>;
    let typersDisplay = '';

    let countTypers = 0;
    /* for each user writing messages in chatroom */
    for ( var key in props.isTyping ) {
        /* retrieve the name if it isn't the owner of the chatbox */
        if( key != props.owner && props.isTyping[key] ) {
            typersDisplay += ', ' + key;
            countTypers++;
        }
    }

    /* formatting text */
    typersDisplay = typersDisplay.substr(1);
    typersDisplay += (( countTypers > 1 ) ? ' are ' : ' is ');
    const msg = props.property.profile.messages

    const handleSendMessage = (event) => {
        event.preventDefault();
        /* Disable sendMessage if the message is empty */
        // if( messageInput.value.length > 0 ) {
        //     /* Reset input after send*/
        //     messageInput.value = '';
		// }
		console.log(messages)
		if(input === ''){
			
		}else{
			db.collection(`chat`)
			.doc('readsd')
			.update({
				messages: firebase.firestore.FieldValue.arrayUnion({
					message: input,
					sender: props.property.profile.fullName,
					senderAvatar: props.property.profile.avatar,
					timestamp: Date.now()
				}),
				receiverHasRead: false
			});
			// .add({
			// 	message: input,
			// 	sender: props.owner,
			// 	senderAvatar: props.ownerAvatar,
			// 	timestamp: firebase.firestore.FieldValue.serverTimestamp()
			//   })
			// setMessages([messages, {message:input}])
			setInput('');
		}
	}
	const arrayToObject = (array) =>
				array.reduce((obj, item) => {
				return item
				}, {})
	useEffect(() => {
		db.collection('chat')
			.where('users', 'array-contains', props.property.profile.fullName)
			.onSnapshot(res => {
				const chats = res.docs.map(_doc => _doc.data());
				// await this.setState({
				// email: _usr.email,
				// chats: chats,
				// friends: []
				// });
				setMessages(arrayToObject(chats))
			})
			// console.log(chats)
			// console.log(messages)
		// db.collection('chats/readsd')
		// .onSnapshot(snapshot => {
		// 	setMessages(snapshot.docs.map(doc => ({id: doc.id, message: doc.data()})))
		// })
	  }, [])
	  const receiverIsTyping = (event) => {
		  console.log(event.target.value)
		//   if(event.tae)
		// db.collection(`chat`)
        // .doc('readsd')
        // .update({ receiverHasRead: true });
	  }

	  useEffect(() => {
		console.log(messages)
		  if(input !== ''){
			db.collection(`chat`)
			.doc('readsd')
			.update({ receiverHasRead: true });
		  }else{
			db.collection(`chat`)
			.doc('readsd')
			.update({ receiverHasRead: false });
			console.log(input)
		  }
	  }, [input])

	// const arrayToObject = (array) =>
	// array.reduce((obj, item) => {
	// return item
	// }, {})
	// const peopleObject = arrayToObject(messages)
	// const realMessage = peopleObject.messages
	// realMessage.map(data => {
	// 	console.log(data)
	// })
	
	// realMessage.slice(0).reverse().map(
	// 	messageItem => (
	// 		console.log(messageItem)
	// )
	// )
    if (props.property.profile.email !== undefined) {
        return (
        <div className={"chatApp__conv"}>
        <div className={"chatApp__convTimeline"}>
    
		{
			(messages.messages === undefined) ? 
				null
				: messages.messages.slice(0).reverse().map(
					messageItem => (
						<MessageItem
						key={messageItem.id}
						owner={props.owner}
						sender={messageItem.sender}
						senderAvatar={messageItem.senderAvatar}
						message={messageItem.message}
					/>
					)
				) 
		}

		
        </div>
        <div className={"chatApp__convSendMessage clearfix"}>
		{messages.receiverHasRead ? <div className={"chatApp__convTyping"}>{props.owner} writing
        <span className={"chatApp__convTypingDot"}></span>
        </div> : <div className={"chatApp__convTyping"}></div>
        }
        <div>
            <form onSubmit={handleSendMessage}>
                <input
					type="text"
					value={input} 
					onChange={event => setInput(event.target.value)}
                    className={"chatApp__convInput"}
                    placeholder="Text message"
                    // onKeyDown={handleTyping}
                    // onKeyUp={handleTyping}
                    tabIndex="0"
                />
                <div disabled={!input} className={'chatApp__convButton ' + loadingClass} onClick={handleSendMessage}>
                {sendButtonIcon}
                </div>
            </form>
        </div>
    </div>
</div>
);
}}



class Chat extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			isTyping: [],
		};
		// this.sendMessage = this.sendMessage.bind(this);
		this.typing = this.typing.bind(this);
		this.resetTyping = this.resetTyping.bind(this);
  }
  /* adds a new message to the chatroom */

	/* updates the writing indicator if not already displayed */
	typing(writer) {
		if( !this.state.isTyping[writer] ) {
			let stateTyping = this.state.isTyping;
			stateTyping[writer] = true;
			this.setState({ isTyping: stateTyping });
		}
	}
	/* hide the writing indicator */
	resetTyping(writer) {
		let stateTyping = this.state.isTyping;
		stateTyping[writer] = false;
		this.setState({ isTyping: stateTyping });
  }

  componentDidMount(){
	db.collection('users')
	.onSnapshot(res => {
		const chatsD = res.docs.map(_doc => _doc.data());
		console.log(chatsD)
	})

  }
  
	render() {
    if (this.props.profile.email !== undefined) {
	 console.log(this.props)
      let typersDisplay = '';
      let countTypers = 0;
      /* for each user writing messages in chatroom */
      for ( var key in this.props.isTyping ) {
        /* retrieve the name if it isn't the owner of the chatbox */
        if( key != this.props.owner && this.props.isTyping[key] ) {
          typersDisplay += ', ' + key;
          countTypers++;
        }
      }
      /* formatting text */
      typersDisplay = typersDisplay.substr(1);
      typersDisplay += (( countTypers > 1 ) ? ' are ' : ' is ');
      /* if at least one other person writes */
      if ( countTypers > 0 ) {
        return (
          <div className={"chatApp__convTyping"}>{typersDisplay} writing
          <span className={"chatApp__convTypingDot"}></span>
          </div>
        );
      }
      let users = {};
      let chatBoxes = [];
      let messages = this.state.messages;
      let isTyping = this.state.isTyping;
      let sendMessage = this.sendMessage;
      let typing = this.typing;
      let resetTyping = this.resetTyping;
	  let property = this.props;
	  
  
      /* user details - can add as many users as desired */
      users[0] = { name: 'Shun', avatar: 'https://i.pravatar.cc/150?img=32' };
      users[1] = { name: 'Gabe', avatar: 'https://i.pravatar.cc/150?img=56' };
      /* test with two other users :)
      users[2] = { name: 'Kate', avatar: 'https://i.pravatar.cc/150?img=47' };
      users[3] = { name: 'Patrick', avatar: 'https://i.pravatar.cc/150?img=14' };
      */
      
      /* creation of a chatbox for each user present in the chatroom */
    //   Object.keys(users).map(function(key) {
    //     var user = users[key];
    //     chatBoxes.push(
    //       <ChatBox
    //         key={key}
    //         owner={property.profile.fullName}
    //         ownerAvatar={property.profile.avatar}
    //         sendMessage={sendMessage}
    //         typing={typing}
    //         resetTyping={resetTyping}
    //         messages={messages}
    //         isTyping={isTyping}
    //         property={property}
    //       />
    //     );
    //   });
  
      return (
        <div className={"chatApp__room"}>
         <ChatBox
            key={key}
            owner={property.profile.fullName}
            ownerAvatar={property.profile.avatar}
            sendMessage={sendMessage}
            typing={typing}
            resetTyping={resetTyping}
            messages={messages}
            isTyping={isTyping}
            property={property}
          />
        </div>
      );
  }else{
    return <div></div>
  }
}
}
/* end ChatRoom component */
/* ========== */

const mapStateToProps = (state) => {
  return{
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createProject: (project) => dispatch(createProject(project))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat)