// get_all_notes,   get_a_note, create_note, delete_note, create_note_get 
const notes = require('../models/notes')

const get_all_notes = (req,res) => {
    notes.find().sort({ createdAt: -1})
    .then((result) =>{
        res.render('Notes/index', { title: "All Notes", notes: result})
    }) 
    .catch((err) =>{
        console.log(err)
    })
}


const get_a_note = (req,res) =>{
    const id = req.params.id
    // if (id.match(/^[0-9a-fA-F]{24}$/)) {
        // Yes, it's a valid ObjectId, proceed with `findById` call.
        notes.findById(id)
            .then((result)=>{
                res.render('Notes/details', {note:result, title: "Detailed Notes"})
            })
            .catch((err)=>  {console.log(err)
                res.status(404).render('404',{title:'Note not found'})
            })
    // }
    // else{
    //     res.redirect('/')
    // }
}

const create_note_get = (req,res)=>{
    res.render('Notes/create',{title:'Create new notes'});
}

const create_note = (req,res)=>{
    console.log(req.body);
    const note = new notes(req.body)

    note.save()
    .then((result)=>{
        res.redirect('/notes')
    })
    .catch((err) =>{
        console.log(err)
    })
}

const delete_note = (req,res) =>{
    const id =req.params.id;
    // we are getting here a ajax request as result we can't do here directly the redirect here we need to send the redirect method to frontend then from there we will do the redirect 
    notes.findByIdAndDelete(id)
    .then(result => {
        res.json({redirect: '/'});
        
    })
    .catch( err => {
        res.status(404).render('404',{title:'Note not Found'})
        console.log(err);
    })
}


module.exports = {
    get_all_notes,
    get_a_note,
    create_note_get,
    create_note,
    delete_note
}