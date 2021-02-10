import axios from "axios";
import constants from "../../util/constants/Constants";

export const saveTour = (data) => {
    return axios.post(constants.backend_url + 'api/tour/add',data)
        .then(res => {
            console.log(res);
            return res;
        }).catch(function (error) {
            return error;
        })
};

export const findalltours = () => {
    return axios.get(constants.backend_url + 'api/tour/getall')
        .then(res => {
            console.log(res);
            return res;
        }).catch(function (error) {
            return error;
        })
};