import { useState } from "react";
import { Space, Table, Modal, Button, Input, Col, Row } from "antd";
const { Search } = Input;

import { useSelector, useDispatch } from "react-redux";
import {
  decrement,
  increment,
  deleteSV,
  changeSVEdit,
  changeFilter,
} from "../store/counterSlice";

function ListSV() {
  const dispatch = useDispatch();
  const listSV = useSelector((state) => {
    if (!state.counter.filter) return state.counter.listSV;
    return state.counter.listSV.filter((el) =>
      Object.values(el)
        .filter((el) => typeof el !== "number")
        .some((el) => el.includes(state.counter.filter))
    );
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [svselected, setSVselected] = useState({
    idSV: "",
    email: "",
    phone: "",
    name: "",
  });

  const onSearch = (text) => {
    dispatch(changeFilter(text));
  };

  const handleEdit = (sv) => {
    dispatch(changeSVEdit(sv));
  };

  const showModal = (sv) => {
    console.log(sv);
    setIsModalOpen(true);
    setSVselected((prev) => ({ ...prev, ...sv }));
  };

  const handleOk = () => {
    setIsModalOpen(false);
    dispatch(deleteSV(svselected));
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const columns = [
    {
      title: "Mã SV",
      dataIndex: "idSV",
      key: "idSV",
    },
    {
      title: "Họ Tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Số Điện Thoại",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Email",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={() => handleEdit(record)}>Edit</Button>
          <Button danger onClick={() => showModal(record)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="ListSV">
      <Modal
        title="Are you sure delete SV?"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Name: {svselected.name}</p>
        <p>Email: {svselected.email}</p>
      </Modal>
      <Row justify="end">
        <Col>
          <Search
            placeholder="input search text"
            allowClear
            enterButton="Search"
            size="middle"
            onSearch={onSearch}
          />
        </Col>
      </Row>
      <Table
        columns={columns}
        dataSource={listSV}
        pagination={{ position: [] }}
      />
    </div>
  );
}

export default ListSV;
