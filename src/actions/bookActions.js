import {FETCH_BOOK, FETCH_BOOK_DETAIL, FETCH_NEWS, FETCH_RECOMMEND_BOOK, FETCH_BOOK_FIND} from "./types";
import axios from "axios"

export const fetchBook=(fd)=>dispatch=>{
    axios.get('http://localhost:3355/bookFind',{
        params:{
            fd:fd
        }
    }).then(book=>dispatch({
        type:FETCH_BOOK_FIND,
        payload:book.data
    }))
}

export const fetchNews=(fd)=>dispatch=>{
    axios.get('http://localhost:3355/news',{
        params:{
            fd:fd
        }
    }).then(news=>dispatch({
        type:FETCH_NEWS,
        payload:news.data
    }))
}

export const fetchRecommend=(page)=>dispatch=>{
    axios.get('http://localhost:3355/recommend',{
        params:{
            page:page
        }
    }).then(recommend=>dispatch({
        type:FETCH_RECOMMEND_BOOK,
        payload:recommend.data
    }))
}

export const fetchBookDetail=(no)=>dispatch=>{
    axios.get('http://localhost:3355/bookDetail',{
        params:{
            no:no
        }
    }).then(bookDetail=>dispatch({
        type:FETCH_BOOK_DETAIL,
        payload:bookDetail.data[0]
    }))
}