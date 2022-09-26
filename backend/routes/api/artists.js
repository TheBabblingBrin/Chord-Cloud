const express = require('express')
const { setTokenCookie, restoreUser, requireAuth} = require('../../utils/auth');

const router = express.Router();

const { Song, User, Album } = require('../../db/models');
