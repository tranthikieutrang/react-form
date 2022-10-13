import { useEffect, useState } from "react";
import { Typography } from "antd";
const { Title } = Typography;
import { Button, Checkbox, Form, Input } from "antd";
import { Col, Row } from "antd";

import { useSelector, useDispatch } from "react-redux";
import {
  decrement,
  increment,
  addSV,
  changeSVEdit,
  editSV,
} from "../store/counterSlice";

function FormSV() {
  const svEdit = useSelector((state) => state.counter.svEdit);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue(svEdit);
  }, [svEdit]);

  const onFinish = (values) => {
    dispatch(addSV(values));
    form.resetFields();
  };

  const handleCancel = () => {
    dispatch(changeSVEdit({}));
    form.resetFields();
  };
  const handleEdit = () => {
    const payload = form.getFieldsValue();
    dispatch(editSV(payload));
    form.resetFields();
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="FormSV">
      <Title>Thông tin sinh viên</Title>

      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        form={form}
        initialValues={{ idSV: "", phone: "", name: "", email: "" }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Row>
          <Col span={12}>
            <Form.Item
              label="Mã SV"
              name="idSV"
              rules={[
                {
                  required: true,
                  message: "Please input your sv id!",
                },
              ]}
            >
              <Input disabled={svEdit?.idSV} />
            </Form.Item>
            <Form.Item
              label="Phone"
              name="phone"
              rules={[
                {
                  required: true,
                  message: "Please input your phone!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please input your name!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
                {
                  type: "email",
                  message: "Not a valid email!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          wrapperCol={{
            span: 24,
          }}
        >
          {svEdit?.idSV ? (
            <div>
              <Row justify="center">
                <Col span={4}>
                  <Button onClick={handleEdit} type="primary" htmlType="button">
                    Sửa sinh viên
                  </Button>
                </Col>
                <Col span={6}>
                  <Button onClick={handleCancel} htmlType="button">
                    Cancel
                  </Button>
                </Col>
              </Row>
            </div>
          ) : (
            <Button type="primary" htmlType="submit">
              Thêm sinh viên
            </Button>
          )}
        </Form.Item>
      </Form>
    </div>
  );
}

export default FormSV;
