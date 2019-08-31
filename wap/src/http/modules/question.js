import axios from "../api"; // 导入 api
/**
 * 问卷调查获取
 */
const getQuestionsList = (language = localStorage.l ? localStorage.l : 1) =>
	axios(
		STATIC_WEB_URL + "/api/question/question_list", {
			p: PLAT,
			language: language
		},
	);
const getList = (id=1, language = localStorage.l ? localStorage.l : 1)=>
	axios(
			STATIC_WEB_URL + "/api/question/get_question", {
			p: PLAT,
			language: language,
			question_id:id
		},
	)
const submitQuestion = (ques_id=1,num=0,data=[],language = localStorage.l ? localStorage.l : 1) =>
	axios(
			STATIC_WEB_URL + '/api/question/postquesinfo_new',{
			p: PLAT,
			language,
			ques_id,
      num,
      data
		},
		"POST"
	)
export default{ getQuestionsList,getList,submitQuestion }