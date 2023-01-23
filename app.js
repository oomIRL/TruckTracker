const { render } = require('ejs');
const express = require('express');
const mongoose = require('mongoose');
const Truck = require('./models/truck');

const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded());

const dbURI = 'mongodb+srv://BCgovAccess:iV9DxgW1KUKLxpBs@cluster0.are3loz.mongodb.net/deliveries?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((results) => app.listen(3333))
    .catch((err) => console.log(err));

app.get('/', (req, res) => {
    res.redirect('/status')
});

app.get('/status', (req, res) => {
     Truck.find().sort({ createdAt: -1  })
        .then((result) => {
            res.render('index', { title: 'Status of All Trucks', trucks: result} )
        })
        .catch((err) => {
            console.log(err)
        })
});

app.get('/status/create', (req, res) => {
    res.render('create', { title: 'Create New Status' })
});

app.get('/status/:id', (req, res) => {
    const id = req.params.id;
    Truck.findById(id)
        .then((results) => {
            res.render('details', { truck: results, title: 'Truck Details' })
        })
        .catch((err) => {
            console.log(err)
        }) 
});

app.delete('/status/:id', (req,res) => {
    const id = req.params.id; 
    Truck.findByIdAndDelete(id)
        .then((result) => {
            res.json({ redirect: '/status'})
        })
        .catch((err) => {
            console.log(err)
        });
});

app.post('/status', (req, res) => {
    const b = new Truck(req.body);

    b.save()
        .then((result) => {
            res.redirect('/status');
        })
        .catch((err) => {
            console.log(err);
        })
});

app.get('/status/update/:id', (req, res) => {
    const id = req.params.id;
    Truck.findById(id)
        .then((results) => {
            res.render('update', { truck: results, title: 'Update Truck' })
        })
        .catch((err) => {
            console.log(err)
        }) 
});

app.post('/status/update/:id', (req, res) => {
    const id = req.params.id; 
    Truck.findByIdAndDelete(id)
        .then((results) => {
            const b = new Truck(req.body);
            b.save()
            .then((result) => {
                res.redirect('/status');
            })
            .catch((err) => {
                console.log(err);
            })
        })
});