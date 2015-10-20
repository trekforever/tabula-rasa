import Reflux from "reflux"
import {issues as Actions} from "common/actions"
import API from "common/api"
import _ from "common/utils"
import Immutable from "immutable"

export default Reflux.createStore({
  listenables: Actions,
  init() {
    this.pages = -1;
    this.issues = Immutable.List();
    this.repo = Immutable.Map();
  },
  onLoadList(size = 25, offset = 1, type = "open") {
    this.trigger({
      issues: null,
      state: type
    });
    API.retrieveList(size, offset, type).promise().then((resp) => {
      if(!resp || !resp.headers) {
        throw new Error("Invalid Response");
      }
      var link = _.parse_link_header(resp.headers.link);
      this.pages = _.getTotalPageCount(link) === -1 ? this.pages : _.getTotalPageCount(link);
      this.issues = Immutable.fromJS(resp.body);
      this.trigger({
        issues: this.issues,
        pages: this.pages,
        currentPage: offset
      });
    })
  },
  onLoadRepo() {
    API.retrieveRepo().promise().then((resp) => {
      this.repo = Immutable.fromJS(resp.body);
      this.trigger({
        repo: this.repo
      });
    })
  },
  onLoadIssue(issueId) {
    this.trigger({
      currentIssue: null
    });
    API.retrieveIssue(issueId).promise().then((resp) => {
      this.trigger({
        currentIssue: Immutable.fromJS(resp.body)
      })
    })
  },
  onLoadComments(issueId) {
    this.trigger({
      currentComments: null
    });
    API.retrieveComments(issueId).promise().then((resp) => {
      this.trigger({
        currentComments: Immutable.fromJS(resp.body)
      })
    })
  }
});