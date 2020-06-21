import React,{Fragment,useState} from "react";
import {fetchBook} from "../actions/bookActions";
import {NavLink} from "react-router-dom"
import {useDispatch} from "react-redux";

function Header(){
    /*const dispatch=useDispatch()
    const [fd,setFd]=useState('')
    const onChangeFd=(e)=>{
        setFd(e.target.value)
    }

    const onClickBtn=()=>{
        dispatch(fetchBook(fd))
    }*/

    return(
        <Fragment>
            <nav className="navbar navbar-default navbar-fixed-top">
                <div className="container">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <NavLink className="navbar-brand" to={"/"}>SIST FoodHouse</NavLink>
                    </div>
                    <div className="collapse navbar-collapse" id="myNavbar">
                        <ul className="nav navbar-nav navbar-right">
                            <li><NavLink exact to={"/"}>Home</NavLink></li>
                            <li><NavLink to={"/recommend"}>추천도서</NavLink></li>
                            <li><NavLink to={"/news"}>책뉴스</NavLink></li>
                        </ul>
                    </div>
                </div>
            </nav>

            {/*<div className="jumbotron text-center">
                <h1>SIST 책방</h1>
                <form>
                    <div className="input-group" style={{"width":"50%","margin":"0px auto"}}>
                        <input type="text" className="form-control" size="20" placeholder="책 검색" required onChange={onChangeFd}/>
                        <div className="input-group-btn">
                            <button type="button" className="btn btn-danger" onClick={onClickBtn}>검색</button>
                        </div>
                    </div>
                </form>
            </div>*/}
        </Fragment>
    )
}

export default Header;