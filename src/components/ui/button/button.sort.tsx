import { FC } from "react";
import classNames from "classnames";
import useWindowDimensions from "../../../hooks/useWindowDimensions";

import "./style.scss";

export type ISortTypes = "ascend" | "descend";

interface ISortButton {
  sortBy: string;
  sort: ISortTypes;
  setSort: React.Dispatch<React.SetStateAction<ISortTypes>>;
}

const SortButton: FC<ISortButton> = ({ sortBy, sort, setSort }) => {
  const { isMobile } = useWindowDimensions();

  const buttonClasses = classNames({
    "sort-button": true,
    ascend: sort === "ascend",
    descend: sort === "descend",
  });

  const changeSortHandler = () => {
    if (sort === "ascend") setSort("descend");
    else setSort("ascend");
  };

  return (
    <button className={buttonClasses} onClick={changeSortHandler}>
      {!isMobile ? <p className="sort-button__text">Sort by {sortBy}</p> : null}
      <div>
        <div className="sort-button__arrow-up" />
        <div className="sort-button__arrow-down" />
      </div>
    </button>
  );
};

export default SortButton;
