
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
  it("i_vote() method calls message_svc.send_my_votes", function() {
    textbox_is_empty = jasmine.createSpy().andCallFake(function() {return(false); });
    set_cookie_for = jasmine.createSpy();
    jasmine.createSpy(RestaurantView, 'get_current_votes').andCallFake(function() {return(null);});

    huddle_name='foo';
    existing_votes = 'too';
    message_svc = MessageFactory.create('mock');
    spyOn(MockSvc, 'send_my_votes');
    i_vote();

    expect(MockSvc.send_my_votes).toHaveBeenCalled();

  });
});

describe("RestaurantView", function() {
  describe("get_current_votes", function() {
    it("when no restaurants have been voted, then returns an empty list", function() {
      expect(RestaurantView.get_current_votes().length).toEqual(0);
    });
  });
});
