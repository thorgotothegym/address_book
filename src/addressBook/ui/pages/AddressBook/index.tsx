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
import useFindAddress from "../../../infraestruture/hooks/queries/useFindAddress";
import usePostAddress from "../../../infraestruture/hooks/mutations/usePostAddress"; // usePostAddress
import { styles } from "./styles";
import { Alert } from "../../components/Alert";
import Suggestions from "../../../domain/entities/Suggestions";
import { Address as AddressForm } from "../../components/Address";
import { AddressProps } from "../../models/Address";
import Address from "../../../domain/entities/Address";

export const AddressBook = (): JSX.Element => {
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
      line1: selectedAddress.line1,
      line2: selectedAddress.line2,
      line3: selectedAddress.line3,
      town: selectedAddress.town,
    });
    addressRefetch();
  };

  const handlePostCode = () => {
    refetch();
  };

  return (
    <Box sx={styles.mainBox} data-testid="AddressBook">
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
                  (
                    { country, line1, line2, line3, postcode, town }: Address,
                    key
                  ) => {
                    return (
                      <Box key={key.toString()}>
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
                                  {line1 ? (
                                    <span>
                                      <strong> Line1</strong>: {line1}
                                    </span>
                                  ) : null}
                                  {line2 ? (
                                    <span>
                                      <strong> Line2</strong>: {line2}
                                    </span>
                                  ) : null}
                                  {line3 ? (
                                    <span>
                                      <strong> Line3</strong>: {line3}
                                    </span>
                                  ) : null}
                                  {postcode ? (
                                    <span>
                                      <strong> Postcode</strong>: {postcode}
                                    </span>
                                  ) : null}
                                  {town ? (
                                    <span>
                                      <strong> Town</strong>: {town}
                                    </span>
                                  ) : null}
                                  {country ? (
                                    <span>
                                      <strong> Country</strong>: {country}
                                    </span>
                                  ) : null}
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
                  data-testid="selectPostCode"
                  label="Post Code"
                />
                <FormControlLabel
                  value="manual"
                  data-testid="selectManual"
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
