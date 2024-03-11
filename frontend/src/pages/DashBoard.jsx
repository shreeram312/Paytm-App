import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";

export const DashBoard = () => {
  return (
    <div>
      <Appbar to={"/signup"} />

      <div className="m-3 md:p-4 p-3 bg-slate-300">
        <Balance value={"10,000"} />
        <Users />
      </div>
    </div>
  );
};
