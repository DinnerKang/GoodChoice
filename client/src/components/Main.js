import React, { Component, Fragment }from 'react';
import DatePicker from "react-datepicker";
import InputRange from 'react-input-range';

import './Main.css';
import "react-datepicker/dist/react-datepicker.css";
import "react-input-range/lib/css/index.css";

class Main extends Component{
    constructor(props){
        super(props);
        this.state ={
            mainImg : require('../assets/main.jpg'),
            startDate: '',
            endDate: '',
            rangeValue: { min: 1, max: 30},
            option_people: 1
        };
    }

    handleChangeStart = (date) =>{
        this.setState({
            startDate: date
        })
    }
    handleChangeEnd = (date) =>{
        this.setState({
            endDate: date
        })
    }
    render(){
        return(
            <Fragment>
                <header className="main_header">
                    <img className="header_img" src={this.state.mainImg} alt="backgorund"></img>
                </header>
                <section >
                    <article className="option_container">
                        <div className="option_list">
                            <div className="align_center">
                                <DatePicker
                                    dateFormat="YYYY-MM-dd"
                                    placeholderText="입실 날짜"
                                    minDate={new Date()}
                                    selected={this.state.startDate}
                                    selectsStart
                                    startDate={this.state.startDate}
                                    endDate={this.state.endDate}
                                    onChange={this.handleChangeStart}
                                />
                                ~
                                <DatePicker
                                    dateFormat="YYYY-MM-dd"
                                    placeholderText="퇴실 날짜"
                                    minDate={new Date()}
                                    selected={this.state.endDate}
                                    selectsEnd
                                    startDate={this.state.startDate}
                                    endDate={this.state.endDate}
                                    onChange={this.handleChangeEnd}
                                />
                            </div>
                        </div>
                        <div className="option_list">
                            <div className="option_price align_center">
                                <label className="price_label">가격 (만원)</label>
                                <InputRange
                                maxValue={30}
                                minValue={1}
                                value={this.state.rangeValue}
                                onChange={rangeValue => this.setState({ rangeValue: rangeValue })}/>
                            </div>
                        </div>
                        <div className="option_list">
                            <div className="align_center">
                                <label>
                                    <input type="checkbox" value="예약가능"/>예약 가능
                                    </label>
                            </div>
                        </div>
                        <div className="option_list">
                            <div className="align_center">
                                <ul>
                                    <li>
                                        <label>
                                            <input type="checkbox" value="오토캠핑"/>오토캠핑
                                        </label>
                                    </li>
                                    <li>
                                        <label>
                                            <input type="checkbox" value="글램핑"/>글램핑
                                        </label>
                                    </li>
                                    <li>
                                        <label>
                                            <input type="checkbox" value="카라반"/>카라반
                                        </label>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="option_list">
                            <div className="align_center"> 
                                <input type="button" value="-" onClick={ () => {
                                    if(this.state.option_people ===1){
                                        return;
                                    }
                                    this.setState({option_people : this.state.option_people-1})}
                                    }/>
                                    인원 : {this.state.option_people}
                                <input type="button" value="+"  onClick={ () => this.setState({option_people : this.state.option_people+1})}/>
                            </div>
                        </div>
                    </article>
                </section>
            </Fragment>
        )
    }
}

export default Main;