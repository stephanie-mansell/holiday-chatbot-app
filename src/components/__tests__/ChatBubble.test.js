import { render, screen, cleanup } from "@testing-library/react";
import renderer from "react-test-renderer";
import ChatBubble from "../ChatBubble";

afterEach(() => {
  cleanup();
});

let props = { sender: "agent", text: "I'm an agent" };

test("Should render ChatBubble component", () => {
  render(<ChatBubble message={props} />);
  const chatBubble = screen.getByTestId("chatbubble-test");
  expect(chatBubble).toBeInTheDocument();
});

test("Should show 'agent' as className", () => {
  render(<ChatBubble message={props} />);
  const chatBubble = screen.getByTestId("chatbubble-test");
  expect(chatBubble).toHaveClass("agent");
});

test("Should show 'user' as className", () => {
  props = { sender: "user", text: "I'm a user" };
  render(<ChatBubble message={props} />);
  const chatBubble = screen.getByTestId("chatbubble-test");
  expect(chatBubble).toHaveClass("user");
});

test("Matches snapshot", () => {
  const tree = renderer.create(<ChatBubble message={props} />).toJSON();
  expect(tree).toMatchSnapshot();
});
