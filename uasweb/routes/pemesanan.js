var express = require('express');
var crypto = require('crypto')

var User = require('../model/user')
var Pemesanan = require('../model/pemesanan')
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
router.get('/datapemesanan', Auth_middleware.check_login, Auth_middleware.is_admin, function(req, res, next) {
    session_store = req.session

    Pemesanan.find({}, function(err, pemesanan) {
        //console.log(laptop);
        res.render('users/pemesanan/tablepemesan', { session_store: session_store, pemesanans: pemesanan })
    }).select('_id kodepemesan nama notelp kodelaptop created_at')
});

/* GET users listing. */
router.get('/inputpemesanan', Auth_middleware.check_login, Auth_middleware.is_admin, function(req, res, next) {
    session_store = req.session
    res.render('users/pemesanan/input_datapemesan', { session_store: session_store})
});

//input data laptop
router.post('/inputpemesanans', Auth_middleware.check_login, Auth_middleware.is_admin, function(req, res, next) {
    session_store = req.session

    Pemesanan.find({ kodepemesan: req.body.kodepemesan }, function(err, pemesanan) {
        if (pemesanan.length == 0) {
            var datapemesanan = new Pemesanan({
                kodepemesan: req.body.kodepemesan,
                nama: req.body.nama,
                notelp: req.body.notelp,
                kodelaptop: req.body.kodelaptop,
            })
            console.log("True woi")
            datapemesanan.save(function(err) {
                if (err) {
                    console.log(err);
                    req.flash('msg_error', 'Maaf, nampaknya ada masalah di sistem kami')
                    res.redirect('/datapemesanan')
                } else {
                    console.log('done');
                    req.flash('msg_info', 'User telah berhasil dibuat')
                    res.redirect('/datapemesanan')
                }
            })

        } else {
            console.log("False woi")
            req.flash('msg_error', 'Maaf, kode laptop sudah ada....')
            res.render('users/pemesanan/input_datapemesan', {
                session_store: session_store,
                kodepemesan: req.body.kodepemesan,
                nama: req.body.nama,
                notelp: req.body.notelp,
                kodelaptop: req.body.kodelaptop,
            })
        }
    })
})

//menampilkan data berdasarkan id
router.get('/:id/editpemesan', Auth_middleware.check_login, Auth_middleware.is_admin, function(req, res, next) {
    session_store = req.session

    Pemesanan.findOne({ _id: req.params.id }, function(err, pemesanan) {
        if (Pemesanan) {
            console.log("laptop"+Pemesanan);
            res.render('users/laptop/edit_datapemesan', { session_store: session_store, pemesanans: Pemesanan })
        } else {
            req.flash('msg_error', 'Maaf, Data tidak ditemukan')
            res.redirect('/datapemesanan')
        }
    })
})

router.post('/:id/editpemesan', Auth_middleware.check_login, Auth_middleware.is_admin, function(req, res, next) {
    session_store = req.session

    Pemesanan.findById(req.params.id, function(err, pemesanan) {
        Pemesanan.kodepemesan = req.body.kodepemesan;
        Pemesanan.nama = req.body.nama;
        Pemesanan.notelp = req.body.notelp;
        Pemesanan.kodelaptop = req.body.kodelaptop;

        Pemesanan.save(function(err, user) {
            if (err) {
                req.flash('msg_error', 'Maaf, sepertinya ada masalah dengan sistem kami...');
            } else {
                req.flash('msg_info', 'Edit data berhasil!');
            }

            res.redirect('/datapemesanan');

        });
    });
})

router.post('/:id/deletepesanan', Auth_middleware.check_login, Auth_middleware.is_admin, function(req, res, next) {
    Pemesanan.findById(req.params.id, function(err, pemesanan){
        Pemesanan.remove(function(err, pemesanan){
            if (err)
            {
                req.flash('msg_error', 'Maaf, kayaknya user yang dimaksud sudah tidak ada. Dan kebetulan lagi ada masalah sama sistem kami :D');
            }
            else
            {
                req.flash('msg_info', 'Data laptop berhasil dihapus!');
            }
            res.redirect('/datapemesanan');
        })
    })
})


module.exports = router;
