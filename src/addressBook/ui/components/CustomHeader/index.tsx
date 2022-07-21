import { Box, Grid, Typography } from "@mui/material";
import React from "react";

import logo from "../../../../assets/logo.svg";

export const CustomHeader = (): JSX.Element => {
  return (
    <header>
      <Box>
        <Grid container spacing={2} p={2}>
          <Grid item xl={12}>
            <img src={logo} alt="logo" />
          </Grid>
        </Grid>
      </Box>
    </header>
  );
};
