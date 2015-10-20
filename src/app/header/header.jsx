import React from 'react/addons'
import Immutable from 'immutable'
import Reflux from 'reflux'
import classNames from 'classnames'
import moment from 'moment'

import Actions from 'common/actions'
import Spinner from 'common/components/spinner'
import _ from 'common/utils'

import './header.less'

var Header = React.createClass({
  mixins: [React.addons.PureRenderMixin],
  propTypes: {
  },
  getInitialState() {
    return {
    };
  },
  componentDidMount() {
  },
  // Render Functions
  render() {
    return (
      <nav className="header">
        <div className="container">
          <h1 className="title">{`Tabula Rasa`}</h1>
          <div className="meta">
            <div className="info">@trekforever</div>
          </div>
        </div>
      </nav>
    );
  }
});
export default Header;
