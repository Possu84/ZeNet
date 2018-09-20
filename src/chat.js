import React from "react";
import { connect } from "react-redux";
import { getSocket } from "./socket";
import Background from "./background";

import { getChatMessages } from "./actions";

class Chat extends React.Component {
    componentDidUpdate() {
        if (!this.elem) {
            return;
        }
        this.elem.scrollTop = this.elem.scrollHeight - this.elem.clientHeight;
    }
  sendChatMessage(e) {
    if (e.which === 13) {
      //// resets the input field after key down
      getSocket().emit("sendMessage", e.target.value);
      e.target.value = "";
    }
  }
  componentDidMount() {
    console.log("componentDidMount");
    this.props.dispatch(getChatMessages());
  }

  render() {

      const { msg } = this.props;
        if (!msg) {
            return null;
        }

    return (
      <div id="chat_wrapper">


        <h1 id="chat_header">ZeNet Chat</h1>
        <div id="chat_message_area"  ref={elem => (this.elem = elem)}>
        {msg.map(msg=>(

            <div id="chat_messages_container" key={msg.msg_text} >

                <div className="chat-avatar-box">
                      <img className="chat-message-avatar" src={msg.msg_sender_img} />
                 </div>
            <p id="chat_message" > {msg.msg_text}</p>

        </div>

        ))}





        </div>
            <div id="chat_input">
          <textarea id="chat_textarea" onKeyDown={this.sendChatMessage} />
        </div>

        <Background />
</div>

    );
  }
}

const mapStateToProps = state => {
  return {
    msg: state.msg
  };
};

export default connect(mapStateToProps)(Chat);

// onKeyDown={props.setBio}
// defaultValue={props.bio}
