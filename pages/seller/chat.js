import React, { useEffect, useState } from 'react'
import { FormControl, FormGroup } from 'react-bootstrap';
import { Link } from '@material-ui/core';
import axios from 'axios';

const chat = () => {

    // const messageToSend ={
    //     user:"SELLER",
    //     message:""
    // };

    const url = "http://localhost:4000";
    
    const [chats,setChats] = useState([]);
    const [currentUser,setCurrentUser]=useState([]);
    const [text,setText] = useState("");

    const getChatData = async() =>{
        const chats = await axios.get(`${url}/getInquiryChat`);
        if(chats.status===201){
            setChats(chats.data.data);
            console.log(chats.data.data);
        }
    }

    const sendMessage = async(e,chatId) =>{
        e.preventDefault();
        const send = await axios.post(`${url}/addInquiryChat`,{
            msg : text,
            chatId : chatId
        },{
            headers:{
                authorization:localStorage.getItem("jwt")
            }
        })
    }

    useEffect(()=>{
        getChatData();
    },[])

    return (
        <div>
            
            <div className="row">
        <div className="col-xl-12 col-lg-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Rfq Leads</h4>
            </div>
            <div className="card-body">
              <div className="basic-form">
              <div className="chat-box">

<div className="row m-0">

    <div className="col-md-4 p-0">

        {/* <FormGroup className="form-group search-box mb-0">
            <FormControl type="search" className="form-control" placeholder="Search by Name, Product, City, Company or Mobile"  />
            <i className="fas fa-search"></i>
        </FormGroup> */}

        <div className="name-chat" >
{
    chats.map((c)=>(

            <div className="chat-person" onClick={""}>
                <h5>{c.buyer.firstName} <small>{c.buyer.mobile}</small></h5>
                <p>{c.buyer.city.name}, {c.buyer.state.name},{c.buyer.country.name}</p>
                <p> <i className="fas fa-cart-plus"></i>{c.visitOn}</p>
            </div>                  
    ))
}
{/* 
            <div className="chat-person active-chat" onclick="showmychat()">
                <h5>Barodaweb <small>+91 9824281021</small></h5>
                <p>Alkapuri, Vadodara, Gujarat</p>
                <p> <i className="fas fa-cart-plus"></i> B2B Website Development </p>
            </div>

            <div className="chat-person">
                <h5>Barodaweb <small>+91 9824281021</small></h5>
                <p>Alkapuri, Vadodara, Gujarat</p>
                <p> <i className="fas fa-cart-plus"></i> B2B Website Development </p>
            </div>

            <div className="chat-person">
                <h5>Barodaweb <small>+91 9824281021</small></h5>
                <p>Alkapuri, Vadodara, Gujarat</p>
                <p> <i class="fas fa-cart-plus"></i> B2B Website Development </p>
            </div>

            <div className="chat-person">
                <h5>Barodaweb <small>+91 9824281021</small></h5>
                <p>Alkapuri, Vadodara, Gujarat</p>
                <p> <i className="fas fa-cart-plus"></i> B2B Website Development </p>
            </div> */}

        </div>

    </div>

    <div className="col-md-8 p-0">


        <div className="chat-desc d-none d-md-block" style={{}}>

            <div className="number-person text-center">

                <i className="fas fa-arrow-left d-block d-md-none"></i>

                <h5>{currentUser.buyer.firstName}<small>{currentUser.buyer.mobile}</small></h5>

            </div>

            <div className="chat-start">

                <div className="row">
{
    currentUser===null || currentUser.buyer ===  null ?
    <div>
        No Chat Selected
        </div>
:
                    <div className="col-md-12">

                        {
                            currentUser.map((ch)=>(


                                ch.chat.user === "BUYER" ?
                        <div className="reply-chat">
                            <h6> <span className="text-success">{currentUser.buyer.mobile}</span> <small>~{currentUser.buyer.firstName}</small></h6>
                            <p>
                                {ch.message}
                            </p>
                            <small className="d-block float-right">{new Date(ch.sentOn).toLocaleDateString()}</small>
                        </div>

                        :

                        <div className="sent-chat">
                            <h6> <span className="text-success">{ch.chat.message}</span> <small>~{currentUser.buyer.firstName}</small></h6>
                           <p>{ch.message}</p> 
                            <small className="d-block float-right">{new Date(ch.sentOn).toLocaleDateString()}</small>
                        </div>
                 
                 ))
                        }

                    </div>
        
    }

                        {/* <div className="reply-chat">
                            <h6> <span className="text-success">+91 9824281021</span> <small>~ Barodaweb</small></h6>
                            <p>
                                Hello, Rushil Patel
                            </p>
                            <small className="d-block float-right">08, Sept, 6:33 AM</small>
                        </div>

                        <div className="sent-chat">
                            <h6> <span className="text-success">+91 9824281021</span> <small>~ Rushil Patel</small></h6>
                            <p>Hello, Barodaweb Company</p>
                            <small className="d-block float-right">08, Sept, 6:33 AM</small>
                        </div> */}

                        {/* <div className="reply-chat">
                            <h6> <span className="text-success">+91 9824281021</span> <small>~ Barodaweb</small></h6>
                            <p>
                                Hello, Rushil Patel
                            </p>
                            <small className="d-block float-right">08, Sept, 6:33 AM</small>
                        </div>

                        <div className="sent-chat">
                            <h6> <span className="text-success">+91 9824281021</span> <small>~ Rushil Patel</small></h6>
                            <p>Hello, Barodaweb Company</p>
                            <small className="d-block float-right">08, Sept, 6:33 AM</small>
                        </div> */}

  
                </div>

            </div>

            <div className="chat-typing">

                <div className="row align-items-center">
                    <div className="col-10 col-md-9 col-lg-10">
                        <FormControl type="text" className="form-control" placeholder="Type your Message...."  onChange={(e)=>setText(e.target.value)} onSubmit={(e)=>sendMessage(e,ch._id)} />
                    </div>

                    <div className="col-2 col-md-3 col-lg-2">
                        <div className="float-left">
                            <Link to="#" className="mr-2 text-info">
                                <svg viewBox="0 0 24 24" width="24" height="24" className=""><path fill="currentColor" d="M1.816 15.556v.002c0 1.502.584 2.912 1.646 3.972s2.472 1.647 3.974 1.647a5.58 5.58 0 0 0 3.972-1.645l9.547-9.548c.769-.768 1.147-1.767 1.058-2.817-.079-.968-.548-1.927-1.319-2.698-1.594-1.592-4.068-1.711-5.517-.262l-7.916 7.915c-.881.881-.792 2.25.214 3.261.959.958 2.423 1.053 3.263.215l5.511-5.512c.28-.28.267-.722.053-.936l-.244-.244c-.191-.191-.567-.349-.957.04l-5.506 5.506c-.18.18-.635.127-.976-.214-.098-.097-.576-.613-.213-.973l7.915-7.917c.818-.817 2.267-.699 3.23.262.5.501.802 1.1.849 1.685.051.573-.156 1.111-.589 1.543l-9.547 9.549a3.97 3.97 0 0 1-2.829 1.171 3.975 3.975 0 0 1-2.83-1.173 3.973 3.973 0 0 1-1.172-2.828c0-1.071.415-2.076 1.172-2.83l7.209-7.211c.157-.157.264-.579.028-.814L11.5 4.36a.572.572 0 0 0-.834.018l-7.205 7.207a5.577 5.577 0 0 0-1.645 3.971z"></path></svg>
                            </Link>
                            <Link to="#" className="mr-2 text-success">
                                <svg viewBox="0 0 24 24" width="24" height="24" className=""><path fill="currentColor" d="M1.101 21.757L23.8 12.028 1.101 2.3l.011 7.912 13.623 1.816-13.623 1.817-.011 7.912z"></path></svg>
                            </Link>
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
          </div>
        </div>
      </div>
    

        </div>
    )
}

export default chat
