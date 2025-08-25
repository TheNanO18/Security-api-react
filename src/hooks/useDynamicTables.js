import { useState, useEffect } from 'react';

export function useDynamicTables() {
  const [tableList, setTableList]             = useState([]);
  const [listLoading, setListLoading]         = useState(true);
  const [selectedTable, setSelectedTable]     = useState('');
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });
  const [tableData, setTableData]             = useState(null);
  const [dataLoading, setDataLoading]         = useState(false);
  
  const [selectionModel, setSelectionModel] = useState([]);

  useEffect(() => {
    setListLoading(true);
    fetch('http://localhost:8080/api/tables')
      .then((res) => res.json())
      .then((data) => setTableList(data))
      .catch(error => console.error("테이블 목록 로딩 실패:", error))
      .finally(() => setListLoading(false));
  }, []);

  useEffect(() => {
    if (!selectedTable) {
      setTableData(null);
      return;
    }

    setSelectionModel([]);

    setDataLoading(true);
    const url = `http://localhost:8080/api/tables/${selectedTable}?page=${paginationModel.page}&size=${paginationModel.pageSize}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setTableData(data))
      .catch(error => {
        console.error("테이블 데이터 로딩 실패:", error);
        setTableData(null);
      })
      .finally(() => setDataLoading(false));
  }, [selectedTable, paginationModel]);
  
  return { 
    tableList, 
    listLoading, 
    setSelectedTable, 
    tableData, 
    dataLoading, 
    selectedTable, 
    paginationModel, 
    setPaginationModel,
    selectionModel,
    setSelectionModel,
  };
}
