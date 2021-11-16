import React, { memo, useContext, useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Form } from "react-bootstrap";
import jwt_decode from "jwt-decode";
import { FormControl, FormGroup } from "react-bootstrap";
import { Link } from "@material-ui/core";
import { AppContext } from "../../component/context/app.context";
import axios from "axios";
import moment from "moment";

const ChatItem = ({ x, buyer, seller }) => {
  const { token } = useContext(AppContext);

  return (
    <div
      className={jwt_decode(token)._id === x.user ? "sent-chat" : "reply-chat"}
    >
      <h6>
        <span className="text-success">
          {jwt_decode(token)._id === x.user ? buyer?.mobile : seller?.mobile}
        </span>
        <small className="ml-1">
          {jwt_decode(token)._id === x.user ? "you" : seller?.firstName}
        </small>
      </h6>
      <p>{x?.message}</p>
      <small className="d-block float-right">
        {moment(x?.sentOn).fromNow()}
      </small>
    </div>
  );
};

const ChatLists = ({ x, setChats, setOpenChatId }) => {
  const [showInfo, setShowInfo] = useState();

  const { token } = useContext(AppContext);

  useEffect(() => {
    const { buyer, seller } = x;

    const { _id } = jwt_decode(token);

    if (buyer._id === _id) {
      setShowInfo(seller);
    } else {
      setShowInfo(buyer);
    }
  }, []);

  // active-chat

  const handleClick = () => {
    setOpenChatId(x._id);
    setChats(x);
  };

  return (
    <div className="chat-person" onClick={handleClick}>
      <h5>
        {showInfo?.firstName} <small>{showInfo?.mobile}</small>
      </h5>
      <p>{showInfo?.address}</p>
      {/* <p>
        <i className="fas fa-cart-plus"></i> B2B Website Development
      </p> */}
    </div>
  );
};

const rfq = () => {
  const [allChats, setAllChats] = useState([]);
  const [chats, setChats] = useState();
  const [openChatId, setOpenChatId] = useState("");
  const { token } = useContext(AppContext);

  const getData = async () => {
    axios.defaults.headers.common["Authorization"] = token;
    await axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/api/user/chats`)
      .then((res) => {
        setAllChats(res.data.data);
        setChats(res.data.data[0]);
        setOpenChatId(res.data.data[0]._id);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const chatIntervel = setInterval(() => {
      (async () => {
        axios.defaults.headers.common["Authorization"] = token;
        await axios
          .get(`${process.env.NEXT_PUBLIC_API_URL}/api/user/chats`)
          .then((res) => {
            setAllChats(res.data.data);
            setChats(res.data.data[0]);
          })
          .catch((err) => console.error(err));
      })();
    }, 1000);

    return () => clearInterval(chatIntervel);
  }, []);

  const handleSubmit = async (val, { resetForm }) => {
    axios.defaults.headers.common["Authorization"] = token;
    console.log("OK HEADER IS SET");
    await axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/api/user/chats`, {
        message: val.message,
        chatId: chats._id,
      })
      .then(async () => {
        await getData();
        resetForm();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div className="row">
        <div className="col-xl-12 col-lg-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Chats</h4>
            </div>
            <div className="card-body">
              <div className="basic-form">
                <div className="chat-box">
                  <div className="row m-0">
                    <div className="col-md-4 p-0">
                      <FormGroup className="form-group search-box mb-0">
                        <FormControl
                          type="search"
                          className="form-control"
                          placeholder="Search by Name, Product, City, Company or Mobile"
                        />
                        <i className="fas fa-search"></i>
                      </FormGroup>

                      <div className="name-chat">
                        {/* side chat here */}
                        {allChats.map((x) => {
                          return (
                            <ChatLists
                              x={x}
                              setChats={setChats}
                              setOpenChatId={setOpenChatId}
                            />
                          );
                        })}
                      </div>
                    </div>

                    <div className="col-md-8 p-0">
                      <div className="chat-desc d-none d-md-block" style={{}}>
                        <div className="number-person text-center">
                          <i className="fas fa-arrow-left d-block d-md-none"></i>

                          <h5>
                            {chats &&
                            jwt_decode(token)._id === chats?.buyer?._id
                              ? chats?.seller?.firstName
                              : chats?.buyer?.firstName}
                            {"         "}
                            <small>
                              {chats &&
                              jwt_decode(token)._id === chats?.buyer?._id
                                ? chats?.seller?.mobile
                                : chats?.buyer?.mobile}
                            </small>
                          </h5>
                        </div>

                        <div className="chat-start">
                          <div className="row">
                            <div className="col-md-12">
                              {/* put chats here */}

                              {chats?.chat.map((x) => {
                                return (
                                  <ChatItem
                                    key={x}
                                    x={x}
                                    buyer={chats?.buyer}
                                    seller={chats?.seller}
                                  />
                                );
                              })}
                            </div>
                          </div>
                        </div>

                        <Formik
                          onSubmit={handleSubmit}
                          initialValues={{ message: "" }}
                          validationSchema={Yup.object().shape({
                            message: Yup.string().required(),
                          })}
                        >
                          {({
                            handleSubmit,
                            handleChange,
                            touched,
                            errors,
                            values,
                          }) => {
                            return (
                              <Form
                                onSubmit={handleSubmit}
                                onChange={handleChange}
                              >
                                <div className="chat-typing">
                                  <div className="row align-items-center">
                                    <div className="col-10 col-md-9 col-lg-10">
                                      <FormControl
                                        name="message"
                                        value={values.message}
                                        isInvalid={
                                          !!touched.message && !!errors.message
                                        }
                                        type="text"
                                        className="form-control"
                                        placeholder="Type your Message...."
                                      />
                                    </div>

                                    <div className="col-2 col-md-3 col-lg-2">
                                      <div className="float-left">
                                        <button
                                          type="submit"
                                          className="mr-2 text-success bg-transparant"
                                        >
                                          <svg
                                            viewBox="0 0 24 24"
                                            width="24"
                                            height="24"
                                            className=""
                                          >
                                            <path
                                              fill="currentColor"
                                              d="M1.101 21.757L23.8 12.028 1.101 2.3l.011 7.912 13.623 1.816-13.623 1.817-.011 7.912z"
                                            ></path>
                                          </svg>
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </Form>
                            );
                          }}
                        </Formik>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default rfq;
