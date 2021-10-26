import MetisMenu from "@metismenu/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";

import { AppContext } from "../../component/context/app.context";
import axios from "axios";

const Sidebar = () => {
  const { push, pathname } = useRouter();

  const {
    auth: { isAdmin, isSeller },
    token,
  } = useContext(AppContext);

  const [loveEmoji, setLoveEmoji] = useState(false);
  const [sideMenu, setSideMenu] = useState([]);
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      if (isAdmin === true) {
        axios.defaults.headers.common["Authorization"] = token;
        setIsLoading(true);
        await axios
          .get(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/admin/menu`)
          .then((res) => setResponse(res.data.data))
          .catch((err) => console.log(err));
      }
      setIsLoading(false);
    })();
  }, []);

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
              link: "/admin/setup/emails",
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
            {
              name: "Seller Type",
              link: "/admin/parameter/seller-type",
              isActive: val.parameter.sellerType,
            },
          ],
        },
        {
          name: "Product",
          icon: "flaticon-041-graph",
          isActive: val.parameter.parameter,
          subMenu: [
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
              name: "Parent Sub Category",
              link: "/admin/parameter/parent-subcategory",
              isActive: val.parameter.parentSubCategory,
            },
            {
              name: "Manage Brand",
              link: "/admin/parameter/manage-brand",
              isActive: val.parameter.brnad,
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
        {
          name: "Seller",
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

      if (response && !isPathMatch) {
        const val = response.menu;

        if (
          pathname.startsWith("/admin/user/manage-product") ||
          pathname.startsWith("/admin/user/manage-post")
        ) {
          if (val.user.manageUser === true) {
          } else {
            push("/admin/dashboard");
          }
        } else {
          push("/admin/dashboard");
        }
      }
    }

    if (!isSeller && pathname.startsWith("/seller")) {
      push("/buyer");
    }
  }, [isAdmin, sideMenu, window.location, pathname]);

  const [doc, setDoc] = useState();
  useEffect(() => {
    setDoc(window);
  }, [doc]);
  let path = doc && doc.location.pathname;
  path = path && path.split("/");
  path = path && path[path.length - 1];

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
              </>
            ) : pathname.startsWith("/seller") ||
              pathname.startsWith("/buyer") ? (
              <>
                <li>
                  <a className="has-arrow ai-icon c-pointer">
                    <i className="flaticon-086-star"></i>
                    <span className="nav-text">Buyer tools</span>
                  </a>
                  <ul>
                    <li>
                      <Link href="/buyer/chats" passHref>
                        <a>Chats</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/buyer/rfqs" passHref>
                        <a>My RFQ</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/buyer/wishlist" passHref>
                        <a>Whislist</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/buyer/switch-to-seller" passHref>
                        <a>Switch to seller</a>
                      </Link>
                    </li>
                  </ul>
                </li>
                <li style={{ display: isSeller ? undefined : "none" }}>
                  <a className="has-arrow ai-icon c-pointer">
                    <i className="flaticon-025-dashboard"></i>
                    <span className="nav-text">Seller tools</span>
                  </a>
                  <ul>
                    <li>
                      <Link href="/seller/brand" passHref>
                        <a
                          className={`${
                            path === "ui/button" ? "mm-active" : ""
                          }`}
                        >
                          Brand
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
                          Product
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
                          Post
                        </a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/seller/rfq" passHref>
                        <a
                          className={`${
                            path === "ui/button" ? "mm-active" : ""
                          }`}
                        >
                          RFQ
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
                          Profile lead
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
                          Inquiry lead
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
                          contact lead
                        </a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/seller/subscription" passHref>
                        <a
                          className={`${
                            path === "ui/button" ? "mm-active" : ""
                          }`}
                        >
                          Subscription
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
          ) : pathname.startsWith("/seller") ||
            pathname.startsWith("/buyer") ? (
            <>
              <div className="copyright">
                <p>
                  <strong>GEO Trade Admin Dashboard</strong> ©
                  {new Date().getFullYear()} All Rights Reserved
                </p>
              </div>
            </>
          ) : undefined}
        </PerfectScrollbar>
      )}
    </div>
  );
};

export default Sidebar;
