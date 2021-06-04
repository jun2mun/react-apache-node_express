import React, { Component } from "react";

//  Home 화면
// 시계 // navigation 메뉴 // 바탕화면 구성.
// graph 화면 추가.

import "./Home.css";
class Home extends Component {
    constructor(props){
        super(props)
        this.state = { 
            d: new Date(),
            image : ""
        }
    }

    paintImage = (imgNumber) =>{
        const image_src = `./images/${imgNumber + 1}.jpg`;
        this.setState({image : image_src});
    }

    genRandom() {
        const IMG_NUMBER = 3;
        const number = Math.floor(Math.random() * IMG_NUMBER);
        return number;
    }
    componentDidMount() {
        this.timeID = setInterval(
            () => this.Change(),
            1000
        )
        this.paintImage(this.genRandom());
    }

    componentWillUnmount(){
        clearInterval(this.timeID)
    }

    Change = () => {
        this.setState({
            d: new Date()
        })
    }
    render() {
        return(
            <div class="bg" style={{backgroundImage: 'url('+ this.state.image +')', backgroundSize : 'cover'}}>
                <div class="clock">
                    {this.state.d.getHours()}:{this.state.d.getMinutes()}:{this.state.d.getSeconds()}
                </div>
            </div>
        )
    }
}


export default Home;