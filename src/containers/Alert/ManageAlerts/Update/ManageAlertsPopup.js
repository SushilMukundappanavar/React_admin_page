import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';

class ManageAlertsPopup extends Component {
    constructor(props, context) {
        super(props, context);
            this.onChangName = this.onChangName.bind(this);
            this.onChangeSchedule = this.onChangeSchedule.bind(this);
            this.onChangeDescription = this.onChangeDescription.bind(this);
            this.onChangeQuery = this.onChangeQuery.bind(this);
            this.onChangeActionType = this.onChangeActionType.bind(this);
            this.onChangeRecipients = this.onChangeRecipients.bind(this);
            this.onChangeTemplate = this.onChangeTemplate.bind(this);
            this.onChangeEnabled = this.onChangeEnabled.bind(this)

            this.onSubmit = this.onSubmit.bind(this);
            this.state = {
                formData: this.props.formData,
                actionType: ['mail', 'SMS'],
                enabled: ['true', 'false']
            }

            // console.log('this.props.formData',this.props.formData);
            // console.log(this.props.formData.resourceName)
    }
    componentWillReceiveProps(nextProps) {
        // console.log(nextProps);
    }

    onChangName(e){
        this.setState({
            formData: {
                ...this.state.formData,
                name: e.target.value
            }
        });
    }
    onChangeSchedule(e){
        this.setState({
            formData: {
                ...this.state.formData,
                schedule: e.target.value
            }
        });
    }
    onChangeDescription(e) {
        this.setState({
            formData: {
                ...this.state.formData,
                description: e.target.value
            }
        })
    }
    onChangeQuery(e) {
        this.setState({
            formData: {
                ...this.state.formData,
                query: e.target.value
            }
        });
    }
    onChangeActionType(e){
        this.setState({
            formData: {
                ...this.state.formData,
                selectedActionType: e.target.value
            }
        })
    }
    onChangeRecipients(e) {
        this.setState({
            formData: {
                ...this.state.formData,
                recipients: e.target.value
            }
        })
    }    
    onChangeTemplate(e) {
        this.setState({
            formData: {
                ...this.state.formData,
                template: e.target.value
            }
        })
    }
    onChangeEnabled(e) {
        this.setState({
            formData: {
                ...this.state.formData,
                selectedEnabled: e.target.value
            }
        })
    }
    // resourceName = [];

    onSubmit(e) {
        e.preventDefault();
        if(this.props.mode === 'Edit') {
            const postData = {
                id: this.props.formData.id,
                name: this.state.formData.name,
                schedule: this.state.formData.schedule,
                description: this.state.formData.description,
                query: this.state.formData.query,
                actionType: this.state.formData.selectedActionType,
                recipients: this.state.formData.recipients,
                template: this.state.formData.template,
                enabled: this.state.formData.selectedEnabled,

                lastRun: this.state.formData.lastRun,
                nextRun: this.state.formData.nextRun

                // selectedEnabled: this.state.formData.enabled,
                // selectedActionType: this.state.formData.actionType
            }
            this.props.onEditSubmit(postData);
            //console.log(postData);
        } else {
            const postData = {
                name: this.state.formData.name,
                schedule: this.state.formData.schedule,
                description: this.state.formData.description,
                query: this.state.formData.query,
                // actionType: this.state.formData.selectedActionType,
                actionType: this.state.formData.selectedActionType ? this.state.formData.selectedActionType : this.state.actionType[0],
                recipients: this.state.formData.recipients,
                template: this.state.formData.template,
                enabled: this.state.formData.selectedEnabled ? this.state.formData.selectedEnabled : this.state.enabled[0],

                // selectedEnabled: this.state.formData.enabled,
                // selectedActionType: this.state.formData.actionType
            }
            this.props.onAddSubmit(postData);
            //console.log(postData);
        }
    }
    render() {
        const actionTypeSelectForm = this.state.actionType.map( ActionTypeDropdown => {
            return <option key={ActionTypeDropdown.toString()} value={ActionTypeDropdown}>{ActionTypeDropdown} </option>
        })

        const enabledSelectForm = this.state.enabled.map(enabledDropdown => {
            return <option key={enabledDropdown.toString()} value={enabledDropdown}>{enabledDropdown} </option>
        })

        return(
            <div className="clearfix">
                <Modal show={this.props.show} onHide={this.props.handleClose}>
                <form onSubmit={this.onSubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.props.mode} Alert</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="well margin-none">
                        <div className="clearfix ">
                            <div className="form-group">
                                <label>Name <i className="input-require">*</i></label>
                                <input type="text" name="name" className="form-control" placeholder="Name" required
                                    onChange={this.onChangName}
                                    value={this.state.formData.name}
                                />
                            </div>
                            <div className="form-group">
                                <label>Schedule (Hours)<i className="input-require">*</i></label>
                                <input type="number" name="schedule" className="form-control" placeholder="Schedule" required
                                    onChange={this.onChangeSchedule} 
                                    value={this.state.formData.schedule}
                                    />
                            </div>
                            <div className="form-group">
                                <label>Description<i className="input-require">*</i></label>
                                <input type="text" name="description" className="form-control" placeholder="Description" required
                                    onChange={this.onChangeDescription} 
                                    value={this.state.formData.description}
                                    />
                            </div>
                            <div className="form-group">
                                <label>Query <i className="input-require">*</i></label>
                                <textarea name="query" className="form-control" placeholder="Query" rows="3" required 
                                onChange={this.onChangeQuery} 
                                value={this.state.formData.query}
                                disabled={this.props.mode === 'Edit'}>
                                </textarea>

                                {/* <input type="text" name="query" className="form-control" placeholder="Query" required
                                    onChange={this.onChangeQuery} 
                                    value={this.state.formData.query}
                                    disabled={this.props.mode === 'Edit'}
                                    /> */}
                            </div>
                            <div className="form-group">
                                <label>Action Type <i className="input-require">*</i></label>
                                <select  name="selectedActionType" className="form-control" placeholder="Action Type"
                                    onChange={this.onChangeActionType} 
                                    value={this.state.formData.selectedActionType}>
                                    { actionTypeSelectForm } 
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Recipients <i className="input-require">*</i></label>
                                <input type="text" name="recipients" className="form-control" placeholder="Recipients" required
                                    onChange={this.onChangeRecipients} 
                                    value={this.state.formData.recipients}
                                    />
                            </div>
                            <div className="form-group">
                                <label>Template <i className="input-require">*</i></label>
                                <input type="text" name="template" className="form-control" placeholder="Template" required
                                    onChange={this.onChangeTemplate} 
                                    value={this.state.formData.template}
                                    />
                            </div>
                            <div className="form-group">
                                <label>Enabled <i className="input-require">*</i></label>
                                <select name="selectedEnabled"  className="form-control" placeholder="Enabled" required
                                    onChange={this.onChangeEnabled} 
                                    value={this.state.formData.selectedEnabled}>
                                    { enabledSelectForm }
                                </select>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button type="submit" className="btn btn-primary">Submit</Button>
                        <Button className="btn " onClick={this.props.handleClose}>Cancel</Button>
                    </Modal.Footer>
                    </form>
                </Modal>
            </div>
        );
    }
}

export default ManageAlertsPopup;