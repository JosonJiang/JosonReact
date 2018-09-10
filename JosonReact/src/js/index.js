import $ from 'jquery';
import axios from 'axios';
// import ajax from './ajax';
// import {axiosGet} from './ajax'

import React from 'react';
import ReactDOM from 'react-dom';
import Helloword from './helloword';

axios.get('https://oapi.dingtalk.com/gettoken', {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Access-Control-Allow-Origin': '*',
        "Access-Control-Allow-Headers":"X-Requested-With,Content-Type",
        "Access-Control-Allow-Methods":"PUT,POST,GET,DELETE,OPTIONS"
    },
    params: {
        appkey : "dinge2add45c49ad050a35c2f4657eb6378f",
        appsecret : "tmeMEHPR1BYLAk6U6RT0Iy8AfKlC9x-OdPU_81lGlcfnS3Toyp7zT0eDVkVqVSBq"
    }
    })
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    });

// ajax.get('/api/gettoken',  {
//     Appkey : "dinge2add45c49ad050a35c2f4657eb6378f",
//     Appsecret : "tmeMEHPR1BYLAk6U6RT0Iy8AfKlC9x-OdPU_81lGlcfnS3Toyp7zT0eDVkVqVSBq"
// });

//   axiosGet("https://oapi.dingtalk.com/api/gettoken",
//       {
//           Appkey : "dinge2add45c49ad050a35c2f4657eb6378f",
//           Appsecret : "tmeMEHPR1BYLAk6U6RT0Iy8AfKlC9x-OdPU_81lGlcfnS3Toyp7zT0eDVkVqVSBq"
//      },
//       function(result){
//         console.log(result);
//       }
// );

ReactDOM.render(<Helloword />, document.getElementById('content'));
