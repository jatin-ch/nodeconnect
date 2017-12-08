var router = require('express').Router();
var User = require('../models/user');
const ChatController = require('../controllers/chat');

// View messages to and from authenticated user
router.get('/', ChatController.getConversations);

// Retrieve single conversation
router.get('/:conversationId', ChatController.getConversation);

// Send reply in conversation
router.post('/:conversationId', ChatController.sendReply);

// Start new conversation
router.post('/new/:recipient', ChatController.newConversation);


module.exports = router;
