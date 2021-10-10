import SearchPointerNode from "./SearchPointerNode";
import SortingControlBar from "./SortingControlBar";
import SortingNode from "./SortingNode";

export default function SortingNodeList(props) {
  return (
    <div>
      <SortingControlBar
        setAlgoID={props.setAlgoID}
        algoID={props.algoID}
        applySort={props.applySort}
        isAnimated={props.isAnimated}
      />
      <div className="searchNodeList">
        {props.collection.map((item, index) => {
          return (
            <div
              className="orderNode"
              key={index}
              style={{ order: item.order }}
            >
              <SearchPointerNode
                key={`pointer${index}`}
                left={-1}
                main={props.mainPointer}
                right={-1}
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
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
