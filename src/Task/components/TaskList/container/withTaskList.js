import api from 'api';
import moment from 'moment';
import React, { Component } from 'react';
import { v4 as uuid } from 'uuid';

function withTaskList(WrappedComponent) {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        taskData: [],
        isLoading: false,
      };

      this.fetchData = this.fetchData.bind(this);
    }

    fetchData() {
      this.setState({ isLoading: true });
      api
        .getAllData((data) => {
          // Format data
          const newTaskData = data.map((item) => ({
            id: item.id,
            taskName: item.taskName,
            time: item.time,
            // time: moment(item.time).format("HH:mm:ss"),
            name: item.name,
            dateOfBirth: item.dateOfBirth,
            // dateOfBirth: moment(item.dateOfBirth).format("YYYY-MM-DD"),
            address: item.address,
            phone: item.phone,
            email: item.email,
            currentJob: item.currentJob,
            experience: item.experience,
            note: item.note,
            key: uuid(),
            idCard: item.idCard,
            workStartTime: moment(item.workStartTime).format('HH:mm:ss'),
            workFinishTime: moment(item.workFinishTime).format('HH:mm:ss'),
          }));
          this.setState({ taskData: newTaskData });
        })
        .finally(() => {
          this.setState({ isLoading: false });
        });
    }

    componentDidMount() {
      this.fetchData();
    }
    render() {
      return (
        <WrappedComponent
          taskList={this.state.taskData}
          isLoading={this.state.isLoading}
          {...this.props}
        />
      );
    }
  };
}

export default withTaskList;
