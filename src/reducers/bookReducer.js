import {FETCH_BOOK, FETCH_BOOK_DETAIL, FETCH_NEWS, FETCH_RECOMMEND_BOOK,FETCH_BOOK_FIND} from "../actions/types";

const initialState={
    book:[],
    news:[],
    recommend_book:[],
    book_detail:{},
    book_find:[]
}

export default function (state=initialState,action) {
    switch (action.type) {
        case FETCH_BOOK:
            return{
                ...state,
                book: action.payload
            }
        case FETCH_RECOMMEND_BOOK:
            return{
                ...state,
                recommend_book: action.payload
            }

        case FETCH_BOOK_DETAIL:
            return{
                ...state,
                book_detail: action.payload
            }
        case FETCH_NEWS:
            return{
                ...state,
                news: action.payload
            }
        case FETCH_BOOK_FIND:
            return{
                ...state,
                book: action.payload
            }
        default:
            return state
    }

}