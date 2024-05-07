import React from "react";
import { Table, ConfigProvider } from "antd";

/*
const customTokens = {
    colorPrimary: '#006F76', 
};
*/


export const TableReusable = ({ dataSource, columns }) => {
  const paginationConfig = {
    defaultPageSize: 10,
    showSizeChanger: true,
    pageSizeOptions: ["10", "20", "30"],
  };

  return (
    //<ConfigProvider theme={{ token: customTokens }}>
    <div style={{ marginBottom: 10 }}>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={paginationConfig}
        scroll={{ x: 800 }}
      />
    </div>
  //</ConfigProvider>
  );
};
