import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Logo from "../../../logo.png";

const NavHeader = () => {
  const [active, setActive] = useState(false);
  const toggleFun = () => {
    var aaa = document.querySelector("#main-wrapper");
    aaa.classList.toggle("menu-toggle");
    setActive(!active);
  };

  const { pathname } = useRouter();

  const url = pathname.startsWith("/admin/") ? "/admin/dashboard" : "/seller";

  return (
    <div className="nav-header mobile-w-100">
      <Link href={url} passHref>
        <a className="brand-logo">
          <img style={{ width: "100px" }} src={Logo} />
        </a>
      </Link>
      <div className="nav-control mobile-left-right-pr" style={{}}>
        <div
          className={`hamburger ${active ? "is-active" : ""}`}
          onClick={() => toggleFun()}
        >
          <span className="line" />
          <span className="line" />
          <span className="line" />
        </div>
      </div>
    </div>
  );
};

export default NavHeader;
