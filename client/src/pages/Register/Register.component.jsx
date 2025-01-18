import React from 'react'
import { Form, message, Radio } from 'antd'
import Input from 'antd/es/input/Input'
import { StyledMain, StyledSection, StyledRegisterBtn, StyledDiv } from './Register.styles'
import {Link, useNavigate} from 'react-router-dom'
import { registerUser } from '../../api/users'

export const Register = () => {
  const navigate = useNavigate()
  const onFinish = async (values) => {
    if(values.password !== values.confirmPassword){
      message.error('Password and Confirm password should be same!!')
    } else {
      try {
        const response = await registerUser(values)
        if(response.success){
          message.success(response.message)
          navigate("/login")
        } else {
          message.error(response.message)
        }
      } catch (error) {
        message.error(error.message)
      }
    }
  }
  return (
    <>
      <StyledMain>
        <h1>Register to BookMyShow</h1>
        <StyledSection>
          <Form layout='vertical' onFinish={onFinish}>
            <Form.Item
              label='Name'
              htmlFor='name'
              name='name'
              className='d-block'
              rules={[{ required: true, message: "Name is required"}]}>
              <Input type='text' id='name' placeholder='Enter your name'/>
            </Form.Item>
            <Form.Item
              label='Email'
              htmlFor='email'
              name='email'
              className='d-block'
              rules={[{ required: true, message: "Email is required"}]}>
              <Input type='email' id='email' placeholder='Enter your email'/>
            </Form.Item>
            <Form.Item
              label='Password'
              htmlFor='password'
              name='password'
              className='d-block'
              rules={[{ required: true, message: "Password is required"}]}>
              <Input type='password' id='password' placeholder='Enter your password'/>
            </Form.Item>
            <Form.Item
              label='Confirm password'
              htmlFor='confirmPassword'
              name='confirmPassword'
              className='d-block'
              rules={[{ required: true, message: "Confirm password is required"}]}>
              <Input type='password' id='confirmPassword' placeholder='Enter your confirm password'/>
            </Form.Item>
            <Form.Item
              label="Register as a Partner"
              htmlFor="role"
              name="role"
              className="d-block text-center"
              initialValue={false}
              rules={[{ required: true, message: "Please select an option" }]}
            >
              <StyledDiv>
                <Radio.Group name="radioGroup" className="flex-start">
                  <Radio value={"partner"}>Yes</Radio>
                  <Radio value={"user"}>No</Radio>
                </Radio.Group>
              </StyledDiv>
            </Form.Item>
            <Form.Item 
             style={{display: 'ruby-text'}} >
              <StyledRegisterBtn >
                Register
              </StyledRegisterBtn>
            </Form.Item>
          </Form>
          <div>
            <p>Already a user? <Link to='/login'>Login here!</Link></p>
          </div>
        </StyledSection>
      </StyledMain>
    </>
  )
}
