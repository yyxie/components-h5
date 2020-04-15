/**
 * @fileOverview loading
 * @author 解园园
 * @time 2019-09-19
 */
import {Toast} from 'antd-mobile';

export default {
    addLoading: (message = 'Loading...') => {
        Toast.loading(message, 0, () => {
        });
    },
    removeLoading: () => {
        Toast.hide();
    }
};
