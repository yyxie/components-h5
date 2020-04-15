import {Toast} from 'antd-mobile';

const Util = {
    /**
     * 处理rc-form报的错误
     * @param errorObj
     */
     showFormErrorMessage: (errorObj: any) => {
        const getFristErrorObj = function (obj: any): any {
            if (Array.isArray(obj)) {
                for (let i = 0; i < obj.length; i += 1) {
                    const item = obj[i];
                    if (item !== undefined) {
                        return getFristErrorObj(item);
                    }
                }
            } else if (typeof obj === 'object') {
                for (const key in obj) {
                    if (Object.prototype.hasOwnProperty.call(obj, key) && obj[key] !== undefined) {
                        if (key === 'errors') {
                            return obj[key];
                        }
                        return getFristErrorObj(obj[key]);
                    }
                }
            }
            return undefined;
        }
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        const errors = getFristErrorObj(errorObj);
        if (errors) {
            Toast.info(errors[0].message);
        }
    }
};

export default Util;
