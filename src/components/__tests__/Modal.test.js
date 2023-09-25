import { render, screen, cleanup } from "@testing-library/react";
import Modal from "../Modal";

afterEach(() => {
  cleanup();
});

test("Renders Modal correctly", () => {
  const props = {
    img: "https://picsum.photos/200/300",
    city: "london",
    "hotel-name": "hilton",
    rating: 5,
    "price-per-night": "120",
    description: ["description1", "description 2"],
  };
  render(<Modal holiday={props} />);
  const holidayCount = screen.getByTestId("modal-test");
  expect(holidayCount).toBeInTheDocument();
});
