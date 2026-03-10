import { quiz_Main } from './storm_init.js';

export class main_Intro {
    constructor() {
        //들어가기
        this.intro;

        //dom 객체
        this.domNodes = {};
        //this.domNodes.intro, this.domNodes["intro"]
    }
    //들어가기
    async init() {
        let _this = this;

        _this.intro = quiz_Main.crtEl('div', 'intro');

        //인트로
        await _this.init_intro();

        quiz_Main.getInstance().main_cnt.appendChild(_this.intro);
    }

    async init_intro() {
        let main_obj = quiz_Main.getInstance();
        let _this = this;
        let _key = "intro";

        //오브젝트 생성 및 등록        
        let obj = _this.domNodes[_key] = {};
        obj.intro = _this.intro;

        //씬1
        obj.scene1 = quiz_Main.crtEl('div', 'scene1');
        obj.scene1_bg = obj.scene1.appendChild(quiz_Main.crtEl('div', 'scene1_bg'));
        obj.scene1_npc1 = obj.scene1.appendChild(quiz_Main.crtEl('div', 'scene1_npc1'));
        obj.scene1_npc2 = obj.scene1.appendChild(quiz_Main.crtEl('div', 'scene1_npc2'));
        obj.scene1_npc3 = obj.scene1.appendChild(quiz_Main.crtEl('div', 'scene1_npc3'));

        obj.scene1_msg1 = obj.scene1.appendChild(quiz_Main.crtEl('div', 'scene1_msg1'));

        obj.scene1_npc_txt1 = obj.scene1.appendChild(quiz_Main.crtEl('div', 'scene1_npc_txt1'));
        obj.scene1_npc_txt2 = obj.scene1.appendChild(quiz_Main.crtEl('div', 'scene1_npc_txt2'));
        obj.scene1_npc_txt3 = obj.scene1.appendChild(quiz_Main.crtEl('div', 'scene1_npc_txt3'));
        obj.scene1_npc_txt4 = obj.scene1.appendChild(quiz_Main.crtEl('div', 'scene1_npc_txt4'));
        obj.scene1_npc_txt5 = obj.scene1.appendChild(quiz_Main.crtEl('div', 'scene1_npc_txt5'));
        obj.scene1_npc_txt6 = obj.scene1.appendChild(quiz_Main.crtEl('div', 'scene1_npc_txt6'));
        obj.intro.appendChild(obj.scene1);

        //씬2
        obj.scene2 = quiz_Main.crtEl('div', 'scene2');
        obj.scene2_bg = obj.scene2.appendChild(quiz_Main.crtEl('div', 'scene2_bg'));
        obj.scene2_npc1 = obj.scene2.appendChild(quiz_Main.crtEl('div', 'scene2_npc1'));
        obj.scene2_npc2 = obj.scene2.appendChild(quiz_Main.crtEl('div', 'scene2_npc2'));
        obj.scene2_npc3 = obj.scene2.appendChild(quiz_Main.crtEl('div', 'scene2_npc3'));

        obj.scene2_npc_txt1 = obj.scene2.appendChild(quiz_Main.crtEl('div', 'scene2_npc_txt1'));
        obj.scene2_npc_txt2 = obj.scene2.appendChild(quiz_Main.crtEl('div', 'scene2_npc_txt2'));
        obj.scene2_npc_txt3 = obj.scene2.appendChild(quiz_Main.crtEl('div', 'scene2_npc_txt3'));
        obj.scene2_btn_next = obj.scene2.appendChild(quiz_Main.crtEl('div', 'scene2_btn_next ef_btn'));
        obj.intro.appendChild(obj.scene2);

        //스킵 버튼
        obj.btn_skip = obj.intro.appendChild(quiz_Main.crtEl('div', 'btn_skip'));

        //스킵, 계속하기 이벤트
        Array.from([obj.scene2_btn_next, obj.btn_skip]).forEach((child) => {
            child.addEventListener('click', () => {
                child.style.pointerEvents = "none";
                main_obj.audio.na_current?.stop();
				/*타일라인 삭제*/
				if (main_obj.main_tl != null) {
					main_obj.main_tl.kill();
					main_obj.main_tl = null;
				}

                main_obj.audio.play_ef('ef_button');
                quiz_Main.reset_cnt();
                main_obj.quiz_num = 1;
                quiz_Main.show_page("quiz");
            })
        })
    }

