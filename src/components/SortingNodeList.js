import SortPointerNode from "./SortPointerNode";
import SortingControlBar from "./SortingControlBar";
import SortingNode from "./SortingNode";

const customStyle = { flexWrap: "nowrap" };
const displayNode = { flexGrow: "1", flexShrink: "1", flexBasis: "1px" };

export default function SortingNodeList(props) {
  return (
    <div className="sortingDisplayWindow">
      <SortingControlBar
        setAlgoID={props.setAlgoID}
        algoID={props.algoID}
        applySort={props.applySort}
        isAnimated={props.isAnimated}
        stopAnimation={props.stopAnimation}
        resetPointers={props.resetPointers}
      />
      <div
        className="searchNodeList"
        style={{ ...(props.displayType === 1 ? customStyle : {}) }}
      >
        {props.collection.map((item, index) => {
          return (
            <div
              className="orderNode"
              key={index}
              style={{
                ...{ order: item.order },
                ...(props.displayType === 1 ? displayNode : {}),
              }}
            >
              <SortPointerNode
                key={`pointer${index}`}
                main={props.mainPointer}
                order={item.order}
                isMainPos={props.mainPointer === item.order}
                left={props.leftPointer}
                right={props.rightPointer}
              />
              <SortingNode
                value={item.value}
                order={item.order}
                state={item.state}
                blur={false}
                key={`node${index}`}
                displayType={props.displayType}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
