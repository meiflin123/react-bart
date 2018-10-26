import React from 'react';
import $ from 'jquery';
import axios from 'axios';
import Station from './station.jsx'


const StopsList = (props) => {

    return (
      
        <div className="lines-stop-list">
          <ul>
           {props.stopsList.map((stop, index) => <Station station = {stop} key={stop.id}/>)}

          </ul>
        </div>
   
    );

  }


export default StopsList;