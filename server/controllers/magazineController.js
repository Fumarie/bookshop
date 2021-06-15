const db = require('../db')

class MagazineController {
    getAllMagazines(req, res) {
        try {
            db.query('SELECT \n' +
                'id_product as id,\n' +
                'vendor_code as vendorCode,\n' +
                'product.name as name,\n' +
                'theme.name as theme,\n' +
                'publishing_house.name as publisher,\n' +
                'product.price as price\n' +
                'FROM books.product\n' +
                'JOIN magazines ON product.id_product = magazines.id_magazines\n' +
                'JOIN publishing_house ON magazines.publishing_house_id = publishing_house.idpublishing_house\n' +
                'JOIN magazine_to_theme ON magazine_to_theme.id_magazine = magazines.id_magazines\n' +
                'JOIN theme ON magazine_to_theme.id_theme = theme.id_theme', function (err, results, fields) {
                if (err) {
                    console.log(err)
                    return res.json(err)
                }
                res.json(results)
            })
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Error getting magazines'})
        }
    }

    getThemes(req, res) {
        try {
            db.query('SELECT theme.name as theme, theme.id_theme as id from theme', function (err, results, fields) {
                if (err) {
                    console.log(err)
                    return res.json(err)
                }
                res.json(results)
            })
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Error getting themes'})
        }
    }

    getPublishers(req, res) {
        try {
            db.query('SELECT idpublishing_house as id, name as publisher from publishing_house', function (err, results, fields) {
                if (err) {
                    console.log(err)
                    return res.json(err)
                }
                res.json(results)
            })
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Error getting publishers'})
        }
    }

    createMagazine(req, res) {
        try {
            const {name, price, publisherId, themeId, vendorCode} = req.body
            console.log(req.body)
            db.query(`INSERT INTO product (vendor_code, product_type, name, price) VALUES(\'${vendorCode}'\, 0, \'${name}\', ${price});`, function (err, results, fields) {
                if (err) {
                    console.log(err)
                    return res.json(err)
                }
                db.query(`INSERT INTO magazines (id_magazines, issue_number, publishing_house_id) VALUES(LAST_INSERT_ID(), 1999, ${publisherId});`, function (err, results, fields) {
                    if (err) {
                        console.log(err)
                        return res.json(err)
                    }
                    db.query(`INSERT INTO magazine_to_theme (id_magazine, id_theme) VALUES (LAST_INSERT_ID(), ${themeId})`, function (err, results, fields) {
                        if (err) {
                            console.log(err)
                            return res.json(err)
                        }
                        res.json(results)
                    })
                })
            })
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Error creating book'})
        }
    }

    deleteMagazine(req, res) {
        try {
            const id = req.params.id
            db.query(`DELETE from product where id_product = ${id}`, function (err, results, fields) {
                if (err) {
                    console.log(err)
                    return res.json(err)
                }
                res.json(results)
            })
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Error deleting magazine'})
        }
    }

    updateMagazine(req, res) {
        try {
            const id = req.params.id
            const {name, price, publisherId, themeId, vendorCode} = req.body
            db.query(`UPDATE product set vendor_code = \'${vendorCode}'\, product_type = 0, name = \'${name}\', price = ${price} where id_product = ${id};`, function (err, results, fields) {
                if (err) {
                    console.log(err)
                    return res.json(err)
                }
                db.query(`UPDATE magazines set publishing_house_id = ${publisherId} where id_magazines = ${id};`, function (err, results, fields) {
                    if (err) {
                        console.log(err)
                        return res.json(err)
                    }
                    db.query(`UPDATE magazine_to_theme set id_theme = ${themeId} where id_magazine = ${id}`, function (err, results, fields) {
                        if (err) {
                            console.log(err)
                            return res.json(err)
                        }
                        res.json(results)
                    })
                })
            })
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Error updating magazine'})
        }
    }

    getAveragePrice(req, res) {
        const {theme} = req.query
        console.log(theme)
        if (!theme) return res.json(0)
        try {
            db.query(`SELECT AVG(price) as price from product
                            JOIN magazines ON product.id_product = magazines.id_magazines
                            JOIN magazine_to_theme ON magazines.id_magazines = magazine_to_theme.id_magazine
                            JOIN theme ON magazine_to_theme.id_theme = theme.id_theme
                            where theme.name like \'${theme}\'`, function (err, results, fields) {
                if (err) {
                    console.log(err)
                    return res.json(err)
                }
                res.json(results[0].price)
            })
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Error getting average price'})
        }
    }
}

module.exports = new MagazineController()