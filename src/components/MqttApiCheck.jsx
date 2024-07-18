import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MqttApiJsonViewer = () => {
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://192.168.0.31:8080/api/mqtt');
        setApiData(response.data);
      } catch (err) {
        setError('API를 불러오는 중 오류가 발생했습니다: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러: {error}</div>;

  return (
    <div>
      <h2>MQTT API 응답 (JSON 형식):</h2>
      <pre style={{ 
        background: '#f4f4f4', 
        padding: '10px', 
        border: '1px solid #ddd',
        borderRadius: '5px',
        whiteSpace: 'pre-wrap',
        wordWrap: 'break-word'
      }}>
        {JSON.stringify(apiData, null, 2)}
      </pre>
    </div>
  );
};

export default MqttApiJsonViewer;