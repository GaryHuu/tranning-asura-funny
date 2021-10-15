import React, { Component } from 'react';

export function withDynamic(WrappedComponent) {
  return class extends Component {
    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
}
