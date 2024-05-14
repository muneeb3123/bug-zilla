"use client";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authThunks";
import { useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { currentUser } from "../features/auth/authThunks";
import "./layout.css";
import Image from "next/image";
import logo from '../../public/bug1.png';

const Layout = ({children}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isLogin, loading } = useSelector((state) => state.auth);

  useEffect(() => {
  const token = localStorage.getItem("token");
  token && !isLogin && dispatch(currentUser())
  }, [isLogin, router, dispatch]);
  

  useEffect(() => {
    !isLogin && router.push("/login");
  }, [isLogin, router]);

  if (loading) {
    return (
      <div className="layout-container">
        <aside className="menu">
          <div className="header">
            <Skeleton width={150} height={40} />
          </div>
          <nav>
            <Skeleton count={3} height={50} />
          </nav>
        </aside>
        <main>
          <Skeleton className="mt-5" count={9} height={70} />
        </main>
      </div>
    );
  }

  return (
    <div className="layout-container overflow-y-hidden">
      <aside className="menu border-x-2">
        <div className="header">
          <Image className="logo" src={logo} alt="logo" />
        </div>
        <nav>
          <>
            <div className="hover:bg-blue-500 hover:text-white rounded-xl">
              <Image width={20} height={20} alt="dashboard" src="/dashboard.png" className="w-[20px]"/>
              <Link href={"/projects"} className="nav-link hover:text-white">
                Dashboard
              </Link>
            </div>
            <div className="hover:bg-blue-500 hover:text-white rounded-xl"> 
              <Image alt="tickets" width={20} height={20} src="/tickets.png" className="w-[20px]" />
              <Link href={"/tickets"} className="nav-link hover:text-white">
                Tickets
              </Link>
            </div>
            <div className="seprater" />
            <div className="auth-wrap">
              {isLogin && (
                <button
                  className="btn auth-btn hover:scale-90 duration-200 transition-transform"
                  onClick={() => dispatch(logout())}
                >
                  Logout
                </button>
              )}
            </div>
          </>
        </nav>
      </aside>
      <main>
        {children}
      </main>
      <ToastContainer />
    </div>
  );
};

export default Layout;
