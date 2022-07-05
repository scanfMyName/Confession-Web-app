const express = require('express');
const router = express.Router();
const note_controller = require('../controllers/noteController')

router.get('/', note_controller.get_all_notes)
router.post('/', note_controller.create_note)
router.get('/create',note_controller.create_note_get)
router.get('/:id', note_controller.get_a_note)
router.delete('/:id', note_controller.delete_note)


module.exports = router