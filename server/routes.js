const express = require('express');

// APIs
const Google = require('./api/google');
const nytimes = require('./api/nytimes');
const bingNews = require('./api/bingNews');
const propublica = require('./api/propublica');
const pubFinance = require('./api/propublica_finance');
const meetup = require('./api/meetup');
const eventbrite = require('./api/eventbrite');

const router = express.Router();

router.get('/representatives/:address', Google.getReps);
router.get('/voting/:address', Google.getVoterInfo);
router.get('/nytimes/:name', nytimes.getArticles);
router.get('/bingNews/:name', bingNews.getArticles);
router.get('/meetup/:location', meetup.getEvents);
router.get('/eventbrite/:location', eventbrite.getEvents);

router.get('/propublica/chamber/:chamber', propublica.memberList);
router.get('/propublica/member/:name', propublica.memberBio);
router.get('/propublica/member/votes/:name', propublica.memberVotes);
router.get('/propublica/member/bills/:name', propublica.memberBills);
router.get('/propublica/top20/:cycle/:category', pubFinance.top20List);

/* TODO: Fix broken AWS services to enable routes to work
  router.post('/users/signin', userController.signin);
  router.post('/users/signup', userController.signup);
  router.post('/users/update', userController.update);
  router.get('/users/checkAuth', userController.checkAuth);
*/

module.exports = router;
