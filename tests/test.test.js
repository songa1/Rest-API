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
const Comment = require('../models/comments-schema');
const Profile = require('../models/profile-schema');
const Projects = require('../models/project-schema');
const Skill = require('../models/skills-schema');
const jwt = require('jsonwebtoken');

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

const cookieValue = 'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmY2EzOWIzNzNiN2E1MDAxNzYwNDMzZSIsImlhdCI6MTYwNzI4MDUzMywiZXhwIjoxNjEwODgwNTMzfQ.0hYGRpVq4ypub1M1B8S9YWfiP9P6YXxeNlrkemUi2vk'; 


// test homepage
describe('Test for homepage', async()=>{
  it('Should get the homepage', async()=>{
    let res = await request(app).get('/');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.have.property('success', true);
    expect(res.body).to.have.property('message', "You have now access to my API application, It's working!");
  })
})

describe('Unknown route', () => {
  it('Should return Not found(any request)', async () => {
    const res = await request(app).get('/unknown');
    expect(res.status).to.be.equal(404);
    expect(res.body).to.be.a('object');
  });
});
const userData = {
  "email": "me@email.com",
  "password": "password"
}

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
          .post('/articles')
          .set('Cookie',cookieValue)
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
      //if no cookies found
      it('Should not create a post', async () => {
        const res = await request(app)
          .post('/articles')
          .field('title', mockPost.title);
        expect(res.status).to.be.equal(500);
        expect(res.body).to.have.property('message','Login to continue');
      });
      
      // get single article
      it('Should get one  article', async () => {
        const article = await Article.create(mockPost);
        await article.save();
    
        const res = await request(app).get(`/articles/${article._id}`);
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
      it('Should get article not found', async () => {
        const article = "";
    
        const res = await request(app).get(`/articles/${article._id}`);
        expect(res.status).to.be.equal(500);
      });
      // get all articles
      it('Should Get all articles from database', async () => {
        const res = await request(app).get('/articles');
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
    
        const res = await request(app).delete(`/articles/${article._id}`).set('Cookie',cookieValue);
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
        .put(`/articles/${article._id}`)
        .set('Cookie',cookieValue)
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
      .post(`/articles/${article._id}/comment`)
      .send(testComment);
    expect(res.status).to.be.equal(200);
    expect(res.body).to.have.property('success', true);
    expect(res.body).to.have.property('message', 'Comment have been submitted successfully');
    expect(res.body).to.be.a('object');
  });
  // GET all comments
  it('Should get all comments on an article', async () => {
    const post = await Article.create(mockPost);
    await post.save();
    await request(app).post(`/articles/${post._id}/comment`).send(testComment);
    const res = await request(app).get(`/articles/${post._id}/comment`);
    expect(res.status).to.be.equal(200);
    expect(res.body).to.have.property('success', true);
    expect(res.body).to.have.property(
      'message',
      'Successfully got all comments',
    );
    expect(res.body).to.be.a('object');
  });

});

// test on users
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
    const res = await request(app).post('/signup').set('Cookie',cookieValue).send(testUser);
    expect(res.status).to.be.equal(201);
    expect(res.body).to.have.property('success', true);
    expect(res.body).to.be.a('object');
    expect(res.body).to.have.property('message', 'Added a user successfully');
  })
  it('Should not add a new user', async()=>{
    const res = await request(app).post('/signup').send(testUser);
    expect(res.status).to.be.equal(500);
    expect(res.body).to.have.property('success', false);
  })
  it('Should get login page', async ()=>{
    const res = await request(app).get('/login');
    expect(res.status).to.be.equal(200);

  })
  // login
  it('Should log user in', async () => {
    
    await request(app).post('/signup').set('Cookie',cookieValue).send(testUser);
    const res = await request(app)
      .post('/login')
      .set('Cookie', cookieValue)
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
      .post('/queries').send(testMessage);
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
    const res = await request(app).get('/queries').set('Cookie',cookieValue);
    expect(res.status).to.be.equal(200);
    expect(res.body).to.have.property('message', 'Successfully got all queries');
    expect(res.body).to.have.property('success', true);
    expect(res.body).to.be.a('object');
  });


  it('Should not Get any query if unauth', async () => {
    const res = await request(app).get('/queries');
    expect(res.status).to.be.equal(500);
  });


  //testing on deleting a query
  it('Should delete a query', async () => {
    const query = await Query.create(testMessage);
    await query.save();

    const res = await request(app).delete(`/queries/${query._id}`).set('Cookie',cookieValue);
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
      .post('/profile')
      .set('Cookie',cookieValue)
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
    await request(app).post('/profile').set('Cookie',cookieValue).send(ownerInfo);
    const res = await request(app).get('/profile');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.have.property('message', 'Successfully got owner');
    expect(res.body).to.have.property('success', true);
    expect(res.body).to.be.a('object');
  });
  // get single owner
  const ownerInfo = {
    "name": "testname",
    "role": "developer",
    "about": "his about",
    "purpose": "his purpose"
  }
