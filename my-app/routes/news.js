var express = require('express');
const NewsModel = require('../models/News');
const RateModel = require('../models/Rate');
const LikeModel = require('../models/Like');
const ViewModel = require('../models/View');
var router = express.Router();
const auth = require('../middleware/auth');
const authAdmin = require('../middleware/checkAdmin');
const authCus = require('../middleware/checkCus');
/* GET users listing. */




router.get('/', auth, async function (req, res, next) {
    try {
        const News = await NewsModel.find({ isDelete: false, status: "publish" }).populate("cateNews").populate("createdBy");
        return res.json({
            code: 200,
            err: null,
            data: News
        })
    } catch (err) {
        return res.json({
            code: 400,
            err: err.messege,
            data: null
        })
    }
});

router.get('/:_idPro', auth, async function (req, res, next) {
    try {
        const idPro = req.params._idPro;
        const date = new Date();
        console.log(date.getMonth());
        const Newss = await NewsModel.find({ _id: idPro, isDelete: false }).populate("category");
        const rate = await RateModel.find({ News: idPro, isDelete: false });
        const View = new ViewModel({ News: idPro, user: req.user._id, date: date });
        const ViewClass = await View.save();
        return res.json({
            code: 200,
            err: null,
            data: Newss,
            rate: rate
        })
    } catch (err) {
        return res.json({
            code: 400,
            err: err.messege,
            data: null
        })
    }
});

router.post('/', authAdmin, async function (req, res, next) {
    try {
        const body = req.body;
        const News = new NewsModel({
            title: body.title,
            name: body.name,
            oldPrice: body.oldPrice,
            newPrice: body.newPrice,
            countLike: body.countLike,
            count: body.count,
            category: body.category
        });
        const NewsClass = await News.save();
        return res.json({ code: 200, message: null, data: NewsClass })
    } catch (err) {
        return res.json({
            code: 400,
            err: err,
            data: null
        })
    }
})

router.put('/:_id', authAdmin, async function (req, res, next) {
    try {
        const _id = req.params._id;
        const proCheck = await NewsModel.findOne({ _id: _id });
        if (proCheck == null) {
            return res.json({
                data: null,
                messege: "Khong co san pham nay",
                code: 200
            })
        } if (proCheck != null) {
            const body = req.body;
            const NewsUpdate = await NewsModel.updateOne({ _id: _id }, {
                title: body.title,
                name: body.name,
                oldPrice: body.oldPrice,
                newPrice: body.newPrice,
                countLike: body.countLike,
                count: body.count,
                category: body.category
            });
            return res.json({ code: 200, message: null, data: NewsUpdate })
        }
    } catch (err) {
        return res.json({
            code: 400,
            err: err,
            data: null
        })
    }
})

router.delete('/:_id', authAdmin, async function (req, res, next) {
    try {
        const _id = req.params._id;
        const proCheck = await NewsModel.findOne({ _id: _id });
        if (proCheck == null) {
            return res.json({
                data: null,
                messege: "Khong co san pham nay",
                code: 200
            })
        } if (proCheck != null) {
            const body = req.body;
            const NewsUpdate = await NewsModel.updateOne({ _id: _id }, { isDelete: true });
            return res.json({ code: 200, message: "da xoa", data: NewsUpdate })
        }
    } catch (err) {
        return res.json({
            code: 400,
            err: err,
            data: null
        })
    }
})

router.get('/favorite', authCus, async function (req, res, next) {
    try {
        const postLike = await LikeModel.find({ createdBy: req.user._id, isDelete: false });
        const postFav = await NewsModel.find({ _id: postLike.News });
        return res.json({
            code: 200,
            err: null,
            data: postFav
        })
    } catch (err) {
        return res.json({
            code: 400,
            err: err,
            data: null
        })
    }
});

router.get('/bestNews', auth, async function (req, res, next) {
    try {
        const Newss = await NewsModel.find({ isDelete: false }).sort({ avangeRating: 'desc' });
        return res.json({
            code: 200,
            err: null,
            data: Newss
        })
    } catch (err) {
        return res.json({
            code: 400,
            err: err,
            data: null
        })
    }
});


module.exports = router;
