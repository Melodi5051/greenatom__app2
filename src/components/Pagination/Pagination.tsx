import React from "react";
import Button from "../Button/Button";
import style from "./Pagination.module.scss";
import { employeeStore } from "../../store/employee.store";

interface IPropsPagination {
  maxPages: number;
}
const Pagination = (maxPages: IPropsPagination) => {
  const handleSwapPage = (newPageNumber: number) => {
    employeeStore.setCurrentPage(newPageNumber);
  };
  return (
    <div className={style.wrapper}>
      {Array(maxPages.maxPages)
        .fill(0)
        .map((_, index: number) => (
          <div onClick={() => handleSwapPage(index)} key={index}>
            <Button viewtype="v2">{index + 1}</Button>
          </div>
        ))}
    </div>
  );
};

export default Pagination;
