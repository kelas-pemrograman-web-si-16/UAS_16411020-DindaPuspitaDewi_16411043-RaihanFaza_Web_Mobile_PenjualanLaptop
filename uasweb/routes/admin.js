var express = require('express');
var crypto = require('crypto')

var User = require('../model/user')
var Laptop = require('../model/laptop')
var Auth_middleware = require('../middlewares/auth')

var router = express.Router();
var secret = 'rahasia'
var session_store

/* GET users listing. */
router.get('/admin', Auth_middleware.check_login, Auth_middleware.is_admin, function(req, res, next) {
    session_store = req.session

    User.find({}, function(err, user) {
        console.log(user);
        res.render('users/home', { session_store: session_store, users: user })
    }).select('username email firstname lastname users createdAt updatedAt')
});

/* GET users listing. */
router.get('/datalaptop', Auth_middleware.check_login, Auth_middleware.is_admin, function(req, res, next) {
    session_store = req.session

    Laptop.find({}, function(err, laptop) {
        //console.log(laptop);
        res.render('users/laptop/table', { session_store: session_store, laptops: laptop })
    }).select('_id kodelaptop merklaptop tipelaptop warna harga created_at')
});

/* GET users listing. */
router.get('/inputlaptop', Auth_middleware.check_login, Auth_middleware.is_admin, function(req, res, next) {
    session_store = req.session
    res.render('users/laptop/input_data', { session_store: session_store})
});

//input data laptop
router.post('/inputlaptop', Auth_middleware.check_login, Auth_middleware.is_admin, function(req, res, next) {
    session_store = req.session

    Laptop.find({ kodelaptop: req.body.kodelaptop }, function(err, laptop) {
        if (laptop.length == 0) {
            var datalaptop = new Laptop({
                kodelaptop: req.body.kodelaptop,
                merklaptop: req.body.merklaptop,
                tipelaptop: req.body.tipelaptop,
                warna: req.body.warna,
                harga: req.body.harga,
            })
            datalaptop.save(function(err) {
                if (err) {
                    console.log(err);
                    req.flash('msg_error', 'Maaf, nampaknya ada masalah di sistem kami')
                    res.redirect('/datalaptop')
                } else {
                    req.flash('msg_info', 'User telah berhasil dibuat')
                    res.redirect('/datalaptop')
                }
            })
        } else {
            req.flash('msg_error', 'Maaf, kode laptop sudah ada....')
            res.render('users/laptop/input_data', {
                session_store: session_store,
                kodelaptop: req.body.kodelaptop,
                merklaptop: req.body.merklaptop,
                tipelaptop: req.body.tipelaptop,
                warna: req.body.warna,
                harga: req.body.harga,
            })
        }
    })
})

//menampilkan data berdasarkan id
router.get('/:id/editlaptop', Auth_middleware.check_login, Auth_middleware.is_admin, function(req, res, next) {
    session_store = req.session

    Laptop.findOne({ _id: req.params.id }, function(err, laptop) {
        if (laptop) {
            console.log("laptop"+laptop);
            res.render('users/laptop/edit_data', { session_store: session_store, laptops: laptop })
        } else {
            req.flash('msg_error', 'Maaf, Data tidak ditemukan')
            res.redirect('/datalaptop')
        }
    })
})

router.post('/:id/editlaptop', Auth_middleware.check_login, Auth_middleware.is_admin, function(req, res, next) {
    session_store = req.session

    Laptop.findById(req.params.id, function(err, laptop) {
        laptop.kodelaptop = req.body.kodelaptop;
        laptop.merklaptop = req.body.merklaptop;
        laptop.tipelaptop = req.body.tipelaptop;
        laptop.warna = req.body.warna;
        laptop.harga = req.body.harga;

        laptop.save(function(err, user) {
            if (err) {
                req.flash('msg_error', 'Maaf, sepertinya ada masalah dengan sistem kami...');
            } else {
                req.flash('msg_info', 'Edit data berhasil!');
            }

            res.redirect('/datalaptop');

        });
    });
})

router.post('/:id/delete', Auth_middleware.check_login, Auth_middleware.is_admin, function(req, res, next) {
    Laptop.findById(req.params.id, function(err, laptop){
        laptop.remove(function(err, laptop){
            if (err)
            {
                req.flash('msg_error', 'Maaf, kayaknya user yang dimaksud sudah tidak ada. Dan kebetulan lagi ada masalah sama sistem kami :D');
            }
            else
            {
                req.flash('msg_info', 'Data laptop berhasil dihapus!');
            }
            res.redirect('/datalaptop');
        })
    })
})

module.exports = router;
