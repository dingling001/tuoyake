import axios from "../api"; // 导入 api
const saveFeed = (content,phone='',img='') =>
	axios(
		STATIC_WEB_URL + "/api/feedback/feedback_save", {
			p: 'w',
			api_token: localStorage.api_token,
			language: localStorage.api_token,
			content: content,
			phone:phone,
			img:img
		},
		"POST",
		true
	);
export default { saveFeed }