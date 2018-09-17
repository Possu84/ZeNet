render () {

    return (

        <div>
            <div id="chat-message" ref={elem => (this.elem = elem)}>
                {this.props.chatMessage.map(
                    msg => (
                        <div></div>
                    )
                )}
            </div>
        </div>
    )
}


/// boiler for chat
