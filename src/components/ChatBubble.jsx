import "./ChatBubble.css";

function ChatBubble(props) {
  return (
    <div
      className={`bubble ${props.message.sender}`}
      data-testid="chatbubble-test"
    >
      <span>{props.message.text}</span>
    </div>
  );
}

export default ChatBubble;
