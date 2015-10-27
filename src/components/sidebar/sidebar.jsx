import React from 'react/addons'
import Immutable from 'immutable'
import {Link} from 'react-router'
import classNames from 'classnames'
import moment from 'moment'

import Actions from 'common/actions'
import Spinner from 'common/components/spinner'
import _ from 'common/utils'

import './sidebar.less'


var Sidebar = React.createClass({
  mixins: [React.addons.PureRenderMixin],
  propTypes: {
    
  },
  getInitialState() {
    return {
      
    };
  },
  componentDidMount() {
    
  },
  render() {
    return (
      <div className="sidebar">
        This is the Sidebar!
      </div>
    );
  }
});
export default Sidebar;
