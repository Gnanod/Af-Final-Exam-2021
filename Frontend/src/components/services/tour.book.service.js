import axios from "axios";
import constants from "../../util/constants/Constants";

export const bookTour = (data) => {
    return axios.post(constants.backend_url + 'api/tour/book/add',data)
        .then(res => {
            console.log(res);
            return res;
        }).catch(function (error) {
            return error;
        })
};

export const findallBookedtours = (userId) => {
    return axios.get(constants.backend_url + 'api/tour/book/getAll/'+userId)
        .then(res => {
            console.log(res);
            return res;
        }).catch(function (error) {
            return error;
        })
};

