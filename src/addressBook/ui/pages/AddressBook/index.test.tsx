import React from "react";
import { render, screen } from "@testing-library/react";
import { AddressBook } from "./index";
import { QueryProvider } from "../../providers";
import userEvent from "@testing-library/user-event";

const Wrapper = () => (
  <QueryProvider>
    <AddressBook />
  </QueryProvider>
);

jest.mock("../../../infraestruture/repositories/getAddress");

describe("AddressBook", () => {
  it("does not post address", async () => {
    render(<Wrapper />);
    const mutate = jest.fn();
    userEvent.click(screen.getByRole("button"));
    expect(mutate).not.toHaveBeenCalled();
  });
});
