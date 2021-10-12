import { useContext, useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import { getHeaderData } from "../../redux/action/utils";
import Profile from "./Profile";
import axios from "axios";
import { AppContext, Dispatch } from "../../../component/context/app.context";

const HandleRoutes = () => {
  const {
    auth: { isAuth, isAdmin, isSeller },
  } = useContext(AppContext);

  const { pathname, push } = useRouter();

  useEffect(() => {
    if (isAuth === true) {
      if (pathname.startsWith("/admin/") && isAdmin === false) {
        push("/admin");
      } else if (pathname.startsWith("/seller") && isSeller === false) {
        push("/buyer");
      }
    } else {
      push("/");
    }
  }, [isAuth, isAdmin, isSeller]);

  return <></>;
};

const Header = () => {
  const [isShowModal, setIsShowModal] = useState(false);

  const { pathname, push } = useRouter();

  const dispatch = useContext(Dispatch);

  useEffect(() => {
    if (pathname.startsWith("/seller")) {
      axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/user/is-seller`)
        .then((res) => {})
        .catch(() => {
          setIsShowModal(true);
        });
    }
  }, [pathname]);

  const handleGoBack = () => {
    setIsShowModal(false);
    push("/buyer");
    dispatch({ type: "SET-SELLER-FALSE" });
  };

  const handleBuy = () => {
    setIsShowModal(false);
    push("/buyer/switch-to-seller");
    dispatch({ type: "SET-SELLER-FALSE" });
  };

  return (
    <>
      <div className="header">
        <div className="header-content">
          <nav className="navbar navbar-expand">
            <div className="collapse navbar-collapse justify-content-end mr-3">
              <ul className="navbar-nav header-right">
                <Profile />
                <HandleRoutes />
              </ul>
            </div>
          </nav>
        </div>
      </div>

      <Modal show={isShowModal}>
        <Modal.Header>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>oops it looks like your subscription is expired</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleGoBack}
            className="text-capitalize"
          >
            go back
          </Button>
          <Button
            variant="primary"
            onClick={handleBuy}
            className="text-capitalize"
          >
            buy packages
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

const mapSateToProps = (state) => ({
  title: state.utils.pageTitle,
  searchData: state.utils.searchData,
});

export default connect(mapSateToProps, { getHeaderData })(Header);
