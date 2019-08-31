<template>
  <div class="wen">
     <h3 class="title">{{title}}</h3>
     <p>
      亲爱的游客朋友：
     </p>
     <p class="content">
       您好，非常诚挚的邀请您为国家海洋博物馆的发展提供信息和意见，以便今后更好的为您服务。谢谢大家。
     </p>
     <ul class="question-content" v-if="svlist">
         <li v-for="(item,index) in svlist.info" :key="index">
           <h3>{{index+1}}.{{item.question}}({{item.type==1?'单选':"多选"}})<span class="require"></span></h3>
           <div class="answer-wrapper">
             <div class="item" v-for="(items,ind) in item.option_info" :key="ind"   @click="chooseItem(index,items)">
               <span :class="{'active':checkIschoose(items.id)}"></span>{{rmUnderline(items.option_info)}}
               <input type="text" v-if="items.option_type==2"   @input="chooseInput(index,items,$event.target.value)"
               >
             </div>
           </div>
         </li>
       </ul>
       <div class="btn-wrapper">
         <div class="btn" @click="submitData">提交</div>
       </div>
  </div>
</template>
<script>
import { Toast } from 'mint-ui';
export default {
  data(){
    return {
      title:'',
      startTime:"",
      endTime:"",
      count:"",
      question_id:0,
      isLocksubmit: false,
      svlist:[],
      submitList: [
//	   		{
//	   			ques_type: 1,
//	   			ques_option: [
//	   				{
//	   					option_id: 22,
//	   					option_type: 2,
//	   					ques_option_text: "你好，单选项内的文本"
//	   				}
//	   			]
//	   		},
//	   		{
//	   			ques_type: 2,
//	   			ques_option: [
//	   				{
//	   					option_id: 26,
//	   					option_type: 1,
//	   					ques_option_text: ""
//	   				},
//	   				{
//	   					option_id: 29,
//	   					option_type: 2,
//	   					ques_option_text: "你好，单选项内的文本"
//	   				}
//	   			]
//	   		}
	   	],
    }
  },
  watch:{
    // 观察问卷题目列表
		svlist: function(val){
			var vm = this;
			vm.submitList = [];
			for(var i in vm.svlist.info){
				var a = vm.svlist.info[i];
				var obj = {
		   			ques_type: a.type,
		   			ques_option: [
//		   				{
//		   					option_id: 22,
//		   					ques_option_text: ""
//		   				}
		   			]
		   		}
				vm.submitList.push(obj)
			}
		},
    	// 观察已选id列表
		chooseidlist: function(val){
			var vm = this;
		}
  },
  mounted(){
    this.getList();
  },methods:{
    chooseItem: function(i,b){
	    	var vm = this;
	    	//console.log(i+"---"+b.id)
	    	if(vm.submitList[i].ques_type==1){
	    		// 单选
	    		if(vm.submitList[i].ques_option.length==0 || !vm.checkIschoose(b.id)){
	    			var obj = {
	   					option_id: b.id,
	   					option_type: b.option_type,
	   					ques_option_text: ""
			   		}
		    		vm.submitList[i].ques_option = [];
		    		vm.submitList[i].ques_option.push(obj);
	    		}
	    	}else if(vm.submitList[i].ques_type==2){
	    		// 多选
	    		if(vm.checkIschoose(b.id)){
            var qi = vm.checkIschoose(b.id)-1;
	    			vm.submitList[i].ques_option.splice(qi,1);
	    		}else{
	    			var obj = {
	   					option_id: b.id,
	   					option_type: b.option_type,
	   					ques_option_text: ""
			   		}
		    		vm.submitList[i].ques_option.push(obj);
	    		}
	    	}
      },
      // 选择题目-输入框
	    chooseInput: function(i,b,val){
        var vm = this;
	    	var qi = vm.checkIschoose(b.id)-1;
	    	vm.submitList[i].ques_option[qi].ques_option_text = String(val).trim();
      },
      // 去除默认输出文本附带下划线
	    rmUnderline: function(str){
	    	return String(str).replace(/____________/,"")
	    },
       // 检查是否已选，返回index+1，当index==0也为true
	    checkIschoose: function(id){
	    	var vm = this;
	    	for(let i in vm.submitList){
	    		var arr = vm.submitList[i].ques_option;
	    		for(let j in arr){
	    			if(id==arr[j].option_id){
	    				return Number(j)+1
	    				//return true
	    			}
	    		}
	    	}
	    },
    getList(){
      this.$api.getQuestionsList().then(res=>{
        if(res.status==1){
          this.question_id= res.data[0].question_id;
          this.title = res.data[0].title;
          this.getQuestions(this.question_id)
        }
      })
    },
    getQuestions(id){
      this.$api.getList(id).then(res=>{
        if(res.status==1){
          this.svlist = res.data;
          this.count = res.data.num;
        }
      })
    },
    submitData(){
      var vm = this;
      if(!vm.isLocksubmit && vm.checkForm()){
        vm.isLocksubmit = true;
        this.$api.submitQuestion(vm.svlist.ques_id,vm.svlist.num,vm.submitList).then(res=>{
          if(res.status==1){
            setTimeout(function(){
            Toast({
              message: '提交成功',
              position: 'center',
              duration: 3000
            });
          },800);
          setTimeout(function(){
            window.location.reload();
          },2000);
          }else{
             Toast({
              message: '提交失败',
              position: 'center',
              duration: 3000
            });
            vm.isLocksubmit = false;
          }
        })
      }else if(vm.isLocksubmit){
        Toast({
          message: '请不要频繁提交',
          position: 'center',
          duration: 3000
        });
      }
    },
    // 表单验证
    checkForm: function(){
      var vm = this;
      var count = 0;
      for(let i in vm.submitList){
        var arr = vm.submitList[i].ques_option;
        if(arr.length>0){
          for(let j in arr){
            var opt = arr[j];
            var hasnoinputtextTag = false;
            if(opt.option_type==2){
              if(opt.ques_option_text.trim() == ""){
                hasnoinputtextTag = true;
              }
            }
          }
          count++;
          if(hasnoinputtextTag){
            count--;
          }
        }
      }
      if(count==vm.submitList.length &&  vm.svlist.info.length==vm.submitList.length){
        return true
      }else{
        Toast("请完成问卷")
        return false
      }
    },
  }
}
</script>

