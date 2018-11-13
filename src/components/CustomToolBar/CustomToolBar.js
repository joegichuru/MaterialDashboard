import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import {Delete, Refresh, Update, RemoveRedEye,Details,MoreVert} from "@material-ui/icons";
import FilterIcon from "@material-ui/icons/FilterList";
import {withStyles} from "@material-ui/core/styles";

const defaultToolbarSelectStyles = {
    iconButton: {
        marginRight: "24px",
        top: "50%",
        display: "inline-block",
        position: "relative",
        transform: "translateY(-50%)"
    },
    deleteIcon: {
        color: "red"
    }
};

class CustomToolbar extends React.Component {
    //transform the data to a user and sent it to caller
    handleClick = () => {

    };
    suspendUsers = () => {
        this.props.handleSuspend(this.selectedColumns())
    };

    deleteUsers=()=>{
        this.props.handleDelete(this.selectedColumns())
    };
    viewUser=()=>{
        this.props.handleView(this.selectedColumns())
    };

    //get the columns user selected
    selectedColumns=()=>{
        return this.props.selectedRows.data.map((v,n,d)=>{

            return v.dataIndex
        })
    };



    render() {
        const {classes} = this.props;
        const rows = this.props.selectedRows;
      //  console.log("R", rows);
        let actions=null;
        if(rows.data.length>1){
            actions = <div className={"custom-toolbar-select"}>
                <Tooltip title={rows.data.length > 1 ? "Suspend All" : "Suspend"}>
                    <IconButton className={classes.iconButton} color={'primary'} onClick={this.suspendUsers}>
                        <RemoveRedEye/>
                    </IconButton>
                </Tooltip>
                <Tooltip title={rows.data.length > 1 ? "Delete All" : "Delete"}>
                    <IconButton className={classes.iconButton} color={'primary'} onClick={this.deleteUsers}>
                        <Delete className={classes.deleteIcon}/>
                    </IconButton>
                </Tooltip>

            </div>;
        }else {
            //add view action
            actions = <div className={"custom-toolbar-select"}>
                <Tooltip title={rows.data.length > 1 ? "Suspend All" : "Suspend"}>
                    <IconButton className={classes.iconButton} color={'primary'} onClick={this.suspendUsers}>
                        <RemoveRedEye/>
                    </IconButton>
                </Tooltip>
                <Tooltip title={rows.data.length > 1 ? "Delete All" : "Delete"}>
                    <IconButton className={classes.iconButton} color={'primary'} onClick={this.deleteUsers}>
                        <Delete className={classes.deleteIcon}/>
                    </IconButton>
                </Tooltip>

                <Tooltip title={"Details"}>
                    <IconButton className={classes.iconButton} color={'primary'} onClick={this.viewUser}>
                        <MoreVert />
                    </IconButton>
                </Tooltip>
            </div>;
        }

        return (actions
        );
    }
}

export default withStyles(defaultToolbarSelectStyles, {
    name: "CustomToolbarSelect"
})(CustomToolbar);
