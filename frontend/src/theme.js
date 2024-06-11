import { blue, lightBlue } from "@mui/material/colors";

export const themeColors = (mode) => ({
  palette: {
    mode,
    ...{
      primary: {
        main: blue[500],
        white: "#fff",
      },
      secondary: {
        main: lightBlue[800],
        midNightBlue: "#003366",
      },
    },
  },
});
