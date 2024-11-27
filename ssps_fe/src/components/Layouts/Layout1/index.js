import './Layout1.css';
import { Outlet } from "react-router-dom";

function Layout1() {
  return (
    <>
      <div className="main-default-layout">
        <main>
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default Layout1;