//require and set up dependencies
const { application } = require("express");
const express = require("express");
const jordansRouter = express.Router();
const jordans = require("../models/jordans.js");
 
//Seed
const jordansSeed = require('../models/jordansSeed.js')

jordansRouter.get('/seed', (req,res)=> {
    jordans.deleteMany({}, (error, allJordans) => {});
    jordans.create(jordansSeed, (error, data) => {
            res.redirect('/jordans');
        }
    );
});
// Index - display all jordans
jordansRouter.get('/', (req, res) => {
    jordans.find({}, (error, allJordans) => {
        res.render('index.ejs', {
            jordans: allJordans,
        currentUser: req.session.currentUser
        });
    });
});


// New - display form to add a new book
jordansRouter.get("/new", (req, res) => {
    // res.send to check route
    // res.send("new");
    res.render("new.ejs");
});


// Delete - delete a single book
jordansRouter.delete('/:id', (req, res) => {
    jordans.findByIdAndRemove(req.params.id, (err, data) => {
        res.redirect('/jordans');
    });
    //res.send('deleting.....')
})
// Update - update a single jordans
jordansRouter.put('/:id', (req, res) => {
    if (req.body.completed === 'on') {
        //if checked, req.body.completed is set to 'on'
        req.body.completed = true;
    } else {
        //if not checked, req.body.completed is undefined
        req.body.completed = false;
    }
	jordans.findByIdAndUpdate(req.params.id, req.body, {
		new: true
	}, (error, updatedJordans) => {
		res.redirect(`/jordans/${req.params.id}`);
	});
	//res.send(req.body);
});
// Create - create a new jordans
jordansRouter.post("/", (req, res) => {
    console.log(req.body)
    jordans.create(req.body, (error, createdJordans) => {
        console.log(error)
        res.redirect('/jordans')
    })
});
// Edit - display form to update a book
jordansRouter.get('/:id/edit', (req, res) => {
	jordans.findById(req.params.id, (error, foundJordans) => {
		res.render('edit.ejs', {
			jordans: foundJordans
		});
	});
});
// Show - display a single book
// Show
jordansRouter.get('/:id', (req, res) => {
    jordans.findById(req.params.id, (err, foundJordans) => {
        //res.send(foundBook);
        res.render('show.ejs', {
            jordans: foundJordans,
        });
    });
});
//Export functionality
module.exports = jordansRouter;