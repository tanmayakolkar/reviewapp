const handleError = (error) => {
    if (error?.response?.status === 404) {
        return error?.response?.data.detail;
    } else if (error?.response?.status === 400) {
        const getErrorList = error?.response?.data?.errors;
        if (getErrorList?.length) {
            const getMsg = Object.entries(getErrorList[0]).map(([key, value]) => { return { key: key, value: value[0] } });
            return getMsg.key + '' + getMsg.value[0]
        }
    } else if (error?.response?.status === 500) {
        return error?.response?.statusText;
    } else if (error?.response?.status == 406) {
        return error?.response?.data?.errors[0]?.error;
    } else if (error?.response?.status === 0) {
        localStorage.removeItem(process.env.REACT_APP_LOCALSTORAGE_KEY);
        return error?.response?.status;
    } else if (error?.response?.status === 401) {
        localStorage.removeItem(process.env.REACT_APP_LOCALSTORAGE_KEY);
        return error?.response?.status;
    } else {
        return "Network Error.";
    }
};
export { handleError };
