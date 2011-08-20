
describe("messaging", function() {
  it("MessageFactory.create('_wrong_') returns undefined", function() {
    var m = MessageFactory.create('string that MessageFactory does not understand');
    expect(m).toBeUndefined();
  });

  it("MessageFactory.create('mock') creates a mock messenger", function() {
    var m = MessageFactory.create('mock');
    expect(m.getName()).toEqual('MockSvc');
  });

  it("MessageFactory.create('pubnub') creates a pubnub messenger", function() {
    var m = MessageFactory.create('pubnub');
    expect(m.getName()).toEqual('PubnubSvc');
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
