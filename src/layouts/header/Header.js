import { connect } from "react-redux";
import { getHeaderData } from "../../redux/action/utils";
import Profile from "./Profile";

const Header = () => {
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
