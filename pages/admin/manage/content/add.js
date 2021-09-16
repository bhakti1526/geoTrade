import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Editor } from "@tinymce/tinymce-react";
import {
  Form,
  FormGroup,
  FormControl,
  FormLabel,
  FormCheck,
  Button,
} from "react-bootstrap";
import WrapForm from "../../../../src/components/admin/WrapForm";
import usePostAxios from "../../../../component/hooks/usePostAxios";

const add = () => {
  const [pageData, setPageData] = useState({
    pageName: "",
    content: "",
    isActive: true,
  });

  const { isLoading, postData, response } = usePostAxios("/addCms");

  const {
    query: { id },
  } = useRouter();

  const router = useRouter();

  useEffect(() => {}, []);

  const handleSubmite = async (e) => {
    await e.preventDefault();
    const { pageName, content } = pageData;

    if (pageName !== "" || content !== " ") {
      await postData(pageData).then(() => router.push("/admin/manage/content"));
    }
  };

  return (
    <WrapForm title="update content">
      <Form className="row" onSubmit={handleSubmite}>
        <FormGroup className="col-md-12">
          <FormLabel> Email Template Name </FormLabel>
          <FormControl
            onChange={(e) =>
              setPageData((x) => ({ ...x, pageName: e.target.value }))
            }
            type="text"
            className="form-control"
            placeholder=" "
          />
        </FormGroup>

        <FormGroup className="col-md-12">
          <div className="summernote">
            <Editor
              onChange={(e) =>
                setPageData((x) => ({
                  ...x,
                  content: e.target.getContent(),
                }))
              }
            />
          </div>
        </FormGroup>

        <FormGroup className="col-md-12 col-lg-12">
          <FormCheck
            type="checkbox"
            checked={pageData.isActive}
            onClick={() =>
              setPageData((x) => ({ ...x, isActive: !x.isActive }))
            }
            label="make active or inactive"
          />
        </FormGroup>

        <FormGroup className="col-md-12  text-center btn-page">
          <Button
            onClick={handleSubmite}
            variant="primary btn-rounded"
            type="submit"
          >
            Update Page Content
          </Button>
        </FormGroup>
      </Form>
    </WrapForm>
  );
};

export default add;
