import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { IconButton, useTheme } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { useSelector } from "react-redux";
import { ROLES } from "../constants/roles";

const CardElement = ({
  jobTitle,
  companyName,
  applied,
  description,
  location,
  id,
}) => {
  const { palette } = useTheme();
  const { user } = useSelector((state) => state.userProfile);

  return (
    <Card sx={{ minWidth: 275, mb: 3, mt: 3, bgcolor: palette.primary.white }}>
      <CardContent>
        <Typography
          sx={{ fontSize: 15, color: palette.secondary.main, fontWeight: 500 }}
          gutterBottom
        >
          <IconButton>
            <LocationOnIcon
              sx={{ color: palette.secondary.main, fontSize: 18 }}
            />
          </IconButton>{" "}
          {location}
        </Typography>
        <Typography variant="h5" component="div">
          {jobTitle}
        </Typography>

        <Typography variant="body2">
          Description: {description.split(" ").slice(0, 15).join(" ") + "..."}
        </Typography>
        <Typography variant="body2">Offered By: {companyName}</Typography>
      </CardContent>
      {user?.role === ROLES.EMPLOYEE && (
        <CardActions>
          <Button
            disableElevation
            variant="contained"
            size="small"
            startIcon={<AddIcon />}
          >
            <Link
              style={{ textDecoration: "none", color: "white", boxShadow: 0 }}
              to={`/job/${id}/${applied}`}
            >
              More Details
            </Link>
          </Button>
        </CardActions>
      )}
    </Card>
  );
};

export default CardElement;
