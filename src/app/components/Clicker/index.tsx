import { print, useLocalStorage } from "../../libraries/scripts";
import { goodNumber } from "../Dashboard/components/Upgrade";
import "./index.scss";
interface Props {
  profit: number;
  balance: number;
  onClick: (num: number) => void;
  onPowerUp: () => void;
}
export default function Clicker(props: Props) {
  const [power, setPower] = useLocalStorage("click-power", 1);
  let i = (1 + props.profit) * power;

  const onClick = (e: any) => {
    if (!e.target.classList.contains("power-up")) {
      props.onClick(i);
    }
  };
  const increasePower = (e: any) => {
    if (props.profit > 1e12) {
      print(
        `Click power has increased to ${power + 1} by the sacrifice of all.`,
        "success"
      );
      setPower((power) => power + 1);
      props.onPowerUp();
    } else {
      print("Insufficient profit", "error");
    }
  };
  return (
    <button className="clicker" onClick={onClick}>
      <img src="click.png" alt="" className="image" />
      <img
        src="click.png"
        alt=""
        className="image image-clone image-clone-top"
      />
      <img
        src="click.png"
        alt=""
        className="image image-clone image-clone-bottom"
      />
      Click to get {goodNumber(i)}
      {props.profit > 1e12 && (
        <div className="power-up" onClick={increasePower}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path
              fill="currentColor"
              d="M272 480h-96c-13.3 0-24-10.7-24-24V256H48.2c-21.4 0-32.1-25.8-17-41L207 39c9.4-9.4 24.6-9.4 34 0l175.8 176c15.1 15.1 4.4 41-17 41H296v200c0 13.3-10.7 24-24 24z"
            />
          </svg>
          Power up — sacrifice all
        </div>
      )}
      {power > 1 && (
        <div className="current-power">
          Power: <b> {power}x</b>
        </div>
      )}
    </button>
  );
}
