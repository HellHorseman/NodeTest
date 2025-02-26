const { Router } = require('express');
const { createRequest, takeRequestInProgress, getRequests, updateStatus, cancelAllInProgress } = require('./controllers.js');

const router = Router();

router.post('/requests', createRequest);
router.patch('/requests/:id', takeRequestInProgress);
router.get('/requests', getRequests);
router.put('/requests/:id/status', updateStatus);
router.delete('/requests/cancel-all', cancelAllInProgress);

module.exports = { router };
