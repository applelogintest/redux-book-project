import React, {useCallback, useEffect, useState} from "react";
import {useDispatch,useSelector} from "react-redux";
import {FETCH_RECOMMEND_BOOK, FETCH_TOTALPAGE} from "../actions/types";
import axios from 'axios'
import {fetchRecommend} from "../actions/bookActions";
import {NavLink} from "react-router-dom";

export default function Recommend(props){
    const dispatch=useDispatch()
    const [page,setPage]=useState(1)
    console.count('count')
    const [total,setTotal]=useState(0)
    useEffect(()=>{
        axios.get('http://localhost:3355/recommend',{
                params:{
                    page:page
                }
            }).then((result)=>{
                dispatch({
                    type:FETCH_RECOMMEND_BOOK,
                    payload:result.data
                })
        })
        console.log('init page2 : '+page)


    },[page])

    useEffect(()=>{
        axios.get('http://localhost:3355/totalpage').then((result)=>{
            setTotal(result.data.total)
            console.log('totalpage :'+total)
        })
    },[])

    const recommend_data=useSelector(state=>state.books.recommend_book)

    const onClickNext=()=>{
       /* console.log('next page : '+ page)*/
        setPage(page<total?page+1:page)
        /*console.log('next page : '+ page)
        console.log('next total : '+ total)
        dispatch(fetchRecommend(page))*/
    }

    const onClickPrev=()=>{

        setPage(page>1?page-1:page)
        /*console.log('prev page : '+page)
        console.log('prev total : '+total)
        dispatch(fetchRecommend(page))*/
    }

    const html=recommend_data.map((m)=>
        <div className="col-md-4">
            <div className="thumbnail">
                <NavLink to={"/bookDetail/"+m.no}>
                <div className={"caption"}>
                    <b>{m.no} 위</b>
                </div>
                <img src={m.poster} alt="Lights" style={{"width":"180px","height":"220px"}}/>
                <div className="caption">
                    {
                        (function () {
                            if(m.title.length > 13)
                                return <b>{m.title.substr(0,14)+'...'}</b>
                            else
                                return <b>{m.title}</b>
                        })()
                    }
                </div>
                </NavLink>
            </div>
        </div>
    )

    return(
        <React.Fragment>
            <div className="jumbotron text-center" style={{"padding-bottom":"10px"}}>
                <h1>SIST 베스트셀러</h1>
            </div>

            <div className={"row"} style={{"margin":"0px auto","width":"800px"}}>
                {html}
            </div>

            <div className={"row text-center"}>
                <input className={"btn btn-sm btn-success"} type={"button"} value={"이전"} onClick={onClickPrev}/>
                            {page} page / {total} pages
                <input className={"btn btn-sm btn-success"} type={"button"} value={"다음"} onClick={onClickNext}/>
            </div>
        </React.Fragment>
    )
}
