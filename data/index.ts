import { BsFillHddStackFill } from "react-icons/bs";
import { FaHandHoldingUsd, FaTruck } from "react-icons/fa";
import { FaMapLocationDot, FaMoneyBillWave } from "react-icons/fa6";
import { GiCardPickup } from "react-icons/gi";

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
    name: "my orders",
    path: "profile/orders",
    icon: BsFillHddStackFill,
  },
  {
    name: "my addresses",
    path: "profile/addresses",
    icon: FaMapLocationDot,
  },
];

export const steps = ["Cart", "Apply offer", "Address", "Payment"];

export const paymentMethods = [
  {
    type: "COD",
    icon: FaHandHoldingUsd,
  },
  {
    type: "ONLINE",
    icon: FaMoneyBillWave,
  },
];

export const fulfillmentTypes = [
  {
    type: "DELIVERY",
    icon: FaTruck,
  },
  {
    type: "PICKUP",
    icon: GiCardPickup,
  },
];
