import { render, screen, cleanup } from "@testing-library/react";
import MatchedHolidayCount from "../MatchedHolidayCount";

afterEach(() => {
  cleanup();
});

test("Renders MatchedHolidayCount correctly", () => {
  const props = 2;
  render(<MatchedHolidayCount length={props} />);
  const holidayCount = screen.getByTestId("holiday-length-test");
  expect(holidayCount).toBeInTheDocument();
});

test("Inner text shows multiple holidays", () => {
  const props = 3;
  render(<MatchedHolidayCount length={props} />);
  const holidayCount = screen.getByTestId("holiday-length-test");
  expect(holidayCount).toHaveTextContent(
    `I matched you with ${props} holidays!`
  );
});

test("Inner text shows one holiday", () => {
  const props = 1;
  render(<MatchedHolidayCount length={props} />);
  const holidayCount = screen.getByTestId("holiday-length-test");
  expect(holidayCount).toHaveTextContent(
    `I matched you with ${props} holiday!`
  );
});

test("Component does not render if length is 0", () => {
  const props = 0;
  const { container } = render(<MatchedHolidayCount length={props} />);
  expect(container).toBeEmptyDOMElement();
});
