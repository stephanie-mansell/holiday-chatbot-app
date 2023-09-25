import { render, screen, cleanup } from "@testing-library/react";
import ChatBox from "../ChatBox";

afterEach(() => {
  cleanup();
});

test("Should render ChatBox component", () => {
  render(<ChatBox />);
  const chatboxElement = screen.getByTestId("chatbox-test");
  expect(chatboxElement).toBeInTheDocument();
});
