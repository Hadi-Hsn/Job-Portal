import React, { useEffect } from "react";
import { Box, Button, Paper, Typography } from "@mui/material";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteSingleJobAction,
  myJobLoadAction,
} from "../../redux/actions/jobAction";

const DashJobs = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userProfile);

  useEffect(() => {
    console.log("userInfo", user?._id);
    if (user?._id) dispatch(myJobLoadAction(user?._id));
  }, [dispatch, user?._id]);

  const { success: deleteSuccess } = useSelector((state) => state.deleteJob);
  const { jobs } = useSelector((state) => state.loadJobs);
  let data = [];
  data = jobs !== undefined && jobs.length > 0 ? jobs : [];

  // delete a job by id
  const deleteJobById = (e, id) => {
    if (window.confirm(`You really want to delete product ID: "${id}" ?`)) {
      dispatch(deleteSingleJobAction(id));
      if (deleteSuccess && deleteSuccess === true) {
        dispatch(myJobLoadAction(user?._id));
      }
    }
  };

  const columns = [
    {
      field: "_id",
      headerName: "Job ID",
      width: 200,
      editable: true,
    },
    {
      field: "title",
      headerName: "Job name",
      width: 200,
    },
    {
      field: "user",
      headerName: "User",
      width: 200,
      valueGetter: (data) => data.row?.user?.firstName,
    },
    {
      field: "salary",
      headerName: "Salary",
      type: Number,
      width: 200,
      renderCell: (values) => "$" + values.row.salary,
    },

    {
      field: "Actions",
      width: 400,
      renderCell: (values) => (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: "10px",
          }}
        >
          <Button variant="contained">
            <Link
              style={{ color: "white", textDecoration: "none" }}
              to={`/employer/job/${values.row._id}/applicants`}
            >
              View Applicants
            </Link>
          </Button>
          <Button variant="contained">
            <Link
              style={{ color: "white", textDecoration: "none" }}
              to={`/employer/edit/job/${values.row._id}`}
            >
              Edit
            </Link>
          </Button>
          <Button
            onClick={(e) => deleteJobById(e, values.row._id)}
            variant="contained"
            color="error"
          >
            Delete
          </Button>
        </Box>
      ),
    },
  ];

  return (
    <Box>
      <Typography variant="h4" sx={{ color: "#222" }}>
        Jobs List
      </Typography>
      <Box sx={{ pb: 2, display: "flex", justifyContent: "right" }}>
        <Button variant="contained" color="success" startIcon={<AddIcon />}>
          <Link
            style={{ color: "white", textDecoration: "none" }}
            to="/employer/job/create"
          >
            Create Job
          </Link>
        </Button>
      </Box>
      <Paper sx={{ bgcolor: "secondary.midNightBlue" }}>
        <Box sx={{ height: 500, width: "100%" }}>
          <DataGrid
            getRowId={(row) => row._id}
            sx={{
              "& .MuiTablePagination-displayedRows": {
                color: "white",
              },
              color: "white",
              [`& .${gridClasses.row}`]: {
                bgcolor: (theme) => theme.palette.secondary.main,
              },
              button: {
                color: "#ffffff",
              },
            }}
            rows={data}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
          />
        </Box>
      </Paper>
    </Box>
  );
};

export default DashJobs;
