import React from "react";
import { CustomHeader } from "../../components/CustomHeader";

import { AddressBook } from "../AddressBook";

export const Layout = (): JSX.Element => {
  return (
    <>
      <CustomHeader />
      <AddressBook />
    </>
  );
};
