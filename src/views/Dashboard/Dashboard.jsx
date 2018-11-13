import React from "react";
import PropTypes from "prop-types";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
import {
    ContentCopy,
    Store,
    InfoOutline,
    Warning,
    DateRange,
    LocalOffer,
    Update,
    ArrowUpward,
    AccessTime,
    Accessibility, Home, PersonPin, People, Favorite, ThumbUp, ViewList, Smartphone, Error
} from "@material-ui/icons";
import { withStyles, Grid } from "material-ui";

import {
  StatsCard,
  ChartCard,
  TasksCard,
  RegularCard,
  Table,
  ItemGrid
} from "components";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart
} from "variables/charts";

import dashboardStyle from "assets/jss/material-dashboard-react/dashboardStyle";
import axios from "axios"
import Snackbar from "@material-ui/core/Snackbar/Snackbar";
import IconButton from "@material-ui/core/IconButton/IconButton";

class Dashboard extends React.Component {
  constructor(props){
    super(props)
      this.setState({
          likes:0,
          value:0,
          views:0,
          users:0,
          items:0
      })
  }
  state = {
    value: 0
  };
  componentDidMount(){
      console.log("Token",localStorage.getItem("token"));
      let auth="Bearer "+localStorage.getItem("token");
      axios.get("http://127.0.0.1:8080/dashboard",{
          headers:{
              'Authorization':auth,
              'Access-Control-Allow-Origin': '*'
          }
      }).then(response=>{
          console.log(response.data)
          this.setState(response.data)
      }).catch(reason => {
          console.log(reason)
      })
  }
  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };
  render() {
    return (
      <div>
        <Grid container>
          <ItemGrid xs={12} sm={6} md={3}>
            <StatsCard
              icon={Home}
              iconColor="orange"
              title="Items"
              description={this.state.items}
              statIcon={PersonPin}
              statText={"All Items posted"}
            />
          </ItemGrid>
          <ItemGrid xs={12} sm={6} md={3}>
            <StatsCard
              icon={People}
              iconColor="green"
              title="Users"
              description={this.state.users}
              statIcon={DateRange}
              statText="All users created"
            />
          </ItemGrid>
          <ItemGrid xs={12} sm={6} md={3}>
            <StatsCard
              icon={ThumbUp}
              iconColor="blue"
              title="Likes"
              description={this.state.likes}
              statIcon={Favorite}
              statText="Likes on Items"
            />
          </ItemGrid>
          <ItemGrid xs={12} sm={6} md={3}>
            <StatsCard
              icon={Smartphone}
              iconColor="red"
              title="Views"
              description={this.state.views}
              statIcon={Update}
              statText="Views on Items"
            />
          </ItemGrid>
        </Grid>
        <Grid container>
          <ItemGrid xs={12} sm={12} md={4}>
            <ChartCard
              chart={
                <ChartistGraph
                  className="ct-chart"
                  data={dailySalesChart.data}
                  type="Line"
                  options={dailySalesChart.options}
                  listener={dailySalesChart.animation}
                />
              }
              chartColor="green"
              title="Weekly Posts"
              text={
                <span>
                  <span className={this.props.classes.successText}>
                    <ArrowUpward
                      className={this.props.classes.upArrowCardCategory}
                    />{" "}
                    5%
                  </span>{" "}
                  increase in weekly posts.
                </span>
              }
              statIcon={AccessTime}
              statText="updated 2 minutes ago"
            />
          </ItemGrid>
          <ItemGrid xs={12} sm={12} md={4}>
            <ChartCard
              chart={
                <ChartistGraph
                  className="ct-chart"
                  data={emailsSubscriptionChart.data}
                  type="Bar"
                  options={emailsSubscriptionChart.options}
                  responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                  listener={emailsSubscriptionChart.animation}
                />
              }
              chartColor="orange"
              title="Account Creations"
              text={
                  <span>
                  <span className={this.props.classes.successText}>
                    {" "}
                      3
                  </span>{" "}
                      average accounts created monthly
                </span>
              }
              statIcon={AccessTime}
              statText="last one year"
            />
          </ItemGrid>
          <ItemGrid xs={12} sm={12} md={4}>
            <ChartCard
              chart={
                <ChartistGraph
                  className="ct-chart"
                  data={completedTasksChart.data}
                  type="Line"
                  options={completedTasksChart.options}
                  listener={completedTasksChart.animation}
                />
              }
              chartColor="red"
              title="Views Today"
              text="Items progressive views"
              statIcon={AccessTime}
              statText="item hits last 6 hours"
            />
          </ItemGrid>
        </Grid>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Dashboard);
