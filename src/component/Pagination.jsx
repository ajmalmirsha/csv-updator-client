import React, { useState } from "react";
import { Paginator } from "primereact/paginator";

export default function Pagination({ length, onPageChange, rows, first }) {
  return (
    <div className="card">
      <Paginator
        first={first}
        rows={rows}
        totalRecords={length}
        onPageChange={onPageChange}
      />
    </div>
  );
}
