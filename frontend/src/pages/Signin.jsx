import { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Signin = () => {
  const [name, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return (
    <div className="bg-slate-300 sm:h-screen md:h-screen h-screen  flex justify-center">
      <div className="flex flex-col justify-center ">
        <div className="rounded-lg bg-white w-72 sm:w-80 md:w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign In"} />
          <SubHeading label={"Enter your credentials to access your account"} />

          <InputBox
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            placeholder="shreeram@gmail.com"
            label={"Email"}
          />
          <InputBox
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="12345678"
            label={"Password"}
          />
          <div className="pt-4">
            User User
            <Button
              onClick={async () => {
                try {
                  const response = await axios.post(
                    "https://paytm-app-4r9t.onrender.com/api/v1/user/signin",
                    {
                      userName: name,
                      password,
                    }
                  );

                  if (!localStorage.getItem("token")) {
                    console.log("sdjjr");
                    return;
                  }

                  localStorage.setItem("token", response.data.token);
                  const token = localStorage.getItem("token");
                  const anstoken = response.data.token;

                  if (token === anstoken) {
                    navigate("/dashboard");
                  } else {
                    console.log("dij");
                    navigate("/signup");
                  }
                } catch (error) {
                  alert("Didn't Signed Up so Signup first");
                  navigate("/signup");
                  console.error("Error occurred:", error);
                }
              }}
              label={"Sign In"}
            />
          </div>
          <BottomWarning
            label={"Don't you have an account"}
            buttonText={"Sign up"}
            to={"/signup"}
          />
        </div>
      </div>
    </div>
  );
};
