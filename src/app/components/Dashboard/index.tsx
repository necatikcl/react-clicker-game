import { useState } from "react";
import Upgrade, { UpgradeType, calculatePrice } from "./components/Upgrade";
import "./index.scss";
interface Props {
  upgrades: UpgradeType[];
  onPurchase: (upg: UpgradeType) => void;
}

let i = 0;
export default function Dashboard(props: Props) {
  return (
    <div className="dashboard">
      {props.upgrades.map((upgrade) => (
        <Upgrade
          image={upgrade.image}
          title={upgrade.title}
          profit={upgrade.profit}
          quantity={upgrade.quantity}
          canPurchasable={upgrade.canPurchasable}
          key={upgrade.id}
          id={upgrade.id}
          onPurchase={(e: UpgradeType) => props.onPurchase(e)}
        />
      ))}
    </div>
  );
}
