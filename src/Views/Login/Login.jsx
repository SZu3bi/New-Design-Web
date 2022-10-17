import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { showError, showSuccess } from "../../Helper/Tostify.Helper";
import { FormControl, InputAdornment, TextField } from "@material-ui/core";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { configlogin } from "../../config/configlogin";
import { useHistory } from "react-router-dom";
import "./Login.scss";
import { Spinner } from "../../Component/SpinnerComponent/Spinner";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

export const Login = () => {
  const h = useHistory();

  const [tokenapi, settokenapi] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const [cmp, setcmp] = useState(true);

  const [states, setStates] = useState({
    username: "samjad@gmail.com",
    password: "Cover1122",
    token: "",
    showPassword: false,
    username2: "Zaid-Lawi@gmail.com",
    password2: "Zaid1122",
    token2: "",
    showPassword2: false,
  });

  const login = useCallback(async (e) => {
    e.preventDefault();
    if (states.username === "Zaid-Lawi@gmail.com") {
      axios
        .post(
          `${configlogin.server_address}?grant_type=${configlogin.RESPONSE_TYPE}&client_id=${configlogin.CLIENT_ID}&client_secret=${configlogin.client_Secret}&username=${states.username}&password=${states.password}k89xVUWApVLgGwWulAcb336Kd`
        )
        .then((response) => {
          settokenapi(response.data.access_token);
          localStorage.setItem("tokenapi", JSON.stringify(tokenapi));
          console.log(response.data.access_token);
          console.log(retrievedObject);
          setTimeout(() => {
            h.push("/Contact");
          }, 1000);
          showSuccess("Login Successfully");
          setIsLoading(true);
        })

        .catch((error) => {
          console.log(error, "error");
          showError("Login Fail");

          console.error(error);
        });
    } else {
      axios
        .post(
          `${configlogin.server_address}?grant_type=${configlogin.RESPONSE_TYPE}&client_id=${configlogin.CLIENT_ID}&client_secret=${configlogin.client_Secret}&username=${states.username}&password=${states.password}amT78fpsBV2H2idIDkyLMGAP6`
        )
        .then((response) => {
          settokenapi(response.data.access_token);
          localStorage.setItem("tokenapi", JSON.stringify(tokenapi));
          setTimeout(() => {
            h.push("/Contact");
          }, 1000);
          showSuccess("Login Successfully");
          setIsLoading(true);
        })
        .catch((error) => {
          console.log(error, "error");
          showError("Login Fail");

          console.error(error);
        });
    }
  });

  const logout = () => {
    localStorage.removeItem("tokenapi");

    setStates({
      username: "",
      password: "",
    });
  };

  const closeHome = () => {
    setcmp(true);
  };

  useEffect(() => {
    if (tokenapi !== undefined)
      localStorage.setItem("tokenapi", JSON.stringify(tokenapi));

    // localStorage.getItem("tokenapi");
  }, [tokenapi]);

  var retrievedObject = localStorage.getItem("tokenapi");

  const handleChange = (prop) => (event) => {
    setStates({ ...states, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setStates({
      ...states,
      showPassword: !states.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <Spinner isActive={isLoading} isAbsolute />

      {cmp ? (
        <div class="session">
          <ToastContainer />

          <div class="left"></div>
          <form action="" class="log-in" autocomplete="off">
            <h4>
              We are <span>SalesForce</span>
            </h4>
            <p>Welcome back! Log in to your account to view today's clients:</p>
            <div class="floating-label">
              <TextField
                label="Email"
                value={states.username}
                onChange={(event) => {
                  setStates((item) => ({
                    ...item,
                    username: event.target.value,
                  }));
                }}
              />
            </div>
            <div class="floating-label">
              <FormControl>
                <TextField
                  id="outlined-search"
                  label="Password"
                  variant="outlined"
                  type={states.showPassword ? "text" : "password"}
                  value={states.password}
                  onChange={handleChange("password")}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <VisibilityIcon
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {states.showPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </VisibilityIcon>
                      </InputAdornment>
                    ),
                  }}
                />
              </FormControl>
            </div>
            <button type="submit" onClick={login}>
              Log in
            </button>
          </form>
        </div>
      ) : (
        <div>Empty</div>
      )}
    </div>
  );
};
