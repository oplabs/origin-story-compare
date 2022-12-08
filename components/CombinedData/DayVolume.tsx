import { FunctionComponent } from "react";

interface DayVolumeProps {
  projectADayVolume: number;
  projectBDayVolume: number;
}

const DayVolume: FunctionComponent<DayVolumeProps> = ({
  projectADayVolume = 1,
  projectBDayVolume = 2,
}) => {
  return null;
};

export { DayVolume };
