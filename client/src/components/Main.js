import React, { Component, Fragment }from 'react';

import './Main.css';

class Main extends Component{
    constructor(props){
        super(props);
        this.state ={
            mainImg : require('../assets/main.jpg')
        };
    }
    render(){
        return(
            <Fragment>
                <header className="main_header">
                    <img className="header_img" src={this.state.mainImg}></img>
                </header>
                <section className="option_container">
                    <article>
                        
                    </article>
                </section>
            </Fragment>
        )
    }
}

export default Main;