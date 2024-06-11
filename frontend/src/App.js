import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import UserDashboard from "./pages/employee/UserDashboard";
import EmployeeRoute from "./routes/EmployeeRoute";
import AdminRoute from "./routes/AdminRoute";
import Layout from "./pages/global/Layout";
import UserJobsHistory from "./pages/employee/UserJobsHistory";
import UserInfoDashboard from "./pages/employee/UserInfoDashboard";
import SingleJob from "./pages/SingleJob";
import DashUsers from "./pages/admin/DashUsers";
import DashJobsAdmin from "./pages/admin/DashJobs";
import DashJobsEmployer from "./pages/employer/DashJobs";
import DashCreateJob from "./pages/employer/DashCreateJob";
import DashEditJob from "./pages/employer/DashEditJob";
import OutsideCallConsumer from "react-outside-call";

import { createTheme } from "@mui/material/styles";
import { themeColors } from "./theme";
import { useDispatch } from "react-redux";
import { useEffect, useMemo } from "react";
import { outsideCallerConfig } from "./util/outsideCall";
import EmployerRoute from "./routes/EmployerRoute";
import { userProfileAction } from "./redux/actions/userAction";
import LoggedInRoute from "./routes/LoggedInRoute";
import DashJobApplicants from "./pages/employer/DashJobApplicants";

//HOC
const UserDashboardHOC = Layout(UserDashboard);
const UserJobsHistoryHOC = Layout(UserJobsHistory);
const UserInfoDashboardHOC = Layout(UserInfoDashboard);
const DashUsersHOC = Layout(DashUsers);
const DashJobsAdminHOC = Layout(DashJobsAdmin);
const DashJobsEmployerHOC = Layout(DashJobsEmployer);
const DashCreateJobHOC = Layout(DashCreateJob);
const DashAdminEditJobHOC = Layout(DashEditJob);
const DashJobApplicantsHOC = Layout(DashJobApplicants);
const HomeHOC = Layout(Home);
const SingleJobHOC = Layout(SingleJob);

const App = () => {
  const theme = useMemo(() => createTheme(themeColors("light")), []);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userProfileAction());
  }, []);

  return (
    <>
      <ToastContainer />
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <OutsideCallConsumer config={outsideCallerConfig}>
            <Routes>
              <Route path="/" element={<LogIn />} />
              <Route path="/login" element={<LogIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route
                path="/jobs"
                element={
                  <LoggedInRoute>
                    <HomeHOC />
                  </LoggedInRoute>
                }
              />
              <Route
                path="/jobs/search/location/:location"
                element={
                  <LoggedInRoute>
                    <HomeHOC />
                  </LoggedInRoute>
                }
              />
              <Route
                path="/jobs/search/:keyword"
                element={
                  <LoggedInRoute>
                    <HomeHOC />
                  </LoggedInRoute>
                }
              />
              <Route
                path="/job/:id/:applied"
                element={
                  <LoggedInRoute>
                    <SingleJobHOC />
                  </LoggedInRoute>
                }
              />

              <Route
                path="/admin/users"
                element={
                  <AdminRoute>
                    <DashUsersHOC />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/jobs"
                element={
                  <AdminRoute>
                    <DashJobsAdminHOC />
                  </AdminRoute>
                }
              />
              <Route
                path="/employer/jobs"
                element={
                  <EmployerRoute>
                    <DashJobsEmployerHOC />
                  </EmployerRoute>
                }
              />
              <Route
                path="/employer/job/create"
                element={
                  <EmployerRoute>
                    <DashCreateJobHOC />
                  </EmployerRoute>
                }
              />
              <Route
                path="/employer/edit/job/:id"
                element={
                  <EmployerRoute>
                    <DashAdminEditJobHOC />
                  </EmployerRoute>
                }
              />
              <Route
                path="/employer/job/:id/applicants"
                element={
                  <EmployerRoute>
                    <DashJobApplicantsHOC />
                  </EmployerRoute>
                }
              />
              <Route
                path="/employer/info"
                element={
                  <EmployerRoute>
                    <UserInfoDashboardHOC />
                  </EmployerRoute>
                }
              />
              <Route
                path="/employee/dashboard"
                element={
                  <EmployeeRoute>
                    <UserDashboardHOC />
                  </EmployeeRoute>
                }
              />
              <Route
                path="/employee/jobs"
                element={
                  <EmployeeRoute>
                    <UserJobsHistoryHOC />
                  </EmployeeRoute>
                }
              />
              <Route
                path="/employee/info"
                element={
                  <EmployeeRoute>
                    <UserInfoDashboardHOC />
                  </EmployeeRoute>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </OutsideCallConsumer>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
};

export default App;
