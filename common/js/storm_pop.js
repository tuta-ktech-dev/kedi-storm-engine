import { quiz_Main } from './storm_init.js';
/*팝업 메세지 창*/
export class pop_MSG {
    constructor() {
        this.msg_load;
        this.msg_newBox;
        this.msg_exit;
        this.btn_exit=document.getElementsByClassName("btn_exit")[0];
    }
    async init() {
        let main_pop=this;

        //이어하기 팝업
        main_pop.msg_load=quiz_Main.crtEl("div","msg_load");
        main_pop.msg_load.appendChild(quiz_Main.crtEl("div","btn_load"));        
        main_pop.msg_load.appendChild(quiz_Main.crtEl("div","btn_new"));
        main_pop.msg_load.children[0].appendChild(quiz_Main.crtEl("div","btn_cursor"));
        main_pop.msg_load.children[1].appendChild(quiz_Main.crtEl("div","btn_cursor"));

        quiz_Main.getInstance().stormStart.appendChild(main_pop.msg_load);

        //확인 팝업
        main_pop.msg_newBox=quiz_Main.crtEl("div","msg_newBox");
        main_pop.msg_newBox.appendChild(quiz_Main.crtEl("div","btn_y"));        
        main_pop.msg_newBox.appendChild(quiz_Main.crtEl("div","btn_no"));
        main_pop.msg_newBox.children[0].appendChild(quiz_Main.crtEl("div","btn_cursor"));
        main_pop.msg_newBox.children[1].appendChild(quiz_Main.crtEl("div","btn_cursor"));

        quiz_Main.getInstance().stormStart.appendChild(main_pop.msg_newBox);

        //상단 x버튼 팝업
        main_pop.msg_exit=quiz_Main.crtEl("div","msg_exit");
        main_pop.msg_exit.appendChild(quiz_Main.crtEl("div","btn_y"));        
        main_pop.msg_exit.appendChild(quiz_Main.crtEl("div","btn_no"));
        main_pop.msg_exit.children[0].appendChild(quiz_Main.crtEl("div","btn_cursor"));
        main_pop.msg_exit.children[1].appendChild(quiz_Main.crtEl("div","btn_cursor"));

        quiz_Main.getInstance().cnt_resize.appendChild(main_pop.msg_exit);    
        
        //이벤트 등록
        main_pop.pop_event();
    }
    pop_event(){
        let main_pop=this;
        let main_obj=quiz_Main.getInstance();
        //========상단 x 버튼==============
        main_pop.btn_exit.addEventListener('click',()=>{
            main_obj.audio.play_ef('ef_button', main_obj.ef_vol);
            main_pop.msg_exit.style.display="flex";
        })
        main_pop.btn_exit.addEventListener('mouseenter',function(){
            this.children[1].classList.add("on");
            this.children[1].style.display="flex";
        })
        main_pop.btn_exit.addEventListener('mouseleave',function(){
            this.children[1].classList.remove("on");
            this.children[1].style.display="none";
        })
        main_pop.btn_exit.appendChild(quiz_Main.crtEl('div','tooltip'));
        main_pop.btn_exit.children[1].textContent="학습 종료";

        // 종료 버튼 예 클릭
        main_pop.msg_exit.children[0].addEventListener('click',function(){
            main_obj.audio.play_ef('ef_button', main_obj.ef_vol);
            quiz_Main.reset_all();
        })
        // 종료 버튼 아니요 클릭
        main_pop.msg_exit.children[1].addEventListener('click',function(){
            main_obj.audio.play_ef('ef_button', main_obj.ef_vol);
            main_pop.msg_exit.style.display="none";
        })

        //========이어하기 팝업==============
        main_pop.msg_load.children[0].addEventListener('click',()=>{
            main_obj.audio.play_ef('ef_button');
            gsap.to(main_pop.msg_load, {opacity:0, duration: 0.5,ease :"power1.out",onComplete:function(){
                main_pop.msg_load.style.display="none";
                //이어하기
                //quiz_Main.show_page("quiz");
                quiz_Main.getInstance().init_load();
            }})
        })
        //========처음부터 팝업==============
        main_pop.msg_load.children[1].addEventListener('click',()=>{
            main_obj.audio.play_ef('ef_button');
            //처음부터 다시하기
            gsap.to(main_pop.msg_newBox, {opacity:1, duration: 0.5,ease :"power1.out",onStart:function(){
                main_pop.msg_newBox.style.display="block";
            }})
        })
        main_pop.msg_newBox.children[0].addEventListener('click',()=>{
            main_obj.audio.play_ef('ef_button');
            main_obj.quiz_num=0;
            //데이터 초기화
            if(main_obj.mode=="web"){
                quiz_Main.getInstance().dataService.LMS_data("reset");
            }
            gsap.to([main_pop.msg_load,main_pop.msg_newBox], {opacity:0, duration: 0.5,ease :"power1.out",onComplete:function(){
                main_pop.msg_newBox.style="";
                main_pop.msg_load.style="";
                quiz_Main.reset_all();
                quiz_Main.getInstance().init_load();
            }})
        })
        main_pop.msg_newBox.children[1].addEventListener('click',()=>{
            main_obj.audio.play_ef('ef_button', main_obj.ef_vol);
            gsap.to(main_pop.msg_newBox, {opacity:0, duration: 0.5,ease :"power1.out",onComplete:function(){
                main_pop.msg_newBox.style.display="none";
            }})
        })        
    }
}

