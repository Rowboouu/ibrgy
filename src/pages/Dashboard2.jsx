import React, { useEffect, useReducer, useState } from "react";
import { useAuth } from "../auth/AuthContext";
import AdminDashboard from "../screens/admin/AdminDashboard";
import {
  getAllRequestForms,
  getNotifications,
  Timestamp,
} from "../api/services";
import Barangay from "./Barangay";
import AdminServices from "../screens/admin/AdminServices";
import Requests from "./Requests";
import Profile from "../screens/admin/Profile";
import AddDocuments from "../screens/admin/AddDocuments";
import RequestList from "../screens/admin/RequestList";
import { Alert, Snackbar } from "@mui/material";
import { UserAlert } from "../models/UserAlert";
import Notifications from "../screens/admin/Notifications";
import { onSnapshot } from "firebase/firestore";
import AdminContact from "./AdminContact";

function Dashboard2({
  profile,
  screen,
  setScreen,
  documents,
  notifs,
  requests,
  reads,
  rawRequests,
}) {
  const { alert, setAlert } = UserAlert();

  const screens = [
    {
      screen: "Dashboard",
      component: (
        <AdminDashboard
          profile={profile}
          setScreen={setScreen}
          documents={documents}
        />
      ),
    },
    { screen: "The Barangay", component: <Barangay setAlert={setAlert} /> },
    {
      screen: "Services",
      component: <AdminServices setAlert={setAlert} setScreen={setScreen} />,
    },
    {
      screen: "Requests",
      component: (
        <Requests
          setScreen={setScreen}
          documents={documents}
          forms={requests}
        />
      ),
    },
    { screen: "Contact Us", component: <AdminContact setAlert={setAlert} /> },
    {
      screen: "Profile > My Profile",
      component: (
        <Profile user={profile} setAlert={setAlert} rawRequests={rawRequests} />
      ),
    },
    {
      screen: "Home > Profile > Notifications",
      component: <Notifications notifs={notifs} reads={reads} />,
    },
  ];

  return (
    <>
      <div className="mt-16 flex flex-col w-full py-6 font-arimo text-[#1F2F3D]">
        <div className="w-[85%] h-full self-center">
          <h1 className="text-sm font-bold">
            {"Home > "}
            <span className="cursor-pointer hover:text-[#1B75BC]">
              {screen < 7
                ? screens[screen].screen
                : `Request > ${documents["documents"][screen - 7].name}`}
            </span>
          </h1>
          {screen < 7 ? (
            screens[screen].component
          ) : (
            <RequestList
              setAlert={setAlert}
              document={documents["documents"][screen - 7]}
              fetchState={requests["fetchState"]}
              forms={
                requests["requests"][documents["documents"][screen - 7].id] ||
                []
              }
              screen={screen}
            />
          )}
        </div>
        {alert.show && (
          <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            open={alert.show}
            autoHideDuration={alert.duration}
            onClose={() => {
              setAlert({ show: false });
            }}
          >
            <Alert severity={alert.type}>{alert.message}</Alert>
          </Snackbar>
        )}
      </div>
    </>
  );
}

export default Dashboard2;
