import { useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";

export const getUserRoleLabel = (role) => {
  switch (role) {
    case 0:
      return "Employee";
    case 1:
      return "Employer";
    case 2:
      return "Admin";
    default:
      return "";
  }
};

const UserInfoDashboard = () => {
  const { user } = useSelector((state) => state.userProfile);
  const { palette } = useTheme();

  return (
    <Box sx={{ maxWidth: "100%", margin: "auto", pt: 10 }}>
      <Card sx={{ bgcolor: palette.secondary.midNightBlue }}>
        <CardContent>
          <Typography sx={{ fontSize: 16 }} color="#fafafa" gutterBottom>
            Personal Info
          </Typography>
          <hr style={{ marginBottom: "30px" }} />
          <Typography variant="h6" component="div" sx={{ color: "#fafafa" }}>
            First name: {user && user?.firstName}
          </Typography>
          <Typography variant="h6" component="div" sx={{ color: "#fafafa" }}>
            Last name: {user && user?.lastName}
          </Typography>
          <Typography variant="h6" component="div" sx={{ color: "#fafafa" }}>
            E-mail: {user && user?.email}
          </Typography>
          <Typography
            sx={{ mb: 1.5, color: "grey", pt: 2 }}
            color="text.secondary"
          >
            Status: {user && getUserRoleLabel(user?.role)}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default UserInfoDashboard;
