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
            reservation : false,
            autoCamp: false,
            glam: false,
            karaban : false,
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
    clickCheckbox = (e) =>{
        const name = e.target.name;
        let value;
        if(name === 'reservation'){
            value = this.state.reservation;
        }else if(name === 'autoCamp'){
            value = this.state.autoCamp;
        }
        this.setState({
            [name] : !value
        });
    }
    resetBtn = () =>{
        this.setState({
            startDate : '',
            endDate: '',
            rangeValue: { min: 1, max: 30},
            reservation : false,
            autoCamp: false,
            glam: false,
            karaban : false,
            option_people: 1,
        })
    }
    submitBtn = () =>{
        const startDate = this.state.startDate;
        const endDate = this.state.endDate;
        const minPrice = this.state.rangeValue.min;
        const maxPrice = this.state.rangeValue.max;
        const reservation = this.state.reservation;
        let type= [];
        const people = this.state.option_people;

        if(this.state.autoCamp) type.push('auto');
        if(this.state.glam) type.push('glam');
        if(this.state.karaban) type.push('karaban');
        
    }
    
    render(){
        return(
            <Fragment>
                <header className="main_header">
                    <img className="header_img" src={this.state.mainImg} alt="backgorund"></img>
                </header>
                <section>
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
                               
                                    <input type="checkbox" value="reservation" name="reservation" id="reservation" onClick={this.clickCheckbox}/>
                                    <label  className="option_type" htmlFor="reservation" >예약 가능</label>
                            </div>
                        </div>
                        <div className="option_list">
                            <div className="align_center">
                                <ul>
                                    <li>
                                        <input type="checkbox" value="autoCamp"  name="autoCamp" id="autoCamp" onClick={this.clickCheckbox}/>
                                        <label className="option_type" htmlFor="autoCamp">오토캠핑</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" value="glam" name="glam" id="glam" onClick={this.clickCheckbox}/>
                                        <label className="option_type" htmlFor="glam">글램핑</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" value="karaban" name="karaban" id="karaban" onClick={this.clickCheckbox}/>
                                        <label  className="option_type" htmlFor="karaban">카라반</label>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="option_list">
                            <div className="align_center"> 
                                <input className="people_btn" type="button" value="-" onClick={ () => {
                                    if(this.state.option_people ===1){
                                        return;
                                    }
                                    this.setState({option_people : this.state.option_people-1})}
                                    }/>
                                    인원 : {this.state.option_people}
                                <input className="people_btn" type="button" value="+" 
                                onClick={ () => this.setState({option_people : this.state.option_people+1})}/>
                            </div>
                        </div>
                    </article>
                    <article className="button_container">
                        <input className="option_btn" type="button" value="초기화" onClick={this.resetBtn}/>
                        <input className="option_btn" type="button" value="적용" onClick={this.submitBtn}/>
                    </article>
                </section>
            </Fragment>
        )
    }
}

export default Main;