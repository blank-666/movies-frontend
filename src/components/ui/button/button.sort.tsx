import { FC } from "react";
import classNames from "classnames";

import "./style.scss";

export type ISortTypes = "ascend" | "descend";

interface ISortButton {
  sortBy: string;
  sort: ISortTypes;
  setSort: React.Dispatch<React.SetStateAction<ISortTypes>>;
}

const SortButton: FC<ISortButton> = ({ sortBy, sort, setSort }) => {
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
      <p className="sort-button__text">Sort by {sortBy}</p>
      <div>
        <div className="sort-button__arrow-up" />
        <div className="sort-button__arrow-down" />
      </div>
    </button>
  );
};

export default SortButton;
