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
  Input,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import useFindCountries from "../../../infraestruture/hooks/queries/useFindCountries";
import useFindSuggestions from "../../../infraestruture/hooks/queries/useFindSuggestions";
import Country from "../../../domain/entities/Country";
import { styles } from "./styles";
import { Alert } from "../../components/Alert";
import Suggestions from "../../../domain/entities/Suggestions";

export enum SearchType {
  MANUAL = "manual",
  POSTALCODE = "postalCode",
}

export type Address = {
  line1: string;
  line2: string;
  line3: string;
  town: string;
  postcode: string;
  country: string;
};

export const AddressBook = (): JSX.Element => {
  const [value, setValue] = useState<string>("postCode");
  const [term, setTerm] = useState<string>("");

  const [selectedAddress, setSelectedAddress] = useState<Address>({
    country: "",
    line1: "",
    line2: "",
    line3: "",
    postcode: "",
    town: "",
  });

  const [values, setValues] = useState<any>();

  const { data } = useFindCountries();
  const {
    data: suggestion,
    status,
    isFetching,
    error,
  } = useFindSuggestions(term);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    setValue((event.target as HTMLInputElement).value);
  };

  const handleSelection = (address: string) => {
    var match = address.split(", ");
    let obj: any = selectedAddress;

    Object.keys(obj).map((value, key) => (obj[value] = match[key]));

    setSelectedAddress({ ...selectedAddress, ...obj });
  };

  return (
    <Box sx={{ backgroundColor: "#f6f5ea" }}>
      {JSON.stringify(selectedAddress)}
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
            <Box>
              <Grid container>
                <Grid xl={12}>
                  {value === "manual" ? <>manual</> : null}
                  {value === "postCode" ? (
                    <>
                      <Input
                        sx={{ width: "100%" }}
                        onChange={(event) => {
                          setTerm(event.target.value);
                        }}
                        value={values}
                      />
                      <Box sx={{ width: "100%", paddingTop: "50px" }}>
                        {status === "loading" ? (
                          <Alert severity="info" message="Loading" />
                        ) : status === "error" ? (
                          <Alert severity="error" message={error.message} />
                        ) : (
                          <>
                            {isFetching ? (
                              <>
                                <Alert severity="info" message="Fetching..." />
                              </>
                            ) : (
                              <>
                                {suggestion?.map(
                                  ({ address }: Suggestions, key) => {
                                    return (
                                      <Box key={key}>
                                        <ListItemButton component="a">
                                          <ListItemText
                                            onClick={() => {
                                              handleSelection(address);
                                            }}
                                            secondary={
                                              <React.Fragment>
                                                <Typography
                                                  sx={{ display: "inline" }}
                                                  component="span"
                                                  variant="body2"
                                                  color="text.primary"
                                                >
                                                  {address}
                                                </Typography>
                                              </React.Fragment>
                                            }
                                          />
                                        </ListItemButton>
                                      </Box>
                                    );
                                  }
                                )}
                              </>
                            )}
                          </>
                        )}
                      </Box>
                    </>
                  ) : null}
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
