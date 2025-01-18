import React from 'react'
import { Modal, Form, Row, Col, Input, Button, message } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { useDispatch, useSelector } from 'react-redux'
import { HideLoading, ShowLoading } from '../../redux/loaderSlice'
import {addTheatre, updateTheatre} from '../../api/theatres'

export const TheatreForm = ({
    isModalOpen,
    setIsModalOpen,
    selectedTheatre,
    setSelectedTheatre,
    formType,
    getData
}) => {
  const {user} = useSelector((state)=> state.users) 
  const dispatch = useDispatch()
  const onFinish = async(values) => {
   try {
    dispatch(ShowLoading())
    let response = null
    if(formType === "add"){
        response = await addTheatre({...values, owner: user._id})
    } else {
        response = await updateTheatre({...values, theatreId: selectedTheatre._id})
    }
    if(response.success){
        getData()
        message.success(response.message)
        setIsModalOpen(false)
    } else {
        message.error(response.message)
    }
    setSelectedTheatre(null)
    dispatch(HideLoading())
   } catch (error) {
    message.error(error.message)
    dispatch(HideLoading())
   }
  }  
  const handleCancel = () => {
    setIsModalOpen(false)
    setSelectedTheatre(null)
  }  
  return (
    <Modal
      centered
      title={formType === "add" ? "Add Theatre" : "Edit Theatre"}
      open={isModalOpen}
      onCancel={handleCancel}
      width={800}
      footer={null}
    >
      <Form layout="vertical" initialValues={selectedTheatre} onFinish={onFinish}>
        <Row gutter={{ xs: 6, sm: 10, md: 12, lg: 16 }}>
          <Col span={24}>
            <Form.Item
              label="Theatre Name"
              name="name"
              rules={[{ required: true, message: "Theatre name is required!" }]}
            >
              <Input placeholder="Enter the Theatre name" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Address"
              name="address"
              rules={[{ required: true, message: "Address is required!" }]}
            >
              <TextArea rows="4" placeholder="Enter the Address" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Phone number"
              name="phone"
              rules={[{ required: true, message: "Phone number is required!" }]}
            >
              <Input type='number' placeholder="Enter the Phone number" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Email is required!" }]}
            >
              <Input type='email' placeholder="Enter the Email" />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Button
            block
            type="primary"
            htmlType="submit"
            style={{ fontSize: "1rem", fontWeight: "600" }}
          >
            Submit the Data
          </Button>
          <Button className="mt-3" block onClick={handleCancel}>
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}
