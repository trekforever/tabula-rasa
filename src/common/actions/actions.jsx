import Reflux from "reflux";

export default {
  issues: Reflux.createActions({
    "loadList"    : {asyncResult: true},
    "loadIssue"   : {asyncResult: true},
    "loadComments": {asyncResult: true},
    "loadRepo"    : {asyncResult: true}
  })
};