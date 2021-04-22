import React, {Fragment} from "react";
import {Link} from "react-router-dom";
import {cx} from "emotion";
import {consumeContext, cs} from "cs-react";
import {WindowTitle} from "./window-title";

export const Layout = ({active, children, windowTitle}) => cs(
    consumeContext("auth"),
    ({auth}) => (
        <Fragment>
            <WindowTitle title={windowTitle == null ? "Conduit" : `${windowTitle} — Conduit`}/>

            <nav className="navbar navbar-light">
                <div className="container">
                    <Link className="navbar-brand" to="/">conduit</Link>
                    {renderNavItems(navLinks(auth.user), active)}
                </div>
            </nav>

            {children}

            <footer>
                <div className="container">
                    <a href="/" className="logo-font">conduit</a>
                    <span className="attribution">
                    An interactive learning project from <a href="https://thinkster.io">Thinkster</a>. Code &amp; design licensed under MIT.
                </span>
                </div>
            </footer>
        </Fragment>
    )
);

const renderNavItems = (links, active) => (
    <ul className="nav navbar-nav pull-xs-right">
        {links.map(({label, name, to}) => {
            const Comp = active !== name ? Link : "div";
            return (
                <li className="nav-item" key={name}>
                    <Comp
                        className={cx("nav-link", {"active": active === name})}
                        to={to}
                    >{label}</Comp>
                </li>
            );
        })}
    </ul>
);

const navLinks = (user) => [
    {label: "Home", name: "home", to: "/"},
    !user && {label: "Sign in", name: "login", to: "/login"},
    !user && {label: "Sign up", name: "register", to: "/register"},
    user && {
        label: (
            <Fragment>
                <i className="ion-compose"/>&nbsp;New Article
            </Fragment>
        ),
         name: "editor", to: "/editor",
    },
    user && {
        label: (
            <Fragment>
                <i className="ion-gear-a"/>&nbsp;Settings
            </Fragment>
        ),
         name: "settings", to: "/settings",
    },
    user && {
        label: user.username,
        name: `profile-${user.username}`, to: `/@${user.username}`,
    },
].filter(v => v);