import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";

import { Label, Input, Button } from "@windmill/react-ui";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { context } from "../App";

const namePattern = /^[A-Za-z]+\s[A-Za-z]+$/;
const emailPattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

function Login({ type }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");

  const [error, setError] = useState("");

  const { setIsAdmin } = useContext(context);

  const history = useHistory();

  async function handleNormalSubmit(e) {
    e.preventDefault();
    if (namePattern.test(username) || emailPattern.test(username)) {
      setError("");
      console.log({ username, password });
      try {
        const response = await fetch("http://localhost:4000/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: username, password }),
        });

        const data = await response.json();
        if (data.error) {
          setError(data.error);
        } else {
          alert("Login successfully");
          setIsAdmin(true);
          history.push("/app");
        }
      } catch (e) {
        console.log(e.message);
      }
    } else setError("Invalid username");
  }

  async function handleAdminSubmit(e) {
    e.preventDefault();
    setError("");
    console.log({ username, password });
    try {
      alert("admin login successfull");
      setIsAdmin(true);
      history.push("/admin/app");
    } catch (e) {
      console.log(e.message);
    }
  }

  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 h-full max-w-2xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800 md:w-1/2">
        <main className="flex items-center justify-center p-6 sm:p-12">
          <div className="w-full">
            <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
              {type === "admin" ? "Admin Login" : "Login"}
            </h1>

            {type === "admin" ? (
              <form onSubmit={handleAdminSubmit}>
                <Label>
                  <spaUsernamen>Email</spaUsernamen>
                  <Input
                    className="mt-1"
                    type="email"
                    placeholder="john@doe.com"
                    onChange={(e) => setAdminEmail(e.target.value)}
                    required
                    value={adminEmail}
                  />
                </Label>

                <Label className="mt-4">
                  <span>Password</span>
                  <Input
                    className="mt-1"
                    type="password"
                    placeholder="***************"
                    required
                    onChange={(e) => setAdminPassword(e.target.value)}
                    value={adminPassword}
                  />
                </Label>

                {error !== "" && <p className="text-red-500">{error}</p>}

                {/* tag={Link} to="/app" */}

                <Button className="mt-4" block type="submit">
                  Log in
                </Button>

                <hr className="my-8" />

                <p className="mt-4">
                  <Link
                    className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
                    to="/forgot-password"
                  >
                    Forgot your password?
                  </Link>
                </p>
              </form>
            ) : (
              <form onSubmit={handleNormalSubmit}>
                <Label>
                  <span>Username</span>
                  <Input
                    className="mt-1"
                    type="text"
                    placeholder="john@doe.com | Full name"
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    value={username}
                  />
                </Label>

                <Label className="mt-4">
                  <span>Password</span>
                  <Input
                    className="mt-1"
                    type="password"
                    placeholder="***************"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                  />
                </Label>

                {error !== "" && <p className="text-red-500">{error}</p>}

                {/* tag={Link} to="/app" */}

                <Button className="mt-4" block type="submit">
                  Log in
                </Button>

                <hr className="my-8" />

                <p className="mt-4">
                  <Link
                    className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
                    to="/forgot-password"
                  >
                    Forgot your password?
                  </Link>
                </p>
              </form>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Login;
