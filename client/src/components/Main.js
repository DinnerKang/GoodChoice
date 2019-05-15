import React, { Component, Fragment }from 'react';
import DatePicker from "react-datepicker";
import InputRange from 'react-input-range';

import DayPicker, { DateUtils  } from 'react-day-picker';
import 'react-day-picker/lib/style.css';

import './Main.css';
import "react-datepicker/dist/react-datepicker.css";
import "react-input-range/lib/css/index.css";

import axios from 'axios';
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
            option_people: 1,
            betweenDay: 0,

            from : undefined,
            to: undefined,
        };
    }

    handleChangeStart = (date) =>{
        this.setState({
            startDate: date,
            endDate: '',
            betweenDay: 0
        });
    }
    handleChangeEnd = (date) =>{
        this.setState({
            endDate: date
        }, function(){
            // 숙박일수
            if(this.state.startDate){
                const betweenDay = (this.state.endDate.getTime() - this.state.startDate.getTime())/1000/60/60/24;
                this.setState({ betweenDay : betweenDay });
            }
        });
    }
    clickCheckbox = (e) =>{
        const name = e.target.name;
        let value;
        if(name === 'reservation'){
            value = this.state.reservation;
        }else if(name === 'autoCamp'){
            value = this.state.autoCamp;
        }else if(name === 'glam'){
            value = this.state.glam;
        }else if(name === 'karaban'){
            value = this.state.karaban;
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
        });

    }
    submitBtn = async() =>{
        // 옵션 
        let duringDay = [];
        const minPrice = this.state.rangeValue.min;
        const maxPrice = this.state.rangeValue.max;
        const reservation = this.state.reservation;
        let type= [];
        const people = this.state.option_people;

        if(!this.state.startDate || !this.state.endDate) return alert('입실 날짜와 퇴실 날짜를 입력해주세요.');


        function changeDate(date, during){
            let newDate = new Date(date);
            newDate.setDate(newDate.getDate()+ during);

            const dd = ("0" + newDate.getDate()).slice(-2);
            const mm = ("0"+ (newDate.getMonth() + 1)).slice(-2);
            const yy = newDate.getFullYear();
            return Number(yy+mm+dd);
        }

        const betweenDay = (this.state.endDate.getTime() - this.state.startDate.getTime())/1000/60/60/24;
        for(let i=0,len=betweenDay; i<len ;i++){
            duringDay.push(changeDate(this.state.startDate, i));
        }

        if(this.state.autoCamp) type.push('auto');
        if(this.state.glam) type.push('glam');
        if(this.state.karaban) type.push('karaban');
        


        let searchResult = await axios.post(`http://localhost:5000/search/option`, 
                                    {duringDay, minPrice,  maxPrice, reservation, type, people});
        console.log(searchResult);
    }

    handleDayClick = (day) => {
        const range = DateUtils.addDayToRange(day, this.state);
        this.setState(range);
    }
    
    render(){
        let duringDay;
        if(this.state.betweenDay ===0){
            duringDay = '';
        }else{
            duringDay = <label className="betweenDay_label">{this.state.betweenDay} 박 {this.state.betweenDay+1} 일</label>
        }

        const { from, to } = this.state;
        const modifiers = { start: from, end: to };



        return(
            <Fragment>
                <header className="main_header">
                    <img className="header_img" src={this.state.mainImg} alt="backgorund"></img>
                </header>
                <section>
                    <article className="option_container">
                        <div className="option_list">
                            <div className="align_center option_date">
                                {duringDay}
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
                                    minDate={this.state.startDate}
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
                                    <input type="checkbox" value="reservation" name="reservation" id="reservation" 
                                    onClick={this.clickCheckbox} checked={this.state.reservation} />
                                    <label  className="option_type" htmlFor="reservation" >예약 가능</label>
                            </div>
                        </div>
                        <div className="option_list">
                            <div className="align_center">
                                <ul>
                                    <li>
                                        <input type="checkbox" value="autoCamp"  name="autoCamp" id="autoCamp" 
                                        onClick={this.clickCheckbox} checked={this.state.autoCamp}/>
                                        <label className="option_type" htmlFor="autoCamp">오토캠핑</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" value="glam" name="glam" id="glam"
                                        onClick={this.clickCheckbox} checked={this.state.glam}/>
                                        <label className="option_type" htmlFor="glam">글램핑</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" value="karaban" name="karaban" id="karaban" 
                                        onClick={this.clickCheckbox} checked={this.state.karaban}/>
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
                    <div>
                        <input type="text" className="DayPicker_text" placeholder="입실 날짜 ~ 퇴실 날짜" readOnly/>
                        <DayPicker 
                            className="Selectable"
                            numberOfMonths={this.props.numberOfMonths}
                            selectedDays={[from, { from, to }]}
                            modifiers={modifiers}
                            onDayClick={this.handleDayClick} 
                        />
                    </div>
                </section>
            </Fragment>
        )
    }
}

export default Main;