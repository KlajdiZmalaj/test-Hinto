import { usePagination, DOTS } from "./usePagination";
import "./pagination.scss";
const Pagination = (props: any) => {
  const { onPageChange, totalCount, siblingCount = 2, currentPage, pageSize } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  }) as any;

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  //
  // console.log("ca ka currentPage", paginationRange, currentPage);

  return (
    <ul className={"pagination-container pagination-bar"}>
      {/* Left navigation arrow */}
      <li className={"pagination-item" + (currentPage === 1 ? " disabled" : "")} onClick={onPrevious}>
        <div className="arrow left" />
      </li>
      {paginationRange.map((pageNumber = 0 as any) => {
        // If the pageItem is a DOT, render the DOTS unicode character
        console.log("pageNumber", pageNumber);

        if (pageNumber === DOTS) {
          return <li className="pagination-item dots">&#8230;</li>;
        }

        // Render our Page Pills
        return (
          <li
            className={"pagination-item" + (pageNumber - 1 === currentPage ? " selected" : "")}
            onClick={() => onPageChange(pageNumber - 1)}
          >
            {pageNumber}
          </li>
        );
      })}
      {/*  Right Navigation arrow */}
      <li className={"pagination-item" + (currentPage === lastPage ? " disabled" : "")} onClick={onNext}>
        <div className="arrow right" />
      </li>
    </ul>
  );
};

export default Pagination;
