import React, { useMemo } from "react";
import Link from "next/link";
import { Button } from "react-bootstrap";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  useAsyncDebounce,
  usePagination,
} from "react-table";

const WrapTable = ({
  userId,
  genInvoice,
  title,
  column,
  columnData,
  bText = null,
  cbText = null,
  invoice,
}) => {
  console.log("COLUMN DATA", columnData);

  const columns = useMemo(() => column, []);
  const data = useMemo(
    () => (columnData ? columnData.map((x, i) => ({ ...x, id: i + 1 })) : []),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    gotoPage,
    prepareRow,
    page,
    state,
    setGlobalFilter,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 100 },
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  console.log("STATE", state);
  const { pageIndex, pageSize } = state;

  if (typeof window === "undefined") return <></>;

  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 1000);

  return (
    <div className="row">
      <div className="col-lg-12">
        <div className="card">
          <div className="card-header d-flex">
            <h4 className="card-title  text-capitalize">{title}</h4>
            {/* <input
              placeholder="search something"
              className="form-control w-25 rounded-pill"
              onChange={(e) => {
                onChange(e.target.value);
              }}
            /> */}
            {cbText && (
              <Link
                href={`${
                  window && window.location.pathname
                }/add?userId=${userId}`}
                passHref
              >
                <Button as="a" variant="outline-primary text-capitalize">
                  {cbText}
                </Button>
              </Link>
            )}
            {invoice && (
              <Button
                as="a"
                variant="outline-primary text-capitalize"
                onClick={genInvoice}
              >
                {invoice}
              </Button>
            )}
            {bText && (
              <Link href={`${window && window.location.pathname}/add`} passHref>
                <Button as="a" variant="outline-primary text-capitalize">
                  {bText}
                </Button>
              </Link>
            )}
          </div>
          <div className="card-body">
            <div className="d-flex justify-content-end align-items-center">
              <div id="example_filter" className="dataTables_filter mb-2">
                <label className="d-flex align-items-center">
                  <span className="mr-2">Search:</span>
                  <input
                    placeholder="search something"
                    className="form-control"
                    onChange={(e) => {
                      onChange(e.target.value);
                    }}
                  />
                </label>
              </div>
            </div>
            <div className="table-responsive">
              <div className="dataTables_wrapper">
                <table
                  className="table table-responsive-md text-center"
                  {...getTableProps()}
                >
                  <thead>
                    {headerGroups.map((headerGroup) => (
                      <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                          <th
                            {...column.getHeaderProps(
                              column.getSortByToggleProps()
                            )}
                          >
                            {column.render("Header")}
                            {column.isSorted ? (
                              column.isSortedDesc ? (
                                <img src="/images/sort_desc.png" alt="desc" />
                              ) : (
                                <img src="/images/sort_asc.png" alt="asc" />
                              )
                            ) : (
                              <img src="/images/sort_both.png" alt="both" />
                            )}
                          </th>
                        ))}
                      </tr>
                    ))}
                  </thead>

                  <tbody {...getTableBodyProps()}>
                    {page.map((row) => {
                      prepareRow(row);
                      return (
                        <tr {...row.getRowProps()}>
                          {row.cells.map((cell) => (
                            <td {...cell.getCellProps()}>
                              {cell.render("Cell")}
                            </td>
                          ))}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <div className="d-flex d-flex justify-content-between align-items-center">
                  <div className="dataTables_info">
                    Page {pageIndex + 1} of {pageOptions.length}
                  </div>

                  <div className="dataTables_paginate paging_simple_numbers">
                    <div
                      className="paginate_button previous disabled c-pointer"
                      onClick={() => previousPage()}
                      disabled={!canPreviousPage}
                    >
                      Previous
                    </div>
                    <span>
                      {Array(pageOptions.length)
                        .fill("_")
                        .map((page, i) => (
                          <a
                            className={`paginate_button c-pointer ${
                              i === pageIndex ? "current" : ""
                            }`}
                            onClick={() => gotoPage(i)}
                            key={i}
                          >
                            {i + 1}
                          </a>
                        ))}
                    </span>
                    <div
                      className="paginate_button next c-pointer"
                      onClick={() => nextPage()}
                      disabled={!canNextPage}
                    >
                      Next
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WrapTable;
