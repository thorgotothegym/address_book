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
import { styles } from "./styles";

export enum SearchType {
  MANUAL = "manual",
  POSTALCODE = "postalCode",
}

export const AddressBook = (): JSX.Element => {
  const { data } = useFindCountries();

  const [value, setValue] = useState<string>("postCode");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    setValue((event.target as HTMLInputElement).value);
  };

  return (
    <Box sx={{ backgroundColor: "#f6f5ea" }}>
      <Grid container spacing={2} p={2}>
        <Grid item md={6}>
          <Box sx={styles.box}>
            <Typography>
              There are no addresses, but you can search by zip code or by
              entering the address manually
            </Typography>
          </Box>
        </Grid>

        <Grid item md={6}>
          <Box sx={styles.box}>
            <FormControl>
              <FormLabel id="id-controlled-radio-buttons-group">
                Select
              </FormLabel>
              <RadioGroup
                aria-labelledby="id-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                row
                value={value}
                onChange={handleChange}
              >
                <FormControlLabel
                  value="postCode"
                  control={<Radio />}
                  label="Post Code"
                />
                <FormControlLabel
                  value="manual"
                  control={<Radio />}
                  label="Manual"
                />
              </RadioGroup>
            </FormControl>
            {value === "manual" ? <>manual</> : null}
            {value === "postCode" ? <>postCode</> : null}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
