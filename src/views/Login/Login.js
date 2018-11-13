import React from 'react';
import { Paper, withStyles, Grid, TextField, Button, FormControlLabel, Checkbox } from 'material-ui';
import { Face, Fingerprint,Lock,Email,Error } from '@material-ui/icons'
import ItemGrid from "../../components/Grid/ItemGrid";
import Snackbar from "@material-ui/core/Snackbar/Snackbar";
import IconButton from "@material-ui/core/IconButton/IconButton";

import axios from 'axios'
import {Redirect} from "react-router-dom";
import BASE_URL from '../../variables/general.jsx'

const styles = theme => ({
    margin: {
        margin: theme.spacing.unit * 2,
    },
    padding: {
        padding: theme.spacing.unit
    }
});
const st={
    marginTop: 150
};
const icon={
    color:'red'
};
const  snack={
    color: 'red'
};
const round={

}
class LoginTab extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            message:"",
            open:false,
            close:true,
            email:'',
            password:'',
            redirect:null
        }

    }
    validateEmail=(event)=>{

        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(re.test(String(event.target.value).toLowerCase())){
            this.setState(this.state={
                message:"",
                open:false,
                close:true,
                email:event.target.value,
                password:this.state.password
            });
            console.log("Email true",event.target.value)
        }else {
            this.setState({
                message:"Email address not valid",
                open:true,
                close:false,
                email:'',
                password:this.state.password
            });
            console.log("Email false",event.target.value)
        }
    };
    validPassword=(event)=>{
        if(event.target.value.length<4){
            this.setState({
                message:"Password too short",
                open:true,
                close:false,
                email:this.state.email,
                password:''
            });
        }else {
            this.setState({
                message:"",
                open:false,
                close:true,
                email:this.state.email,
                password:event.target.value
            });
        }
    };

    validateInput=()=>{
        if(this.state.email.length<1||this.state.password.length<4){
            this.setState({
                message:"Email and password required",
                open:true,
                close:false,
                email:'',
                password:this.state.password
            });
        }else {
            this.logUserIn()
        }
    };
    hideSnack=()=>{
        this.setState({
            message:"",
            open:false,
            close:true
        })
    };

    logUserIn=()=>{
        let data={
            email:this.state.email,
            password:this.state.password
        }
        // axios.post("",data).then(response=>{
        //     console.log("RSP",response.data)
        // }).catch(reason => {
        //     console.log("Error",reason);
        //     this.setState({
        //         message:reason.toString(),
        //         close:false,
        //         open:true
        //     })
        // });
        let formDat=new FormData()
        formDat.append("email",this.state.email);
        formDat.append("password",this.state.password);
        formDat.append("name","joseph");
        console.log(BASE_URL)
        axios.post("http:/127.0.0.1/login",formDat)
            .then(response=>{

                let data=response.data
                console.log(data.accessToken)
                if(data.accessToken!==undefined){
                    localStorage.setItem("token",data.accessToken);
                    localStorage.setItem("userId",data.id)
                    //redirect user to root
                    // this.setState({
                    //     redirect:<Redirect push to={"/s"}/>
                    // })
                    window.location.reload()
                }else {
                    this.setState({
                        open:true,message:data.message
                    })
                }



            }).catch(reason => {
                console.log("Error",reason)
        });
        // let auth='Bearer ' + localStorage.getItem('token');
        // console.log("Token",auth);
        // axios.defaults.headers.common['Authorization'] =auth;
        // axios.get("http://127.0.0.1:8080/items")
        //     .then(response => {
        //         console.log(response.data)
        //     }).catch(reason => {
        //     console.log(reason)
        // })
        console.log("Doing")
        // fetch("http://127.0.0.1:8080/items").then(r=>{
        //     console.log("fetch",r)
        // }).catch(reason => {
        //     console.log("fetch",reason)
        // })
    };
    render() {
        const { classes } = this.props;
        return (
            <Grid container justify={"center"} style={st}>
                <ItemGrid xs={12} sm={8} md={4}>
                    <Paper className={classes.padding} style={round}>
                        <div className={classes.margin}>
                            <Grid container spacing={8} alignItems="flex-end">
                                <Grid item>
                                    <Email />
                                </Grid>
                                <Grid item md={true} sm={true} xs={true}>
                                    <TextField id="username"
                                               margin="normal"
                                               variant="outlined"
                                               onChange={this.validateEmail}
                                               label="E-mail" type="email" fullWidth autoFocus required />
                                </Grid>
                            </Grid>
                            <Grid container spacing={8} alignItems="flex-end">
                                <Grid item>
                                    <Lock />
                                </Grid>
                                <Grid item md={true} sm={true} xs={true}>
                                    <TextField id="username"
                                               margin="normal"
                                               variant="outlined"
                                               onChange={this.validPassword}
                                               label="Password" type="password" fullWidth required />
                                </Grid>
                            </Grid>
                            <Grid container alignItems="center" justify="space-between">
                                <Grid item>
                                    <FormControlLabel control={
                                        <Checkbox
                                            color="primary"
                                        />
                                    } label="Remember me" />
                                </Grid>
                                <Grid item>
                                    <Button disableFocusRipple disableRipple style={{ textTransform: "none" }}
                                            variant="text" color="primary">Forgot password ?</Button>
                                </Grid>
                            </Grid>
                            <Grid container justify="center" style={{ marginTop: '20px' }}>
                                <Button variant="outlined" color="primary"
                                        size={'large'} onClick={this.validateInput}
                                        style={{ textTransform: "none" }}>Login</Button>
                            </Grid>
                        </div>
                    </Paper>
                </ItemGrid>
                <Snackbar message={this.state.message}
                          open={this.state.open}
                          close={this.state.close}
                          color={"primary"}
                          style={snack}
                          anchorOrigin={{vertical:"top",horizontal:'center'}}
                          autoHideDuration={1}
                          action={<IconButton color={"danger"} style={icon} onClick={this.hideSnack}>
                              <Error />
                          </IconButton>}/>
            </Grid>

        );
    }
}

export default withStyles(styles)(LoginTab);