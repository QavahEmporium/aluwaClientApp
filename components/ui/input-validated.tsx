import React, { useState } from "react";
import { UseFormRegister } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";

const Input = ({
  type,
  label,
  name,
  placeholder,
  isPhoneNumber,
  isPassword,
  register,
  Icon,
  errors,
  stateError,
  bgColour,
  isPending,
  isRequired,
  min,
  max,
}: {
  type?: string;
  label: string;
  name: string;
  placeholder?: string;
  isPhoneNumber?: boolean;
  isPassword?: boolean;
  register: UseFormRegister<any>;
  Icon?: any;
  errors?: any;
  stateError?: any;
  bgColour: string;
  isPending?: boolean;
  isRequired?: boolean;
  min?: string;
  max?: string;
}) => {
  const disabledBgColour = "bg-gray-100";
  const [isShow, setIsShow] = useState(false);
  const [typeName, setTypeName] = useState(type);

  return (
    <div className="flex flex-col my-3">
      <div className="flex gap-1">
        <label className="font-mono text-turquoise-900" htmlFor="">
          {label}
        </label>
        {isRequired && <p className="font-mono text-pinklet-500">*</p>}
      </div>

      <div
        className={`flex items-center gap-1 px-4 rounded-xl ${
          isPending ? disabledBgColour : bgColour
        } overflow-hidden shadow-md`}
      >
        {Icon && <Icon size={20} className="text-gray-400" />}

        {isPhoneNumber && <div className="text-gray-600">+27</div>}

        <input
          placeholder={placeholder}
          className={`w-full h-10 border-none focus:outline-none focus:ring-0 text-black ${
            isPending ? disabledBgColour : bgColour
          }`}
          type={typeName ? typeName : "text"}
          disabled={isPending}
          {...register(name)}
          min={min ? min : ""}
          max={max ? max : ""}
        />

        {isPassword &&
          (isShow ? (
            <EyeOff
              className="text-gray-400"
              onClick={() => {
                setIsShow(false);
                setTypeName("password");
              }}
            />
          ) : (
            <Eye
              className="text-gray-400"
              onClick={() => {
                setIsShow(true);
                setTypeName("text");
              }}
            />
          ))}
      </div>
      {errors && errors[name] && (
        <span className="text-pinklet-500">{errors[name]?.message}</span>
      )}
      {stateError && (
        <span className="text-pinklet-500">{stateError[name]}</span>
      )}
    </div>
  );
};

export default Input;
