import { Typography } from "@mui/material";
import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardElement from "../../component/CardElement";
import { userProfileAction } from "../../redux/actions/userAction";

const UserJobsHistory = () => {
  const { user } = useSelector((state) => state.userProfile);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userProfileAction());
  }, []);

  return (
    <Box>
      <Typography variant="h4" sx={{ color: "#222" }}>
        Jobs History
      </Typography>
      <Box>
        {user && user?.jobsHistory?.length === 0 && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "80vh",
            }}
          >
            <Typography variant="h4" sx={{ color: "#222" }}>
              No jobs history
            </Typography>
          </Box>
        )}
        {user &&
          user.jobsHistory.map((history, i) => (
            <CardElement
              key={i}
              applied={1}
              companyName={history?.firstName}
              id={history.jobId}
              jobTitle={history.title}
              description={history.description}
              location={history.location}
            />
          ))}
      </Box>
    </Box>
  );
};

export default UserJobsHistory;
