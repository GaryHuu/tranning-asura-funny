import React from 'react';

import { api } from 'api';

function withTaskList(WrappedComponent) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        taskList: [],
        loading: true,
      };
    }

    componentDidMount() {
      (async () => {
        try {
          const data = await api.getAll();
          console.log(data);
          this.setState({
            taskList: data,
            loading: false,
          });
        } catch (error) {
          console.log(error);
        }
      })();
    }

    render() {
      return (
        <WrappedComponent
          taskList={this.state.taskList}
          loading={this.state.loading}
          {...this.props}
        />
      );
    }
  };
}

export default withTaskList;
