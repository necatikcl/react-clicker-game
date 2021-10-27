import { print } from "../../../libraries/scripts";

export interface UpgradeType {
  id: number;
  image: string;
  profit: number;
  title: string;
  quantity: number;
  canPurchasable: boolean;
  sacrifice: number;
}

interface Props extends UpgradeType {
  onPurchase: (e: UpgradeType) => void;
}

export function calculatePrice(
  profit: number,
  quantity: number,
  sacrifice: number = 0
) {
  let quantityMultiplier = 0.1 + quantity / 100;
  let multiplier = 10 + quantity * quantityMultiplier;

  let finalResult = profit * multiplier * (quantity === 10 ? 10 : 1);
  if (sacrifice > 0) {
    finalResult += finalResult * (sacrifice / 2);
  }

  // return 1;
  return finalResult;
}

const digitLength = (num: number) => (Math.log(num) * Math.LOG10E + 1) | 0;
const shorter = (num: number) => (num % 1 !== 0 ? num.toFixed(2) : num + ".00");

export function goodNumber(number: number) {
  let compiledNumber = number;
  let shortedNumber = shorter(compiledNumber);

  let letters = ["K", "M", "B", "T", "Q", "A", "B", "C"];
  let zeros = digitLength(compiledNumber) - 1;
  if (zeros < 3) return shortedNumber;

  let symbol = letters[Math.floor(zeros / 3) - 1];
  let divider = +("1" + "0".repeat(Math.floor(zeros / 3) * 3));

  return shorter(compiledNumber / divider) + symbol;
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
    sacrifice: props.sacrifice,
  };
  print(`Event is sent from Upgrade.tsx called ${props.title}`, "info");
  props.onPurchase(propsSimplified);
};
export default function Upgrade(props: Props) {
  const price = goodNumber(
    calculatePrice(props.profit, props.quantity, props.sacrifice)
  );
  return (
    <button
      className={
        "upgrade" +
        (!props.canPurchasable ? " disabled" : "") +
        (props.quantity === 10 ? " ready-to-sacrifice" : "")
      }
      onClick={() => purchase(props)}
    >
      <div className="counters">
        {props.quantity > 0 && <div className="quantity">{props.quantity}</div>}
        {props.sacrifice > 0 && (
          <div className="quantity quantity-sacrifice">{props.sacrifice}</div>
        )}
      </div>
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
