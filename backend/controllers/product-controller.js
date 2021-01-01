const { Category, Product } = require('../models/index')
const formatRupiah = require('../helpers/formatRupiah')

class Products{
    static showProducts(req, res){
        Product.findAll({
            where: {
                "is_discontinued": false
            },
            include: Category,
            order: [
                ['id', 'ASC']
            ]
        })
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.send(err)
        })
    }

    static addProduct(req, res){
        Category.findAll()
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.send(err)
        })
    }

    static addProductPost(req, res){
        let opt = {
            name: req.body.name,
            quantity: +req.body.quantity,
            price: +req.body.price,
            category_id: +req.body.category_id
        }

        Product.create(opt)
        .then(() => {
            res.redirect('/products')
        })
        .catch(err => {
            res.send(err)
        })
    }

    static showCategoryByParams(req, res){
        const id = +req.params.category_id

        Product.findAll({
            where:{
                "category_id": id,
                "is_discontinued": false
            },
            include: Category,
            order: [
                ['id', 'ASC']
            ]
        })
        .then(data => {
            res.render('product/productByCategory', { data, formatRupiah })
        })
        .catch(err => {
            res.send(err)
        })
    }

    static updateProductDiscontinued(req, res){
        const id = +req.params.product_id

        const opt = {
            is_discontinued: true
        }

        Product.update(opt, {
            where: {
                id: id
            }
        })
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.send(err)
        })
    }

    static showProductsDiscontinued(req, res){
        Product.findAll({
            where: {
                "is_discontinued": true
            },
            include: Category
        })
        .then(data => {
            res.render('product/dicontinuedProduct', { data, formatRupiah })
        })
    }

    static delProductDiscontinued(req, res){
        const id = +req.params.product_id

        Product.destroy({
            where: {
                id: id
            }
        })
        .then(() => {
            res.redirect('/products/discontinued')
        })
    }
}

module.exports = Products