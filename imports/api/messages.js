import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Messages = new Mongo.Collection('messages');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('messages', function tasksPublication() {
    return Messages.find();
  });
}

Meteor.methods({
  'messages.insert'(text) {
    Messages.insert({
      text,
      createdAt: new Date()
    });
  }
});