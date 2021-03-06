import { useState } from "react";
import Dashboard from "./components/Dashboard";
import Main from "./components/Main";
import {
  UpgradeType,
  calculatePrice,
} from "./components/Dashboard/components/Upgrade";
import { upgradesRaw } from "./libraries/data";
import { print, useLocalStorage } from "./libraries/scripts";
import "./index.scss";

function App() {
  const [oldBalance, setOldBalance] = useLocalStorage("balance", 0);
  const [balance, setBalance] = useLocalStorage("balance", 0);
  const [profit, setProfit] = useLocalStorage("profit", 0);
  const [upgrades, setUpgrades] = useLocalStorage<UpgradeType[]>(
    "upgrades",
    []
  );

  const purchaseUpgrade = (e: UpgradeType) => {
    const price = calculatePrice(e.profit, e.quantity, e.sacrifice);
    if (balance < price) {
      print("insufficient balance!", "error");
      return;
    }

    setUpgrades((upgrades) => {
      let upgrade = upgrades.find((upg) => upg.id === e.id);
      if (upgrade) {
        if (upgrade.quantity === 10) {
          print(
            `10x "${upgrade.title}" is sacrificed and you have gained an double profit!`,
            "success"
          );
          upgrade.sacrifice++;
          upgrade.quantity = 1;
          upgrade.profit *= 2;
        } else {
          upgrade.quantity += 1;
          print(
            `${upgrade.title}" purchased and now you have ${upgrade.quantity}x it`,
            "success"
          );
        }

        setBalance((old) => old - price);
        setOldBalance(balance);
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

  // @ts-ignore
  Window.admin = {
    setBalance: (amount: number) => {
      setBalance(amount);

      return print(`Balance is set to ${amount}`, "success");
    },
    setProfit: (amount: number) => {
      setProfit(amount);

      return print(`Profit is set to ${amount}`, "success");
    },
    restart: () => {
      window.localStorage.clear();
      location.reload();
    },
  };

  const getPurchasables = (e: number, upgr: UpgradeType[]) => {
    return upgr.map((upg) => {
      let upgrade = { ...upg };
      upgrade.canPurchasable =
        e >=
        calculatePrice(upgrade.profit, upgrade.quantity, upgrade.sacrifice);
      return upgrade;
    });
  };

  if (upgrades.length == 0 || balance !== oldBalance) {
    setOldBalance(balance);
    setUpgrades(
      getPurchasables(balance, balance !== oldBalance ? upgrades : upgradesRaw)
    );
  }
  const onBalanceChange = (e: number) => {
    setBalance(e);
    setOldBalance(balance);
    setUpgrades((upgrades) => getPurchasables(e, upgrades));

    console.log("CLICK");
  };
  const onPowerUp = () => {
    setOldBalance(0);
    setBalance(0);
    setProfit(0);
    setUpgrades(getPurchasables(0, upgradesRaw));
    console.log("POWERUP");
  };

  return (
    <div className="app">
      <Main
        balance={balance}
        profit={profit}
        onBalanceChange={onBalanceChange}
        onPowerUp={onPowerUp}
      />
      <Dashboard
        upgrades={upgrades}
        onPurchase={(e: UpgradeType) => purchaseUpgrade(e)}
      />

      {/* <div className="absolute text-left text-white bottom-4 left-4">
        Real profit is {profit} <br></br>
        Real balance is {balance}
      </div> */}
    </div>
  );
}

export default App;
