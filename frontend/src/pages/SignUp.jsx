import { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export const SignUp = () => {
  const [firstName, setFirstName] = useState("Shreeram Mutukundu");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return (
    <div className="bg-slate-300 sm:h-screen md:h-screen h-screen  flex justify-center">
      <div className="flex flex-col justify-center ">
        <div className="rounded-lg bg-white w-72 sm:w-80 md:w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign Up"} />
          <SubHeading label={"Enter your credentials to access your account"} />
          <InputBox
            onChange={(e) => {
              setFirstName(e.target.value);
              console.log(firstName);
            }}
            placeholder={firstName}
            label={"FirstName"}
          />
          <InputBox
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            placeholder="Mutukundu"
            label={"LastName"}
          />
          <InputBox
            onChange={(e) => {
              setUserName(e.target.value);
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
            <Button
              onClick={async () => {
                const response = await axios.post(
                  "https://paytm-app-4r9t.onrender.com/api/v1/user/signup",
                  {
                    userName,
                    firstName,
                    lastName,
                    password,
                  }
                );

                if (response) {
                  navigate("/signin");
                }
              }}
              label={"Sign Up"}
            />
          </div>
          <BottomWarning
            label={"Already have an account"}
            buttonText={"Sign in"}
            to={"/signin"}
          />
        </div>
      </div>
    </div>
  );
};
