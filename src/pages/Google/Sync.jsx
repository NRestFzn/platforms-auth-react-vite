import React, {useEffect} from 'react';
import {Spin, Typography, message} from 'antd';
import {LoadingOutlined} from '@ant-design/icons';
import {useSearchParams, Navigate, useNavigate} from 'react-router-dom';
import axios from 'axios';

const {Title, Text} = Typography;

const GoogleSync = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');
  const antIcon = <LoadingOutlined style={{fontSize: 48}} spin />;

  if (!code) {
    return <Navigate to="/login" replace />;
  }

  useEffect(() => {
    const handleSync = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_API_URL}/api/auth/google`,
          {
            params: {code},
          }
        );

        localStorage.setItem('isLogin', true);
        localStorage.setItem('userData', JSON.stringify(response.data.data));
        message.success('Sync success.');
        navigate('/');
      } catch (error) {
        console.error('Sync failed:', error.response?.data || error.message);
        message.error('Sync failed.');
        navigate('/login');
      }
    };

    handleSync();
  }, [code]);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-50">
      <div className="text-center">
        <Spin indicator={antIcon} />

        <div className="mt-6 space-y-2">
          <Title level={3} style={{margin: 0}}>
            Authenticating...
          </Title>
          <Text type="secondary">
            Please wait a moment while we verify your credentials.
          </Text>
        </div>
      </div>
    </div>
  );
};

export default GoogleSync;
