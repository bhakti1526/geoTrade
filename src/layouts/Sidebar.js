import MetisMenu from "@metismenu/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";

// import { sideBarActive } from "../redux/action/utils";
const Sidebar = () => {
  const [loveEmoji, setLoveEmoji] = useState(false);
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
  return (
    <div className="deznav">
      {doc && (
        <PerfectScrollbar className="deznav-scroll">
          <MetisMenu className="metismenu" id="menu">
            <li className={`${dashboard.includes(path) ? "mm-active" : ""}`}>
              <a className="has-arrow ai-icon c-pointer" aria-expanded="false">
                <i className="flaticon-025-dashboard" />
                <span className="nav-text">Setup</span>
              </a>
              <ul aria-expanded="false">
                <li>
                  <Link href="/admin/setup/user" passHref>
                    <a className={`${path === "" ? "mm-active" : ""}`}>
                      Admin User
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/admin/setup/menu" passHref>
                    <a
                      className={`${path === "index-dark" ? "mm-active" : ""}`}
                    >
                      Menu
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/admin/setup/roles" passHref>
                    <a
                      className={`${path === "orders-list" ? "mm-active" : ""}`}
                    >
                      Roles
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/admin/setup/otp" passHref>
                    <a
                      className={`${
                        path === "order-detail" ? "mm-active" : ""
                      }`}
                    >
                      Otp
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/admin/setup/emails" passHref>
                    <a
                      className={`${
                        path === "customer-list" ? "mm-active" : ""
                      }`}
                    >
                      Email
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/admin/setup/emails-details" passHref>
                    <a className={`${path === "analytics" ? "mm-active" : ""}`}>
                      Email Details
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/admin/setup/email-forms" passHref>
                    <a className={`${path === "reviews" ? "mm-active" : ""}`}>
                      Email Forms
                    </a>
                  </Link>
                </li>
              </ul>
            </li>
            <li className={`${app.includes(path) ? "mm-active" : ""}`}>
              <a className="has-arrow ai-icon c-pointer" aria-expanded="false">
                <i className="flaticon-050-info" />
                <span className="nav-text">Manage</span>
              </a>
              <ul aria-expanded="false">
                <li>
                  <Link href="/admin/manage/content" passHref>
                    <a
                      className={`${
                        path === "apps/profile" ? "mm-active" : ""
                      }`}
                    >
                      Content
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/admin/manage/banner" passHref>
                    <a
                      className={`${
                        path === "apps/post-details" ? "mm-active" : ""
                      }`}
                    >
                      Banner
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/admin/manage/unit" passHref>
                    <a
                      className={`${
                        path === "apps/post-details" ? "mm-active" : ""
                      }`}
                    >
                      Unit
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/admin/manage/country" passHref>
                    <a
                      className={`${
                        path === "apps/post-details" ? "mm-active" : ""
                      }`}
                    >
                      Country
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/admin/manage/state" passHref>
                    <a
                      className={`${
                        path === "apps/post-details" ? "mm-active" : ""
                      }`}
                    >
                      State
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/admin/manage/city" passHref>
                    <a
                      className={`${
                        path === "apps/post-details" ? "mm-active" : ""
                      }`}
                    >
                      City
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/admin/manage/tax" passHref>
                    <a
                      className={`${
                        path === "apps/post-details" ? "mm-active" : ""
                      }`}
                    >
                      Tax
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/admin/manage/social" passHref>
                    <a
                      className={`${
                        path === "apps/post-details" ? "mm-active" : ""
                      }`}
                    >
                      Social
                    </a>
                  </Link>
                </li>
              </ul>
            </li>
            <li className={`${charts.includes(path) ? "mm-active" : ""}`}>
              <a className="has-arrow ai-icon c-pointer" aria-expanded="false">
                <i className="flaticon-041-graph" />
                <span className="nav-text">Parameter</span>
              </a>
              <ul aria-expanded="false">
                <li>
                  <Link href="/admin/parameter/seller-type" passHref>
                    <a
                      className={`${
                        path === "chart/rechart" ? "mm-active" : ""
                      }`}
                    >
                      Seller Type
                    </a>
                  </Link>
                </li>

                <li>
                  <Link href="/admin/parameter/parent-group" passHref>
                    <a
                      className={`${
                        path === "chart/chartjs" ? "mm-active" : ""
                      }`}
                    >
                      Parent Group
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/admin/parameter/parent-category" passHref>
                    <a
                      className={`${path === "chart/apex" ? "mm-active" : ""}`}
                    >
                      Parent Category
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/admin/parameter/manage-brand" passHref>
                    <a
                      className={`${
                        path === "chart/chartist" ? "mm-active" : ""
                      }`}
                    >
                      Manage Brand
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/admin/parameter/manage-post" passHref>
                    <a
                      className={`${
                        path === "chart/sparkline" ? "mm-active" : ""
                      }`}
                    >
                      Manage Post
                    </a>
                  </Link>
                </li>
              </ul>
            </li>
            <li className={`${bootstrap.includes(path) ? "mm-active" : ""}`}>
              <a className="has-arrow ai-icon c-pointer" aria-expanded="false">
                <i className="flaticon-086-star" />
                <span className="nav-text">User</span>
              </a>
              <ul aria-expanded="false">
                <li>
                  <Link href="/admin/user/manage-user" passHref>
                    <a
                      className={`${
                        path === "ui/accordion" ? "mm-active" : ""
                      }`}
                    >
                      Manage User
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/admin/user/manage-product" passHref>
                    <a className={`${path === "ui/alert" ? "mm-active" : ""}`}>
                      Manage User Product
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/admin/user/manage-post" passHref>
                    <a className={`${path === "ui/badge" ? "mm-active" : ""}`}>
                      Manage User Post
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/admin/user/manage-package" passHref>
                    <a className={`${path === "ui/button" ? "mm-active" : ""}`}>
                      Manage User Package
                    </a>
                  </Link>
                </li>
              </ul>
            </li>
            <li className={`${plugins.includes(path) ? "mm-active" : ""}`}>
              <a className="has-arrow ai-icon c-pointer" aria-expanded="false">
                <i className="flaticon-045-heart" />
                <span className="nav-text">Report</span>
              </a>
              <ul aria-expanded="false">
                <li>
                  <Link href="/admin/reports/sales" passHref>
                    <a className={`${path === "ui/button" ? "mm-active" : ""}`}>
                      Manage Sales
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/admin/reports/registration" passHref>
                    <a className={`${path === "ui/button" ? "mm-active" : ""}`}>
                      Manage Registration
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/admin/reports/billing" passHref>
                    <a className={`${path === "ui/button" ? "mm-active" : ""}`}>
                      Manage Billing
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/admin/reports/tracking" passHref>
                    <a className={`${path === "ui/button" ? "mm-active" : ""}`}>
                      Manage Tracking
                    </a>
                  </Link>
                </li>
              </ul>
            </li>
            <li className={`${plugins.includes(path) ? "mm-active" : ""}`}>
              <a className="has-arrow ai-icon c-pointer" aria-expanded="false">
                <i className="flaticon-013-checkmark" />
                <span className="nav-text">Subscription</span>
              </a>
              <ul aria-expanded="false">
                <li>
                  <Link href="/admin/subscription/manage-packages" passHref>
                    <a className={`${path === "ui/button" ? "mm-active" : ""}`}>
                      Manage Package
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/admin/subscription/manage-offers" passHref>
                    <a className={`${path === "ui/button" ? "mm-active" : ""}`}>
                      Manage Offer
                    </a>
                  </Link>
                </li>
              </ul>
            </li>
            <li className={`${plugins.includes(path) ? "mm-active" : ""}`}>
              <a className="has-arrow ai-icon c-pointer" aria-expanded="false">
                <i className="flaticon-043-menu" />
                <span className="nav-text">Other</span>
              </a>
              <ul aria-expanded="false">
                <li>
                  <Link href="/admin/subscription/manage-packages" passHref>
                    <a className={`${path === "ui/button" ? "mm-active" : ""}`}>
                      change password
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/admin/subscription/manage-offers" passHref>
                    <a className={`${path === "ui/button" ? "mm-active" : ""}`}>
                      notification
                    </a>
                  </Link>
                </li>
              </ul>
            </li>
          </MetisMenu>
          <div className="copyright">
            <p>
              <strong>GEO Trade Admin Dashboard</strong> ©
              {new Date().getFullYear()} All Rights Reserved
            </p>
            <p>Design &#38; Devlopment by Barodaweb</p>
          </div>
        </PerfectScrollbar>
      )}
    </div>
  );
};

export default Sidebar;
