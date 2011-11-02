
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

var Foo = {
  what: 42
  , when: function() { return('now'); }
}

describe("SendInvitesView", function() {
  describe("#normalize_invitees", function() {
    it("converts commas to spaces", function() {
      var send_invites_view = Object.beget(SendInvitesView);
      console.log(send_invites_view);

      var before   = 'one@two.com, two@three.com';
      var expected = 'one@two.com  two@three.com';

      expect(send_invites_view.normalize_invitees(before)).toEqual(false);
    });
  });
});

