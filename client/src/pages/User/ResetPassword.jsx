import { Button, Form, Input, message } from "antd";
import React, {useEffect} from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { HideLoading, ShowLoading } from "../../redux/loaderSlice";
import { resetPassword } from "../../api/users";

export const ResetPassword = () => {
    const {email} = useParams()
    const navigate = useNavigate() 
    const dispatch = useDispatch()

	const onFinish = async (values) => {
		try {
            dispatch(ShowLoading())
            const response = await resetPassword(values, email)
            if(response.success){
                message.success(response.message)
                navigate('/login')
            } else {
                message.error(response.message)
            }
            dispatch(HideLoading())
		} catch (error) {
			message.error(error.message);
		}
	};

    useEffect(() => {
        if (localStorage.getItem("token")) {
          navigate("/");
        }
      }, []);

	return (
		<>
			<header className='App-header'>
				<main className='main-area mw-500 text-center px-3'>
					<section className='left-section'>
						<h1>Reset Password</h1>
					</section>
					<section className='right-section'>
						<Form layout='vertical' onFinish={onFinish}>
							<Form.Item
								label='OTP'
								htmlFor='otp'
								name='otp'
								className='d-block'
								rules={[{ required: true, message: "OTP is required" }]}
							>
								<Input type='number' id='otp' placeholder='Enter OTP' />
							</Form.Item>
							<Form.Item
								label='Password'
								htmlFor='password'
								name='password'
								className='d-block'
								rules={[{ required: true, message: "Password is required" }]}
							>
								<Input
									id='password'
									type='password'
									placeholder='Enter your Password'
								></Input>
							</Form.Item>
							<Form.Item className='d-block'>
								<Button
									type='primary'
									block
									htmlType='submit'
									style={{ fontSize: "1rem", fontWeight: "600" }}
								>
									RESET PASSWORD
								</Button>
							</Form.Item>
						</Form>
					</section>
				</main>
			</header>
		</>
	);
};
