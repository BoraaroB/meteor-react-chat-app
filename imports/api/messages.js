import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Messages = new Mongo.Collection('messages');

Meteor.methods({
  'messages.insert'(text) {
    Messages.insert({
      text,
      createdAt: new Date()
    });
  }
});