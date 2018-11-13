import Users from "../../components/User/User";
import React from "react";
import {Grid, withStyles} from "material-ui";
import {ItemGrid, RegularCard, Table} from "components";
import usersStyle from "assets/jss/material-dashboard-react/usersStyle";
import CustomToolBar from "../../components/CustomToolBar/CustomToolBar";
import axios from "axios"
import IconButton from "@material-ui/core/IconButton/IconButton";
import {Error} from "@material-ui/icons";
import Snackbar from "@material-ui/core/Snackbar/Snackbar";
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";


const icon = {
    color: 'red'
};
const snack = {
    color: 'red'
};
const round = {}

class UsersList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [], open: false, close: true
        };
    }

    //get users
    //pass the list to users table as data and columns

    changeAction(action, message) {
        this.setState({
            action: action, message: message, open: true, accept: this.state.accept
        })
    }

    handleActions = (d) => {
        console.log("Actions", d)

    };
    handleClickOpen = () => {
        this.setState({open: true});
    };
    handleSuspend = (d) => {
        this.setState({
            open: true,
            message: "Item are being suspended/activated"
        });
        let u = this.getUsers(d);
        u.forEach(k => {
            ///delete from the server
            console.log("K",k);
            let auth = "Bearer " + localStorage.getItem("token");
            console.log(auth);
            let userId=localStorage.getItem("userId");
            // axios.post("http://127.0.0.1:8080/dashboard/users/suspend/"+k[0], {
            //     headers: {
            //         'Authorization': auth,
            //         'Access-Control-Allow-Origin': '*'
            //     }
            // }).then(response=>{
            //     console.log(response)
            //     this.setState({
            //         close:true,
            //         open:false
            //     })
            // }).catch(reason => {
            //     console.log(reason)
            //     this.setState({
            //         close:true,
            //         open:false
            //     })
            // })
            if(userId!==k[0]){
                let status=""
                let url="";
                if(k[6]==="True"){
                    status=true;
                    url ="http://127.0.0.1:8080/dashboard/items/suspend/"+k[0]
                }else{
                    status=false;
                    url="http://127.0.0.1:8080/dashboard/items/unsuspend/"+k[0]
                }
                fetch(url, {
                    headers: {
                        'Authorization': auth,
                        'Access-Control-Allow-Origin': '*'
                    },
                    method:"POST",
                    mode: "cors",


                }).then(response=>{
                    // console.log("Promise",response.json());
                    let s=this.state.users;
                    console.log("S",s);
                    //iterate through and change where id is this user
                    var index=s.indexOf(k);
                    s[index][6]=status?"False":"True";
                    console.log("Index",index);
                    this.setState({
                        users:s
                    });
                    return response.json();
                }).then(function (js) {
                    console.log(js);
                    this.setState({
                        close:false,
                        open:true,
                        message:js.message
                    })
                })

                    .catch(reason => {
                        console.log(reason)
                        this.setState({
                            close:true,
                            open:false
                        })
                    })
            }

        })
    };
    handleDelete = (d) => {
        this.setState({
            open: true,
            message: "Items are being deleted"
        });
        let u = this.getUsers(d);
        u.forEach(k => {
            ///delete from the server
            console.log("K",k);
            let auth = "Bearer " + localStorage.getItem("token");
            console.log(auth);
            let userId=localStorage.getItem("userId");

            if(userId!==k[0]){
                fetch("http://127.0.0.1:8080/dashboard/items/delete/"+k[0], {
                    headers: {
                        'Authorization': auth,
                        'Access-Control-Allow-Origin': '*'
                    },
                    method:"POST",
                    mode: "cors",


                }).then(response=>{
                    // console.log("Promise",response.json());
                    let s=this.state.users;
                    s.splice(s.indexOf(k),1);
                    this.setState({
                        users:s
                    });
                    return response.json();
                }).then(function (js) {
                    console.log(js);
                    this.setState({
                        close:false,
                        open:true,
                        message:js.message
                    })
                })

                    .catch(reason => {
                        console.log(reason)
                        this.setState({
                            close:true,
                            open:false
                        })
                    })
            }

        })
    };
    handleView = (d) => {
        //show modol of item details
        //or create new component

    };
    hideSnack = () => {
        this.setState({
            message: "",
            open: false,
            close: true
        })
    };


    handleDialogCancel() {
        this.setState({
            action: "", message: "", open: false, accept: false
        })
    }

    handleDialogAccept() {
        this.setState({
            action: "", message: "", open: false, accept: false
        })
    }

    //get users from array of positions
    getUsers = (d) => {
        let localUsers = this.state.users;
        return d.map(d => {
            return localUsers[d]
        });
    };

    componentDidMount() {
        //get users from server
        //update state


        console.log("Token", localStorage.getItem("token"));
        let auth = "Bearer " + localStorage.getItem("token");
        axios.get("http://127.0.0.1:8080/dashboard/items", {
            headers: {
                'Authorization': auth,
                'Access-Control-Allow-Origin': '*'
            }
        })
            .then(response => {
                console.log(response.data);
                let users = response.data.map(u => {
                    return [u.id, u.name, u.user.name, new Date(u.postedOn).toLocaleDateString(),u.itemType,u.likes,u.isPublished?"True":"False",u.city]
                });
                console.log(users)
                this.setState({
                    users: users
                })

            }).catch(reason => {
            console.log(reason)
        })
    }

    render() {
        const columns = [
            {
                name: "id",
                options: {
                    filter: true,
                    sort: true
                }
            },
            {
                name: "Name",
                options: {
                    filter: true,
                    sort: true
                }
            },
            {
                name: "Author",
                options: {
                    filter: true,
                    sort: true
                }
            },
            {
                name: "Posted",
                options: {
                    filter: true,
                    sort: true
                }
            },
            {
                name: "Type",
                options: {
                    filter: true,
                    sort: true
                }
            },
            {
                name: "Likes",
                options: {
                    filter: true,
                    sort: true
                }
            },
            {
                name: "Published",
                options: {
                    filter: true,
                    sort: true
                }
            },
            {
                name: "City",
                options: {
                    filter: true,
                    sort: true
                }
            },
        ];
        const options = {
            filterType: 'dropdown',
            downloadOptions: {
                filename: "posts.csv"
            },
            customToolbarSelect: selectedRows => (
                <CustomToolBar selectedRows={selectedRows}
                               handleDelete={this.handleDelete}
                               handleSuspend={this.handleSuspend}
                               handleView={this.handleView}/>
            )
        };

        return <Grid container>
            <ItemGrid xs={12} sm={12} md={12}>
                <RegularCard
                    cardTitle="All Posts"
                    cardSubtitle="Table of All Posts"
                    content={<Users data={this.state.users} columns={columns} options={options}/>}
                />
            </ItemGrid>
            <Snackbar message={this.state.message}
                      open={this.state.open}
                      close={this.state.close.toString}
                      color={"primary"}
                      anchorOrigin={{vertical: "top", horizontal: 'center'}}
                      autoHideDuration={1}
                      action={<IconButton style={icon} onClick={this.hideSnack}>
                          <Error/>
                      </IconButton>}/>
        </Grid>
    }
}

export default withStyles(usersStyle)(UsersList);