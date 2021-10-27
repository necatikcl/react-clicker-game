import { useState } from "react";
import Dashboard from "./components/Dashboard";
import Main from "./components/Main";
import {
  UpgradeType,
  calculatePrice,
} from "./components/Dashboard/components/Upgrade";
import { upgradesRaw } from "./libraries/data";
import { print } from "./libraries/scripts";
import "./index.scss";

function App() {
  const [balance, setBalance] = useState(990);
  const [profit, setProfit] = useState(0);
  const [upgrades, setUpgrades] = useState<UpgradeType[]>([]);

  const purchaseUpgrade = (e: UpgradeType) => {
    const price = calculatePrice(e.profit, e.quantity);
    if (balance < price) {
      print("insufficient balance!", "error");
      return;
    }

    setUpgrades((upgrades) => {
      let upgrade = upgrades.find((upg) => upg.id === e.id);
      if (upgrade) {
        if (upgrade.quantity === 10) {
          print(
            `10x ${upgrade.title}" is sacrificed and you have gained an double profit!`,
            "success"
          );
          upgrade.quantity = 1;
          upgrade.profit *= 2;
        } else {
          upgrade.quantity = e.quantity + 1;
          print(
            `${upgrade.title}" purchased and now you have ${upgrade.quantity}x it`,
            "success"
          );
        }

        setBalance((old) => old - price);
      }
      let newProfit = 0;
      upgrades.forEach((item) => {
        if (item.quantity > 0) {
          newProfit += item.quantity * item.profit;
        }
      });

      setProfit(newProfit);

      return upgrades;
    });
  };

  const getPurchasables = (e: number, upgr: UpgradeType[]) => {
    return upgr.map((upg) => {
      let upgrade = { ...upg };
      upgrade.canPurchasable =
        e >= calculatePrice(upgrade.profit, upgrade.quantity);
      return upgrade;
    });
  };

  if (upgrades.length == 0) {
    setUpgrades(getPurchasables(balance, upgradesRaw));
  }

  const onBalanceChange = (e: number) => {
    setBalance(e);
    setUpgrades((upgrades) => getPurchasables(e, upgrades));
  };

  return (
    <div className="app">
      <Main
        balance={balance}
        profit={profit}
        onBalanceChange={onBalanceChange}
      />
      <Dashboard
        upgrades={upgrades}
        onPurchase={(e: UpgradeType) => purchaseUpgrade(e)}
      />
    </div>
  );
}

export default App;
