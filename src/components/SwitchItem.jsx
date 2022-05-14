import Icon from "./Icon";
import { Switch } from "@headlessui/react";
const SwitchItem = ({
  icon,
  type,
  onChange,
  primaryColor,
  bgColor,
  dBgColor,
  txtColor,
  dTxtColor,
}) => {
  return (
    <Switch
      checked={type}
      onChange={onChange}
      className={`${
        type ? primaryColor : bgColor + " " + dBgColor
      } relative inline-flex items-center h-6 rounded-full w-11 custom-shadow`}
    >
      <span className="sr-only">Enable notifications</span>
      <span
        className={`${
          type ? "translate-x-6 " + bgColor : "translate-x-1 " + primaryColor
        } inline-block w-4 h-4 transform  rounded-full custom-shadow`}
      >
        <Icon
          icon={icon}
          customClass={`h-4 ${
            type ? txtColor : dTxtColor ? dTxtColor : "text-dText"
          }  z-50`}
        />
      </span>
    </Switch>
  );
};

export default SwitchItem;
