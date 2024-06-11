import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { IconButton, useTheme } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";

const ApplicantCard = ({ name, description, email }) => {
  const { palette } = useTheme();

  return (
    <Card sx={{ minWidth: "100%", mb: 3, bgcolor: palette.primary.white }}>
      <CardContent>
        <Typography
          sx={{ fontSize: 18, color: palette.secondary.main, fontWeight: 500 }}
          gutterBottom
        >
          <IconButton>
            <EmailIcon
              sx={{ color: palette.secondary.main, fontSize: 40, mb: "3px" }}
            />
          </IconButton>
          Email: {email}
        </Typography>
        <Typography variant="h5" sx={{ ml: "10px" }} component="div">
          Name: {name}
        </Typography>

        <Typography variant="body2" sx={{ ml: "11px" }}>
          Description: {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ApplicantCard;
