import { Top } from './storm_top.js';
import { pop_MSG } from './storm_pop.js';
import { Guide } from './storm_Guide.js';
import { Audio } from './storm_Audio.js';
import { loadIMG } from './storm_loadIMG.js';
import { Setting } from './storm_Setting.js';
import { DataService } from './storm_DataService.js';
import { main_Intro } from './storm_intro.js';
import { Quiz_01 } from './storm_quiz01.js';
import { Quiz_02 } from './storm_quiz02.js';
import { Quiz_03 } from './storm_quiz03.js';
import { Result } from './storm_result.js';
import { gsap_Template } from './storm_gsap_Template.js';

class quiz_Main {
    static instance = null;
    static getInstance() {
        if (!this.instance) {
        this.instance = new quiz_Main();
        }
        return this.instance;
    }    
    //201119 추가
    static sendQuizData() {
        let main_obj = quiz_Main.getInstance();        
        /*============데이터 전송===============*/
        if (main_obj.mode == "web") {
            main_obj.dataService.LMS_data("save", main_obj.quiz_num,
                main_obj.quiz_info["q"+main_obj.quiz_num].input_result,
                main_obj.quiz_info["q"+main_obj.quiz_num].answer,
                main_obj.quiz_info["q"+main_obj.quiz_num].chance,
                main_obj.quiz_info["q"+main_obj.quiz_num].st_time,
                main_obj.quiz_info["q"+main_obj.quiz_num].ed_time
            );
        }
    }
    /*251024 로딩 애니메이션*/
    static async updatePercent2(target){
        let main_obj=quiz_Main.getInstance();

        await gsap.to(main_obj.counter, {
            value: target,
            duration: 0.2,         // 1초 동안 애니메이션
            ease: "power2.out",
            onUpdate: () => {
                document.getElementById("bar2").style.width = Math.round(main_obj.counter.value) + "%";
                document.getElementById("percent2").textContent = Math.round(main_obj.counter.value) + "%";
                if(main_obj.counter.value==100){
                    document.getElementById("loading2").style.display="none";

                    document.getElementById("bar2").style="";
                    document.getElementById("percent2").textContent="";
                    main_obj.counter.value=0;
                }
            }
        });        
    }    

    static async reset_all(){
        let main_obj=quiz_Main.getInstance();
        
        if(main_obj.top_menu.storm_fullscreen){
            main_obj.top_menu.fullScreen();
        }
        if(main_obj.main_tl!=null){
            main_obj.main_tl.kill();
            main_obj.main_tl=null;
        }  
        quiz_Main.responsive();

        gsap.killTweensOf("*");      // 모든 타겟의 tween 제거
        
        main_obj.guide.repeatTimer?.kill();

        main_obj.guide.repeatTimer?.kill();

        /*251024 강제 중단 수정*/
        Howler.stop();        

        let children = main_obj.stormPlayer.querySelectorAll("*");
        children.forEach(child => child.removeAttribute("style"));
        main_obj.stormPlayer.style="";    
        
        let container = document.querySelector("#main_cnt");
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }        

        main_obj.stormStart.style.display="flex";
        main_obj.stormStart.style.width="1920px";
        main_obj.stormStart.children[0].style="";

        gsap.to(main_obj.stormStart, { opacity: 1, duration: 0.5, ease: "power1.out" });   

