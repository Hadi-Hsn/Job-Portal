import React, { useEffect } from "react";
import { Box, Button, Paper, Typography } from "@mui/material";
import { DataGrid, gridClasses, GridToolbar } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import {
  allUserAction,
  deleteUserAction,
} from "../../redux/actions/userAction";

const DashUsers = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(allUserAction());
  }, []);

  const { users } = useSelector((state) => state.allUsers);

  let data = [];
  data = users !== undefined && users.length > 0 ? users : [];

  const deleteUserById = (e, id) => {
    if (window.confirm(`You really want to delete user: "${id}" ?`)) {
      dispatch(deleteUserAction(id));
    }
  };

  const columns = [
    {
      field: "_id",
      headerName: "User ID",
      width: 250,
      editable: true,
    },

    {
      field: "email",
      headerName: "E_mail",
      width: 250,
    },

    {
      field: "role",
      headerName: "User Role",
      width: 250,
      renderCell: (params) =>
        params.row.role === 2
          ? "Admin"
          : params.row.role === 1
          ? "Employer"
          : "Employee",
    },

    {
      field: "createdAt",
      headerName: "Creation date",
      width: 250,
      renderCell: (params) =>
        moment(params.row.createdAt).format("YYYY-MM-DD HH:MM:SS"),
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
          {values.row.role === 2 ? (
            ""
          ) : (
            <Button
              onClick={(e) => deleteUserById(e, values.row._id)}
              variant="contained"
              color="error"
            >
              Delete
            </Button>
          )}
        </Box>
      ),
    },
  ];

  return (
    <>
      <Box>
        <Typography variant="h4" sx={{ color: "#222", pb: 3 }}>
          All Users
        </Typography>

        <Paper sx={{ bgcolor: "secondary.midNightBlue" }}>
          <Box sx={{ height: 500, width: "100%" }}>
            <DataGrid
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
              getRowId={(row) => row._id}
              rows={data}
              columns={columns}
              pageSize={3}
              rowsPerPageOptions={[3]}
            />
          </Box>
        </Paper>
      </Box>
    </>
  );
};

export default DashUsers;
