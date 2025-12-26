import React from 'react';
import {Form, Input, Button, Checkbox, message} from 'antd';
import {
  LockOutlined,
  GoogleOutlined,
  FacebookFilled,
  MailOutlined,
} from '@ant-design/icons';
import {PlatFormType} from '../constants/constPlatformType';
import googleOAuthUrl from '../helpers/getGoogleUrl';
import facebookOAuthURL from '../helpers/getFacebookUrl';

const Login = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Success:', values);
    message.success('Login successful! Welcome back.');
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    message.error('Please fill in all required fields.');
  };

  const handleSocialLogin = (platform) => {
    switch (platform) {
      case PlatFormType.google:
        window.location.href = googleOAuthUrl(
          `${import.meta.env.VITE_BASE_APP_URL}${
            import.meta.env.VITE_GOOGLE_SYNC_REDIRECT
          }`
        );
        message.loading(`Redirecting to ${platform}...`);
        break;

      case PlatFormType.facebook:
        window.location.href = facebookOAuthURL(
          `${import.meta.env.VITE_BASE_APP_URL}${
            import.meta.env.VITE_FACEBOOK_SYNC_REDIRECT
          }`
        );
        message.loading(`Redirecting to ${platform}...`);

        break;

      default:
        message.error('Unknown platform');
        break;
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-gray-50 font-sans">
      <div className="hidden lg:flex w-1/2 bg-(--color-primary) items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-black/10 to-black/30 z-10"></div>
        <img
          src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
          alt="Office"
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-50"
        />
        <div className="z-20 p-12 text-white max-w-lg">
          <h1 className="font-bold mb-6 tracking-tight leading-tight text-(length:--fs-h1)">
            Elevate Your Project
          </h1>
          <p className="leading-relaxed opacity-90 text-(length:--fs-p)">
            Welcome back! Let's take this project to the next level. Sign in to
            continue building amazing things.
          </p>
        </div>

        <div className="absolute -top-24 -left-24 w-64 h-64 rounded-full bg-white opacity-10 blur-3xl z-10"></div>
        <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-blue-400 opacity-20 blur-3xl z-10"></div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-16 bg-white">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center lg:text-left">
            <h2 className="font-bold text-gray-900 text-(length:--fs-h2)">
              Welcome Back!
            </h2>
            <p className="mt-2 text-gray-500 text-(length:--fs-p)">
              Please enter your details to sign in.
            </p>
          </div>

          <Form
            form={form}
            name="login_form"
            layout="vertical"
            initialValues={{remember: true}}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            requiredMark={false}
            size="large"
            className="mt-8"
          >
            <Form.Item
              label={
                <span className="font-medium text-gray-700 text-(length:--fs-p)">
                  Email Address
                </span>
              }
              name="email"
              rules={[
                {required: true, message: 'Please input your email!'},
                {type: 'email', message: 'The input is not valid E-mail!'},
              ]}
            >
              <Input
                prefix={<MailOutlined className="text-gray-400 mr-2" />}
                placeholder="name@company.com"
                className="rounded-lg py-2 hover:border-(--color-primary) focus:border-(--color-primary)"
              />
            </Form.Item>

            <Form.Item
              label={
                <span className="font-medium text-gray-700 text-(length:--fs-p)">
                  Password
                </span>
              }
              name="password"
              rules={[{required: true, message: 'Please input your password!'}]}
            >
              <Input.Password
                prefix={<LockOutlined className="text-gray-400 mr-2" />}
                placeholder="••••••••"
                className="rounded-lg py-2 hover:border-(--color-primary) focus:border-(--color-primary)"
              />
            </Form.Item>

            <div className="flex items-center justify-between mb-6">
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox className="text-gray-600">Remember me</Checkbox>
              </Form.Item>
              <a
                href="#"
                className="text-sm font-medium text-(--color-primary) hover:opacity-80 hover:underline"
              >
                Forgot password?
              </a>
            </div>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                className="h-12 bg-(--color-primary) hover:opacity-90 border-none rounded-lg font-semibold text-lg shadow-md hover:shadow-lg transition-all duration-300"
              >
                Sign In
              </Button>
            </Form.Item>
          </Form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Or sign in with
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-6">
            <button
              onClick={() => handleSocialLogin(PlatFormType.google)}
              className="flex items-center justify-center px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200"
            >
              <GoogleOutlined className="text-xl text-red-500 mr-2" />
              Google
            </button>
            <button
              onClick={() => handleSocialLogin(PlatFormType.facebook)}
              className="flex items-center justify-center px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200"
            >
              <FacebookFilled className="text-xl text-blue-600 mr-2" />
              Facebook
            </button>
          </div>

          <p className="mt-8 text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <a
              href="#"
              className="font-medium text-(--color-primary) hover:opacity-80 hover:underline"
            >
              Sign up now
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
