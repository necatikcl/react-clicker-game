import "./index.scss";
import { goodNumber } from "./../Dashboard/components/Upgrade";
interface Props {
  balance: number;
  profit: number;
}
export default function Wallet(props: Props) {
  return (
    <div className="wallet">
      <div className="content">
        <div className="balance">
          <div className="title">Current wealth</div>
          <div className="value">
            <span className="dollar">$</span>
            {goodNumber(props.balance)}
          </div>
        </div>
      </div>
    </div>
  );
}
