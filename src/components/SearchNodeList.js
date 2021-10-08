import SearchControlBar from "./SearchControlBar";
import SearchNode from "./SearchNode";
import SearchPointerNode from "./SearchPointerNode";

export default function SearchNodeList(props) {
  return (
    <div className="searchNodeListContainer">
      <SearchControlBar
        searchValue={props.searchValue}
        setSearchValue={props.setSearchValue}
        algoID={props.algoID}
        setAlgoID={props.setAlgoID}
        jumpSize={props.jumpSize}
        setJumpSize={props.setJumpSize}
        applySearch={props.applySearch}
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
                left={props.leftPos}
                main={props.mainPos}
                right={props.rightPos}
                order={item.order}
                isMainPos={props.mainPos === item.order}
                isLeftPos={props.leftPos === item.order}
                isRightPos={props.rightPos === item.order}
              />
              <SearchNode
                value={item.value}
                order={item.order}
                state={item.state}
                blur={
                  item.order < props.leftPos ||
                  (item.order > props.rightPos && props.rightPos !== -1)
                }
                key={`node${index}`}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
