import React from "react";
import classNames from "classnames";
import { Manager, Target, Popper } from "react-popper";
import {
  withStyles,
  IconButton,
  MenuItem,
  MenuList,
  Grow,
  Paper,
  ClickAwayListener,
  Hidden
} from "material-ui";
import { Person, Notifications, Dashboard, Search } from "@material-ui/icons";

import { CustomInput, IconButton as SearchButton } from "components";

import headerLinksStyle from "assets/jss/material-dashboard-react/headerLinksStyle";

class HeaderLinks extends React.Component {
  state = {
    open: false
  };
  handleClick = () => {
    this.setState({ open: !this.state.open });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
    handleLogout=()=>{
        this.setState({open:false});
        localStorage.clear();
        window.location.reload()
    };
  render() {
    const { classes } = this.props;
    const { open } = this.state;
    return (
      <div>
        {/*<CustomInput*/}
          {/*formControlProps={{*/}
            {/*className: classes.margin + " " + classes.search*/}
          {/*}}*/}
          {/*inputProps={{*/}
            {/*placeholder: "Search",*/}
            {/*inputProps: {*/}
              {/*"aria-label": "Search"*/}
            {/*}*/}
          {/*}}*/}
        {/*/>*/}
        {/*<SearchButton*/}
          {/*color="white"*/}
          {/*aria-label="edit"*/}
          {/*customClass={classes.margin + " " + classes.searchButton}*/}
        {/*>*/}
          {/*<Search className={classes.searchIcon} />*/}
        {/*</SearchButton>*/}
        <IconButton
          color="inherit"
          aria-label="Dashboard"
          className={classes.buttonLink}
        >
          <Dashboard className={classes.links} />
          <Hidden mdUp>
            <p className={classes.linkText}>Dashboard</p>
          </Hidden>
        </IconButton>
        <Manager style={{ display: "inline-block" }}>
          <Target>
            <IconButton
              color="inherit"
              aria-label="Notifications"
              aria-owns={open ? "menu-list" : null}
              aria-haspopup="true"
              onClick={this.handleClick}
              className={classes.buttonLink}
            >
              <Notifications className={classes.links} />
              {/*<span className={classes.notifications}>5</span>*/}
              <Hidden mdUp>
                <p onClick={this.handleClick} className={classes.linkText}>
                  Notification
                </p>
              </Hidden>
            </IconButton>
          </Target>
          <Popper
            placement="bottom-start"
            eventsEnabled={open}
            className={
              classNames({ [classes.popperClose]: !open }) +
              " " +
              classes.pooperResponsive
            }
          >
            <ClickAwayListener onClickAway={this.handleClose}>
              <Grow
                in={open}
                id="menu-list"
                style={{ transformOrigin: "0 0 0" }}
              >
                <Paper className={classes.dropdown}>
                  {/*<MenuList role="menu">*/}
                    {/*<MenuItem*/}
                      {/*onClick={this.handleClose}*/}
                      {/*className={classes.dropdownItem}*/}
                    {/*>*/}
                     {/*4 New Item Posted*/}
                    {/*</MenuItem>*/}
                      {/*<MenuItem*/}
                          {/*onClick={this.handleClose}*/}
                          {/*className={classes.dropdownItem}*/}
                      {/*>*/}
                         {/*New Accounts created*/}
                      {/*</MenuItem>*/}
                    {/*<MenuItem*/}
                      {/*onClick={this.handleClose}*/}
                      {/*className={classes.dropdownItem}*/}
                    {/*>*/}
                      {/*You have 5 new tasks*/}
                    {/*</MenuItem>*/}
                    {/*<MenuItem*/}
                      {/*onClick={this.handleClose}*/}
                      {/*className={classes.dropdownItem}*/}
                    {/*>*/}
                     {/*Review Suspended Items*/}
                    {/*</MenuItem>*/}
                  {/*</MenuList>*/}
                </Paper>
              </Grow>
            </ClickAwayListener>
          </Popper>
        </Manager>
          <Manager style={{ display: "inline-block" }}>
              <Target>
                  <IconButton
                      color="inherit"
                      aria-label="Notifications"
                      aria-owns={open ? "menu-list-1" : null}
                      aria-haspopup="true"
                      onClick={this.handleClick}
                      className={classes.buttonLink}
                  >
                      <Person className={classes.links} />
                      <Hidden mdUp>
                          <p onClick={this.handleClick} className={classes.linkText}>
                              Logout
                          </p>
                      </Hidden>
                  </IconButton>
              </Target>
              <Popper
                  placement="bottom-start"
                  eventsEnabled={open}
                  className={
                      classNames({ [classes.popperClose]: !open }) +
                      " " +
                      classes.pooperResponsive
                  }
              >
                  <ClickAwayListener onClickAway={this.handleClose}>
                      <Grow
                          in={open}
                          id="menu-list-1"
                          style={{ transformOrigin: "0 0 0" }}
                      >
                          <Paper className={classes.dropdown}>
                              <MenuList role="menu">
                                  <MenuItem
                                      onClick={this.handleLogout}
                                      className={classes.dropdownItem}
                                  >
                                      Logout
                                  </MenuItem>
                              </MenuList>
                          </Paper>
                      </Grow>
                  </ClickAwayListener>
              </Popper>
          </Manager>
      </div>
    );
  }
}

export default withStyles(headerLinksStyle)(HeaderLinks);
