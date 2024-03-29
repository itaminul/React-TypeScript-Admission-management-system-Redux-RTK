import { Button, Input, Space, Table } from "antd";
import { useState } from "react";
import {
  SearchOutlined,
  EditOutlined,
  PlusSquareTwoTone,
} from "@ant-design/icons";
import CreatDepartmentModal from "./CreaetDepartmentModal";
import EditDepartmentModal from "./EditDepartmentModal";
import { useGetDepartmentDataQuery } from "../../../redux/features/service/departmentApiService";
function DepartmentTable() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedRowId, setSelectedRow] = useState<number | null>(null);
  const { data: department, error, isLoading } = useGetDepartmentDataQuery();


  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

  const handleSearch = (
    selectedKeys: React.Key[],
    confirm: () => void,
    dataIndex: string
  ) => {
    confirm();
    setSearchText(selectedKeys[0] as string);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex: string) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }: any) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch(selectedKeys, confirm, dataIndex);
            }
          }}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              confirm();
            }
          }}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),

    onFilter: (value: string, record: any) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
  });


  if (isLoading) return <div>Loading...</div>;

  if (error || !department) {
    return <div>Error: Failed to fetch department data.</div>;
  }
  const columns = [
    {
      title: "Serial No",
      width: 30,
      dataIndex: "serial",
      key: "serial",
      render: (_: any, record: any, index: number) => index + 1,
    },
    {
      title: "Department Name",
      width: 100,
      dataIndex: "departmentName",
      key: "departmentName",
      fixed: "left",
      ...getColumnSearchProps("departmentName"),
    },
    {
      title: "Department Des",
      width: 100,
      dataIndex: "departmentDes",
      key: "departmentDes",
      fixed: "left",
      ...getColumnSearchProps("departmentDes"),
    },
    {
      title: "Action",
      key: "operation",
      fixed: "right",
      width: 100,
      render: (params: any) => (
        <div>
          <Button type="primary" onClick={() => handleOpenEditModal(params.id)}>
            <EditOutlined />
          </Button>
        </div>
      ),
    },
  ];

  const handleOpenEditModal = (id: number) => {
    setIsEditModalOpen(true);
    setSelectedRow(id);
  };

  const openCreateModal = () => {
    setIsCreateModalOpen(true);
  };
  const handleCreateModalClose = () => {
    setIsCreateModalOpen(false);
  };

  const editModalClose = () => {
    setIsEditModalOpen(false);
  };
  if (!Array.isArray(department) || department.length === 0) {
    return <div>Data is not in the expected format</div>;
  }
  return (
    <>
      <Button
        type="primary"
        style={{ float: "right" }}
        onClick={openCreateModal}
      >
        <PlusSquareTwoTone />
      </Button>
      <CreatDepartmentModal
        open={isCreateModalOpen}
        onClose={handleCreateModalClose}
        title={""}
      />
      <Table
        dataSource={department}
        columns={columns}
        scroll={{ x: 1500, y: 650 }}
        pagination={{
          defaultPageSize: 20,
          showSizeChanger: true,
          pageSizeOptions: ["20", "30"],
        }}
      />
      <EditDepartmentModal
        open={isEditModalOpen}
        onClose={editModalClose}
        selectedRowId={selectedRowId}
      />
    </>
  );
}

export default DepartmentTable;
