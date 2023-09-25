import { render, screen, cleanup } from "@testing-library/react";
import HolidayMatchBubble from "../HolidayMatchBubble";

afterEach(() => {
  cleanup();
});

test("Should render HolidayMatchBubble component", () => {
  const props = {
    img: "https://picsum.photos/200/300",
    city: "london",
    hotel: "hilton",
    rating: 5,
    price: "120",
  };
  render(<HolidayMatchBubble recommendation={props} />);
  const matchBubble = screen.getByTestId("match-bubble-test");
  expect(matchBubble).toBeInTheDocument();
});
