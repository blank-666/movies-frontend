import { FC, useEffect } from "react";
import { Switch, Typography } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../../services/service";
import { IApiVersion } from ".";

interface IApiSwitch {
  apiVersion: IApiVersion;
  setApiVersion: (v: IApiVersion) => void;
}

const ApiSwitch: FC<IApiSwitch> = ({ apiVersion, setApiVersion }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const onSwitchChange = (checked: boolean) => {
    const isVersion2 = checked;
    const version = isVersion2 ? 2 : 1;

    setApiVersion(version);
    localStorage.setItem("api-version", version.toString());
  };

  useEffect(() => {
    if (apiVersion) {
      const version = apiVersion || 1;
      const versionQuery = version === 2 ? "/v2" : "";

      axios.defaults.baseURL = `${process.env.REACT_APP_API_URL}${versionQuery}`;
      navigate(pathname);
    }
  }, [apiVersion]);

  return (
    <div className="api-switch-container">
      <Typography.Text>MongoDb</Typography.Text>
      <Switch
        checked={apiVersion === 2}
        onChange={onSwitchChange}
        className="api-switch-container__switch"
      />
      <Typography.Text>MySql</Typography.Text>
    </div>
  );
};

export default ApiSwitch;
