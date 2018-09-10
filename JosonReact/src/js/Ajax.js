import axios from 'axios';
import querystring from 'querystring';
import baseConfig from './httpBaseConfig';

axios.defaults.baseURL = baseConfig.baseUrl+':'+baseConfig.port+baseConfig.prefix;

// fetch感觉略麻烦，不清爽，直接引了个axios，用es7写的。
export default class ajax {
    static async get(url, params) {
        try {
            let query = await querystring.stringify(params);
            let res = null;
            if (!params) {
                res = await axios.get(url)
            } else {
                res = await axios.get(url + '?' + query)
            }
            return res
        } catch (error) {
            return error
        }
    }
    static async post(url, params) {
        try {
            let res = await axios.post(url, params);
            return res
        } catch (error) {
            return error
        }
    }
    static async patch(url, params) {
        try {
            let res = await axios.patch(url, params);
            return res
        } catch (error) {
            return error
        }
    }
    static async put(url, params) {
        try {
            let res = await axios.put(url, params);
            return res
        } catch (error) {
            return error
        }
    }
    static async delete(url, params) {
        /**
         * params默认为数组
         */
        try {
            let res = await axios.post(url, params);
            return res
        } catch (error) {
            return error
        }
    }
}



export function axiosPost(url, params , callback ,errorcallback) {

    let config = {
        'headers':{'Content-Type': 'application/x-www-form-urlencoded'},
    };

    axios.post(url, querystring.stringify(params))
        .then(result=>callback(result))
        .catch(e => {console.log("Oops, error", e);if(errorcallback != null){errorcallback(e);}});
}

export function axiosGet(url, params, callback ,errorcallback){

    let data = {
        'headers':{'Content-Type': 'application/x-www-form-urlencoded'}
    };

    try {
        let query = querystring.stringify(params);
        let res = null;

        if (!params) {
            axios.get(url)
                .then(result=>callback(result));

        }else {
             axios.get(url + '?' + query)
                .then(result=>callback(result));
        }

    } catch (error) {

      console.log("Oops, error", error);
      if(errorcallback != null){errorcallback(e);}
    }


    //
    // axios.get(url, data)
    //     .then(result=>callback(result))
    //     .catch(e => {console.log("Oops, error", e);  if(errorcallback != null){errorcallback(e);} });
}