        if(main_obj.mode=="local"){
            main_obj.quiz_num=0;
        }
    }
    static reset_cnt(){
        let main_obj=quiz_Main.getInstance();
      
        /*251024 강제 중단 수정*/
        Howler.stop();

        let children = main_obj.main_cnt.querySelectorAll("*");
        children.forEach(child => child.removeAttribute("style"));

        gsap.killTweensOf("*");      // 모든 타겟의 tween 제거
        
        if(main_obj.main_tl!=null){
            main_obj.main_tl.kill();
            main_obj.main_tl=null;
        } 
    }
    static async responsive(){
        let main_obj=quiz_Main.getInstance();
        let w_h = window.document.documentElement.clientHeight;
        let w_w = window.document.documentElement.clientWidth;
        let _cw = 1920;
        let _ch = 1080;
        let container_scale;
        if(main_obj.st_page==false){
            if( w_w < _cw ){
                if(quiz_Main.isMobile()){
                    if(quiz_Main.isIOS()){
                        if (window.innerWidth > window.innerHeight) {
                            container_scale = Math.min(w_w/ _cw, w_h/ _ch);
                        }else{
                            container_scale = Math.min(w_w/ _ch, w_h/ _cw);
                        }
                    }else{
                        if (window.innerWidth > window.innerHeight) {
                            container_scale = Math.min(w_w/ _cw, w_h/ _ch);
                        }else{
                            container_scale = Math.min(w_w/ _ch, w_h/ _cw);
                        }
                    }
                }else{
                    container_scale = Math.min(w_w/ _cw, w_h/ _ch);
                }
            }else{
                if(main_obj.top_menu.storm_fullscreen==false){
                    container_scale = Math.min(w_w/ _cw, w_h/ _ch);  
                }else{
                    container_scale = 1;
                }
            }
            document.getElementById("cnt_resize").style.transform = `scale(${container_scale})`;
        }else{
            if( w_w < _cw ){
                container_scale = Math.min(w_w/ _cw, w_h/ _ch);
            }else{
                if(main_obj.top_menu.storm_fullscreen==false){
                    container_scale = Math.min(w_w/ _cw, w_h/ _ch);  
                }else{
                    container_scale = 1;
                }
            }
            //$("#stormStart").css("transform","scale("+container_scale+")");
            document.getElementById("stormStart").style.transform = `scale(${container_scale})`;
        }
    }

    static show_page(view){
        let main_obj=quiz_Main.getInstance();
        switch(view){
            case "main":
                if(main_obj.quiz_num==0){                    
                    main_obj.guide.show_guide();
                    //main_obj.main_intro.show_intro();
                    //main_obj.top_menu.pageInfo[0]=true;
                    main_obj.top_menu.set_TopMenu();
                }
                break;
            case "intro":
                    main_obj.main_intro.show_intro();
                    main_obj.top_menu.pageInfo[0]=true;
                    main_obj.top_menu.set_TopMenu();
                break;
            case "quiz":
                main_obj.top_menu.pageInfo[main_obj.quiz_num]=true;
                main_obj.top_menu.set_TopMenu();
                if(main_obj.quiz_num==1){
                    main_obj.quiz01.show_intro();
                    // main_obj.quiz01.show_quiz();
                    // main_obj.quiz01.show_result();
                }else if(main_obj.quiz_num==2){
                    main_obj.quiz02.show_intro();
                    //main_obj.quiz02.show_quiz();
                    //main_obj.quiz02.show_result();
                }else if(main_obj.quiz_num==3){
                    main_obj.quiz03.show_intro();
                    //main_obj.quiz03.show_quiz();
                    //main_obj.quiz03.show_result();
                }
                break;
            case "result":
                main_obj.top_menu.pageInfo[main_obj.quiz_num]=true;
                main_obj.top_menu.set_TopMenu();
                main_obj.result.show_result();
                break;
        }        
    }

    static crtEl(val, name) {
        var dom = document.createElement(val);
        dom.className = name;
        return dom;
    }
    static isMobile() {
        return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    }
    static isIOS() {
        return /iPhone|iPad|iPod/i.test(navigator.userAgent);
    }
    static isIPad() {
        return /iPad|Macintosh/.test(navigator.userAgent) && navigator.maxTouchPoints > 1;
    }
    constructor() {
        this.top_menu = new Top();
        this.pop_msg = new pop_MSG();
        this.guide = new Guide();
        this.audio = new Audio();
        this.loadimg = new loadIMG();
        this.setting = new Setting();
        this.dataService = new DataService();
        this.main_intro = new main_Intro();
        this.quiz01 = new Quiz_01();
        this.quiz02 = new Quiz_02();
        this.quiz03 = new Quiz_03();
        this.result = new Result();
        this.temp = new gsap_Template();

        this.stormStart = document.getElementById("stormStart");
        this.stormPlayer = document.getElementById("stormPlayer");
        this.cnt_resize = document.getElementById("cnt_resize");
        
        //콘텐츠 영역
        this.main_cnt = document.getElementById("main_cnt");

        //비디오 경로 설정
        this.video_src="./common/mp4/";

        //퀴즈 정보
        this.quiz_info={
            "q1":{
                answer:"F",
                chance:2,
                input_result:"",
                st_time:0,
                ed_time:0,
                answer_num:2
            },
            "q2":{
                answer:"F",
                chance:2,
                input_result:"",
                st_time:0,
                ed_time:0,   
                answer_num:"2|4"
            },
            "q3":{
                answer:"F",
                chance:2,
                input_result:"",
                st_time:0,
                ed_time:0,   
                answer_num:1
            }
        }
        //퀴즈 정보 백업
        this.quiz_info_bak = structuredClone(this.quiz_info);
        
        //퀴즈 문제 번호
        this.quiz_num=0;

        //학습 스타트 모드
        //this.mode="web";
        this.mode="local";

        //처음 페이지 확인
        this.st_page=true;

        //타임라인 객체
        this.main_tl;

        //Howl 음성 객체
        this.howl_na;
        //Howl 효과음 객체
        this.howl_ef;
        //Howl bgm 객체
        this.howl_bgm;
        //상단 뮤트 상태
        this.st_mute=false

        /*251024 로딩에서 사용*/
        this.counter= { value: 0 };     
        
        //이벤트 등록
        this.listeners = [];

        //모션 객체
        this.motion=[];
    }
    async init(){
        let main_obj=this;        

        //페이지 진입 화면
        main_obj.init_start();        
        
        if(quiz_Main.isMobile()){
            if(quiz_Main.isIOS()){
                main_obj.stormPlayer.classList.add("storm_IOS_mobile");
            }else{
                main_obj.stormPlayer.classList.add("storm_mobile");
            }
        }else{
            main_obj.stormPlayer.classList.add("storm_main");
        }
        
        //상단 메뉴 준비
        main_obj.top_menu.init();

        //팝업 메세지 준비
        main_obj.pop_msg.init();

        if(main_obj.mode=="web"){
            main_obj.dataService.LMS_data("load");
            
            //*PostMessage Receiver 이벤트 등록
            window.addEventListener("message",main_obj.dataService.Message.Receiver,false);
        }
    }


    async init_load(){
        let main_obj=this;
        let bgm,bgm_arr;

        bgm_arr=structuredClone(main_obj.audio.bgm_list);
        
        bgm=bgm_arr[main_obj.quiz_num];
        bgm_arr.splice(main_obj.quiz_num,1);

        //시작 화면 확인
        main_obj.st_page=false;

        /*251024 로딩 순서 변경. 로딩 추가*/            
        await main_obj.audio.init_bgm();         
        main_obj.audio.load_bgm(bgm);

        await gsap.to(main_obj.stormStart, {width:0, opacity: 0, duration: 0.5, ease: "power1.out",onStart:function(){
            main_obj.stormStart.children[0].style.display="none";
        }});   
        main_obj.top_menu.fullScreen();
        main_obj.stormStart.style.display="none"; 
        await gsap.to(main_obj.stormPlayer, {opacity: 1, duration: 0.5, ease: "power1.out",onStart:function(){
            main_obj.stormPlayer.style.display="flex";
            main_obj.audio.play_ef('ef_button');
        }});           

        //이미지 로드
        await main_obj.loadimg.init();
        main_obj.loadimg.preload_IMG=true;
        await quiz_Main.updatePercent2(30);

        //오디오 로드
        await main_obj.audio.init_na();
        await quiz_Main.updatePercent2(80);

        //셋팅화면 준비
        await main_obj.setting.init();
        
        //가이드 준비
        await main_obj.guide.init();

        //인트로 준비
        await main_obj.main_intro.init();
        
        //01화면 준비
        await main_obj.quiz01.init();
        //02화면 준비
        await main_obj.quiz02.init();
        //03화면 준비
        await main_obj.quiz03.init();

        //결과화면 준비
        await main_obj.result.init();

        //셋팅 초기화
        await main_obj.setting.reset();

        //로딩 완료
        await quiz_Main.updatePercent2(100); 

        for(let i=0;i<bgm_arr.length;i++){
            main_obj.audio.load_bgm(bgm_arr[i]);
        }
        main_obj.audio.preload_bgm=true;
        
        main_obj.main_cnt.style.backgroundColor="rgba(0,0,0,1)";        
        quiz_Main.responsive();

        if(main_obj.quiz_num==0){
            quiz_Main.show_page("main");
        }else {
            if(main_obj.quiz_num==Object.keys(main_obj.quiz_info).length+1){
                quiz_Main.show_page("result");
            }else{
                quiz_Main.show_page("quiz");
            }
        }     
    }
    async init_start(){
        let main_obj=this;
        let start_button,title;
        start_button=quiz_Main.crtEl("div","start_button");
        start_button.classList.add("ef_btn");
        main_obj.stormStart.appendChild(start_button);

        await main_obj.audio.init_ef();

        start_button.addEventListener('click',async ()=>{
            main_obj.audio.play_ef("ef_button");
            if(main_obj.mode=="web"){
                if(main_obj.quiz_num!=0 && Object.keys(main_obj.quiz_info).length+1>main_obj.quiz_num){
                    gsap.to(main_obj.pop_msg.msg_load, {
                        opacity: 1, duration: 0.5, ease: "none", onStart: function () {
                            main_obj.pop_msg.msg_load.style.display = "block";
                        }
                    })
                }else{
                    main_obj.init_load();
                }
            }else{
                main_obj.init_load();
            }
            
        });
        //페이지 진입시 추가로 팝업창 생겨서 사이즈 조절
        if(main_obj.st_page==true){
            quiz_Main.responsive();
        }          
    }
}

window.addEventListener('resize', () => {
    quiz_Main.responsive();
});

document.addEventListener('DOMContentLoaded', () => {
    if(quiz_Main.isIOS()){ //아이폰에서 주소창 때문에 화면 가려지는 문제 해결
        let vh = 0;
        vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }  
    quiz_Main.getInstance().init();
});

export {quiz_Main};