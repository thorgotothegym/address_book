import React from "react";
import { Box, Grid } from "@mui/material";

import logo from "../../../../assets/logo.svg";
import { styles } from "./styles";

export const CustomHeader = (): JSX.Element => {
  return (
    <header>
      <Box>
        <Grid container spacing={2} p={2}>
          <Grid item xl={12}>
            <img style={styles.image} src={logo} alt="logo" />
          </Grid>
        </Grid>
      </Box>
    </header>
  );
};
