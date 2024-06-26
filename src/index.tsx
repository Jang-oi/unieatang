import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import QueryErrorBoundary from './components/common/QueryErrorBoundary';

// React Query 기본 옵션 설정
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0, // API 요청 실패시 재시도 하는 옵션 (설정값 만큼 재시도)
      throwOnError: true,
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <BrowserRouter basename={process.env.REACT_APP_PUBLIC_URL}>
    <QueryClientProvider client={queryClient}>
      <QueryErrorBoundary>
        <RecoilRoot>
          <App />
        </RecoilRoot>
      </QueryErrorBoundary>
    </QueryClientProvider>
  </BrowserRouter>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
