import React from "react";
import { Alert as MUIAlert } from "@mui/material";

interface IAlert {
  severity: "success" | "info" | "warning" | "error";
  message: string;
}

export const Alert = ({ severity, message }: IAlert): JSX.Element => {
  return (
    <>
      <MUIAlert severity={severity}>{message}</MUIAlert>
    </>
  );
};
