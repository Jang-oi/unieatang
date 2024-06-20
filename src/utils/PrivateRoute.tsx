import React from 'react';
import { useRecoilValue } from 'recoil';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { roleState } from '../recoil/role/atom';

const PrivateRoute: React.FC<{ allowedRoles: string[]; children: any }> = ({ allowedRoles, children }) => {
  const { userRole } = useRecoilValue(roleState);
  const location = useLocation();

  if (!allowedRoles.includes(userRole)) {
    // 권한이 없다면 로그인 페이지로 리다이렉트
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
export default PrivateRoute;
