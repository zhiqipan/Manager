import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import EmployeeForm from './EmployeeForm';
import {employeeUpdate, employeeSave} from '../actions';
import {Card, CardSection, Button} from './common';

class EmployeeEdit extends Component {
    componentWillMount() {
        // map props to state - always use reducer state to share data among components
        _.each(this.props.employee, (value, prop) => {
            this.props.employeeUpdate({prop, value});
        });
    }

    onButtonPress() {
        const {name, phone, shift} = this.props;
        this.props.employeeSave({name, phone, shift, key: this.props.employee.key});
    }

    render() {
        return (
            <Card>
                <EmployeeForm/>
                <CardSection>
                    <Button onPress={this.onButtonPress.bind(this)}>
                        Update
                    </Button>
                </CardSection>
            </Card>
        );
    }
}

const mapStateToProps = state => {
    const {name, phone, shift} = state.employeeForm;

    return {name, phone, shift};

};

export default connect(mapStateToProps, {employeeUpdate, employeeSave})(EmployeeEdit);