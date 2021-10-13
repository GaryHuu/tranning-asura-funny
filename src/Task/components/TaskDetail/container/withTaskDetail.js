import React from 'react';

import api from 'api';

import '../assets/styles.scss';

function withTaskDetail(WrappedComponent) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.getTaskById = this.getTaskById.bind(this);
      this.state = {
        task: {},
      };
    }

    getTaskById = (id) => {
      api.getDataById(id, (data) => {
        this.setState({ task: data });
      });
    };

    render() {
      return (
        <WrappedComponent
          getTaskById={this.getTaskById}
          taskById={this.state.task}
          {...this.props}
        />
      );
    }
  };
}

export default withTaskDetail;
