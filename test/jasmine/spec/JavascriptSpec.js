describe("javascript", function() {

  describe("jquery", function() {
    it("get each key/value pair of a javascript var with '$.each(-var-, -func...'", function() {
      var foo = {'one': 1, 'two': 22, 'three': 'three', 'four': 'fore!'};
      var expected_key_string = "onetwothreefour";
      var expected_val_string = "122threefore!";

      var actual_key_string = "";
      var actual_val_string = "";
      $.each(foo, function(k,v) {
        actual_key_string += k;
        actual_val_string += v;
      });

      expect(actual_key_string).toEqual(expected_key_string);
      expect(actual_val_string).toEqual(expected_val_string);
      
    });
  });

});

