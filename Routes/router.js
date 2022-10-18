const express = require("express");
const router = express.Router();
const route = require('../services/routes');

router.route('/')
.get(route.homeRoute)
.post(route.postHomeRoute);

router.post('/delete', route.postDeleteItemRoute);
router.get('/:userDefined', route.getUserDefinedRoute);

module.exports = router;