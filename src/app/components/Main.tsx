import { useState } from "react";
import Wallet from "./Wallet";
import Clicker from "./Clicker";

interface Props {
  balance: number;
  profit: number;
  onBalanceChange: (num: number) => void;
}

export default function Wrapper(props: Props) {
  const updateBalance = (e: number) => {
    let calc = props.balance + e;
    props.onBalanceChange(calc);
  };

  return (
    <div>
      <Wallet profit={props.profit} balance={props.balance} />
      <Clicker profit={props.profit} onClick={updateBalance} />
      <div className="absolute text-left bottom-4 left-4">
        balance is {props.balance} <br />
        profit is {props.profit} <br />
      </div>
    </div>
  );
}
