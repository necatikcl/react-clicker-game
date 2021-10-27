import { print } from "../../../libraries/scripts";

export interface UpgradeType {
  id: number;
  image: string;
  profit: number;
  title: string;
  quantity: number;
  canPurchasable: boolean;
}

interface Props extends UpgradeType {
  onPurchase: (e: UpgradeType) => void;
}

export function calculatePrice(profit: number, quantity: number) {
  let quantityMultiplier = 0.1 + quantity / 100;
  let multiplier = 10 + quantity * quantityMultiplier;

  // return 1;
  return profit * multiplier * (quantity === 10 ? 10 : 1);
}

export function goodNumber(num: number): string {
  const shorter = (num: number) => {
    let newNum: string | number = num;
    if (num % 1 !== 0) {
      newNum = num.toFixed(2);
    }
    return newNum;
  };
  const toSymbol = (divider: number, symbol: string) => {
    let res: string | number = num / divider;

    return shorter(res) + symbol;
  };
  const limits = [
    [1000000000000000, "Q"],
    [1000000000000, "T"],
    [1000000000, "B"],
    [1000000, "M"],
    [1000, "K"],
  ];
  for (var i = 0; i < limits.length; i++) {
    let limit = limits[i];
    if (num >= limit[0]) {
      return toSymbol(+limit[0], "" + limit[1]);
    }
  }
  return shorter(num) + "";
}

const purchase = (props: Props) => {
  if (!props.canPurchasable) return false;

  let propsSimplified = {
    id: props.id,
    image: props.image,
    title: props.title,
    profit: props.profit,
    quantity: props.quantity,
    canPurchasable: props.canPurchasable,
  };
  print(`Event is sent from Upgrade.tsx called ${props.title}`, "info");
  props.onPurchase(propsSimplified);
};
export default function Upgrade(props: Props) {
  const price = goodNumber(calculatePrice(props.profit, props.quantity));
  return (
    <button
      className={
        "upgrade" +
        (!props.canPurchasable ? " disabled" : "") +
        (props.quantity === 10 ? " ready-to-sacrifice" : "")
      }
      onClick={() => purchase(props)}
    >
      {props.quantity > 0 && <div className="quantity">{props.quantity}</div>}
      <img src={props.image} alt="" className="image" />
      <img
        src={props.image}
        alt=""
        className="image image-clone image-clone-top"
      />
      <img
        src={props.image}
        alt=""
        className="image image-clone image-clone-bottom"
      />
      <div className="text">
        <div className="title">Extra ${goodNumber(props.profit)}/click</div>
        <div className="value">{props.title}</div>
      </div>
      {props.quantity === 10 && (
        <div className="sacrifice">
          <div className="title">Sacrifice</div>
          <div className="value">Double the profit</div>
        </div>
      )}
      <div className="buy">${price}</div>
    </button>
  );
}
