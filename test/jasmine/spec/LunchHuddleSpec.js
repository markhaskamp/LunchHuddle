
describe("messaging", function() {
  it("MessageFactory.create('mock') creates a mock messenger", function() {
    var m = MessageFactory.create('mock');

    expect(m.getName()).toEqual('MockSvc');
  });
});

describe("Vote Action", function() {
  // it("vote action collects the active votes", function() {
  //   expect(false).toBeTruthy(); 
  // });

  // it("a vote action collects the user name",function() {
  //   spyOn(UserView, 'getUserName');
  //   handle_vote_action();
  //   expect(UserView.getUserName.callCount).toEqual(1);
  // });
});
