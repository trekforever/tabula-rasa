var React = require('react/addons');
var TestUtils = require("react/lib/ReactTestUtils");
var API = require("common/api");
var Immutable = require('immutable');

describe('MainList', () => {
  var Response, Headers;

  beforeAll((done) => {
    API.retrieveList().then((resp) => {
      Headers = resp.headers;
      Response = Immutable.fromJS(resp.body);
      done();
    });
  });

  beforeEach(() => {
  });

  it("Should have response headers", () => {
    expect(Headers).toBeDefined();
  });

  it("Testing Response", () => {
    // initial page for rails repo should have 25 issues
    expect(Response.size).toBe(25); 
    // Sample First issue
    var issue = Response.first();
    // For Main Component, we need the following info
    expect(issue.get('user').get('avatar_url')).toBeDefined(); 
    expect(issue.get('body_text')).toBeDefined(); 
    expect(issue.get('labels')).toBeDefined(); 
    expect(issue.get('state')).toBeDefined(); 
    expect(issue.get('title')).toBeDefined(); 
    expect(issue.get('comments')).toBeDefined(); 
    expect(issue.get('created_at')).toBeDefined(); 
  });


 

});