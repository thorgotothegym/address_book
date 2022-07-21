import React, { useState } from "react";
import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import useFindCountries from "../../../infraestruture/hooks/queries/useFindCountries";
import Country from "../../../domain/entities/Country";

export enum SearchType {
  MANUAL = "manual",
  POSTALCODE = "postalCode",
}

export const AddressBook = (): JSX.Element => {
  const { data } = useFindCountries();
  const [typeOfSearch, setTypeOfSearch] = useState<string>("");

  return (
    <Box sx={{}}>
      <Grid container spacing={2} p={2}>
        <Grid item md={6}>
          <Typography>
            There are no addresses, but you can <Typography>search</Typography>{" "}
            by zip code or by entering the address manually
          </Typography>
        </Grid>
        <Grid item md={6}>
          <Box>
            <FormControl>
              <FormLabel id="selectTypeOfSearch">Please select:</FormLabel>
              <RadioGroup
                row
                aria-labelledby="selectTypeOfSearch"
                defaultValue="postCode"
                name="selectTypeOfSearch-buttons-group"
                onChange={(event, value) => {
                  setTypeOfSearch(value);
                }}
              >
                <FormControlLabel
                  value="manual"
                  control={<Radio />}
                  label="Manual"
                />
                <FormControlLabel
                  value="postalCode"
                  control={<Radio />}
                  label="Post Code"
                />
              </RadioGroup>
            </FormControl>
            {typeOfSearch === "manual" && <>manual</>}
            {typeOfSearch === "postalCode" && <>postCode</>}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
