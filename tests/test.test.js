const mocha = require('mocha');
const chai = require('chai');
const request = require('supertest');
const path = require('path');
const mongoose = require('mongoose');
const app = require('../index');
const Article = require('../models/article-schema');
const chaiHttp = require('chai-http');
const User = require('../models/user');

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

describe('Testing articles', async ()=>{
    beforeEach(async () => {
        await Article.deleteMany({});
    });
    afterEach(async () => {
        await Article.deleteMany({});
    });

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

    it('Should delete a post', async () => {
        const article = await Article.create(mockPost);
        await article.save();
    
        const res = await request(app).delete(`/api/articles/${article._id}`);
        expect(res.status).to.be.equal(200);
        expect(res.body).to.have.property('success', true);
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('message', 'This article has been deleted successfully');
      });
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

describe('Tests related to comments:', async () => {
  beforeEach(async () => {
    await Article.deleteMany({});
  });
  afterEach(async () => {
    await Article.deleteMany({});
  });

  const testComment = {
    name: 'rukara',
    comment: 'this is a message'
  };

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
  it('Should add a new user', async()=>{
    const res = await request(app).post('/api/signup').send(testUser);
    expect(res.status).to.be.equal(201);
    expect(res.body).to.have.property('success', true);
    expect(res.body).to.be.a('object');
    expect(res.body).to.have.property('message', 'Added a user successfully');
  })

  it('Should create user(missing field)', async () => {
    const res = await request(app).post('/api/signup').send({
      name: 'name',
      email: 'email@gmail.com'
    });
    expect(res.status).to.be.equal(500);
    expect(res.body).to.have.property('success', false);
    expect(res.body).to.be.a('object');
    expect(res.body).to.have.property(
      'message',
      'Can not add a user',
    );
  });

})
