const mocha = require('mocha');
const chai = require('chai');
const request = require('supertest');
const path = require('path');
const mongoose = require('mongoose');
const app = require('../index');
const Article = require('../models/article-schema');
const chaiHttp = require('chai-http');
const User = require('../models/user');
const Queries = require('../models/quries-schema');
const Query = require('../models/quries-schema');
const Comments = require('../models/comments-schema');
const Profile = require('../models/profile-schema');

const { it, describe, beforeEach, afterEach } = mocha;
const {expect} = chai;

const mockPost = {
    title: 'this is a title and it worksn2',
    author: 'Test User',
    summary: 'Test summary',
    content: 'this is testing body',
    createdAt: Date.now(),
    commentsCount: 0
  };

chai.use(chaiHttp);
// Test on article requests
describe('Testing articles', async ()=>{
    beforeEach(async () => {
        await Article.deleteMany({});
    });
    afterEach(async () => {
        await Article.deleteMany({});
    });
    // Create a post
    it('Should create a post', async () => {
        const res = await request(app)
          .post('/api/articles')
          .field('title', mockPost.title)
          .field('author', mockPost.author)
          .field('summary', mockPost.summary)
          .field('content', mockPost.content)
          .field('createdAt', mockPost.createdAt)
          .field('commentsCount', mockPost.commentsCount)
          .attach('image', path.resolve(__dirname, './img/ubutumwa.jpg'));
        expect(res.status).to.be.equal(201);
        expect(res.body).to.have.property('message','New article created successfully');
        expect(res.body).to.be.have.property('data');
        expect(res.body.data).to.be.a('object');
        expect(res.body.data).to.be.have.property('title');
        expect(res.body.data).to.be.have.property('author');
        expect(res.body.data).to.be.have.property('summary');
        expect(res.body.data).to.be.have.property('content');
      });
      // get single article
      it('Should get one  article', async () => {
        const article = await Article.create(mockPost);
        await article.save();
    
        const res = await request(app).get(`/api/articles/${article._id}`);
        expect(res.status).to.be.equal(201);
        expect(res.body).to.have.property('success', true);
        expect(res.body).to.have.property('message', 'Got single article');
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.be.a('object');
        expect(res.body.data).to.be.have.property('title');
        expect(res.body.data).to.be.have.property('author');
        expect(res.body.data).to.be.have.property('summary');
        expect(res.body.data).to.be.have.property('content');
        expect(res.body.data).to.have.property('_id');
      });
      // get all articles
      it('Should Get all articles from database', async () => {
        const res = await request(app).get('/api/articles');
        expect(res.status).to.be.equal(200);
        expect(res.body).to.have.property('message', 'Successfully got all articles');
        expect(res.body).to.have.property('success', true);
        expect(res.body).to.be.a('object');
        expect(res.body.data).to.be.a('object');
        expect(res.body.data).to.have.property('articles');
        expect(res.body.data.articles).to.be.a('array');
    });
    // delete an article
    it('Should delete a post', async () => {
        const article = await Article.create(mockPost);
        await article.save();
    
        const res = await request(app).delete(`/api/articles/${article._id}`);
        expect(res.status).to.be.equal(200);
        expect(res.body).to.have.property('success', true);
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('message', 'This article has been deleted successfully');
      });
      // update post
      it('Should update a post', async () => {
        const postUpdate = {
          title: 'this is an updated title',
          author: 'Test User update',
          summary: 'Test summary update',
          content: 'this is testing body update'}
          ;
        const article = await Article.create(mockPost);
        await article.save();
    
        const res = await request(app)
        .put(`/api/articles/${article._id}`)
        .field('title', postUpdate.title)
        .field('author', postUpdate.author)
        .field('summary', postUpdate.summary)
        .field('content', postUpdate.content)
        .attach('image', path.resolve(__dirname, './img/blogger.png'));
        expect(res.status).to.be.equal(201);
        expect(res.body).to.have.property('success', true);
        expect(res.body).to.have.property('message', 'Article updated successfuly');
      });
})

