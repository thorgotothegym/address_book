import { Typography, Button } from "@mui/material";
import React from "react";
import { AddressProps } from "../../models/Address";
import { styles } from "./styles";

export const Address = (): JSX.Element => {
  const onHandleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };
  return (
    <>
      <form onSubmit={onHandleSubmit}>
        <div style={styles.formGroup}>
          <label htmlFor="line1" style={styles.label}>
            <Typography>Line 1</Typography>
          </label>
          <input
            type="text"
            id="line1"
            placeholder="first line"
            name="line1"
            style={styles.input}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="line2" style={styles.label}>
            <Typography>Line 2</Typography>
          </label>
          <input
            type="text"
            id="line2"
            placeholder="Please write the second line"
            name="line2"
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="line3" style={styles.label}>
            <Typography>Line 3</Typography>
          </label>
          <input
            type="text"
            placeholder="Please write the third line"
            name="line3"
            id="line3"
            style={styles.input}
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
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="postcode" style={styles.label}>
            <Typography>Post Code:</Typography>
          </label>
          <input
            type="number"
            placeholder="Please write your Post Code"
            name="postCode"
            id="postCode"
            style={styles.input}
            required
          />
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
            required
          >
            <option>1</option>
          </select>
        </div>
        <Button sx={styles.button} variant="contained" color="primary">
          save
        </Button>
      </form>
    </>
  );
};
