import React, { Component } from 'react';
import logo from '../assets/img/book_logo.png'

class Footer extends Component {
  render() {
    return (
        <footer>
        <div className="container">
            <div className="row">
                <div className="col-xs-8">
                    <img src={logo} width="80" height="70" className="d-inline-block align-self-center" alt=""/>
                    <span className="mr-2">Follow Us! </span>
                    <i className="fa fa-facebook-square fa-lg" aria-hidden="true"></i>
                    <i className="fa fa-twitter-square fa-lg" aria-hidden="true"></i>
                    <i className="fa fa-instagram fa-lg" aria-hidden="true"></i>
                </div>
                <div className="col-xs-4 m-auto powered by">
                    <span>Powered By <a href="https://www.goodreads.com/">GoodReads</a> </span>
                </div>
            </div>
        </div>
        </footer>
        )
  }
}

export default Footer;