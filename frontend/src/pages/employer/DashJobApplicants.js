import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { jobLoadSingleAction } from "../../redux/actions/jobAction";
import { useParams } from "react-router-dom";
import ApplicantCard from "../../component/ApplicantCard";

const DashJobApplicants = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(jobLoadSingleAction(id));
    }
  }, [id]);

  const { singleJob } = useSelector((state) => state.singleJob);

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        pt: 4,
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{ textAlign: "center", mb: "20px" }}
      >
        Job Applicants for {singleJob?.title}
      </Typography>
      {singleJob?.applicants?.length === 0 && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
          }}
        >
          <Typography variant="h4" sx={{ color: "#222" }}>
            No applicants yet!
          </Typography>
        </Box>
      )}
      {singleJob?.applicants?.map((applicant, i) => (
        <ApplicantCard
          key={i}
          name={`${applicant?.firstName} ${applicant?.lastName}`}
          description={applicant?.description}
          email={applicant?.email}
        />
      ))}
    </Box>
  );
};

export default DashJobApplicants;
