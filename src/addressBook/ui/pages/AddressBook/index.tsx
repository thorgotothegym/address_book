import React, { useState } from "react";
import { Container } from "@mui/material";
import useFindCountries from "../../../infraestruture/hooks/queries/useFindCountries";
import Country from "../../../domain/entities/Country";

export const AddressBook = (): JSX.Element => {
  const { data } = useFindCountries();
  return (
    <Container maxWidth="lg">
      {data?.map(({ name }: Country) => {
        return (
          <>
            <p>
              {name.common} {name.official}
            </p>
          </>
        );
      })}
    </Container>
  );
};
