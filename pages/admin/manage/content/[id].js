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
import AppLoader from "../../../../src/components/admin/AppLoader";

const update = () => {
  const [pageData, setPageData] = useState({
    _id: "",
    pageName: "",
    content: "",
    isActive: true,
  });

  const {
    query: { id },
  } = useRouter();
  const router = useRouter();

  const { postData } = usePostAxios(`/updateCms/${id}`);

  const { isLoading, response } = useFetchAxios(`/getCms?id=${id}`);

  useEffect(() => {
    if (response !== null) {
      setPageData({
        pageName: response.cms.pageName,
        content: response.cms.content,
        _id: response.cms._id,
        isActive: response.cms.isActive,
      });
    }
  }, [response]);

  const handleSubmite = async (e) => {
    await e.preventDefault();
    const { pageName, content } = pageData;

    if (pageName !== "" || content !== " ") {
      await postData({ ...pageData, _id: pageData._id }).then(() =>
        router.push("/admin/manage/content")
      );
    }
  };

  if (isLoading) return <AppLoader />;

  return (
    <WrapForm title="update content">
      <Form className="row" onSubmit={handleSubmite}>
        <FormGroup className="col-md-12">
          <FormLabel> content page name </FormLabel>
          <FormControl
            value={pageData.pageName}
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
              initialValue={pageData.content}
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

export default update;
