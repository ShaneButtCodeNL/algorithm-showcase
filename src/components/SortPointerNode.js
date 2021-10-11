import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faCaretLeft,
  faCaretRight,
} from "@fortawesome/free-solid-svg-icons";
const LeftCarat = <FontAwesomeIcon icon={faCaretRight} />;
const RightCarat = <FontAwesomeIcon icon={faCaretLeft} />;
const DownCarat = <FontAwesomeIcon icon={faArrowDown} />;

export default function SearchPointerNode(props) {
  return (
    <div
      className="searchNode searchPointerNode"
      style={{
        outlineColor: "transparent",
        textAlign: "center",
        maxHeight: "fit-content",
      }}
    >
      <div
        style={{
          visibility: props.left === props.order ? "visible" : "hidden",
        }}
      >
        {LeftCarat}
      </div>
      <div
        style={{
          visibility: props.main === props.order ? "visible" : "hidden",
        }}
      >
        {DownCarat}
      </div>
      <div
        style={{
          visibility: props.right === props.order ? "visible" : "hidden",
        }}
      >
        {RightCarat}
      </div>
    </div>
  );
}
