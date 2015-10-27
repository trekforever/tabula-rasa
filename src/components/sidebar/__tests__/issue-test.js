var React = require('react/addons');
var TestUtils = require("react/lib/ReactTestUtils");
var API = require("common/api");
var Immutable = require('immutable');

// TEST consts
var issue_id = 21292;

describe('Issue', () => {
  var Issue, Comments, IssueHeaders, CommentsHeaders;

  beforeAll((done) => {
    API.retrieveIssue(issue_id).then((resp) => {
      Issue = Immutable.fromJS(resp.body);
      IssueHeaders = resp.headers;
      API.retrieveComments(issue_id).then((res) => {
        Comments = Immutable.fromJS(res.body);
        CommentsHeaders = res.headers;
        done();
      });
    });
  });

  beforeEach(() => {
  });

  it("Both comments and issues should be defined", () => {
    expect(Issue).toBeDefined();
    expect(Comments).toBeDefined();
  });

  it("Has Headers", () => {
    expect(IssueHeaders).toBeDefined();
    expect(CommentsHeaders).toBeDefined();
  });

  it("Testing Response for Issue", () => {
    // For Issue Component, we need the following info
    expect(Issue.get('body_html')).toBeDefined(); 
    expect(Issue.get('labels')).toBeDefined(); 
    expect(Issue.get('state')).toBeDefined(); 
    expect(Issue.get('title')).toBeDefined(); 
    expect(Issue.get('comments')).toBeDefined(); 
    expect(Issue.get('created_at')).toBeDefined(); 
    var user = Issue.get('user');
    expect(user.get('avatar_url')).toBeDefined(); 
    expect(user.get('html_url')).toBeDefined();
    expect(user.get('login')).toBeDefined();
  });


 

});