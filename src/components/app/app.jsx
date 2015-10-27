/* Library Dependencies */
import React, { findDOMNode, PropTypes } from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import classnames from 'classnames'
import { connect } from 'react-redux'

@connect(({ application }) => ({ application }))

export default class Application extends React.Component {
  static propTypes = {
    children: PropTypes.any
  }
  constructor (props, context) {
    super(props, context)
  }
  render() {
    return (
      <div className="mainView">
      abcd
        { this.props.children }
      </div>
    );
  }
}
