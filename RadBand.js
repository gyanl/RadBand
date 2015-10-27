 Tasks = new Mongo.Collection("tasks");

if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.hello.helpers({
    counter: function () {
      return Session.get('counter');
    }
  });

  Template.body.helpers({
    tasks: function () {
      // Show newest tasks at the top

return Tasks.find({}, {sort: {text: 1}});
    }
  });


   Template.body.events({

     "submit .new-task": function (event) {
       // Prevent default browser form submit
       event.preventDefault();
       // Get value from form element

       var text = event.target.text.value;
       // Insert a task into the collection
       Tasks.insert({
         text: text,
         createdAt: new Date() // current time

       });



       // Clear form
      event.target.text.value = "";

    }

  });
  Template.hello.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
