import { render, screen, cleanup } from "@testing-library/react";
import App from "../../App";

afterEach(() => {
  cleanup();
});

test("Should render the App component", () => {
  render(<App />);
  const app = screen.getByTestId("app-test");
  expect(app).toBeInTheDocument();
});
