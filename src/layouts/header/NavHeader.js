import Link from "next/link";
import { useState } from "react";

const NavHeader = () => {
  const [active, setActive] = useState(false);
  const toggleFun = () => {
    var aaa = document.querySelector("#main-wrapper");
    aaa.classList.toggle("menu-toggle");
    setActive(!active);
  };
  return (
    <div className="nav-header">
      <Link href="/">
        <a className="brand-logo">
          <img
            style={{ width: "100px" }}
            src="https://i.ibb.co/q5j82YX/geotrade-logo.png"
          />
        </a>
      </Link>
      <div className="nav-control">
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
