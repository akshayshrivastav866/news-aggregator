import React from 'react';
import type { HeadFC, PageProps } from 'gatsby';
import { navigate } from 'gatsby';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Row, Col, Divider } from 'antd';

import 'scss/index.scss';
import 'scss/login.scss';

const seoProps: { [ key: string ]: string } = {
	title: 'Pro News Feed - News just as you want!!',
	description: '',
	keywords: '',
};

const IndexPage: React.FC<PageProps> = () => {
	const onFinish = (values: any) => {
		console.log('Received values of form: ', values);
		navigate( '/feeds' );
	};

	return (
		<Row gutter={ [ 16, 16 ] } align="middle" justify="center">
			<Col className="news-login__main shadow" span={ 6 }>
				<Form
					name="normal_login"
					className="login-form"
					initialValues={{ remember: true }}
					onFinish={onFinish}
				>
					<Form.Item
						name="username"
						rules={[{ required: true, message: 'Please input your Username!' }]}
					>
						<Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
					</Form.Item>
					<Form.Item
						name="password"
						rules={[{ required: true, message: 'Please input your Password!' }]}
					>
						<Input
							prefix={<LockOutlined className="site-form-item-icon" />}
							type="password"
							placeholder="Password"
						/>
					</Form.Item>
					<Row justify="end">
						<a className="login-form-forgot" href="/">
							Forgot password?
						</a>
					</Row>
					<Form.Item>
						<Form.Item name="remember" valuePropName="checked" noStyle>
							<Checkbox>Remember me</Checkbox>
						</Form.Item>
					</Form.Item>
					<Form.Item>
						<Button type="primary" htmlType="submit" block className="login-form-button">
							Log in
						</Button>
					</Form.Item>
					<Divider/>
					<Row justify="center">
						<a className="text-right" href="/">Not registered?</a>
					</Row>
				</Form>
			</Col>
		</Row>
	);
};

export default IndexPage;

export const Head: HeadFC = () => <title>{ seoProps?.title }</title>;
