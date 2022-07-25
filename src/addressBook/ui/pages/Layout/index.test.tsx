import React from "react";
import { render, screen } from "@testing-library/react";
import { Layout } from "./index";
import { QueryProvider } from "../../providers";

const Wrapper = () => (
  <QueryProvider>
    <Layout />
  </QueryProvider>
);

describe("Layout", () => {
  it("AddressBook needs to be rendered", async () => {
    render(<Wrapper />);
    const addressBook = screen.getByTestId("AddressBook");
    expect(addressBook).toBeInTheDocument();
  });
});
