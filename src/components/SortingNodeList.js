import SearchPointerNode from "./SearchPointerNode";
import SortingControlBar from "./SortingControlBar";
import SortingNode from "./SortingNode";

export default function SortingNodeList(props) {
  return (
    <div>
      <SortingControlBar setAlgoID={props.setAlgoID} />
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
                isLeftPos={false}
                isRightPos={false}
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
