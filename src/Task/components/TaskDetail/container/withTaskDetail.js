import React from 'react';

import api from 'api';

import '../assets/styles.scss';

function withTaskDetail(WrappedComponent) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        task: {},
        loading: true,
      };

      this.getTaskById = this.getTaskById.bind(this);
      this.updateTaskById = this.updateTaskById.bind(this);
    }

    getTaskById = (id) => {
      this.setState({ loading: true });
      api
        .getDataById(id, (data) => {
          this.setState({ task: data });
        })
        .finally(() => {
          this.setState({ loading: false });
        });
    };

    updateTaskById = (id, values) => {
      this.setState({ loading: true });
      api.editData(id, values).finally(() => {
        this.setState({ loading: false });
      });
    };

    render() {
      return (
        <WrappedComponent
          getTaskById={this.getTaskById}
          updateTaskById={this.updateTaskById}
          loading={this.state.loading}
          taskById={this.state.task}
          {...this.props}
        />
      );
    }
  };
}

export default withTaskDetail;
