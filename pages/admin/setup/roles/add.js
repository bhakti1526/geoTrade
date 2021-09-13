import React from "react";
import {
  Form,
  FormGroup,
  FormLabel,
  FormControl,
  Button,
  FormCheck,
} from "react-bootstrap";
import WrapForm from "../../../../src/components/admin/WrapForm";

const add = () => {
  return (
    <WrapForm title="add roles">
      <Form>
        <div className="row">
          <FormGroup className="col-md-6 col-lg-6">
            <FormLabel> Create New Roles </FormLabel>
            <FormControl type="text" className="form-control" placeholder=" " />
          </FormGroup>
        </div>

        <div className="row">
          <div className="col-md-12 col-lg-12">
            <FormGroup className="mb-2" controlId="f01">
              <FormCheck type="checkbox" checked label="setup" />
            </FormGroup>
          </div>

          <div className="col-md-12 col-lg-12">
            <FormGroup className="mb-2 pl-5" controlId="f02">
              <FormCheck type="checkbox" checked label="admin user" />
            </FormGroup>

            <FormGroup className="mb-2 pl-5" controlId="f03">
              <FormCheck type="checkbox" checked label="menu" />
            </FormGroup>

            <FormGroup className="mb-2 pl-5" controlId="f04">
              <FormCheck type="checkbox" checked label="roles" />
            </FormGroup>

            <FormGroup className="mb-2 pl-5" controlId="f05">
              <FormCheck type="checkbox" checked label="otp" />
            </FormGroup>

            <FormGroup className="mb-2 pl-5" controlId="f06">
              <FormCheck type="checkbox" checked label="emails" />
            </FormGroup>

            <FormGroup className="mb-2 pl-5" controlId="f07">
              <FormCheck type="checkbox" checked label="emails details" />
            </FormGroup>

            <FormGroup className="mb-2 pl-5" controlId="f08">
              <FormCheck type="checkbox" checked label="email forms" />
            </FormGroup>
          </div>

          <div className="col-md-12 col-lg-12">
            <FormGroup className="mb-2" controlId="f09">
              <FormCheck type="checkbox" checked label="manage" />
            </FormGroup>
          </div>

          <div className="col-md-12 col-lg-12">
            <FormGroup className="mb-2 pl-5" controlId="f10">
              <FormCheck type="checkbox" checked label="content" />
            </FormGroup>

            <FormGroup className="mb-2 pl-5" controlId="f11">
              <FormCheck type="checkbox" checked label="banner" />
            </FormGroup>

            <FormGroup className="mb-2 pl-5" controlId="f12">
              <FormCheck type="checkbox" checked label="unit" />
            </FormGroup>

            <FormGroup className="mb-2 pl-5" controlId="f13">
              <FormCheck type="checkbox" checked label="country" />
            </FormGroup>

            <FormGroup className="mb-2 pl-5" controlId="f14">
              <FormCheck type="checkbox" checked label="state" />
            </FormGroup>

            <FormGroup className="mb-2 pl-5" controlId="f15">
              <FormCheck type="checkbox" checked label="city" />
            </FormGroup>

            <FormGroup className="mb-2 pl-5" controlId="f16">
              <FormCheck type="checkbox" checked label="tax" />
            </FormGroup>

            <FormGroup className="mb-2 pl-5" controlId="f17">
              <FormCheck type="checkbox" checked label="social" />
            </FormGroup>
          </div>

          <div className="col-md-12 col-lg-12">
            <FormGroup className="mb-2" controlId="f18">
              <FormCheck type="checkbox" checked label="parameter" />
            </FormGroup>
          </div>

          <div className="col-md-12 col-lg-12">
            <FormGroup className="mb-2 pl-5" controlId="f19">
              <FormCheck type="checkbox" checked label="seller type" />
            </FormGroup>

            <FormGroup className="mb-2 pl-5" controlId="f20">
              <FormCheck type="checkbox" checked label="parent group" />
            </FormGroup>

            <FormGroup className="mb-2 pl-5" controlId="f21">
              <FormCheck type="checkbox" checked label="parent category" />
            </FormGroup>

            <FormGroup className="mb-2 pl-5" controlId="f22">
              <FormCheck type="checkbox" checked label="manage brand" />
            </FormGroup>

            <FormGroup className="mb-2 pl-5" controlId="f23">
              <FormCheck type="checkbox" checked label="manage post" />
            </FormGroup>
          </div>

          <div className="col-md-12 col-lg-12">
            <FormGroup className="mb-2" controlId="f24">
              <FormCheck type="checkbox" checked label="subscription" />
            </FormGroup>
          </div>

          <div className="col-md-12 col-lg-12">
            <FormGroup className="mb-2 pl-5" controlId="f25">
              <FormCheck type="checkbox" checked label="manage packages" />
            </FormGroup>

            <FormGroup className="mb-2 pl-5" controlId="f26">
              <FormCheck type="checkbox" checked label="manage offers" />
            </FormGroup>
          </div>

          <div className="col-md-12 col-lg-12">
            <FormGroup className="mb-2" controlId="f27">
              <FormCheck type="checkbox" checked label="user" />
            </FormGroup>
          </div>

          <div className="col-md-12 col-lg-12">
            <FormGroup className="mb-2 pl-5" controlId="f28">
              <FormCheck type="checkbox" checked label="manage user" />
            </FormGroup>

            <FormGroup className="mb-2 pl-5" controlId="f29">
              <FormCheck type="checkbox" checked label="manage user product" />
            </FormGroup>

            <FormGroup className="mb-2 pl-5" controlId="f30">
              <FormCheck type="checkbox" checked label="manage user post" />
            </FormGroup>

            <FormGroup className="mb-2 pl-5" controlId="f31">
              <FormCheck type="checkbox" checked label="manage user package" />
            </FormGroup>
          </div>

          <div className="col-md-12 col-lg-12">
            <FormGroup className="mb-2" controlId="f32">
              <FormCheck type="checkbox" checked label="reports" />
            </FormGroup>
          </div>

          <div className="col-md-12 col-lg-12">
            <FormGroup className="mb-2 pl-5" controlId="f33">
              <FormCheck type="checkbox" checked label="manage sales" />
            </FormGroup>

            <FormGroup className="mb-2 pl-5" controlId="f34">
              <FormCheck type="checkbox" checked label="manage registration" />
            </FormGroup>

            <FormGroup className="mb-2 pl-5" controlId="f35">
              <FormCheck type="checkbox" checked label="manage billing" />
            </FormGroup>

            <FormGroup className="mb-2 pl-5" controlId="f36">
              <FormCheck type="checkbox" checked label="manage tracking" />
            </FormGroup>
          </div>

          <div className="col-md-12 col-lg-12">
            <FormGroup className="mb-2" controlId="f37">
              <FormCheck type="checkbox" checked label="other" />
            </FormGroup>
          </div>

          <div className="col-md-12 col-lg-12">
            <FormGroup className="mb-2 pl-5" controlId="f38">
              <FormCheck type="checkbox" checked label="chanage password" />
            </FormGroup>

            <FormGroup className="mb-2 pl-5" controlId="f39">
              <FormCheck type="checkbox" label="chanage login" />
            </FormGroup>

            <FormGroup className="mb-2 pl-5" controlId="f40">
              <FormCheck type="checkbox" checked label="forgot password" />
            </FormGroup>

            <FormGroup className="mb-2 pl-5" controlId="f41">
              <FormCheck type="checkbox" checked label="notification" />
            </FormGroup>
          </div>
        </div>

        <div className="row">
          <FormGroup className="col-md-12  text-center">
            <div className="btn-page">
              <Button variant="primary btn-rounded" type="button">
                Add Roles
              </Button>
            </div>
          </FormGroup>
        </div>
      </Form>
    </WrapForm>
  );
};

export default add;
