
const express  = require('express');
const { getUserDesigns, getDesignById, createDesign, deleteDesign } = require('../controller/design.controller');
const authenticatedRequest = require('../middleware/auth.middleware');
const router = express.Router();

router.use(authenticatedRequest)

router.get('/userDesigns',getUserDesigns)
router.get('/userDesign/:id',getDesignById);
router.post('/saveDesign',createDesign);
router.delete('/deleteDesign/:id',deleteDesign);

module.exports = router