<style scoped lang="scss">
.wen {
  min-height: 300px;
  width: 100%;
  margin: 0 auto 30px;
  /* px */
  padding-bottom:40px;
  /* px */
}
.wen .title{
  font-size:16px;
  /* px */
  color:#000;
  font-weight: 500;
  margin:15px 0 13px;
  /* px */
  text-align: center;
}
.wen p{
  margin:0 12px;
  color:#000;
  font-size:14px;
  /* px */
  line-height: 20px;
  /* px */
  &:first-child{
    margin-bottom:0;
  }
  &.content{
    text-indent: 2em;
  }
}
.question-content{
  padding:0 12px;
  h3{
    font-weight: 400;
    font-size:14px;
    /* px */
    margin:15px 0;
    /* px */
    color:#353535;
    .require{
      display: inline-block;
      width:8px;
      /* px */
      height: 8px;
      /* px */
      background: url(../.././img/home/require.png)no-repeat;
      background-size:cover;
      margin-left:4px;
      /* px */
    }
  }
  .item{
    font-size:14px;
    /* px */
    color:#353535;
    margin-bottom:15px;
    /* px */
    &:last-child{
      margin-bottom:0;
    }
    span{
      display: inline-block;
      width:12px;
      /* px */
      height:12px;
      /* px */
      border-radius: 50%;
      border:1px solid #B47C2D;
      margin-right:4px;
      &.active{
        position:relative;
        &.active:after{
          content:"";
          width:8px;
          /* px */
          height:8px;
          /* px */
          position:absolute;
          top:50%;
          left:50%;
          margin-top:-4px;
          /* px */
          margin-left:-4px;
          /* px */
          background: #B47C2D;
          border-radius: 50%;
        }
      }
    }
    input{
      border:0 none;
      background: #fff;
      border-bottom:1px solid #000;
      &:focus{
        outline:0 none;
      }
    }
  }
}
.btn-wrapper{
  position:fixed;
  z-index:1;
  bottom:0;
  left:0;
  width:100%;
  height:60px;
  background: #fff;
  .btn{
    height:40px;
    /* px */
    width:66%;
    /* px */
    margin:10px auto 0;
    /* px */
    line-height:  40px;
    text-align:center;
    border-radius: 22px;
    /* px */
    color:#fff;
    background: #B47C2D;
    font-size:15px;
    /* px */
  }
}
</style>
