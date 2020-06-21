import React,{useEffect,useState} from "react";
import {useDispatch,useSelector} from "react-redux";
import {FETCH_NEWS} from "../actions/types";
import axios from "axios";
import {fetchNews} from "../actions/bookActions";

export default function News(props) {
    const dispatch=useDispatch()
    const [fd,setFd]=useState('책추천')
    useEffect(()=>{
        axios.get('http://localhost:3355/news',{
            params:{
                fd:fd
            }
        }).then((result)=>{
            dispatch({
                type:FETCH_NEWS,
                payload:result.data
            })
        })
    },[])

    const news_data=useSelector(state=>state.books.news)

    const onDataChange=(e)=>{
        setFd(e.target.value)
    }

    const onBtnClick=()=>{
        dispatch(fetchNews(fd))
    }

    const html=news_data.map((m)=>
        <table className={"table"}>
            <tbody>
            <tr>
                <td><a href={m.link} target={"_blank"}>{m.title}</a></td>
            </tr>

            <tr>
                <td>{m.description}</td>
            </tr>

            <tr>
                <td className={"text-right"}>{m.author}</td>
            </tr>
            </tbody>
        </table>
    )

    return(
        <React.Fragment>
            <div className="jumbotron text-center" style={{"padding-bottom":"10px"}}>
                <h1>SIST 뉴스</h1>
            </div>
            <div className={"row"} style={{"margin":"0px auto","width":"900px"}}>

                <table className={"table"}>
                    <tbody>
                    <tr>
                        <td>
                            <input type={"text"} className={"input-sm"} size={"20"} onChange={onDataChange}/>
                            <button className={"btn btn-sm btn-primary"} onClick={onBtnClick}>검색</button>
                        </td>
                    </tr>

                    <tr>
                        <td>
                            {html}
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </React.Fragment>
    )
}