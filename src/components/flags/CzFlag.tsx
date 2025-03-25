// No import needed
import { SvgIcon, SvgIconProps } from "@mui/material";

const CzFlag = (props: SvgIconProps) => {
  return (
    <SvgIcon {...props} viewBox="0 0 640 480">
      <path fill="#fff" d="M0 0h640v480H0z" />
      <path fill="#d7141a" d="M0 240h640v240H0z" />
      <path fill="#11457e" d="M0 0v480l240-240L0 0z" />
    </SvgIcon>
  );
};

export default CzFlag;
