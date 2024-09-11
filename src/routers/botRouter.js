const router = require('express').Router();
const { handleUpdate } = require('../controllers/bot');

router.post(`/bot7054215985:AAEGnmBteJxbpQ3mbgqEoUKVx3DDD7QBHA4`, handleUpdate);
module.exports = router;