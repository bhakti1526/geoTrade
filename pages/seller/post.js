import React, {useEffect, useState} from "react";
import { Editor } from "@tinymce/tinymce-react";
import Select from "react-select";
import { css } from "@emotion/css";
import {
  Form,
  FormGroup,
  FormLabel,
  FormControl,
  FormCheck,
  Button,
} from "react-bootstrap";
import axios from "axios";

const postingData={
  name :"" , 
};


const post = () => {

    const [selectOption, setSelectOption] = useState(null);
    const[pstData,setPstData]=useState(postingData);
    const[parentCategory,setParentCategory]=useState([]);
    const[parentGroup,setParentGroup]=useState([]);
    const[sellerType,setSellerType]=useState([]);
    const[units,setUnits]=useState([]);
    const[price,setPrice]=useState("");
    const[desc,setDesc] = useState("");
    const options1 = [];
    const unitOptions = [];
    const parentCategoryOptions = [];
    const parentGroupOptions = [];

    

    const onInputChange=(e)=>{
      console.log(pstData);
      setPstData({...pstData,[e.target.name]:e.target.value})
    }

    const addPost = async(e) =>{
      e.preventDefault();
      const posting = await axios.post(`${url}/addPost`,{
        pstData,price,desc
      },{
        headers:{
          // authorization:localStorage.getItem("jwt")
        }
      });

      if(posting.status===201){
        console.log("Data Added");
        window.location.reload();
      }
    }



    const getReqDatas=async()=>{

      const url = "http://localhost:4000";
      const pc = await axios.get(`${url}/getParentCategory`);
      if(pc.status===201){
        setParentCategory(pc.data.data);
        console.log("Parent Cat")
        console.log(pc.data.data);
      }

      const pg = await axios.get(`${url}/getParentGroup`);

      if(pg.status===201){
        setParentGroup(pg.data.data);
        console.log("Parent Group");
        console.log(pg.data.data);
      }


      const st = await axios.get(`${url}/getSellerType`);
      if(st.status===201){
        setSellerType(st.data.data);
        console.log(st.data.data[0].sellerTypeName);
        console.log(sellerType);
        sellerType.map((p)=>(
         options1.push({value:p.sellerTypeName,label:p.sellerTypeName})
        ))
      }

      
      const ut = await axios.get(`${url}/getUnits`);
      if(ut.status==201){
        setUnits(ut.data.data);
        units.map((p)=>(
          unitOptions.push({value:p.name,label:p.name})
         ))
        console.log(ut.data.data);
      }
    }

    useEffect(()=>{

      getReqDatas();


    },[])

    const options = [
      { value: "Traders & Suppliers", label: "Traders & Suppliers" },
      { value: "Manufacturer", label: "Manufacturer" },
    ];

    const [selectOption1, setSelectOption1] = useState(null);
    

    const [selectOption2, setSelectOption2] = useState(null);
    const options2 = [
      { value: "Sand and Gravel", label: "Sand and Gravel" },
    ];

    

    const [selectOption3, setSelectOption3] = useState(null);
    // const[currentUnitOption,selectCurrentUnitOption]=useState(null);

    const[onOptionChange,setOptionChange]=useState(null);

    const options3 = [
        { value: "kg", label: "kg" },
        { value: "cm", label: "cm" },
        { value: "ton", label: "ton" },
    ];


    return (
            <div>  
            <div className="row">
        <div className="col-xl-12 col-lg-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Add Post</h4>
            </div>
            <div className="card-body">
              <div className="basic-form">
                <Form className="row">
                  <div className="col-md-8">
                    <div className="row">
                      <FormGroup className="col-md-12 col-lg-6">
                        <FormLabel> Product name</FormLabel>
                        <FormControl
                        name="name"
                        onChange={(e)=>onInputChange(e.target.value)}
                          type="text"
                          className="form-control"
                          placeholder=""
                        />
                      </FormGroup>

                      <FormGroup className="col-md-12 col-lg-12">
                        <FormLabel> Brand Info </FormLabel>
                        <div className="summernote">
                          <Editor />
                        </div>
                      </FormGroup>

                      <FormGroup className="col-md-6 col-lg-4">
                        <FormLabel> Seller Type</FormLabel>
                        <Select placeholder="Manufacturer" className=""
                                 defaultValue="Select"
                                 onChange={setSelectOption}
                                 options={options1}
                                />
                      </FormGroup>

                      <FormGroup className="col-md-6 col-lg-4">
                        <FormLabel> Parent Group</FormLabel>
                        <Select placeholder="Sand and Gravel" className=""
                                 defaultValue="Select"
                                 onChange={setSelectOption1}
                                 options={parentGroupOptions}
                                />
                      </FormGroup>

                      <FormGroup className="col-md-6 col-lg-4">
                        <FormLabel> Parent Category</FormLabel>
                        <Select placeholder="Sand and Gravel" className=""
                                 defaultValue="Select"
                                 onChange={setSelectOption2}
                                 options={parentCategoryOptions}
                                />
                      </FormGroup>

                      <FormGroup className="col-md-6 col-lg-4">
                        <FormLabel> Price</FormLabel>
                        <FormControl
                        onChange={(e)=>setPrice(e.target.value)}
                          type="text"
                          className="form-control"
                          placeholder=""
                        />
                      </FormGroup>

                      <FormGroup className="col-md-6 col-lg-4">
                        <FormLabel> Unit</FormLabel>
                        <Select placeholder="kg" className=""
                                 defaultValue={selectOption3}
                                 onChange={setSelectOption3}
                                 options={unitOptions}
                                />
                      </FormGroup>

                    </div>
                  </div>

                  <div className="col-md-4">
                    <div
                      className={css`
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 30vh;
                        border: 1px solid rgb(212, 217, 222);
                        width: 80%;
                      `}
                    >
                      <i
                        className="flaticon-381-photo-camera"
                        style={{ fontSize: "34px" }}
                      ></i>
                    </div>
                  </div>

                  <FormGroup className="col-md-12  text-center">
                    <div className="btn-page mt-5">
                      <Button variant="primary btn-rounded" type="button" onClick={(e)=>addPost(e)}>
                      Add Post
                      </Button>
                    </div>
                  </FormGroup>

                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    

        </div>
    )
}

export default post
