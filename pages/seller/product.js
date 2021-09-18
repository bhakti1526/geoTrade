import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { css } from "@emotion/css";
import {
  Form,
  FormGroup,
  FormLabel,
  FormControl,
  FormCheck,
  Button,
} from "react-bootstrap";

import { Link } from "@material-ui/core";

const product = () => {
    return (
        <div>
           
           <div className="row">
        <div className="col-xl-12 col-lg-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Add Product</h4>
            </div>
            <div className="card-body">
              <div className="basic-form">

              <div className="row">
    <div className="col-md-6">
        <div className="row m-0">
            <div className="col-4 col-md-3 col-lg-2 p-0">
                <div className="images-upload-part">
                    <Link to='#' id="OpenImgUpload" title="Upload Image">
                        <div className="add-photo-01">
                            <i className="flaticon-381-photo-camera"></i>
                            <p>Add</p>
                        </div>
                    </Link>
                    <FormControl type="file" id="imgupload" style={{display: "none"}} />
                </div>
                <div className="add-photo-01">
                    <i className="flaticon-381-photo-camera"></i>
                    <p>Add</p>
                </div>
                <div className="add-photo-01">
                    <i className="flaticon-381-photo-camera"></i>
                    <p>Add</p>
                </div>
                <div className="add-photo-01">
                    <i className="flaticon-381-photo-camera"></i>
                    <p>Add</p>
                </div>
                <div className="add-photo-01">
                    <i className="flaticon-381-photo-camera"></i>
                    <p>Add</p>
                </div>
            </div>
            <div className="col-8 col-md-9 col-lg-9 p-0">

                <div className="big-photo-add">
                    <div className="add-photo-02">
                        <i className="flaticon-381-photo-camera"></i>
                        <p>Add Photo</p>
                        <FormControl type="file" style={{display: "none"}} />
                    </div>
                </div>
                <div className="row m-0">
                    <div className="col-md-6 p-0">
                        <div className="add-photo-01">
                            <i class="fab fa-youtube"></i>
                            <p>Add Video</p>
                        </div>
                    </div>
                    <div className="col-md-6 p-0">
                        <div className="add-photo-01">
                            <i class="far fa-file-pdf"></i>
                            <p>Add PDF</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-12">
                <div className="mt-2">
                    <Link to='#'><i className="far fa-lightbulb pr-1"></i> Tips</Link>
                </div>
            </div>
        </div>
    </div>
    <div class="col-md-6">
        <Form className="row align-items-center mt-4 mt-md-0" >
        <FormGroup className="form-group col-md-12">
            <FormLabel>Product/Service Name</FormLabel>
            <FormControl type="text" className="form-control" placeholder="" />
            </FormGroup>
<FormGroup className="form-group col-md-5 tag-price mt-2">
    <FormLabel>Price</FormLabel>
    <i className="fas fa-rupee-sign"></i>
    <FormControl type="text" className="form-control" placeholder="" /></FormGroup>
<FormGroup className="form-group col-md-2">
    <FormLabel className="d-none d-md-block">&nbsp;</FormLabel>
    <p className="mb-0 text-center">-per-</p>
</FormGroup>
<FormGroup className="form-group col-md-5">
    <FormLabel className="d-none d-md-block">&nbsp;</FormLabel>
    <FormControl type="text" className="form-control" placeholder="Ex - Pair, Piece etc" />
    </FormGroup>
<FormGroup className="form-group col-md-12 mt-3">
    <FormLabel className="d-block">Product/Service Description<small className="text-right text-secondary float-right">Uses, Details, Benefits, etc.</small></FormLabel>
    <div className="summernote">
                          <Editor />
                        </div>
    <small className="d-block mt-2 text-right float-right text-secondary">0 character (maximum of 4000) including formatting.</small>
</FormGroup>

            <FormGroup className="form-group col-md-12 mt-3">
                <div className="float-right">
                    <Button className="btn btn-success">Save and Continue 
                    <i class="fas fa-arrow-right pl-1"></i>
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
      </div>
   

        </div>
    )
}

export default product