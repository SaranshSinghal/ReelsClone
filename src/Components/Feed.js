import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../Context/AuthProvider";
import { database } from "../firebase";
import CircularProgress from "@mui/material/CircularProgress";
import Header from "./Header";
import UploadFile from "./UploadFile";
import Posts from "./Posts";

function Feed() {
  const { currentUser } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const unsub = database.users.doc(currentUser.uid).onSnapshot((doc) => {
      setUserData(doc.data());
    });

    return unsub;
  }, [currentUser]);

  return (
    <>
      {userData === null ? (
        <CircularProgress />
      ) : (
        <>
          <Header />
          <div style={{ height: "1.5vh" }} />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div className="center" style={{ height: "86vh" }}>
              <UploadFile userData={userData} />
              <Posts userData={userData} />
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Feed;
