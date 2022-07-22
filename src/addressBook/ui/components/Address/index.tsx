import React, { useState } from "react";
import { Typography, Button } from "@mui/material";
import { AddressProps } from "../../models/Address";
import { styles } from "./styles";
import useFindCountries from "../../../infraestruture/hooks/queries/useFindCountries";
import Country from "../../../domain/entities/Country";
import { ValidatePostCodeUK } from "./helper";

export const Address = (): JSX.Element => {
  const { data: countries } = useFindCountries();
  const [form, setForm] = useState<AddressProps>({
    country: "",
    line1: "",
    line2: "",
    line3: "",
    postcode: "",
    town: "",
  });
  const [showError, setShowError] = useState<boolean>(false);
  const stringError: string = "This field is required.";
  const [errorPostCode, setErrorPostCode] = useState<boolean>(false);
  const onHandleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("form", form);
  };

  return (
    <form onSubmit={onHandleSubmit}>
      <div style={styles.formGroup}>
        <label htmlFor="line1" style={styles.label}>
          <Typography>Address Line 1</Typography>
        </label>
        <input
          type="text"
          id="line1"
          value={form.line1}
          placeholder="first line"
          name="line1"
          style={styles.input}
          onChange={(event) => {
            if (form.line1.length < 3) {
              setShowError(true);
            } else {
              setShowError(false);
            }
            setForm({
              ...form,
              line1: event.target.value,
            });
          }}
        />
        {showError ? (
          <span style={styles.formGroup.error}>
            <Typography variant="subtitle1">{stringError}</Typography>
          </span>
        ) : null}
      </div>
      <div style={styles.formGroup}>
        <label htmlFor="line2" style={styles.label}>
          <Typography>Address Line 2</Typography>
        </label>
        <input
          type="text"
          id="line2"
          placeholder="Please write the second line"
          name="line2"
          style={styles.input}
          onChange={(event) =>
            setForm({
              ...form,
              line2: event.target.value,
            })
          }
        />
      </div>
      <div style={styles.formGroup}>
        <label htmlFor="line3" style={styles.label}>
          <Typography>Address Line 3</Typography>
        </label>
        <input
          type="text"
          placeholder="Please write the third line"
          name="line3"
          id="line3"
          style={styles.input}
          onChange={(event) =>
            setForm({
              ...form,
              line3: event.target.value,
            })
          }
        />
      </div>
      <div style={styles.formGroup}>
        <label htmlFor="town" style={styles.label}>
          <Typography>Town:</Typography>
        </label>
        <input
          type="text"
          placeholder="Please write your town"
          name="town"
          id="town"
          style={styles.input}
          value={form.town}
          onChange={(event) => {
            if (form.town === "") {
              setShowError(true);
            } else {
              setShowError(false);
            }
            setForm({
              ...form,
              town: event.target.value,
            });
          }}
        />
        {showError ? (
          <span style={styles.formGroup.error}>
            <Typography variant="subtitle1">{stringError}</Typography>
          </span>
        ) : null}
      </div>
      <div style={styles.formGroup}>
        <label htmlFor="postcode" style={styles.label}>
          <Typography>Post Code:</Typography>
        </label>
        <input
          type="text"
          placeholder="Please write your Post Code"
          name="postcode"
          id="postcode"
          style={styles.input}
          value={form.postcode}
          onChange={(event) => {
            if (form.town === "") {
              setShowError(true);
            } else {
              setShowError(false);
            }
            if (ValidatePostCodeUK.test(form.postcode)) {
              setErrorPostCode(false);
            } else {
              setErrorPostCode(true);
            }
            setForm({
              ...form,
              postcode: event.target.value,
            });
          }}
        />
        {showError ? (
          <span style={styles.formGroup.error}>
            <Typography variant="subtitle1">{stringError}</Typography>
          </span>
        ) : null}
        {errorPostCode ? (
          <span style={styles.formGroup.error}>
            <Typography variant="subtitle1">
              The Postal Code does not comply with the UK format
            </Typography>
          </span>
        ) : null}
      </div>
      <div style={styles.formGroup}>
        <label htmlFor="country" style={styles.label}>
          <Typography>Country:</Typography>
        </label>
        <select
          placeholder="Please choose your country"
          name="country"
          id="country"
          style={styles.input}
          value={form.country}
          onChange={(event) =>
            setForm({
              ...form,
              country: event.target.value,
            })
          }
        >
          {countries?.map(({ name }: Country, key) => {
            return (
              <option key={key} value={name.official}>
                {name.official}
              </option>
            );
          })}
        </select>
        {showError ? (
          <span style={styles.formGroup.error}>
            <Typography variant="subtitle1">{stringError}</Typography>
          </span>
        ) : null}
      </div>
      <Button
        type="submit"
        sx={styles.button}
        variant="contained"
        color="primary"
      >
        save
      </Button>
    </form>
  );
};