    show_intro() {
        let main_obj = quiz_Main.getInstance();
        let _this = this;
        let _key = "intro";

        //오브젝트 참조  
        let obj = _this.domNodes[_key];

        //bgm제어
        main_obj.howl_bgm?.stop();
        main_obj.audio.play_bgm("bgm_intro");


        /*타일라인 삭제*/
        if (main_obj.main_tl != null) {
            main_obj.main_tl.kill();
            main_obj.main_tl = null;
        }
        //타임라인 초기화
        main_obj.main_tl = gsap.timeline({ defaults: { ease: "power1.out" } });

        //초기 화면 준비
        _this.intro.style.display = "block";
        obj.scene1.style.display = "block";
        obj.btn_skip.style.display = "block";
        //타임라인 등록        
        main_obj.temp.to_temp([_this.intro, obj.scene1, obj.btn_skip], { opacity: 1 });
        main_obj.main_tl.call(() => {
            obj.scene1_npc1.style.marginLeft = "-70px";
            obj.scene1_npc2.style.marginLeft = "70px";

            obj.scene1_npc1.style.display = "block";
            obj.scene1_npc2.style.display = "block";

            obj.scene1_npc_txt1.style.display = "block";
        })
        //npc등장
        main_obj.temp.to_temp([obj.scene1_npc1, obj.scene1_npc2], { margin: "0px", opacity: 1 });

        //대사 시작
        main_obj.temp.to_temp([obj.scene1_npc_txt1], { opacity: 1 }, "", "Hs_chi_02_01_01");
        main_obj.temp.to_temp([obj.scene1_npc_txt1], { opacity: 0 });
        main_obj.main_tl.call(() => {
            obj.scene1_npc_txt1.style = "";
            obj.scene1_npc_txt2.style.display = "block";
        })

        main_obj.temp.to_temp([obj.scene1_npc_txt2], { opacity: 1 }, "", "Hs_chi_02_01_02_1");
        main_obj.main_tl.call(() => {
            obj.scene1_msg1.style.display = "block";

            main_obj.audio.play_ef('ef_msg');
        })
        main_obj.temp.to_temp([obj.scene1_msg1], { opacity: 1 }, "", "Hs_chi_02_01_02_2");

        main_obj.temp.to_temp([obj.scene1_npc_txt2], { opacity: 0 });
        main_obj.main_tl.call(() => {
            obj.scene1_npc_txt2.style = "";
            obj.scene1_npc_txt3.style.display = "block";
        })

        main_obj.temp.to_temp([obj.scene1_npc_txt3], { opacity: 1 }, "", "Hs_chi_02_01_03");
        main_obj.temp.to_temp([obj.scene1_npc_txt3], { opacity: 0 });
        main_obj.main_tl.call(() => {
            obj.scene1_npc_txt3.style = "";
            obj.scene1_npc_txt4.style.display = "block";
        })


        main_obj.temp.to_temp([obj.scene1_npc_txt4], { opacity: 1 }, "", "Hs_chi_02_01_04");
        main_obj.temp.to_temp([obj.scene1_npc_txt4], { opacity: 0 });
        main_obj.main_tl.call(() => {
            obj.scene1_npc_txt4.style = "";
            obj.scene1_npc_txt5.style.display = "block";

            //npc교체 준비
            obj.scene1_npc3.style.display = "block";
        })
        //npc교체
        main_obj.temp.to_temp([obj.scene1_npc3], { opacity: 1, duration: 0.2 });
        main_obj.main_tl.call(() => {
            obj.scene1_npc2.style = "";
        })
        main_obj.temp.to_temp([obj.scene1_npc_txt5], { opacity: 1 }, "", "Hs_chi_02_01_05");
        main_obj.temp.to_temp([obj.scene1_npc_txt5], { opacity: 0 });
        main_obj.main_tl.call(() => {
            obj.scene1_npc_txt5.style = "";
            obj.scene1_npc_txt6.style.display = "block";
        })

        main_obj.temp.to_temp([obj.scene1_npc_txt6], { opacity: 1 }, "", "Hs_chi_02_01_06");
        main_obj.main_tl.call(() => {
            //씬2 준비
            obj.scene2.style.display = "block";
            obj.scene2_npc1.style.display = "block";
            obj.scene2_npc1.style.opacity = "1";

            main_obj.audio.play_ef('ef_show');
        })

        main_obj.temp.to_temp([obj.scene2], { opacity: 1 });
        main_obj.main_tl.call(() => {
            //씬1 마무리
            obj.scene1_npc_txt6.style = "";
            obj.scene1.style.display = "none";


            obj.scene2_npc2.style.marginLeft = "70px";
            obj.scene2_npc3.style.marginLeft = "70px";

            obj.scene2_npc2.style.display = "block";
            obj.scene2_npc3.style.display = "block";
        })

        main_obj.temp.to_temp([obj.scene2_npc2, obj.scene2_npc3], { margin: "0px", opacity: 1 });
        main_obj.main_tl.call(() => {
            obj.scene2_npc_txt1.style.display = "block";
        })


        main_obj.temp.to_temp([obj.scene2_npc_txt1], { opacity: 1 }, "", "Hs_chi_02_01_07");
        main_obj.temp.to_temp([obj.scene2_npc_txt1], { opacity: 0 });
        main_obj.main_tl.call(() => {
            obj.scene2_npc_txt1.style = "";
            obj.scene2_npc_txt2.style.display = "block";
        })


        main_obj.temp.to_temp([obj.scene2_npc_txt2], { opacity: 1 }, "", "Hs_chi_02_01_08");
        main_obj.temp.to_temp([obj.scene2_npc_txt2], { opacity: 0 });
        main_obj.main_tl.call(() => {
            obj.scene2_npc_txt2.style = "";
            obj.scene2_npc_txt3.style.display = "block";
        })

        main_obj.temp.to_temp([obj.scene2_npc_txt3], { opacity: 1 }, "", "Hs_chi_02_01_09");
        main_obj.main_tl.call(() => {
            if (main_obj.main_tl != null) main_obj.main_tl.pause();

            main_obj.audio.play_na("Hs_chi_02_01_10").then(() => {
                if (main_obj.main_tl != null) {
                    main_obj.main_tl.play();
                }
            });
        })

        main_obj.main_tl.call(() => {
            //스킵 비활성화
            obj.btn_skip.style = "";

            //계속하기 버튼 준비
            obj.scene2_btn_next.style.display = "block";
        })
        //계속하기 버튼 활성화
        main_obj.temp.to_temp([obj.scene2_btn_next], { opacity: 1 });
    }
}

