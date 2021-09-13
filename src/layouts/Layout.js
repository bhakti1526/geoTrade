import Router from "next/router";
import { Fragment, useEffect, useState, useContext } from "react";
import { connect } from "react-redux";
import { AppContext } from "../../component/context/app.context";
import { getUser } from "../redux/action/auth";
import Footer from "./Footer";
import ChatBox from "./header/chatbox/ChatBox";
import Header from "./header/Header";
import NavHeader from "./header/NavHeader";
import PreLoader from "./PreLoader";

import Sidebar from "./Sidebar";

const Layout = ({ children, getUser, user }) => {
  const { isAuth } = useContext(AppContext);

  const [height, setHeight] = useState();
  const [active, setActive] = useState(false);
  useEffect(() => {
    setHeight(window.screen.height - 100);
    getUser();
    setActive(document.querySelectorAll(".metismenu a") ? true : false);
  }, [user]);

  return (
    <Fragment>
      <div id="main-wrapper" className="show">
        <NavHeader />
        <ChatBox />
        <Header />
        <Sidebar />
        <div className="content-body" style={{ minHeight: height }}>
          <div className="container-fluid">{children}</div>
        </div>
        <Footer />
      </div>
    </Fragment>
  );
};
const mapStateToProps = (state) => ({
  user: state.auth.users,
});

export default connect(mapStateToProps, { getUser })(Layout);
