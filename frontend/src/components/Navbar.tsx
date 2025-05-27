import React from 'react';

export default class Navbar extends React.Component {
   render() {
      return (
         <nav
            id="navbar"
            aria-label="main navigation"
         >
            <div className="navbar m-0 p-0 mx-5">
               <span className="navbar-title">CPfolio</span>
               <div className="navbar-links">
                  <a href="#">Home</a>
                  <a href="#">Contatti</a>
                  <a href="#">Progetti</a>
                  <a href="#">Login</a>
               </div>
            </div>
            <hr />
         </nav>
      );
   }
}
