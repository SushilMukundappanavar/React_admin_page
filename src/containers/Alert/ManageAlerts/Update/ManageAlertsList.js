import React, { Component } from 'react';
// import { Button, Modal } from 'react-bootstrap';
import ReactTable from "react-table";
import { API_ROOT } from '../../../../api-config';
import 'react-table/react-table.css'

import ManageAlertsPopup from './ManageAlertsPopup';
// import UserDeleteModel from '../../UserDeleteModel';

class ManageAlertsList extends Component {
    constructor(props, context){
        super(props, context);
        this.state = {
            data: [],
            id: '',
            name: '',
            query: '',
            actionType: [],
            recipients: '',
            template: '',
            enabled: [],
            lastRun: '',
            nextRun: '',
            description: '',

            manageAlertsCreateSuccessMsg: '',
            manageAlertsDeleteMsg: '',
            manageAlertsEditSuccessMsg: '',

            mode: 'Create',
            show: false,
            showDeleteModel: false,
            formData: {},
            deleteMsg: '',
        }
        this.fetchAlertsGrid = this.fetchAlertsGrid.bind(this);
        this.onChange = this.onChange.bind(this);

        this.handleClose = this.handleClose.bind(this);
        this.handleCloseUserModel = this.handleCloseUserModel.bind(this);
        this.onEditClicked = this.onEditClicked.bind(this);
        this.onCreateClicked = this.onCreateClicked.bind(this);
        
        this.onAddSubmit = this.onAddSubmit.bind(this);
        this.onEditSubmit = this.onEditSubmit.bind(this);
        this.deleteHandler = this.deleteHandler.bind(this);

        this.fetchAlertsGrid();
    }

    fetchAlertsGrid(){
        fetch(`${API_ROOT}/alerts`)
            .then(res => res.json())
            .then(grid => this.data = grid )
            .then(GetAlertsGrid => this.setState({ data : GetAlertsGrid }))
    }

    handleClose() {
        this.setState({
            show: false
        });
    }
    
    onEditClicked(editData, index) {
        //console.log('editData',editData);
        this.setState({ 
            show: true,
            mode: 'Edit',
            formData: {
                // ...editData.original
                id: editData.original.id,
                name: editData.original.name,
                schedule: editData.original.schedule,
                description: editData.original.description,
                query: editData.original.query,
                recipients: editData.original.recipients,
                template: editData.original.template,
                lastRun: editData.original.lastRun,
                nextRun: editData.original.nextRun,
                // enabled: editData.original.enabled,
                // actionType: editData.original.actionType,
                
                selectedActionTypeList: this.state.actionType,
                selectedActionType: editData.original.actionType,

                selectedEnabledList: this.state.enabled,
                selectedEnabled: editData.original.enabled,
            },
        });
    }

    onCreateClicked(event) {
        this.setState({ 
            show: true,
            mode: 'Create',
            formData: {
                name: '',
                schedule: '',
                description: '',
                query: '',
                recipients: '',
                template: '',
                // actionType: '',
                
                // selectedActionType: editData.original.actionType,
                // selectedEnabled: editData.original.enabled,
                selectedActionTypeList: this.state.actionType,
                selectedEnabledList: this.state.enabled,
            },
        });
    }

