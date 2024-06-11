import React, { useEffect } from "react";
import { Box, Button, Paper, Typography } from "@mui/material";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteSingleJobAction,
  jobLoadAction,
} from "../../redux/actions/jobAction";

const DashJobs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(jobLoadAction());
  }, []);

  const { success: deleteSuccess } = useSelector((state) => state.deleteJob);
  const { jobs } = useSelector((state) => state.loadJobs);
  let data = [];
  data = jobs !== undefined && jobs.length > 0 ? jobs : [];

  const deleteJobById = (e, id) => {
    if (window.confirm(`You really want to delete product ID: "${id}" ?`)) {
      dispatch(deleteSingleJobAction(id));
      if (deleteSuccess && deleteSuccess === true) {
        dispatch(jobLoadAction());
      }
    }
  };

  const columns = [
    {
      field: "_id",
      headerName: "Job ID",
      width: 250,
      editable: true,
    },
    {
      field: "title",
      headerName: "Job name",
      width: 250,
    },
    {
      field: "user",
      headerName: "Employer",
      width: 250,
      valueGetter: (data) => data.row?.user?.firstName,
    },
    {
      field: "salary",
      headerName: "Salary",
      type: Number,
      width: 250,
      renderCell: (values) => "$" + values.row.salary,
    },

    {
      field: "Actions",
      width: 200,
      renderCell: (values) => (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "170px",
          }}
        >
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
      <Typography variant="h4" sx={{ color: "#222", pb: 3 }}>
        All Jobs
      </Typography>

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
