import React from "react";
import { render, screen } from "@testing-library/react";
import { Address } from "./index";
import { QueryProvider } from "../../providers";

const Wrapper = () => (
  <QueryProvider>
    <Address />
  </QueryProvider>
);

describe("Address", () => {
  it("renders Address Line 1", async () => {
    render(<Wrapper />);
    const lineOne = screen.getByText(/Address Line 1/i);
    expect(lineOne).toBeInTheDocument();
  });
  it("renders Town1", async () => {
    render(<Wrapper />);
    const town = screen.getByText(/Town/i);
    expect(town).toBeInTheDocument();
  });
  it("renders button save:", async () => {
    render(<Wrapper />);
    const button = screen.getByDisplayValue("buttonSave");
    expect(button).toBeInTheDocument();
  });
});
