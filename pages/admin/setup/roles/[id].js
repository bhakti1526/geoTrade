import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Formik } from "formik";
import {
  Form,
  FormGroup,
  FormLabel,
  FormControl,
  Button,
  FormCheck,
} from "react-bootstrap";
import WrapForm from "../../../../src/components/admin/WrapForm";
import useFetchAxios from "../../../../component/hooks/useFetchAxios";
import usePostAxios from "../../../../component/hooks/usePostAxios";

const update = () => {
  const {
    query: { id },
    push,
  } = useRouter();

  const { isLoading, response } = useFetchAxios(
    `/api/auth/admin/menu?id=${id}`
  );

  const { postData } = usePostAxios(`/api/auth/admin/menu?id=${id}`);

  const [initSchema, setInitSchema] = useState({
    setup: {
      setup: false,
      adminUser: false,
      roles: false,
      otp: false,
      email: false,
      emailDetails: false,
      emailForm: false,
    },
    manage: {
      manage: false,
      content: false,
      banner: false,
      unit: false,
      country: false,
      state: false,
      city: false,
      tax: false,
      social: false,
    },
    parameter: {
      parameter: false,
      sellerType: false,
      parentGroup: false,
      parentCategory: false,
      brnad: false,
    },
    user: {
      user: false,
      manageUser: false,
      managePackages: false,
    },
    report: {
      report: false,
      manageSales: false,
      manageRegister: false,
      manageBilling: false,
      manageTracking: false,
    },
    subscription: {
      subscription: false,
      managePackages: false,
      manageOffer: false,
    },
  });

  useEffect(() => {
    if (response) {
      setInitSchema(response?.menu);
    }
  }, [response]);

  const handleSubmit = async (val) => {
    await postData({ val });
    push("/admin/setup/roles");
  };

  if (isLoading === true) return <></>;

  return (
    <WrapForm title="update roles">
      <Formik
        enableReinitialize
        onSubmit={handleSubmit}
        initialValues={initSchema}
      >
        {({ handleSubmit, handleChange, values, setFieldValue }) => {
          return (
            <>
              <Form onSubmit={handleSubmit} onChange={handleChange}>
                <div className="row">
                  <div className="col-md-12 col-lg-12">
                    <FormGroup className="mb-2">
                      <FormCheck
                        type="checkbox"
                        checked={!!values.setup.setup}
                        onChange={(e) =>
                          setFieldValue("setup.setup", !values.setup.setup)
                        }
                        label="setup"
                      />
                    </FormGroup>
                  </div>

                  <div className="col-md-12 col-lg-12">
                    <FormGroup className="mb-2 pl-5">
                      <FormCheck
                        checked={!!values.setup.adminUser}
                        onChange={(e) =>
                          setFieldValue(
                            "setup.adminUser",
                            !values.setup.adminUser
                          )
                        }
                        type="checkbox"
                        label="admin user"
                      />
                    </FormGroup>

                    <FormGroup className="mb-2 pl-5">
                      <FormCheck
                        type="checkbox"
                        checked={!!values.setup.roles}
                        onChange={(e) =>
                          setFieldValue("setup.roles", !values.setup.roles)
                        }
                        label="roles"
                      />
                    </FormGroup>

                    <FormGroup className="mb-2 pl-5">
                      <FormCheck
                        type="checkbox"
                        checked={!!values.setup.otp}
                        onChange={(e) =>
                          setFieldValue("setup.otp", !values.setup.otp)
                        }
                        label="otp"
                      />
                    </FormGroup>

                    <FormGroup className="mb-2 pl-5">
                      <FormCheck
                        type="checkbox"
                        checked={!!values.setup.email}
                        onChange={(e) =>
                          setFieldValue("setup.email", !values.setup.email)
                        }
                        label="emails"
                      />
                    </FormGroup>

                    <FormGroup className="mb-2 pl-5">
                      <FormCheck
                        type="checkbox"
                        checked={!!values.setup.emailDetails}
                        onChange={(e) =>
                          setFieldValue(
                            "setup.emailDetails",
                            !values.setup.emailDetails
                          )
                        }
                        label="emails details"
                      />
                    </FormGroup>

                    <FormGroup className="mb-2 pl-5">
                      <FormCheck
                        type="checkbox"
                        checked={!!values.setup.emailForm}
                        onChange={(e) =>
                          setFieldValue(
                            "setup.emailForm",
                            !values.setup.emailForm
                          )
                        }
                        label="email forms"
                      />
                    </FormGroup>
                  </div>

                  <div className="col-md-12 col-lg-12">
                    <FormGroup className="mb-2">
                      <FormCheck
                        type="checkbox"
                        checked={!!values.manage.manage}
                        onChange={(e) =>
                          setFieldValue("manage.manage", !values.manage.manage)
                        }
                        label="manage"
                      />
                    </FormGroup>
                  </div>

                  <div className="col-md-12 col-lg-12">
                    <FormGroup className="mb-2 pl-5">
                      <FormCheck
                        type="checkbox"
                        checked={!!values.manage.content}
                        onChange={(e) =>
                          setFieldValue(
                            "manage.content",
                            !values.manage.content
                          )
                        }
                        label="content"
                      />
                    </FormGroup>

                    <FormGroup className="mb-2 pl-5">
                      <FormCheck
                        type="checkbox"
                        checked={!!values.manage.banner}
                        onChange={(e) =>
                          setFieldValue("manage.banner", !values.manage.banner)
                        }
                        label="banner"
                      />
                    </FormGroup>

                    <FormGroup className="mb-2 pl-5">
                      <FormCheck
                        type="checkbox"
                        checked={!!values.manage.unit}
                        onChange={(e) =>
                          setFieldValue("manage.unit", !values.manage.unit)
                        }
                        label="unit"
                      />
                    </FormGroup>

                    <FormGroup className="mb-2 pl-5">
                      <FormCheck
                        type="checkbox"
                        checked={!!values.manage.country}
                        onChange={(e) =>
                          setFieldValue(
                            "manage.country",
                            !values.manage.country
                          )
                        }
                        label="country"
                      />
                    </FormGroup>

                    <FormGroup className="mb-2 pl-5">
                      <FormCheck
                        type="checkbox"
                        checked={!!values.manage.state}
                        onChange={(e) =>
                          setFieldValue("manage.state", !values.manage.state)
                        }
                        label="state"
                      />
                    </FormGroup>

                    <FormGroup className="mb-2 pl-5">
                      <FormCheck
                        type="checkbox"
                        checked={!!values.manage.city}
                        onChange={(e) =>
                          setFieldValue("manage.city", !values.manage.city)
                        }
                        label="city"
                      />
                    </FormGroup>

                    <FormGroup className="mb-2 pl-5">
                      <FormCheck
                        type="checkbox"
                        checked={!!values.manage.tax}
                        onChange={(e) =>
                          setFieldValue("manage.tax", !values.manage.tax)
                        }
                        label="tax"
                      />
                    </FormGroup>

                    <FormGroup className="mb-2 pl-5">
                      <FormCheck
                        type="checkbox"
                        checked={!!values.manage.social}
                        onChange={(e) =>
                          setFieldValue("manage.social", !values.manage.social)
                        }
                        label="social"
                      />
                    </FormGroup>
                  </div>

                  <div className="col-md-12 col-lg-12">
                    <FormGroup className="mb-2">
                      <FormCheck
                        type="checkbox"
                        checked={!!values.parameter.parameter}
                        onChange={(e) =>
                          setFieldValue(
                            "parameter.parameter",
                            !values.parameter.parameter
                          )
                        }
                        label="parameter"
                      />
                    </FormGroup>
                  </div>

                  <div className="col-md-12 col-lg-12">
                    <FormGroup className="mb-2 pl-5">
                      <FormCheck
                        type="checkbox"
                        checked={!!values.parameter.sellerType}
                        onChange={(e) =>
                          setFieldValue(
                            "parameter.sellerType",
                            !values.parameter.sellerType
                          )
                        }
                        label="seller type"
                      />
                    </FormGroup>

                    <FormGroup className="mb-2 pl-5">
                      <FormCheck
                        type="checkbox"
                        checked={!!values.parameter.parentGroup}
                        onChange={(e) =>
                          setFieldValue(
                            "parameter.parentGroup",
                            !values.parameter.parentGroup
                          )
                        }
                        label="parent group"
                      />
                    </FormGroup>

                    <FormGroup className="mb-2 pl-5">
                      <FormCheck
                        type="checkbox"
                        checked={!!values.parameter.parentCategory}
                        onChange={(e) =>
                          setFieldValue(
                            "parameter.parentCategory",
                            !values.parameter.parentCategory
                          )
                        }
                        label="parent category"
                      />
                    </FormGroup>

                    <FormGroup className="mb-2 pl-5">
                      <FormCheck
                        type="checkbox"
                        checked={!!values.parameter.brnad}
                        onChange={(e) =>
                          setFieldValue(
                            "parameter.brnad",
                            !values.parameter.brnad
                          )
                        }
                        label="manage brand"
                      />
                    </FormGroup>
                  </div>

                  <div className="col-md-12 col-lg-12">
                    <FormGroup className="mb-2">
                      <FormCheck
                        type="checkbox"
                        checked={!!values.subscription.subscription}
                        onChange={(e) =>
                          setFieldValue(
                            "subscription.subscription",
                            !values.subscription.subscription
                          )
                        }
                        label="subscription"
                      />
                    </FormGroup>
                  </div>

                  <div className="col-md-12 col-lg-12">
                    <FormGroup className="mb-2 pl-5">
                      <FormCheck
                        type="checkbox"
                        checked={!!values.subscription.managePackages}
                        onChange={(e) =>
                          setFieldValue(
                            "subscription.managePackages",
                            !values.subscription.managePackages
                          )
                        }
                        label="manage packages"
                      />
                    </FormGroup>

                    <FormGroup className="mb-2 pl-5">
                      <FormCheck
                        type="checkbox"
                        checked={!!values.subscription.manageOffer}
                        onChange={(e) =>
                          setFieldValue(
                            "subscription.manageOffer",
                            !values.subscription.manageOffer
                          )
                        }
                        label="manage offers"
                      />
                    </FormGroup>
                  </div>

                  <div className="col-md-12 col-lg-12">
                    <FormGroup className="mb-2">
                      <FormCheck
                        type="checkbox"
                        checked={!!values.user.user}
                        onChange={(e) =>
                          setFieldValue("user.user", !values.user.user)
                        }
                        label="user"
                      />
                    </FormGroup>
                  </div>

                  <div className="col-md-12 col-lg-12">
                    <FormGroup className="mb-2 pl-5">
                      <FormCheck
                        type="checkbox"
                        checked={!!values.user.manageUser}
                        onChange={(e) =>
                          setFieldValue(
                            "user.manageUser",
                            !values.user.manageUser
                          )
                        }
                        label="manage user"
                      />
                    </FormGroup>

                    <FormGroup className="mb-2 pl-5">
                      <FormCheck
                        type="checkbox"
                        checked={!!values.user.managePackages}
                        onChange={(e) =>
                          setFieldValue(
                            "user.managePackages",
                            !values.user.managePackages
                          )
                        }
                        label="manage user product"
                      />
                    </FormGroup>
                  </div>

                  <div className="col-md-12 col-lg-12">
                    <FormGroup className="mb-2">
                      <FormCheck
                        type="checkbox"
                        checked={!!values.report.report}
                        onChange={(e) =>
                          setFieldValue("report.report", !values.report.report)
                        }
                        label="reports"
                      />
                    </FormGroup>
                  </div>

                  <div className="col-md-12 col-lg-12">
                    <FormGroup className="mb-2 pl-5">
                      <FormCheck
                        type="checkbox"
                        checked={!!values.report.manageSales}
                        onChange={(e) =>
                          setFieldValue(
                            "report.manageSales",
                            !values.report.manageSales
                          )
                        }
                        label="manage sales"
                      />
                    </FormGroup>

                    <FormGroup className="mb-2 pl-5">
                      <FormCheck
                        type="checkbox"
                        checked={!!values.report.manageRegister}
                        onChange={(e) =>
                          setFieldValue(
                            "report.manageRegister",
                            !values.report.manageRegister
                          )
                        }
                        label="manage registration"
                      />
                    </FormGroup>

                    <FormGroup className="mb-2 pl-5">
                      <FormCheck
                        type="checkbox"
                        checked={!!values.report.manageBilling}
                        onChange={(e) =>
                          setFieldValue(
                            "report.manageBilling",
                            !values.report.manageBilling
                          )
                        }
                        label="manage billing"
                      />
                    </FormGroup>

                    <FormGroup className="mb-2 pl-5">
                      <FormCheck
                        type="checkbox"
                        checked={!!values.report.manageTracking}
                        onChange={(e) =>
                          setFieldValue(
                            "report.manageTracking",
                            !values.report.manageTracking
                          )
                        }
                        label="manage tracking"
                      />
                    </FormGroup>
                  </div>
                </div>

                <div className="row">
                  <FormGroup className="col-md-12 btn-page text-center">
                    <Button variant="primary btn-rounded" type="submit">
                      Add Roles
                    </Button>
                  </FormGroup>
                </div>
              </Form>
            </>
          );
        }}
      </Formik>
    </WrapForm>
  );
};

export default update;
