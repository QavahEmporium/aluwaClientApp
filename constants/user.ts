import { Key, User } from "lucide-react";

export const registerFormData = [
  {
    name: "username",
    label: "Username",
    placeholder: "E.g johnDoe, johndoe@gmail.com, 061 234 5678, etc...",
    Icon: User,
    bgColour: "bg-gray-50",
    isRequired: true,
  },
  {
    name: "contactNumber",
    label: "Phone Number (WhatsApp)",
    placeholder: "E.g 0677123123123",
    bgColour: "bg-gray-50",
    isPhoneNumber: true,
    isRequired: true,
  },
  {
    label: "Password",
    type: "password",
    name: "password",
    placeholder: "Password",
    Icon: Key,
    bgColour: "bg-gray-50",
    isRequired: true,
    isPassword: true,
  },
  {
    label: "Confirm Password",
    type: "password",
    name: "confirmPassword",
    placeholder: "Confirm Password",
    Icon: Key,
    bgColour: "bg-gray-50",
    isRequired: true,
    isPassword: true,
  },
];
