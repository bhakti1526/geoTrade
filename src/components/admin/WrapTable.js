import React, { useMemo } from "react";
import Link from "next/link";
import { Button } from "react-bootstrap";
import { useTable, useSortBy } from "react-table";

const WrapTable = ({ isLoading, title, column, columnData, bText = null }) => {
  const columns = useMemo(() => column, []);
  const data = useMemo(
    () => (columnData ? columnData.map((x, i) => ({ ...x, id: i + 1 })) : []),
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
      },
      useSortBy
    );

  if (typeof window === "undefined") return <></>;

  return (
    <div className="row">
      <div className="col-lg-12">
        <div className="card">
          <div className="card-header d-flex">
            <h4 className="card-title  text-capitalize">{title}</h4>

            {bText && (
              <Link href={`${window && window.location}/add`} passHref>
                <Button as="a" variant="outline-primary text-capitalize">
                  {bText}
                </Button>
              </Link>
            )}
          </div>
          <div className="card-body">
            <div className="table-responsive">
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
                  {rows.map((row) => {
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WrapTable;
