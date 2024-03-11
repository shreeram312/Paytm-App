import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";

export const SignUp = () => {
  return (
    <div className="bg-slate-300 sm:h-screen md:h-screen h-screen  flex justify-center">
      <div className="flex flex-col justify-center ">
        <div className="rounded-lg bg-white w-72 sm:w-80 md:w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign Up"} />
          <SubHeading label={"Enter your credentials to access your account"} />
          <InputBox placeholder="Shreeram" label={"FirstName"} />
          <InputBox placeholder="Mutukundu" label={"LastName"} />
          <InputBox placeholder="shreeram@gmail.com" label={"Email"} />
          <InputBox placeholder="12345678" label={"Password"} />
          <div className="pt-4">
            <Button label={"Sign Up"} />
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
