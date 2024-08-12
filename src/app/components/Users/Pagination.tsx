import { User } from '../../models/User';


import React from 'react';

interface PaginationControlProps {
      table: any;
}

export const PaginationControl: React.FC<PaginationControlProps> = ({ table }) => {
      return (
            <div className="flex items-center gap-2 mt-4 justify-end push-right">
                  <button
                        className="border rounded p-1"
                        onClick={() => table.firstPage()}
                        disabled={!table.getCanPreviousPage()}
                  >
                        {'<<'}
                  </button>
                  <button
                        className="border rounded p-1"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                  >
                        {'<'}
                  </button>
                  <button
                        className="border rounded p-1"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                  >
                        {'>'}
                  </button>
                  <button
                        className="border rounded p-1"
                        onClick={() => table.lastPage()}
                        disabled={!table.getCanNextPage()}
                  >
                        {'>>'}
                  </button>
                  <span className="flex items-center gap-1">
                        <div>Page</div>
                        <strong>
                              {table.getState().pagination.pageIndex + 1} of{' '}
                              {table.getPageCount().toLocaleString()}
                        </strong>
                  </span>

                  <select
                        value={table.getState().pagination.pageSize}
                        onChange={e => {
                              table.setPageSize(Number(e.target.value))
                        }}
                  >
                        {[10, 20, 30, 40, 50].map(pageSize => (
                              <option key={pageSize} value={pageSize}>
                                    Show {pageSize}
                              </option>
                        ))}
                  </select>
            </div>
      );
};

// ... existing code ...