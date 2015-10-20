import React from 'react/addons'
import {RouteHandler} from "react-router"
import Reflux from 'reflux'

import Header from 'app/header'
import Store from 'common/store'
import 'skeleton-less/less/skeleton.less'
import './app.less'

var Application = React.createClass({
  mixins: [React.addons.PureRenderMixin, Reflux.listenTo(Store, "storeChangeListener")],
  storeChangeListener(delta) {
    this.setState(delta);
  },
  getInitialState() {
    return {
    };
  },
  renderBody() {
    var {sidebar, body} = this.props.children;
    if(sidebar && body) {
      return (
        <div className="container">
          <div className="columns three">
            { sidebar }
          </div>
          <div className="columns nine">
            { body }
          </div>
        </div>
      );
    }
    return (
      <div className="container"><div className="columns twelve">{ this.props.children }</div></div>
    );
  },
  render() {
      return (
        <div className="app">
        <Header />
        { this.renderBody() }
        </div>
      );
  }
});
export default Application;
