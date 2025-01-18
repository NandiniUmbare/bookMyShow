import React, { useEffect } from 'react'
import {Button, Form, Input, message } from 'antd'
import {Link, useNavigate} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import { forgetPassword } from '../../api/users'
import {ShowLoading, HideLoading} from '../../redux/loaderSlice'

export const ForgetPassword = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const onFinish = async(values) => {
    try {
        dispatch(ShowLoading())
        const response = await forgetPassword(values)
        if(response.success){
            message.success(response.message)
            alert('OTP sent to your email')
            navigate(`/reset/${encodeURIComponent(values.email)}`)
        } else {
            message.error(response.message)
        }
        dispatch(HideLoading())
    } catch (error) {
        message.error(error.message)
    }
  }

  useEffect(()=>{
    if(localStorage.getItem('token')){
        navigate("/")
    }
  }, [])
  return (
    <>
        <header className='App-header'>
            <main className='main-area mw-500 text-center px-3'>
                <section className='left-section'>
                    <h1>Forget Password</h1>
                </section>
                <section className='right-section '>
                    <Form layout='vertical' onFinish={onFinish}>
                        <Form.Item
                            label='Email'
                            htmlFor='email'
                            name='email'
                            className='d-block'
                            rules={[{required: true, message: 'Email is required'}]}
                        >
                            <Input id='email' type='text' placeholder='Enter your Email'/>
                        </Form.Item>
                        <Form.Item className='d-block'>
                            <Button
                                type='primary'
                                block
                                htmlType='submit'
                                style={{fontSize: '1rem', fontWeight: "600"}}
                            >SEND OTP</Button>
                        </Form.Item>
                    </Form>
                    <div>
                        <p>
                            Existing user? <Link to='/login'>Login here</Link>
                        </p>
                    </div>
                </section>
            </main>
        </header>
    </>
  )
}
