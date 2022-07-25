import React from "react";
import { render, screen } from "@testing-library/react";
import { CustomHeader } from "./index";
import { QueryProvider } from "../../providers";

const Wrapper = () => (
  <QueryProvider>
    <CustomHeader />
  </QueryProvider>
);

describe("CustomHeader", () => {
  it("Logo must have src = /logo.svg and alt = logo", async () => {
    render(<Wrapper />);
    const logo = screen.getByRole("img");
    expect(logo).toHaveAttribute("src", "logo.svg");
    expect(logo).toHaveAttribute("alt", "logo");
  });
});
