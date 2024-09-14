import { Outlet } from 'react-router-dom';
import Menu from './feedMenu';
const Layout = () => {
  return (
    <div className="wrapper">
      <Menu /> 
      <Outlet />
    </div>);
};
export default Layout;