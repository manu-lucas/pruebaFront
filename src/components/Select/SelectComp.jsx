import React from 'react';
import { Select } from 'antd';
const onChange = (value) => {
  console.log(`selected ${value}`);
};
const onSearch = (value) => {
  console.log('search:', value);
};

const filterOption = (input, option) =>
  (option?.label ?? '').toLowerCase().includes(input.toLowerCase());


const SelectComp = ({options,placeholder}) => (
  <Select
    showSearch
    placeholder={placeholder}
    optionFilterProp="children"
    onChange={onChange}
    onSearch={onSearch}
    filterOption={filterOption}
    options={options}
  />
);
export default SelectComp;