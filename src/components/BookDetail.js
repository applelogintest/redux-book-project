import React,{useEffect} from "react";
import {useDispatch} from "react-redux";
import {fetchBookDetail} from "../actions/bookActions";
import {connect} from "react-redux"


function BookDetail(props) {
    const dispatch=useDispatch()
    console.log("BookDetail Call....")
    useEffect(()=>{
        props.fetchBookDetail(props.match.params.no)
    },[])

    return(
        <React.Fragment>
            <div className="jumbotron text-center" style={{"padding-bottom":"10px"}}>
                <h1>SIST 책 상세보기</h1>
            </div>
            
            <div className={"row"} style={{"margin":"0px auto","width":"800px"}}>
                 <tbody>
                    <div className={"poster"}>
                        <img src={props.book_detail.poster} style={{"width":"100%","height":"100%","borderRadius":"20px"}}/>
                    </div>
                    <div className={"info"}>
                        <ul>
                            <li>
                                <div className={"title info-css"}>제목 : {props.book_detail.title}</div>
                            </li>
                            <li>
                                <div className={"author info-css"}>작가 : {props.book_detail.author}</div>
                            </li>
                            <li>
                                <div className={"publisher info-css"}>출판사 : {props.book_detail.publisher}</div>
                            </li>
                            <li>
                                <div className={"regdate info-css"}>출판일 :  {props.book_detail.regdate}</div>
                            </li>
                            <li>
                                <div className={"price info-css"}>가격 : {props.book_detail.price}</div>
                            </li>
                        </ul>
                    </div>
                 </tbody>
            </div>
        </React.Fragment>
    )
}

const mapStateToProps = state => ({
    book_detail:state.books.book_detail
})

export default connect(mapStateToProps,{fetchBookDetail})(BookDetail)