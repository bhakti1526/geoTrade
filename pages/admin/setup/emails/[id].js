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
import useFetchAxios from "../../../../component/hooks/useFetchAxios";

const update = () => {
  const [pageData, setPageData] = useState({
    name: "",
    content: "",
    isActive: true,
  });

  const {
    query: { id },
  } = useRouter();

  const { response: res } = useFetchAxios(`/getEmailTemplate?id=${id}`);

  const { isLoading, postData, response } = usePostAxios(
    "/updateEmailTemplate"
  );

  const router = useRouter();

  useEffect(() => {
    if (id !== "add") {
      setPageData((x) => ({ ...res }));
    }
  }, [res]);

  const handleSubmite = async (e) => {
    await e.preventDefault();
    const { pageName, content } = pageData;

    if (pageName !== "" || content !== " ") {
      await postData(pageData).then(() => router.push("/admin/setup/emails"));
    }
  };

  return (
    <WrapForm title="update emails">
      <Form className="row" onSubmit={handleSubmite}>
        <FormGroup className="col-md-12">
          <FormLabel> Email Template Name </FormLabel>
          <FormControl
            onChange={(e) =>
              setPageData((x) => ({ ...x, name: e.target.value }))
            }
            type="text"
            className="form-control"
            placeholder=" "
            value={pageData.name}
          />
        </FormGroup>

        <FormGroup className="col-md-12">
          <div className="summernote">
            <Editor
              initialValue={res?.content}
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
          <Button onClick={handleSubmite} variant="primary" type="submit">
            Update Page Content
          </Button>
        </FormGroup>
      </Form>
    </WrapForm>
  );
};

export default update;
