import { quiz_Main } from './storm_init.js';

export class Result {
    constructor() {
        //마무리
        this.result;

        //dom 객체
        this.domNodes = {};
        //this.domNodes.result, this.domNodes["result"]
    }

    //들어가기
    async init() {
        let _this = this;

        _this.result = quiz_Main.crtEl('div', 'result');

        //결과화면 준비
        await _this.init_result();

        quiz_Main.getInstance().main_cnt.appendChild(_this.result);
    }


    async init_result() {
        let main_obj = quiz_Main.getInstance();
        let _this = this;

        //오브젝트 생성 및 등록        
        let obj = _this.domNodes = {};
        obj.result = _this.result;

        obj["txt_obj"] = {
            "0": [
                "잊힌 한문을 되살리는 데 실패하였습니다.",
                "당신의 뒤를 이어 한문의 깊은 의미와 가치를 아는 누군가가<br>다시 도전하기를!"
            ],
            "1": [
                "잊힌 한문을 되살리는 데 실패하였습니다.",
                "당신의 뒤를 이어 한문의 깊은 의미와 가치를 아는 누군가가<br>다시 도전하기를!"
            ],
            "2": [
                "잊힌 한문을 사람들이 주목하기 시작했어요!",
                "점점 더 많은 사람들이 성어의 뜻과 의미에<br>관심을 가질 수 있을 거예요!"
            ],
            "3": [
                "잊힌 한문을 되살리는 데 성공했습니다!",
                "많은 사람들이 성어의 의미와 선인들의 삶의 지혜에<br>관심을 가지기 시작했어요!"
            ]
        };

        obj.result_bg = obj.result.appendChild(quiz_Main.crtEl('div', 'result_bg'));
        obj.result_bg2 = obj.result.appendChild(quiz_Main.crtEl('div', 'result_bg2'));
        obj.paper = obj.result.appendChild(quiz_Main.crtEl('div', 'paper'));
        obj.result_txt1 = obj.paper.appendChild(quiz_Main.crtEl("div", "result_txt1"));
        obj.result_txt2 = obj.paper.appendChild(quiz_Main.crtEl("div", "result_txt2"));

        for (let i = 1; i <= Object.keys(main_obj.quiz_info).length; i++) {
            let name = "act" + i;
            obj[name] = obj.result.appendChild(quiz_Main.crtEl("div", name));
            obj[name].appendChild(quiz_Main.crtEl('div', 'res_ck_o'));
            obj[name].appendChild(quiz_Main.crtEl('div', 'res_ck_x'));
        }


        obj.result_scene1 = obj.result.appendChild(quiz_Main.crtEl("div", "result_scene1"));
        obj.scene1_npc1 = obj.result_scene1.appendChild(quiz_Main.crtEl("div", "scene1_npc1"));
        obj.scene1_npc2 = obj.result_scene1.appendChild(quiz_Main.crtEl("div", "scene1_npc2"));
        obj.scene1_npc_txt1 = obj.result_scene1.appendChild(quiz_Main.crtEl("div", "scene1_npc_txt1"));
        obj.scene1_npc_txt2 = obj.result_scene1.appendChild(quiz_Main.crtEl("div", "scene1_npc_txt2"));
        obj.scene1_npc_txt3 = obj.result_scene1.appendChild(quiz_Main.crtEl("div", "scene1_npc_txt3"));
        obj.scene1_npc_txt4 = obj.result_scene1.appendChild(quiz_Main.crtEl("div", "scene1_npc_txt4"));

        obj.result_scene2 = obj.result.appendChild(quiz_Main.crtEl("div", "result_scene2"));
        obj.scene2_npc1 = obj.result_scene2.appendChild(quiz_Main.crtEl("div", "scene2_npc1"));
        obj.scene2_npc2 = obj.result_scene2.appendChild(quiz_Main.crtEl("div", "scene2_npc2"));
        obj.scene2_npc_txt1 = obj.result_scene2.appendChild(quiz_Main.crtEl("div", "scene2_npc_txt1"));
        obj.scene2_npc_txt2 = obj.result_scene2.appendChild(quiz_Main.crtEl("div", "scene2_npc_txt2"));


        obj.result_scene3 = obj.result.appendChild(quiz_Main.crtEl("div", "result_scene3"));
        obj.scene3_npc1 = obj.result_scene3.appendChild(quiz_Main.crtEl("div", "scene3_npc1"));
        obj.scene3_npc2 = obj.result_scene3.appendChild(quiz_Main.crtEl("div", "scene3_npc2"));
        obj.scene3_npc_txt1 = obj.result_scene3.appendChild(quiz_Main.crtEl("div", "scene3_npc_txt1"));
        obj.scene3_npc_txt2 = obj.result_scene3.appendChild(quiz_Main.crtEl("div", "scene3_npc_txt2"));

        obj.btn_re = obj.result.appendChild(quiz_Main.crtEl("div", "btn_re ef_btn"));
        obj.btn_exit = obj.result.appendChild(quiz_Main.crtEl("div", "btn_exit ef_btn"));


        obj.btn_re.addEventListener('click', () => {
            /*251024 처음부터 버튼 누를경우*/
            main_obj.audio.play_ef("ef_button");
            obj.btn_re.style.pointerEvents = "none";
            main_obj.quiz_num = 0;
            quiz_Main.reset_cnt();
            main_obj.quiz_info = main_obj.quiz_info_bak;
            quiz_Main.show_page("intro");

            //lms 진도율 초기화
            if (main_obj.mode == "web") {
                main_obj.dataService.LMS_data("reset");
            }
        })
        obj.btn_exit.addEventListener('click', () => {
            main_obj.audio.play_ef("ef_button");
            obj.btn_exit.style.pointerEvents = "none";
            main_obj.pop_msg.msg_exit.style.display = "flex";
        })
    }

