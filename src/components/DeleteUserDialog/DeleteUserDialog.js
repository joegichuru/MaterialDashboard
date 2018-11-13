import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class DeleteUserDialog extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            open: false
        };

    }


    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
        this.props.cancel()
    };
    handleContinue=()=>{
        this.setState({open:false});
        this.props.continue();
    };

    render() {
        console.log("P",this.props);
        return (
            <div>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}

                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Are you sure you want to "+this.props.action+" selected user(s)?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            This will action will {this.props.action} users.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary" autoFocus>
                            Discard
                        </Button>
                        <Button onClick={this.handleContinue} color="primary" >
                            Continue
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default DeleteUserDialog;
