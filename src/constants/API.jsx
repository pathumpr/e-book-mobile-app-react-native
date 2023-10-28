//Base URL
const APP_URL = "http://10.0.2.2:8000/api/"
//Resource URL
export const RESOURCE_URL = "http://10.0.2.2:8000"

//Registration
export const CREATE_READER_API = APP_URL+'create-reader'
export const CREATE_WRITER_API = APP_URL+'create-writer'

//Profile photo upload
export const READER_PHOTO_API = APP_URL+'upload-profile-pic-reader'
export const WRITER_PHOTO_API = APP_URL+'upload-profile-pic-writer'

//Login
export const READER_LOGIN_API = APP_URL+'login-reader'
export const WRITER_LOGIN_API = APP_URL+'login-writer'

//Add a new book
export const ADD_BOOK_API = APP_URL+'add-book'
export const ADD_BOOK_IMAGE_API = APP_URL+'add-book-image'
export const ADD_BOOK_FILE_API = APP_URL+'add-book-file'

//Get writer uploads
export const GET_WRITER_UPLOADS = APP_URL+'get-writer-books/'

//Delete book - writer
export const DELETE_BOOK = APP_URL+'delete-book-writer/'

//Edit Book
export const GET_BOOK_DATA_EDIT = APP_URL+'get-edit-book-data/'
export const UPDATE_BOOK_DATA = APP_URL+'update-book-data'
export const UPDATE_BOOK_IMAGE = APP_URL+'update-book-image'

//Delete writer
export const DELETE_WRITER = APP_URL+'delete-writer/'

//Home page -- Get all books
export const GET_ALL_BOOKS = APP_URL+'get-all-books'

//Single book preview
export const GET_SINGLE_BOOK_PREVIEW = APP_URL+'get-single-book/'

//Checkout
export const CHECKOUT = APP_URL+'checkout'

//Get purchased books
export const GET_READER_PURCHASED_BOOKS = APP_URL+'get-purchased-books/'

//Delete purchased book
export const DELETE_PURCHASED_BOOK = APP_URL+'delete-purchased-book/'

//Delete writer
export const DELETE_READER = APP_URL+'delete-reader/'

//Get categories
export const GET_CATEGORIES = APP_URL+'get-categories'

//Get categories books
export const GET_CATEGORIES_BOOKS = APP_URL+'get-categories-books/'

//Search - realtime
export const SEARCH_BOOKS = APP_URL+'search-books'