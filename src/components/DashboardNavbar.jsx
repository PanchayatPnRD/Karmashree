import { Karmashree_logo } from "./Logo";
import { Calc_permission } from "../functions/Permissions";
import emblem from "/assets/logo/biswa.png";
import { useState, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Dropdown, DropdownItem } from "./Dropdown";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { devApi } from "../WebApi/WebApi";
import { fetch } from "../functions/Fetchfunctions";
import classNames from "classnames";
import { useNetworkState } from "@uidotdev/usehooks";

export const DashboardNavbar = () => {
  const { online } = useNetworkState();
  const [permission, setPermission] = useState();
  const { userIndex, category } = JSON.parse(
    localStorage.getItem("karmashree_User")
  );

  const { data: userDetails, isSuccess } = useQuery({
    queryKey: ["userDetails"],
    queryFn: async () => {
      const data = await fetch.get("/api/user/viewuser/", userIndex);

      return data.data.result;
    },
  });

  const navigate = useNavigate();

  useEffect(() => {
    setPermission(
      Calc_permission(
        userDetails?.category,
        userDetails?.role_type,

        Boolean(parseInt(userDetails?.dno_status))
      )?.uniqueId
    );
  }, [userDetails]);

  const userTitle = useMemo(() => {
    if (permission == 1) return "Karmashree Admin";
    if (permission == 7) return userDetails?.deptName;
    if (permission == 12) return userDetails?.districtName;
    if (permission >= 13 && permission <= 17)
      return userDetails?.deptName + " " + userDetails?.districtName;
    if (permission >= 18 && permission <= 23)
      return userDetails?.deptName + " / " + userDetails?.districtName + " / " + userDetails?.subDivision;
    if (permission >= 24 && permission <= 29)
      return userDetails?.deptName + " / " + userDetails?.districtName + " / " + userDetails?.blockname;
    if (permission >= 30 && permission <= 35)
      return (
        userDetails?.districtName +
        " " +
        userDetails?.blockname +
        " " +
        userDetails?.gpName
      );
  }, [permission]);

  return (
    <>
      <div className="w-screen fixed top-0 left-0 z-30 bg-white shadow-lg">
        <div className="p-1 px-16 flex justify-between">
          <Link to={"/dashboard"} className="flex items-center space-x-2 w-fit">
            <div className="flex">
              <Karmashree_logo className="fill-blue-600 h-14 w-fit" />
              <img src={emblem} alt="" className="h-16" />
            </div>
            <div className="flex flex-col -space-y-1">
              <h1 className="capitalize font-semibold text-2xl tracking-tight">
                department of panchayats & rural development
              </h1>
              <h3 className="capitalize text-zinc-500">
                government of west bengal
              </h3>
            </div>
          </Link>

          <Dropdown
            Button={
              <div className="flex justify-center items-center">
                <div className="flex flex-col px-2">
                  <div className="text-lg font-bold text-end text-black">
                    {userDetails?.userName}
                    <UserDetails
                      category={userDetails?.category}
                      role={userDetails?.role_type}
                    />
                  </div>
                  <span className="text-sm text-end">
                    {userTitle}

                    {" #"}
                    {userIndex}
                  </span>
                </div>

                <Icon
                  className="text-7xl"
                  icon="lets-icons:user-cicrle-duotone"
                />
              </div>
            }
          >
            <div className="h-10 px-5 font-semibold flex-grow flex justify-start items-center">
              <label>{userDetails?.userId}</label>
            </div>
            <DropdownItem
              className="space-x-2"
              onClick={() => navigate("/dashboard/profile")}
            >
              <Icon
                className="text-2xl text-zinc-400"
                icon="material-symbols:settings"
              ></Icon>
              <span>Profile</span>
            </DropdownItem>
            <DropdownItem
              className="space-x-2"
              onClick={() => {
                navigate("/login", { state: "signout" });
                localStorage.setItem("karmashree_User","");
                localStorage.setItem("karmashree_AuthToken","");
              }}
            >
              <Icon
                className="text-2xl text-zinc-400"
                icon="material-symbols:logout"
              ></Icon>
              <span>Sign out</span>
            </DropdownItem>
          </Dropdown>
        </div>
        <div
          className={classNames(
            online ? "h-0" : "h-8",
            " bg-red-600 flex justify-center items-center text-white font-semibold transition-all duration-300"
          )}
        >
          {!online && "Your are offline"}
        </div>
      </div>
    </>
  );
};

const UserDetails = ({ role, category }) => {
  const cat = {
    HQ: "State",
    HD: "Department",
    DIST: "District",
    SUB: "Subdivision",
    BLOCK: "Block",
    GP: "Gram Panchayat",
  };
  const type = [ "Admin", "Operator", "PIA"]

  return <span className="text-zinc-700 text-base font-semibold">{` ( ${cat[category]}/${type[role-1]} ) `}</span>;
};
