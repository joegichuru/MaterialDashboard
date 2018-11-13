import MUIDataTable from "mui-datatables";
import React from "react";
import CustomToolBar from "../CustomToolBar/CustomToolBar";


const columns = ["Name", "Company", "City", "State"];

const data = [
    ["Joe James", "Test Corp", "Yonkers", "NY"],
    ["John Walsh", "Test Corp", "Hartford", "CT"],
    ["Bob Herm", "Test Corp", "Tampa", "FL"],
    ["James Houston", "Test Corp", "Dallas", "TX"],
];



// const options = {
//     filterType: 'checkbox',
//     customToolbarSelect: selectedRows => (
//         <CustomToolBar selectedRows={selectedRows} handleDelete={} handleSuspend={} handleView={} />
//     )
// };



class Users extends React.Component {
    //receive data as props
    onRowClicked=(rowData, meta)=> {
     //  console.log("Row",rowData)
    };
    render() {
        const {data,columns,options}=this.props;
        return <MUIDataTable
            data={data}
            options={options}
            columns={columns}
            //pass row to paren
        />
    }

}

export default Users
