import React from 'react'
import { Form, Input, message } from 'antd'
import { StyledMain, StyledSection, StyledLoginBtn } from './Login.styles'
import {Link, useNavigate} from 'react-router-dom'
import { loginUser } from '../../api/users'

export const Login = () => {
  const nevigate = useNavigate();
  const onFinish = async (values) => {
    try {
      const response = await loginUser(values)
      if (response.success) {
        message.success(response.message)
        localStorage.setItem('token', response.data)
        nevigate('/')
      } else {
        message.error(response.message)
      }
    } catch (error) {
      message.error(error.message)
    }
  }
  return (
    <>
      <StyledMain>
        <h1>Login to BookMyShow</h1>
        <StyledSection>
          <Form layout='vertical' onFinish={onFinish}>
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
              className='d-block mb-3'
              rules={[{ required: true, message: "Password is required"}]}>
              <Input type='password' id='password' placeholder='Enter your password'/>
            </Form.Item>
            <Form.Item 
             style={{display: 'ruby-text'}} >
              <StyledLoginBtn >
                Login
              </StyledLoginBtn>
            </Form.Item>
          </Form>
          <div>
            <p>Not registered yet? <Link to='/register'>Register here!</Link></p>
            <p>Forget password? <Link to='/forget'>Click here!</Link></p>
          </div>
        </StyledSection>
      </StyledMain>
    </>
  )
}
