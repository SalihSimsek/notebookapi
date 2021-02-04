const AuthorService = require('./author-service')
const BookService = require('./book-service')
const CategoryService = require('./category-service')

class CommonService{

    async addBookToAuthor(book,author){
        author.books.push(book)
        await author.save()
    }

    async addBookToCategory(book,category){
        category.books.push(book)
        await category.save()
    }

    async addQuoteToBook(quote,book){
        book.quotes.push(quote)
        await book.save()
    }
}

module.exports = new CommonService()