import { FaUser } from "react-icons/fa";
import { BsFillHddStackFill } from "react-icons/bs";
import { FaMapLocationDot } from "react-icons/fa6";

export const navitems = [
  {
    name: "categories",
    path: "categories",
  },
  {
    name: "products",
    path: "products",
  },
  {
    name: "contact",
    path: "",
  },
];

export const profileNavItems = [
  {
    name: "my profile",
    path: "profile",
    icon: FaUser,
  },
  {
    name: "my orders",
    path: "profile/orders",
    icon: BsFillHddStackFill,
  },
  {
    name: "my addresses",
    path: "profile/address",
    icon: FaMapLocationDot,
  },
];
