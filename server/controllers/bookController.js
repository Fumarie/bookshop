const db = require('../db')

class BookController {
    getAllBooks(req, res) {
        try {
            db.query('SELECT \n' +
                'id_product as id,\n' +
                'vendor_code as vendorCode,\n' +
                'product.name,\n' +
                'price,\n' +
                'year_of_writing as writingYear,\n' +
                'genre.name as genre,\n' +
                'author.full_name as author,\n' +
                'publishing_house.name as publisher\n' +
                'FROM PRODUCT\n' +
                'JOIN books ON books.id_books = product.id_product\n' +
                'JOIN book_to_author ON book_to_author.id_book=books.id_books\n' +
                'JOIN book_to_genre ON book_to_genre.id_book=books.id_books\n' +
                'JOIN genre ON book_to_genre.id_genre = genre.id_genre\n' +
                'JOIN publishing_house ON books.publishing_house_id = publishing_house.idpublishing_house JOIN author ON book_to_author.id_author = author.id_author', function (err, results, fields) {
                if (err) {
                    console.log(err)
                    return res.json(err)
                }
                res.json(results)
            })
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Error getting books'})
        }
    }

    getGenres(req, res) {
        try {
            db.query('SELECT id_genre as id, name as genre from genre', function (err, results, fields) {
                if (err) {
                    console.log(err)
                    return res.json(err)
                }
                res.json(results)
            })
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Error getting genres'})
        }
    }

    getAuthors (req, res) {
        try {
            db.query('SELECT id_author as id, full_name as author from author', function (err, results, fields) {
                if (err) {
                    console.log(err)
                    return res.json(err)
                }
                res.json(results)
            })
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Error getting authors'})
        }
    }

    createBook(req, res) {
        try {
            const {name, price, publisherId, genreId, authorId, vendorCode, year} = req.body
            console.log(req.body)
            db.query(`INSERT INTO product (vendor_code, product_type, name, price) VALUES(\'${vendorCode}'\, 1, \'${name}\', ${price});`, function (err, results, fields) {
                if (err) {
                    console.log(err)
                    return res.json(err)
                }
                console.log('1 done')
                db.query(`INSERT INTO books (id_books, year_of_writing, publishing_house_id) VALUES (LAST_INSERT_ID(), ${year}, ${publisherId});`, function (err, results, fields) {
                    if (err) {
                        console.log(err)
                        return res.json(err)
                    }
                    console.log('2 done')
                    db.query(`INSERT INTO book_to_genre (id_book, id_genre) VALUES (LAST_INSERT_ID(), ${genreId});`, function (err, results, fields) {
                        if (err) {
                            console.log(err)
                            return res.json(err)
                        }
                        console.log('3 done')
                        db.query(`INSERT INTO book_to_author (id_book, id_author) VALUES (LAST_INSERT_ID(), ${authorId});`, function (err, results, fields) {
                            if (err) {
                                console.log(err)
                                return res.json(err)
                            }
                            console.log('4 done')
                            res.json(results)
                        })
                    })
                })
            })
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Error creating magazine'})
        }
    }

    deleteBook (req, res) {
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
            res.status(400).json({message: 'Error deleting book'})
        }
    }

    updateBook (req, res) {
        try {
            const id = req.params.id
            const {name, price, publisherId, genreId, authorId, vendorCode, year} = req.body
            console.log(req.body)
            db.query(`UPDATE product set vendor_code = \'${vendorCode}'\, product_type = 1, name = \'${name} \', price = ${price} where id_product = ${id};`, function (err, results, fields) {
                if (err) {
                    console.log(err)
                    return res.json(err)
                }
                console.log('1 done')
                db.query(`UPDATE books set year_of_writing = ${year}, publishing_house_id = ${publisherId} where id_books = ${id};`, function (err, results, fields) {
                    if (err) {
                        console.log(err)
                        return res.json(err)
                    }
                    console.log('2 done')
                    db.query(`UPDATE book_to_genre set id_genre = ${genreId} where id_book = ${id};`, function (err, results, fields) {
                        if (err) {
                            console.log(err)
                            return res.json(err)
                        }
                        console.log('3 done')
                        db.query(`UPDATE book_to_author set id_author = ${authorId} where id_book = ${id};`, function (err, results, fields) {
                            if (err) {
                                console.log(err)
                                return res.json(err)
                            }
                            console.log('4 done')
                            res.json(results)
                        })
                    })
                })
            })

        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Error updating book'})
        }
    }

    getAveragePrice (req, res) {
        const { genre } = req.query
        console.log(genre)
        if(!genre) return res.json(0)
        try {
            db.query(`SELECT AVG(price) as price from product
            JOIN books ON id_books = id_product
            JOIN book_to_genre ON id_books = id_book
            JOIN genre ON book_to_genre.id_genre = genre.id_genre
            where genre.name like \'${genre}\'`, function (err, results, fields) {
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

module.exports = new BookController()