// delete owner
it('Should delete owner', async () => {
    const owner = await Profile.create(ownerInfo);
    await owner.save();

    const res = await request(app).delete(`/profile/${owner._id}`).set('Cookie',cookieValue);
    expect(res.status).to.be.equal(200);
    expect(res.body).to.have.property('success', true);
    expect(res.body).to.be.a('object');
    expect(res.body).to.have.property('message', 'This owner has been deleted successfully');
  });
  // update owner
  it('Should update owner', async () => {
    const owner = await Profile.create(ownerInfo);
    await owner.save();

    const res = await request(app)
    .put(`/profile/${owner._id}`)
    .set('Cookie',cookieValue)
    .field('name', ownerInfo.name)
    .field('role', ownerInfo.role)
    .field('about', ownerInfo.about)
    .field('purpose', ownerInfo.purpose)
    .attach('image', path.resolve(__dirname, './img/blogger.png'));
    expect(res.status).to.be.equal(201);
    expect(res.body).to.have.property('success', true);
    expect(res.body).to.have.property('message', 'Successfully updated owner info');
  });

});


// Tests on Projects 
describe('Tests related to projects', async()=>{
  beforeEach(async () => {
    await Projects.deleteMany({});
  });
  afterEach(async () => {
    await Projects.deleteMany({});
  });

  const testProject = {
    "title": "ooo",
    "description": "developer project",
    "link": "www.google.com"
  }
  //Add NEW PROJECT
  it('Should create a new project', async () => {
    const res = await request(app)
      .post('/projects')
      .set('Cookie',cookieValue)
      .field('title',testProject.title)
      .field('description', testProject.description)
      .field('link', testProject.link)
      .attach('image', path.resolve(__dirname, './img/ubutumwa.jpg'));
    expect(res.status).to.be.equal(201);
    expect(res.body).to.have.property('message','Successfully added new project');
    expect(res.body).to.be.have.property('data');
    expect(res.body.data).to.be.a('object');
    expect(res.body.data).to.be.have.property('title');
    expect(res.body.data).to.be.have.property('description');
    expect(res.body.data).to.be.have.property('link');
  });
  // GET PROJECTS
  it('Should get projects', async () => {
    const res = await request(app).get('/projects');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.have.property('message', 'Successfully got projects');
    expect(res.body).to.have.property('success', true);
    expect(res.body).to.be.a('object');
  });

// delete PROJECT
it('Should delete a project', async () => {
    const project = await Projects.create(testProject);
    await project.save();

    const res = await request(app).delete(`/projects/${project._id}`).set('Cookie',cookieValue);
    expect(res.status).to.be.equal(200);
    expect(res.body).to.have.property('success', true);
    expect(res.body).to.be.a('object');
    expect(res.body).to.have.property('message', 'This project has been deleted successfully');
  });
  // update a project
  it('Should update a project', async () => {
    const project = await Projects.create(testProject);
    await project.save();

    const res = await request(app)
    .put(`/projects/${project._id}`)
    .set('Cookie',cookieValue)
    .field('title', testProject.title)
    .field('description', testProject.description)
    .field('link', testProject.link)
    .attach('image', path.resolve(__dirname, './img/blogger.png'));
    expect(res.status).to.be.equal(201);
    expect(res.body).to.have.property('success', true);
    expect(res.body).to.have.property('message', 'Project updated');
  });

});

 // Tests on skills
describe('Tests related to skills', async()=>{
  beforeEach(async () => {
    await Skill.deleteMany({});
  });
  afterEach(async () => {
    await Skill.deleteMany({});
  });

  const testSkill = {
    "title": "html",
    "category": "Front-End"
  }
  //Add new skill
  it('Should create a new skill', async () => {
    const res = await request(app)
      .post('/skills')
      .set('Cookie',cookieValue)
      .field('title',testSkill.title)
      .field('category', testSkill.category)
      .attach('image', path.resolve(__dirname, './img/ubutumwa.jpg'));
    expect(res.status).to.be.equal(201);
    expect(res.body).to.have.property('message','Skill added');
    expect(res.body).to.be.have.property('data');
    expect(res.body.data).to.be.a('object');
  });
  // GET owner's info
  it('Should get skills', async () => {
    const res = await request(app).get('/skills');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.have.property('message', 'Got skills');
    expect(res.body).to.have.property('success', true);
    expect(res.body).to.be.a('object');
  });
  
  // delete owner
it('Should delete skill', async () => {
    const skill = await Skill.create(testSkill);
    await skill.save();

    const res = await request(app).delete(`/skills/${skill._id}`).set('Cookie',cookieValue);
    expect(res.status).to.be.equal(200);
    expect(res.body).to.have.property('success', true);
    expect(res.body).to.be.a('object');
    expect(res.body).to.have.property('message', 'Skill deleted');
  });
  // update owner
  it('Should update skill', async () => {
    const skill = await Skill.create(testSkill);
    await skill.save();

    const res = await request(app)
    .put(`/skills/${skill._id}`)
    .set('Cookie',cookieValue)
    .field('title', testSkill.title)
    .field('category', testSkill.category)
    .attach('image', path.resolve(__dirname, './img/blogger.png'));
    expect(res.status).to.be.equal(201);
    expect(res.body).to.have.property('success', true);
    expect(res.body).to.have.property('message', 'Skill updated');
  });

});