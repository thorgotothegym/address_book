import React, { useState } from "react";
import {
  Box,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
  Input,
  ListItemButton,
  ListItemText,
  Button,
} from "@mui/material";
import useFindSuggestions from "../../../infraestruture/hooks/queries/useFindSuggestions";
import { styles } from "./styles";
import { Alert } from "../../components/Alert";
import Suggestions from "../../../domain/entities/Suggestions";
import { Address } from "../../components/Address";
import { AddressProps } from "../../models/Address";

export enum SearchType {
  MANUAL = "manual",
  POSTALCODE = "postalCode",
}

export const AddressBook = (): JSX.Element => {
  const [value, setValue] = useState<string>("postCode");
  const [term, setTerm] = useState<string>("");

  const [selectedAddress, setSelectedAddress] = useState<AddressProps>({
    country: "",
    line1: "",
    line2: "",
    line3: "",
    postcode: "",
    town: "",
  });

  const [values, setValues] = useState<any>();

  const {
    data: suggestion,
    status,
    isFetching,
    error,
    refetch,
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

  const handlePostCode = () => {
    refetch();
  };

  return (
    <Box sx={styles.mainBox}>
      <Grid container spacing={2} p={2}>
        <Grid item lg={6}>
          <Box sx={styles.box}>
            <Typography>
              There are no addresses, but you can search by Post Code or by
              entering the address manually
            </Typography>
          </Box>
        </Grid>

        <Grid item lg={6}>
          <Box sx={styles.box}>
            <FormControl>
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
            {value === "manual" ? (
              <>
                <Address />
              </>
            ) : null}
            {value === "postCode" ? (
              <>
                <Box>
                  <Input
                    sx={{ width: "100%" }}
                    onChange={(event) => {
                      setTerm(event.target.value);
                    }}
                    value={values}
                  />
                </Box>
                <Box sx={styles.boxResult}>
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
                          {suggestion?.map(({ address }: Suggestions, key) => {
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
                          })}
                        </>
                      )}
                    </>
                  )}
                  <Box sx={styles.boxButton}>
                    <Button
                      variant="contained"
                      color="primary"
                      sx={styles.button}
                      onClick={() => handlePostCode()}
                    >
                      Search
                    </Button>
                  </Box>
                </Box>
              </>
            ) : null}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
