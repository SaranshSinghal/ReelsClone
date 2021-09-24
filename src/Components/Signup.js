import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../Context/AuthProvider";
import { storage, database } from "../firebase";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const { signup, currentUser } = useContext(AuthContext);
  const history = useHistory();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      let res = await signup(email, password);
      let uid = res.user.uid;

      const uploadTaskListener = storage
        .ref(`users/${uid}/profileImage`)
        .put(file);

      uploadTaskListener.on(
        "state_changed",
        (snapshot) => {
          var progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          setError(error);
          setTimeout(() => setError(null), 2000);
          setLoading(false);
        },
        async () => {
          let downloadUrl =
            await uploadTaskListener.snapshot.ref.getDownloadURL();

          await database.users.doc(uid).set({
            email: email,
            userId: uid,
            username: name,
            createdAt: database.getCurrentTimeStamp(),
            profileUrl: downloadUrl,
            postIds: [],
          });

          setLoading(false);
          console.log("User has signed up");
          history.push("/");
        },
      );
    } catch (err) {
      setError(err);
      console.log(error);
      setTimeout(() => setError(null), 2000);
      setLoading(false);
    }
  };

  const handleFileSubmit = (e) => {
    let file = e.target.files[0];
    console.log(file);
    if (file !== null) setFile(file);
  };

  useEffect(() => {
    if (currentUser) history.push("/");
  }, []);

  return (
    <div>
      <form onSubmit={handleSignup}>
        <div>
          <label htmlFor="">UserName</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="profile">Profile image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileSubmit}
          ></input>
        </div>
        <button type="submit" disabled={loading}>
          SignUp
        </button>
      </form>
    </div>
  );
}

export default Signup;