// Test on comments
describe('Tests related to comments:', async () => {

  const testComment = {
    name: 'rukara',
    comment: 'this is a message'
  };
  // POST comments
  it('Should add comment on an article', async () => {
    const article = await Article.create(mockPost);
    await article.save();
    const res = await request(app)
      .post(`/api/articles/${article._id}/comment`)
      .send(testComment);
    expect(res.status).to.be.equal(200);
    expect(res.body).to.have.property('success', true);
    expect(res.body).to.have.property('message', 'Comment have been submitted successfully');
    expect(res.body).to.be.a('object');
  });

});

// test on users and auth
describe('Tests related to Users and authentication', async ()=>{
  beforeEach(async () => {
    await User.deleteMany({});
  });
  afterEach(async () => {
    await User.deleteMany({});
  });
  const testUser = {
    "email": "test@test.com",
    "password": "testpass"
  }
  // Add a user
  it('Should add a new user', async()=>{
    const res = await request(app).post('/api/signup').send(testUser);
    expect(res.status).to.be.equal(201);
    expect(res.body).to.have.property('success', true);
    expect(res.body).to.be.a('object');
    expect(res.body).to.have.property('message', 'Added a user successfully');
  })
  // login
  it('Should log user in', async () => {
    await request(app).post('/api/signup').send(testUser);
    const res = await request(app)
      .post('/api/login')
      .send(testUser);
    expect(res.status).to.be.equal(201);
    expect(res.body).to.have.property('success', true);
    expect(res.body).to.be.a('object');
    expect(res.body).to.have.property('message', 'Successfully logged in');
  });

})

// Testing queries
describe('Tests related to queries', async()=>{
  beforeEach(async () => {
    await Query.deleteMany({});
  });
  afterEach(async () => {
    await Query.deleteMany({});
  });
  const testMessage = await {
    "name": "My Name",
    "email": "email@email.com",
    "message": "Message"
  }

  // testing the POST of queries
  it('Should create a query', async () => {
    const res = await request(app)
      .post('/api/queries').send(testMessage);
    expect(res.status).to.be.equal(201);
    expect(res.body).to.have.property('message','New message recorded');
    expect(res.body).to.be.have.property('data');
    expect(res.body.data).to.be.a('object');
    expect(res.body.data).to.be.have.property('name');
    expect(res.body.data).to.be.have.property('email');
    expect(res.body.data).to.be.have.property('message');
  });


  //Test on getting all queries in the database
  it('Should Get all queries from database', async () => {
    const res = await request(app).get('/api/queries');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.have.property('message', 'Successfully got all queries');
    expect(res.body).to.have.property('success', true);
    expect(res.body).to.be.a('object');
  });


  //testing on deleting a query
  it('Should delete a query', async () => {
    const query = await Query.create(testMessage);
    await query.save();

    const res = await request(app).delete(`/api/queries/${query._id}`);
    expect(res.status).to.be.equal(200);
    expect(res.body).to.have.property('success', true);
    expect(res.body).to.be.a('object');
    expect(res.body).to.have.property('message', 'Query deleted successfully');
  });

});


// Tests on profile page

describe('Tests related to owner profile', async()=>{
  beforeEach(async () => {
    await Profile.deleteMany({});
  });
  afterEach(async () => {
    await Profile.deleteMany({});
  });
  //Add owner's data
  it('Should create a new owner', async () => {
    const res = await request(app)
      .post('/api/profile')
      .field('name','myname')
      .field('role', 'developer')
      .field('about', 'my about')
      .field('purpose', 'my purpose')
      .attach('image', path.resolve(__dirname, './img/ubutumwa.jpg'));
    expect(res.status).to.be.equal(201);
    expect(res.body).to.have.property('message','Successfully added owner');
    expect(res.body).to.be.have.property('data');
    expect(res.body.data).to.be.a('object');
    expect(res.body.data).to.be.have.property('name');
    expect(res.body.data).to.be.have.property('role');
    expect(res.body.data).to.be.have.property('about');
    expect(res.body.data).to.be.have.property('purpose');
  });
  // GET owner's info
  it('Should get owner info', async () => {
    const res = await request(app).get('/api/profile');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.have.property('message', 'Successfully got owner');
    expect(res.body).to.have.property('success', true);
    expect(res.body).to.be.a('object');
});

});
