import React from 'react';

function Api() {
  return (
    <div style={{ 
        display        : 'flex', 
        flexDirection  : 'column', 
        height         : '100vh', 
        color          : 'white', 
        backgroundColor: 'transparent'
    }}>
      {/* 상단 50% */}
      <div style={{ flex: 1, border: '1px solid white', textAlign: 'center' }}>
        <h2>DB 테이블(Api)</h2>
      </div>

      {/* 하단 50% */}
      <div style={{ flex: 1, display: 'flex' }}>
        {/* 하단 왼쪽 */}
        <div style={{ flex: 1, border: '1px solid white', textAlign: 'center' }}>
          <h2>security</h2>
        </div>

        {/* 하단 오른쪽 */}
        <div style={{ flex: 1, border: '1px solid white', textAlign: 'center' }}>
          <h2>distinct</h2>
        </div>
      </div>
    </div>
  );
}

export default Api;