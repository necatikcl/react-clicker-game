import "./index.scss";
interface Props {
  profit: number;
  onClick: (num: number) => void;
}
export default function Clicker(props: Props) {
  let i = ~~(1 + props.profit);
  return (
    <button className="clicker" onClick={() => props.onClick(i)}>
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
      Click to get {i}
    </button>
  );
}
