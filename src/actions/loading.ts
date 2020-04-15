/**
 * @fileOverview loading
 * @author 解园园
 * @time 2019-09-19
 */
import { Toast } from 'antd-mobile';
export default {
  addLoading: () => {
      Toast.loading('Loading...', 0, () => {
      });
  },
  removeLoading: () => {
      Toast.hide();
  }
};
