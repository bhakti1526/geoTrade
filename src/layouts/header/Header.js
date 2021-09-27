import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import { AppContext } from "../../../component/context/app.context";
import { getHeaderData } from "../../redux/action/utils";
import Notification from "./Notification";
import Profile from "./Profile";

const Header = () => {
  const { push, pathname } = useRouter();

  const {
    auth: { isAuth, isAdmin, isSeller },
  } = useContext(AppContext);

  useEffect(() => {
    if (isAuth === true) {
      if (pathname.startsWith("/admin/") && isAdmin === false) {
        push("/admin");
      } else if (pathname.startsWith("/seller") && isSeller === false) {
        push("/");
      }
    } else {
      push("/");
    }
  }, [isAuth, isAdmin, isSeller]);

  return (
    <div className="header">
      <div className="header-content">
        <nav className="navbar navbar-expand">
          <div className="collapse navbar-collapse justify-content-end mr-3">
            <ul className="navbar-nav header-right">
              {/* <Notification /> */}
              <Profile />
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
};

const mapSateToProps = (state) => ({
  title: state.utils.pageTitle,
  searchData: state.utils.searchData,
});

export default connect(mapSateToProps, { getHeaderData })(Header);
