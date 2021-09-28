import MetisMenu from "@metismenu/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import useFetchAxios from "../../component/hooks/useFetchAxios";

import { AppContext } from "../../component/context/app.context";

// import { sideBarActive } from "../redux/action/utils";
const Sidebar = () => {
  const { push, pathname } = useRouter();

  const {
    auth: { isAdmin },
  } = useContext(AppContext);

  const [loveEmoji, setLoveEmoji] = useState(false);
  const [sideMenu, setSideMenu] = useState([]);

  const { isLoading, response } = useFetchAxios("/api/auth/admin/menu");

  useEffect(() => {
    if (response) {
      const val = response.menu;

      setSideMenu([
        {
          name: "setup",
          icon: "flaticon-025-dashboard",
          isActive: val.setup.setup,
          subMenu: [
            {
              name: "Admin User",
              link: "/admin/setup/user",
              isActive: val.setup.adminUser,
            },
            {
              name: "Roles",
              link: "/admin/setup/roles",
              isActive: val.setup.roles,
            },
            {
              name: "Otp",
              link: "/admin/setup/otp",
              isActive: val.setup.otp,
            },
            {
              name: "Email",
              link: "admin/setup/emails",
              isActive: val.setup.email,
            },
            {
              name: "Email Details",
              link: "/admin/setup/emails-details",
              isActive: val.setup.emailDetails,
            },
            {
              name: "Email Forms",
              link: "/admin/setup/email-forms",
              isActive: val.setup.emailForm,
            },
          ],
        },
        {
          name: "Manage",
          icon: "flaticon-050-info",
          isActive: val.manage.manage,
          subMenu: [
            {
              name: "content",
              link: "/admin/manage/content",
              isActive: val.manage.content,
            },
            {
              name: "Banner",
              link: "/admin/manage/banner",
              isActive: val.manage.banner,
            },
            {
              name: "Unit",
              link: "/admin/manage/unit",
              isActive: val.manage.unit,
            },
            {
              name: "Country",
              link: "/admin/manage/country",
              isActive: val.manage.country,
            },
            {
              name: "State",
              link: "/admin/manage/state",
              isActive: val.manage.state,
            },
            {
              name: "City",
              link: "/admin/manage/city",
              isActive: val.manage.city,
            },
            {
              name: "Tax",
              link: "/admin/manage/tax",
              isActive: val.manage.tax,
            },
            {
              name: "Social",
              link: "/admin/manage/social",
              isActive: val.manage.social,
            },
          ],
        },
        {
          name: "Parameter",
          icon: "flaticon-041-graph",
          isActive: val.parameter.parameter,
          subMenu: [
            {
              name: "Seller Type",
              link: "/admin/parameter/seller-type",
              isActive: val.parameter.sellerType,
            },
            {
              name: "Parent Group",
              link: "/admin/parameter/parent-group",
              isActive: val.parameter.parentGroup,
            },
            {
              name: "Parent Category",
              link: "/admin/parameter/parent-category",
              isActive: val.parameter.parentCategory,
            },
            {
              name: "Manage Brand",
              link: "/admin/parameter/manage-brand",
              isActive: val.parameter.brnad,
            },
          ],
        },
        {
          name: "User",
          icon: "flaticon-086-star",
          isActive: val.user.user,
          subMenu: [
            {
              name: "Manage User",
              link: "/admin/user/manage-user",
              isActive: val.user.manageUser,
            },
            {
              name: "Manage User Package",
              link: "/admin/user/manage-package",
              isActive: val.user.managePackages,
            },
          ],
        },
        {
          name: "Report",
          icon: "flaticon-045-heart",
          isActive: val.report.report,
          subMenu: [
            {
              name: "Manage Sales",
              link: "/admin/reports/sales",
              isActive: val.report.manageSales,
            },
            {
              name: "Manage Registration",
              link: "/admin/reports/registration",
              isActive: val.report.manageRegister,
            },
            {
              name: "Manage Billing",
              link: "/admin/reports/billing",
              isActive: val.report.manageBilling,
            },
            {
              name: "Manage Tracking",
              link: "/admin/reports/tracking",
              isActive: val.report.manageTracking,
            },
          ],
        },
        {
          name: "Subscription",
          icon: "flaticon-013-checkmark",
          isActive: val.subscription.subscription,
          subMenu: [
            {
              name: "Manage Package",
              link: "/admin/subscription/manage-package",
              isActive: val.subscription.managePackages,
            },
            {
              name: "Manage Offer",
              link: "/admin/subscription/manage-offer",
              isActive: val.subscription.manageOffer,
            },
          ],
        },
      ]);
    }
  }, [response]);

  useEffect(() => {
    if (isAdmin === true) {
      if (sideMenu === []) return;

      let arr = ["/admin/dashboard", "/admin/other/change-password"];

      sideMenu.map((x) => {
        x.subMenu.map((xSub) => {
          if (xSub.isActive === true) {
            arr.push(xSub.link);
          }
        });
      });

      console.log("pathname", pathname.includes("/admin/setup/user"));
      console.log("final array", arr);

      let isPathMatch = false;

      arr.map((x) => {
        if (pathname.startsWith(x)) {
          isPathMatch = true;
        }
      });

      if (!isPathMatch) {
        push("/admin/dashboard");
      }
    }
  }, [isAdmin, sideMenu, window.location, pathname]);

  const [doc, setDoc] = useState();
  useEffect(() => {
    setDoc(window);
    // sideBarActive(doc);
  }, [doc]);
  // sideBarActive(doc);
  let path = doc && doc.location.pathname;
  path = path && path.split("/");
  path = path && path[path.length - 1];
  let dashboard = [
      "",
      "index-dark",
      "orders-list",
      "order-detail",
      "customer-list",
      "analytics",
      "reviews",
    ],
    app = [
      "apps/profile",
      "apps/post-details",
      "apps/email/compose",
      "apps/email/inbox",
      "apps/email/read",
      "apps/ecom/product/grid",
      "apps/ecom/product/list",
      "apps/ecom/product/order",
      "apps/ecom/checkout",
      "apps/ecom/invoice",
      "apps/ecom/customers",
      "apps/ecom/product/detail",
    ],
    email = ["apps/email/compose", "apps/email/inbox", "apps/email/read"],
    shop = [
      "apps/ecom/product/grid",
      "apps/ecom/product/list",
      "apps/ecom/product/list",
      "apps/ecom/product/order",
      "apps/ecom/checkout",
      "apps/ecom/invoice",
      "apps/ecom/customers",
      "apps/ecom/product/detail",
    ],
    charts = [
      "chart/rechart",
      "chart/apex",
      "chart/chartjs",
      "chart/chartist",
      "chart/sparkline",
    ],
    bootstrap = [
      "ui/accordion",
      "ui/badge",
      "ui/alert",
      "ui/button",
      "ui/modal",
      "ui/button-group",
      "ui/list-group",
      "ui/media-object",
      "ui/card",
      "ui/carousel",
      "ui/dropdown",
      "ui/popover",
      "ui/progressbar",
      "ui/tab",
      "ui/typography",
      "ui/pagination",
      "ui/grid",
    ],
    plugins = [
      "plugins/select2",
      "plugins/sweetalert",
      "plugins/toastr",
      "plugins/noui-slider",
      "plugins/jqvmap",
      "plugins/lightgallery",
    ],
    widget = ["widget-basic"],
    forms = [
      "form/element",
      "form/wizard",
      "form/editor",
      "form/pickers",
      "form/validation",
    ],
    table = ["table-bootstrap-basic", "table-datatable-basic"],
    pages = [
      "page-register",
      "page-login",
      "page-lock-screen",
      "page-error-400",
      "page-error-403",
      "page-error-404",
      "page-error-500",
      "page-error-503",
      "empty-page",
    ],
    error = [
      "page-error-400",
      "page-error-403",
      "page-error-404",
      "page-error-500",
      "page-error-503",
    ];

  if (isAdmin === true && isLoading === true) return <></>;

  return (
    <div className="deznav">
      {doc && (
        <PerfectScrollbar className="deznav-scroll">
          <MetisMenu className="metismenu" id="menu">
            {pathname.startsWith("/admin/") ? (
              <>
                {sideMenu.map((x) => {
                  return (
                    x.isActive === true && (
                      <>
                        <li>
                          <a className="has-arrow ai-icon c-pointer">
                            <i className={x.icon}></i>
                            <span className="nav-text">{x.name}</span>
                          </a>
                          <ul>
                            {x.subMenu.map((subMenuX) => {
                              return (
                                <>
                                  {subMenuX.isActive && (
                                    <li aria-expanded="false">
                                      <Link href={subMenuX.link} passHref>
                                        <a>{subMenuX.name}</a>
                                      </Link>
                                    </li>
                                  )}
                                </>
                              );
                            })}
                          </ul>
                        </li>
                      </>
                    )
                  );
                })}
                <li className={`${plugins.includes(path) ? "mm-active" : ""}`}>
                  <a
                    className="has-arrow ai-icon c-pointer"
                    aria-expanded="false"
                  >
                    <i className="flaticon-043-menu" />
                    <span className="nav-text">Other</span>
                  </a>
                  <ul aria-expanded="false">
                    <li>
                      <Link href="/admin/other/change-password" passHref>
                        <a
                          className={`${
                            path === "ui/button" ? "mm-active" : ""
                          }`}
                        >
                          change password
                        </a>
                      </Link>
                    </li>
                  </ul>
                </li>
              </>
            ) : pathname.startsWith("/seller") ? (
              <>
                <li className={`${plugins.includes(path) ? "mm-active" : ""}`}>
                  <a
                    className="has-arrow ai-icon c-pointer"
                    aria-expanded="false"
                  >
                    <i className="flaticon-043-menu" />
                    <span className="nav-text">seller</span>
                  </a>
                  <ul aria-expanded="false">
                    <li>
                      <Link href="/seller/brand" passHref>
                        <a
                          className={`${
                            path === "ui/button" ? "mm-active" : ""
                          }`}
                        >
                          brand
                        </a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/seller/product" passHref>
                        <a
                          className={`${
                            path === "ui/button" ? "mm-active" : ""
                          }`}
                        >
                          product
                        </a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/seller/post" passHref>
                        <a
                          className={`${
                            path === "ui/button" ? "mm-active" : ""
                          }`}
                        >
                          post
                        </a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/seller/lead/rfq" passHref>
                        <a
                          className={`${
                            path === "ui/button" ? "mm-active" : ""
                          }`}
                        >
                          rfq
                        </a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/seller/lead/profile" passHref>
                        <a
                          className={`${
                            path === "ui/button" ? "mm-active" : ""
                          }`}
                        >
                          profile lead
                        </a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/seller/lead/inquiry" passHref>
                        <a
                          className={`${
                            path === "ui/button" ? "mm-active" : ""
                          }`}
                        >
                          inquiry lead
                        </a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/seller/lead/contact" passHref>
                        <a
                          className={`${
                            path === "ui/button" ? "mm-active" : ""
                          }`}
                        >
                          contect lead
                        </a>
                      </Link>
                    </li>
                  </ul>
                </li>
              </>
            ) : undefined}
          </MetisMenu>
          {pathname.startsWith("/admin/") ? (
            <>
              <div className="copyright">
                <p>
                  <strong>GEO Trade Admin Dashboard</strong> ©
                  {new Date().getFullYear()} All Rights Reserved
                </p>
                <p>Design &#38; Devlopment by Barodaweb</p>
              </div>
            </>
          ) : pathname.startsWith("/seller") ? (
            <>
              <div className="copyright">
                <p>
                  <strong>GEO Trade Admin Dashboard</strong> ©
                  {new Date().getFullYear()} All Rights Reserved
                </p>
                <p>Design &#38; Devlopment by Barodaweb</p>
              </div>
            </>
          ) : undefined}
        </PerfectScrollbar>
      )}
    </div>
  );
};

export default Sidebar;
