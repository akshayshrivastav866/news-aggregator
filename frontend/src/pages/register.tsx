import React, {useEffect, useState } from 'react';
import { navigate, Link } from 'gatsby';
import type { HeadFC, PageProps } from 'gatsby';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Row, Col, notification } from 'antd';
import { register } from '../apis/preLogin';

import 'scss/index.scss';
import 'scss/login.scss';

const seoProps: { [ key: string ]: string } = {
	title: 'Pro News Feed - Registration',
	description: '',
	keywords: '',
};

const RegisterPage: React.FC<PageProps> = () => {
	const [ registerNotification, setRegisterNotification ] = useState( {} );
	const [api, contextHolder ] = notification.useNotification();

	const onFinish = async (values: any) => {
		const registerResponse = await register(values);
		setRegisterNotification( registerResponse );

		if ( registerResponse.type === 'success') {
			setTimeout( () => {
				navigate('/');
			}, 2000 );
		}
	};

	useEffect( () => {
		if (!api || !registerNotification) {
			return;
		}

		const { type, title, message } = registerNotification;

		if ( title ) {
			api[type || 'info']({
				message: title || '',
				description: message || ''
			});
		}
	}, [ registerNotification, api ] );

	return (
		<Row gutter={ [ 16, 16 ] } align="middle" justify="center">
			{ contextHolder }
			<Col className="feeds-register shadow border-radius" xs={22} sm={12} md={8} lg={6} xl={6}>
				<Form
					name="normal_register"
					className="feeds-register__form"
					initialValues={{ remember: true }}
					onFinish={onFinish}
				>
					<Form.Item
						name="name"
						rules={[{ required: true, message: 'Please input your Name!' }]}
					>
						<Input prefix={<UserOutlined className="feeds-register__input site-form-item-icon" />} placeholder="Name" />
					</Form.Item>
					<Form.Item
						name="email"
						rules={[{ required: true, message: 'Please input your Email!' }]}
					>
						<Input prefix={<UserOutlined className="feeds-register__input site-form-item-icon" />} placeholder="Email" />
					</Form.Item>
					<Form.Item
						name="password"
						rules={[{ required: true, message: 'Please input your Password!' }]}
					>
						<Input
							prefix={<LockOutlined className="feeds-register__input site-form-item-icon" />}
							type="password"
							placeholder="Password"
						/>
					</Form.Item>
					<Form.Item
						name="password_confirmation"
						rules={[{ required: true, message: 'Please input your Password Again!' }]}
					>
						<Input
							prefix={<LockOutlined className="feeds-register__input site-form-item-icon" />}
							type="password"
							placeholder="Confirm Password"
						/>
					</Form.Item>
					<Form.Item>
						<Button type="primary" htmlType="submit" block className="feeds-register__button login-form-button">
							Register Me
						</Button>
					</Form.Item>
					<Row justify="center">
						<Link to="/">Have an account? Sign in!</Link>
					</Row>
				</Form>
			</Col>
		</Row>
	);
};

export default RegisterPage;

export const Head: HeadFC = () => <title>{ seoProps?.title }</title>;