    onChange(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onAddSubmit(postData){
        //console.log('Create Post' + postData);
        fetch(`${API_ROOT}/alert`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(postData)
        }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
            //console.log('Successed:', response)
            this.setState({
                manageAlertsCreateSuccessMsg : response
            })
            setTimeout(() => {
                this.setState({
                    manageAlertsCreateSuccessMsg: false
            });
            }, 5000)
            this.setState({ show: false });
            this.fetchAlertsGrid();
            this.setState({
                name: '',
                schedule: '',
                description: '',
                query: '',
                actionType: '',
                recipients: '',
                template: '',
                // enabled: '',
                selectedActionTypeList: this.state.actionType,
                selectedEnabledList: this.state.enabled
            })
          }, error => {
            console.log('Error Messages', error);
        });
      }

    onEditSubmit(postData){
        console.log('Edit Post' + postData);
        fetch(`${API_ROOT}/alert`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(postData)
        }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
            console.log('Success:', response);
            if(response.status === 'Alert created successfully'){
                this.state.manageAlertsEditSuccessMsg = <p className="bg-success">Alert has been updated successfully</p>
            }else {
                this.state.manageAlertsEditSuccessMsg = <p className="bg-danger">Error : Failed to update</p>
            }
            setTimeout(() => {
                this.setState({
                    manageAlertsEditSuccessMsg: false
            });
            }, 5000)
            this.setState({ show: false });
            this.fetchAlertsGrid();
          }, error => { 
            console.log('Error Messages', error);
        });
      } 
    
    openUserDeleteModel(deleteData, index) {
        this.setState({
            showDeleteModel : true,
            formData: {
                name: deleteData
            }
        })
    }
    
    handleCloseUserModel() {
        this.setState({
            showDeleteModel: false
        });
    }

    deleteHandler(privilege, e) {
        e.preventDefault();
        //console.log(privilege.original.privilegeName);
        return fetch(`${API_ROOT}/privilege?privilegeName=` + privilege.original.name, {
          method: 'DELETE'
        })
        .then(
            response => {
                if(response.status == 200){
                    this.state.deleteMsg = <p className="bg-success">Privilege has been successfully deleted</p>
                    this.handleCloseUserModel();
                }else {
                    this.state.deleteMsg = <p className="bg-danger">Error : Failed to delete</p>
                }
                setTimeout(() => {
                    this.setState({
                        deleteMsg: false
                })
                }, 5000)
                this.fetchAlertsGrid();
            },
            error => { 
                console.log(error);
            }
        );
      }
    //   {
    //     filterable: false
    //     width: 170,
    //     Header: 'Query',
    //     accessor: 'query',
    //     filterMethod: (filter, row) => row[filter.id].startsWith(filter.value)
    // }
    
    data = []
    columns = [{
        width: 140,
        Header: 'Name',
        accessor: 'name',
        filterMethod: (filter, row) => row[filter.id].startsWith(filter.value)
    }, {
        width: 100,
        Header: 'Schedule(Hrs)',
        accessor: 'schedule',
        filterMethod: (filter, row) => row[filter.id].startsWith(filter.value)
        // Cell: props => <span className='number'>{props.value}</span> 
    }, {
        width: 100,
        Header: 'Description',
        accessor: 'description',
        filterMethod: (filter, row) => row[filter.id].startsWith(filter.value)
        // Cell: props => <span className='number'>{props.value}</span> 
    }, {
        Header: 'Action Type',
        accessor: 'actionType',
        filterMethod: (filter, row) => row[filter.id].startsWith(filter.value)
    }, {
        width: 180,
        Header: 'Recipients',
        accessor: 'recipients',
        filterMethod: (filter, row) => row[filter.id].startsWith(filter.value)
    }, {
        width: 75,
        Header: 'Enabled',
        accessor: 'enabled',
        filterMethod: (filter, row) => row[filter.id].startsWith(filter.value)
    }, {
        Header: 'Last Run (GMT)',
        accessor: 'lastRun',
        filterable: false
    }, {
        Header: 'Next Run (GMT)',
        accessor: 'nextRun',
        filterable: false
    }, {
        width: 35,
        id: 'Edit',
        accessor: '[row identifier to be passed to button]',
        filterable: false,
        Cell: (editData) => (
            <div className="addrol-grid-btn">
                <span className="btn-tooltip">Edit</span>
                <button onClick={this.onEditClicked.bind(this, editData)} className="btn">
                    <i className="far fa-edit icons roll-edit-icon"></i>
                </button>
            </div>
            )
      }, {
        width: 35,
        id: 'DELETE',
        accessor: '[row identifier to be passed to button]',
        filterable: false,
        // Cell: (privilegeName) => (
        //     <div className="addrol-grid-btn">
        //     <span className="btn-tooltip">Delete</span>
        //         <button onClick={this.openUserDeleteModel.bind(this, privilegeName)} className="btn"><i className="far fa-trash-alt roll-edit-icon"></i></button>
        //     </div>
        //     )
      }]
    
    // Render view
    render() {
        return (
            <div className="mid-right margin-top-5">
                { this.state.show &&
                    <ManageAlertsPopup
                        mode={this.state.mode}
                        show={this.state.show}
                        formData={this.state.formData}
                        handleClose={this.handleClose}
                        onEditSubmit={this.onEditSubmit}
                        onAddSubmit={this.onAddSubmit}>
                    </ManageAlertsPopup>
                }
                
                {/* { this.state.showDeleteModel &&
                    <UserDeleteModel
                        deleteHandler={this.deleteHandler}
                        formData={this.state.formData}
                        showDeleteModel={this.state.showDeleteModel}
                        handleCloseUserModel={this.handleCloseUserModel}>
                    </UserDeleteModel>
                } */}

                {/* <div className="managerole-btns clearfix">
                    <button type="text" className="btn btn-primary" onClick={this.onCreateClicked}>Create Alert</button>
                </div> */}

                <div>
                    <p className={this.state.manageAlertsCreateSuccessMsg.status === 'Alert created successfully' ? 'bg-success success-msg' : 'bg-danger success-msg'}>{ this.state.manageAlertsCreateSuccessMsg.status } { this.state.manageAlertsCreateSuccessMsg.error }</p>
                    <div className="success-msg">{ this.state.manageAlertsEditSuccessMsg }</div>
                    <div className="success-msg">{ this.state.manageAlertsDeleteMsg }</div>
                </div>

                <ReactTable
                    data={this.data} 
                    columns={this.columns} 
                    defaultPageSize = {10} 
                    minRows = {2}
                    filterable
                    defaultFilterMethod={(filter, row) => String(row[filter.id]) === filter.value}
                />
            </div>
        );

    }
}
export default ManageAlertsList;

