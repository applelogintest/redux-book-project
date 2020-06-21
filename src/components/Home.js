import React, {useEffect, useState} from "react";
import {useDispatch,useSelector} from "react-redux";
import {FETCH_BOOK} from "../actions/types";
import axios from "axios";
import {fetchBook} from "../actions/bookActions";
import {NavLink} from "react-router-dom";

export default function Home(props) {
    const dispatch=useDispatch()
    useEffect(()=>{
        axios.get('http://localhost:3355/book')
            .then((result)=>{
            dispatch({
                type:FETCH_BOOK,
                payload:result.data
            })
        })
    },[])

    const [fd,setFd]=useState('')
    const onChangeFd=(e)=>{
        setFd(e.target.value)
    }

    const onClickBtn=()=>{
        dispatch(fetchBook(fd))
    }

    const book_data=useSelector((state)=>state.books.book)
    const html=book_data.map((m)=>
            <div className="col-md-4">
                <div className="thumbnail">
                    <NavLink to={"/bookDetail/"+m.no}>
                    <img src={m.poster} alt="Lights" style={{"width":"180px","height":"220px"}}/>
                    <div className="caption">
                        {
                            (function () {
                                if(m.title.length > 15)
                                   return <b>{m.title.substr(0,16)+'...'}</b>
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
            <div className="jumbotron text-center" style={{"padding-bottom":"20px"}}>
                <h1>SIST 책방</h1>
                <form>
                    <div className="input-group" style={{"width":"50%","margin":"0px auto"}}>
                        <input type="text" className="form-control" size="20" placeholder="책 검색" required onChange={onChangeFd}/>
                        <div className="input-group-btn">
                            <button type="button" className="btn btn-danger" onClick={onClickBtn}>검색</button>
                        </div>
                    </div>
                </form>
            </div>

            <div className={"row"} style={{"margin":"0px auto","width":"800px"}}>
                {html}
            </div>
        </React.Fragment>
    )



}