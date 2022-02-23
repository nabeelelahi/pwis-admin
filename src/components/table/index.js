import React, { useState } from "react";
import { Table } from "antd";

export default function TableComponent({ columns, data, ...props }) {
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 8,

  });

  function handlePagination(pagination) {
    setPagination({ ...pagination, current: pagination.current++ });
  }

  return (
    <Table
      scroll={{ x: 'max-content' }}
      columns={columns}
      pagination={pagination}
      onChange={handlePagination}
      {...props}
      dataSource={data}
      expandable={{
        expandedRowRender: (record) => (

          record?.description && <p style={{ margin: 0 }}>{record?.description} </p>
        ),
        rowExpandable: record => record?.description,
      }}
    />
  );
}
