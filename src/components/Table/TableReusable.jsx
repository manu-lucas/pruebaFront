import React from "react";
import { Table , ConfigProvider} from "antd";

const customTokens = {
    borderRadius:10,
};
const customLocale={
  Pagination: {
    items_per_page: '/ por página',
  }
}


export const TableReusable = ({ dataSource, columns }) => {
  const paginationConfig = {
    defaultPageSize: 10,
    showSizeChanger: true,
    pageSizeOptions: ["10", "20", "30"],
    
  };

  return (
    <div style={{ marginBottom: 10 }}>
     <ConfigProvider theme={{ token: customTokens }} locale={customLocale}>
      <Table
        dataSource={dataSource}
        columns={columns}
        bordered
        pagination={paginationConfig}
        scroll={{ x: 800 }} 
        className="custom-table"
      />
      </ConfigProvider>
    </div>
  );
};
