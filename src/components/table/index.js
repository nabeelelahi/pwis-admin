import React, { useState } from "react";
import { Table } from "antd";

export default function TableComponent({ columns, data }) {
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 8,
  });

  function handlePagination(pagination) {
    setPagination({ ...pagination, current: pagination.current++ });
  }

  return (
    <>
      <Table
      // size="middle"

      scroll={{ x: 'max-content' }}
        columns={columns}
        pagination={pagination}
        onChange={handlePagination}
        dataSource={data}
      />
    </>
  );
}
