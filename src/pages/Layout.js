import {
  Outlet,
  Link,
  NavLink,
  useMatch,
  useResolvedPath,
} from "react-router-dom";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function Layout() {
  return (
    <nav className="nav">
      <CustomLink to="/"> 
      <h1>FC Mastis</h1>
      </CustomLink>

      <ul>
        <CustomLink to="/players">Žaidėjai </CustomLink>
        <CustomLink to="/coaches">Treneriai </CustomLink>
        <CustomLink to="/teams">Komandos</CustomLink>
      </ul>
    </nav>
  );
}
function CustomLink({ to, children, ...props }) {
  // const path = window.location.pathname
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });
  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}