    async show_result() {
        let main_obj = quiz_Main.getInstance();
        let _this = this;

        //오브젝트 참조  
        let obj = _this.domNodes;

        //초기 화면
        let count = 0;
        for (let i = 1; i <= Object.keys(main_obj.quiz_info).length; i++) {
            let info = main_obj.quiz_info["q" + i].answer;
            let res_chk = obj["act" + i];
            if (info == "T") {
                count++;
                res_chk.children[0].style.opacity = 1;
            } else {
                res_chk.children[1].style.opacity = 1;
            }
        }
        obj.result_txt1.innerHTML = obj.txt_obj[count][0];
        obj.result_txt2.innerHTML = obj.txt_obj[count][1];

        obj.result.style.display = "block";

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

        //타임라인 등록        
        main_obj.temp.to_temp([obj.result], { opacity: 1 });
        main_obj.main_tl.call(() => {
            obj.result_bg2.style.display = "block";
        })
        main_obj.temp.to_temp([obj.result_bg2], { opacity: 1 });
        main_obj.main_tl.call(() => {
            obj.paper.style.display = "block";
            obj.paper.style.marginTop = "50px";
        })
        main_obj.temp.to_temp([obj.paper], { opacity: 1, margin: "0px" });

        main_obj.main_tl.call(() => {
            obj["act1"].style.display = "block";
            obj["act2"].style.display = "block";
            obj["act3"].style.display = "block";
            obj.result_txt1.style.display = "block";
            obj.result_txt2.style.display = "block";
            obj.btn_re.style.display = "block";
            obj.btn_exit.style.display = "block";

        })
        main_obj.temp.to_temp([obj["act1"], obj["act2"], obj["act3"], obj.result_txt1, obj.result_txt2, obj.btn_re, obj.btn_exit], { opacity: 1 });

        if (count == 0 || count == 1) {
            obj.result_scene1.style.display = "block";

            main_obj.main_tl.call(() => {
                obj.scene1_npc1.style.display = "block";
                obj.scene1_npc2.style.display = "block";

                obj.scene1_npc1.style.marginLeft = "-70px";
                obj.scene1_npc2.style.marginLeft = "70px";

                obj.scene1_npc_txt1.style.display = "block";
            })
            main_obj.temp.to_temp([obj.scene1_npc1, obj.scene1_npc2], { opacity: 1, margin: "0px" });
            main_obj.temp.to_temp([obj.scene1_npc_txt1], { opacity: 1 }, "", "HS_chi_02_05_03_01");
            main_obj.temp.to_temp([obj.scene1_npc_txt1], { opacity: 0 });
            main_obj.main_tl.call(() => {
                obj.scene1_npc_txt1.style = "";
                obj.scene1_npc_txt2.style.display = "block";
            })

            main_obj.temp.to_temp([obj.scene1_npc_txt2], { opacity: 1 }, "", "Hs_chi_02_05_03_02");
            main_obj.temp.to_temp([obj.scene1_npc_txt2], { opacity: 0 });
            main_obj.main_tl.call(() => {
                obj.scene1_npc_txt2.style = "";
                obj.scene1_npc_txt3.style.display = "block";
            })

            main_obj.temp.to_temp([obj.scene1_npc_txt3], { opacity: 1 }, "", "Hs_chi_02_05_03_03");
            main_obj.temp.to_temp([obj.scene1_npc_txt3], { opacity: 0 });
            main_obj.main_tl.call(() => {
                obj.scene1_npc_txt3.style = "";
                obj.scene1_npc_txt4.style.display = "block";
            })

            main_obj.temp.to_temp([obj.scene1_npc_txt4], { opacity: 1 }, "", "Hs_chi_02_05_03_04");

        } else if (count == 2) {
            obj.result_scene2.style.display = "block";

            main_obj.main_tl.call(() => {
                obj.scene2_npc1.style.display = "block";
                obj.scene2_npc2.style.display = "block";

                obj.scene2_npc1.style.marginLeft = "-70px";
                obj.scene2_npc2.style.marginLeft = "70px";

                obj.scene2_npc_txt1.style.display = "block";
            })
            main_obj.temp.to_temp([obj.scene2_npc1, obj.scene2_npc2], { opacity: 1, margin: "0px" });
            main_obj.temp.to_temp([obj.scene2_npc_txt1], { opacity: 1 }, "", "Hs_chi_02_05_02_01");
            main_obj.temp.to_temp([obj.scene2_npc_txt1], { opacity: 0 });
            main_obj.main_tl.call(() => {
                obj.scene2_npc_txt1.style = "";
                obj.scene2_npc_txt2.style.display = "block";
            })

            main_obj.temp.to_temp([obj.scene2_npc_txt2], { opacity: 1 }, "", "Hs_chi_02_05_02_02");
        } else if (count == 3) {
            obj.result_scene3.style.display = "block";


            main_obj.main_tl.call(() => {
                obj.scene3_npc1.style.display = "block";
                obj.scene3_npc2.style.display = "block";

                obj.scene3_npc1.style.marginLeft = "-70px";
                obj.scene3_npc2.style.marginLeft = "70px";

                obj.scene3_npc_txt1.style.display = "block";
            })
            main_obj.temp.to_temp([obj.scene3_npc1, obj.scene3_npc2], { opacity: 1, margin: "0px" });

            main_obj.temp.to_temp([obj.scene3_npc_txt1], { opacity: 1 }, "", "Hs_chi_02_05_01_01");
            main_obj.temp.to_temp([obj.scene3_npc_txt1], { opacity: 0 });
            main_obj.main_tl.call(() => {
                obj.scene3_npc_txt1.style = "";
                obj.scene3_npc_txt2.style.display = "block";
            })

            main_obj.temp.to_temp([obj.scene3_npc_txt2], { opacity: 1 }, "", "Hs_chi_02_05_01_02");
        }
    }
}