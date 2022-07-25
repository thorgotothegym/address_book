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
import { v4 as uuidv4 } from "uuid";
import useFindSuggestions from "../../../infraestruture/hooks/queries/useFindSuggestions";
import useFindAddress from "../../../infraestruture/hooks/queries/useFindAddress";
import usePostAddress from "../../../infraestruture/hooks/mutations/usePostAddress"; // usePostAddress
import { styles } from "./styles";
import { Alert } from "../../components/Alert";
import Suggestions from "../../../domain/entities/Suggestions";
import { Address as AddressForm } from "../../components/Address";
import { AddressProps } from "../../models/Address";
import Address from "../../../domain/entities/Address";

export enum SearchType {
  MANUAL = "manual",
  POSTALCODE = "postalCode",
}

export const AddressBook = (): JSX.Element => {
  const uuid = uuidv4(); // SW99AE
  const [value, setValue] = useState<string>("postCode");
  const [term, setTerm] = useState<string>("");

  const createAddress = usePostAddress();

  const [selectedAddress, setSelectedAddress] = useState<AddressProps>({
    country: "",
    line1: "",
    line2: "",
    line3: "",
    postcode: "",
    town: "",
    id: uuid,
  });

  const [values, setValues] = useState<any>();

  const { data: address, refetch: addressRefetch } = useFindAddress();

  const {
    data: suggestion,
    status,
    isFetching,
    error,
    refetch,
  } = useFindSuggestions(term);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  const handleSelection = (address: string) => {
    var match = address.split(", ");
    let obj: any = selectedAddress;

    Object.keys(obj).map((value, key) => (obj[value] = match[key]));

    setSelectedAddress({ ...selectedAddress, ...obj });
    createAddress.mutate({
      country: selectedAddress.country,
      id: selectedAddress.id,
      line1: selectedAddress.line1,
      line2: selectedAddress.line2,
      line3: selectedAddress.line3,
      postcode: selectedAddress.postcode,
      town: selectedAddress.town,
    });
    addressRefetch();
  };

  const handlePostCode = () => {
    refetch();
  };

  return (
    <Box sx={styles.mainBox}>
      <Grid container spacing={2} p={2}>
        <Grid item lg={6}>
          <Box sx={styles.box}>
            {address?.length === 0 ? (
              <>
                <Typography>
                  There are no addresses, but you can search by Post Code or by
                  entering the address manually
                </Typography>
              </>
            ) : (
              <>
                {address?.map(
                  ({
                    country,
                    id,
                    line1,
                    line2,
                    line3,
                    postcode,
                    town,
                  }: Address) => {
                    return (
                      <Box key={id}>
                        <ListItemButton component="li">
                          <ListItemText
                            secondary={
                              <React.Fragment>
                                <Typography
                                  sx={{ display: "block" }}
                                  component="span"
                                  variant="body2"
                                  color="text.primary"
                                >
                                  <strong>Line 1</strong>:{" "}
                                  {line1 ? line1 : null},{" "}
                                  <strong>Line 2</strong>:{" "}
                                  {line2 ? line2 : null},{" "}
                                  <strong>Line 3</strong>:{" "}
                                  {line3 ? line3 : null},{" "}
                                  <strong>PostCode</strong>:{" "}
                                  {postcode ? postcode : null},{" "}
                                  <strong>Town</strong>: {town ? town : null},{" "}
                                  <strong>Country</strong>:{" "}
                                  {country ? country : null}
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
                <AddressForm />
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
                                <ListItemButton
                                  component="li"
                                  onClick={() => {
                                    handleSelection(address);
                                  }}
                                >
                                  <ListItemText
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
