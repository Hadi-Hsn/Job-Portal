import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  editSingleJobAction,
  jobLoadSingleAction,
} from "../../redux/actions/jobAction";
import { useNavigate, useParams } from "react-router-dom";
import { EDIT_JOB_RESET } from "../../redux/constants/jobconstant";

const validationSchema = yup.object({
  title: yup.string("Enter a job title").required("title is required"),
  description: yup
    .string("Enter a description")
    .min(6, "Description should be of minimum 6 characters length")
    .required("Description is required"),
  salary: yup.number("Enter a salary").required("Salary is required"),
  location: yup.string("Enter a location").required("Location is required"),
});

const DashEditJob = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(jobLoadSingleAction(id));
    }
  }, [id]);

  const { singleJob } = useSelector((state) => state.singleJob);
  const { success } = useSelector((state) => state.updateJob);

  const formik = useFormik({
    initialValues: {
      _id: singleJob?._id,
      title: singleJob?.title,
      description: singleJob?.description,
      salary: singleJob?.salary,
      location: singleJob?.location,
      jobType: singleJob?.jobType,
    },
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: (values, actions) => {
      dispatch(editSingleJobAction(values));
      actions.resetForm();
    },
  });

  useEffect(() => {
    if (success && success === true) {
      setTimeout(() => {
        dispatch({ type: EDIT_JOB_RESET });
        navigate("/employer/jobs");
      }, 800);
    }
  }, [success && success]);

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pt: 4,
      }}
    >
      <Box
        onSubmit={formik.handleSubmit}
        component="form"
        className="form_style border-style"
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Typography variant="h5" component="h2" sx={{ pb: 3 }}>
            Edit Job
          </Typography>
          <TextField
            sx={{ mb: 3 }}
            fullWidth
            id="title"
            label="Title"
            name="title"
            InputLabelProps={{
              shrink: true,
            }}
            placeholder="Title"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
          />
          <TextField
            sx={{ mb: 3 }}
            fullWidth
            id="description"
            name="description"
            label="Description"
            type="text"
            InputLabelProps={{
              shrink: true,
            }}
            placeholder="Description"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.description && Boolean(formik.errors.description)
            }
            helperText={formik.touched.description && formik.errors.description}
          />
          <TextField
            sx={{ mb: 3 }}
            fullWidth
            id="salary"
            name="salary"
            label="Salary"
            type="text"
            InputLabelProps={{
              shrink: true,
            }}
            placeholder="Salary"
            value={formik.values.salary}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.salary && Boolean(formik.errors.salary)}
            helperText={formik.touched.salary && formik.errors.salary}
          />
          <TextField
            sx={{ mb: 3 }}
            fullWidth
            id="location"
            name="location"
            label="Location"
            type="text"
            InputLabelProps={{
              shrink: true,
            }}
            placeholder="Location"
            value={formik.values.location}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.location && Boolean(formik.errors.location)}
            helperText={formik.touched.location && formik.errors.location}
          />

          <Button fullWidth variant="contained" type="submit">
            Edit job
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default DashEditJob;
