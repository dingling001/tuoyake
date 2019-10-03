import axios from "../api";


/**
 * 添加编辑常用联系人(票务共用)
 */
export const GetSlideList = (city) =>
    axios(
        "/api/index/getSlideList", {
            city
        },
        "POST",
        true
    );
/**
 * 常用联系人列表(票务共用)
 */
export const PW_WX_ContactsList = () =>
    axios(
        BASEURL + "/api/top_contacts_list", {
            p: PLAT,
            api_token: localStorage.app_token
        },
        "GET",
        true
    );