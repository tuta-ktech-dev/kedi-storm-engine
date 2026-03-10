import { quiz_Main } from './storm_init.js';

export class Quiz_01 {
    constructor() {
        //활동1
        this.cntID = "cnt01"
        this.dataID = "q1";

        //dom 객체
        this.domNodes = {};
        //this.domNodes.intro, this.domNodes.quiz, this.domNodes.result
        //this.domNodes["intro"], this.domNodes["quiz"], this.domNodes["result"]

        this.answer = null; // "T" or "F"
        this.chance = 2;
        this.select_bogi = null;
    }

    //퀴즈1
    async init() {
        let _this = this;

        _this.cnt = quiz_Main.crtEl('div', _this.cntID);

        //인트로
        await _this.init_intro();

        //퀴즈
        await _this.init_quiz();

        //결과
        await _this.init_result();

        quiz_Main.getInstance().main_cnt.appendChild(_this.cnt);
    }
    //인트로
    async init_intro() {
        let main_obj = quiz_Main.getInstance();
        let _this = this;
        let _key = "intro";

        //오브젝트 생성 및 등록        
        let obj = _this.domNodes[_key] = {};
        obj.intro = quiz_Main.crtEl('div', 'intro');

        //씬1
        obj.scene1 = quiz_Main.crtEl('div', 'scene1');
        obj.scene1_bg = obj.scene1.appendChild(quiz_Main.crtEl('div', 'scene1_bg'));
        obj.scene1_title = obj.scene1.appendChild(quiz_Main.crtEl('div', 'scene1_title'));
        obj.scene1_npc1 = obj.scene1.appendChild(quiz_Main.crtEl('div', 'scene1_npc1'));
        obj.scene1_npc2 = obj.scene1.appendChild(quiz_Main.crtEl('div', 'scene1_npc2'));
        obj.scene1_npc_txt1 = obj.scene1.appendChild(quiz_Main.crtEl('div', 'scene1_npc_txt1'));
        obj.scene1_npc_txt2 = obj.scene1.appendChild(quiz_Main.crtEl('div', 'scene1_npc_txt2'));
        obj.scene1_npc_txt3 = obj.scene1.appendChild(quiz_Main.crtEl('div', 'scene1_npc_txt3'));
        obj.intro.appendChild(obj.scene1);

        //씬2
        obj.scene2 = quiz_Main.crtEl('div', 'scene2');
        obj.scene2_bg = obj.scene2.appendChild(quiz_Main.crtEl('div', 'scene2_bg'));

        //씬 종이1
        obj.scene2_paper1 = obj.scene2.appendChild(quiz_Main.crtEl('div', 'scene2_paper1'));
        obj.scene2_paper1_title = obj.scene2_paper1.appendChild(quiz_Main.crtEl('div', 'scene2_paper1_title'));
        obj.scene2_paper1_txt1 = obj.scene2_paper1.appendChild(quiz_Main.crtEl('div', 'scene2_paper1_txt1'));
        obj.scene2_paper1_txt2 = obj.scene2_paper1.appendChild(quiz_Main.crtEl('div', 'scene2_paper1_txt2'));
        obj.scene2_paper1_txt3 = obj.scene2_paper1.appendChild(quiz_Main.crtEl('div', 'scene2_paper1_txt3'));
        obj.scene2_paper1_txt4 = obj.scene2_paper1.appendChild(quiz_Main.crtEl('div', 'scene2_paper1_txt4'));


        //씬2 종이
        obj.scene2_paper2 = obj.scene2.appendChild(quiz_Main.crtEl('div', 'scene2_paper2'));
        obj.scene2_paper2_point1 = obj.scene2_paper2.appendChild(quiz_Main.crtEl('div', 'scene2_paper2_point1'));
        obj.scene2_paper2_point2 = obj.scene2_paper2.appendChild(quiz_Main.crtEl('div', 'scene2_paper2_point2'));

        obj.scene2_npc1 = obj.scene2.appendChild(quiz_Main.crtEl('div', 'scene2_npc1'));
        obj.scene2_npc2 = obj.scene2.appendChild(quiz_Main.crtEl('div', 'scene2_npc2'));
        obj.scene2_npc3 = obj.scene2.appendChild(quiz_Main.crtEl('div', 'scene2_npc3'));
        obj.scene2_npc4 = obj.scene2.appendChild(quiz_Main.crtEl('div', 'scene2_npc4'));

        obj.scene2_npc_txt1 = obj.scene2.appendChild(quiz_Main.crtEl('div', 'scene2_npc_txt1'));
        obj.scene2_npc_txt2 = obj.scene2.appendChild(quiz_Main.crtEl('div', 'scene2_npc_txt2'));
        obj.scene2_npc_txt3 = obj.scene2.appendChild(quiz_Main.crtEl('div', 'scene2_npc_txt3'));
        obj.scene2_npc_txt4 = obj.scene2.appendChild(quiz_Main.crtEl('div', 'scene2_npc_txt4'));
        obj.scene2_npc_txt5 = obj.scene2.appendChild(quiz_Main.crtEl('div', 'scene2_npc_txt5'));
        obj.scene2_npc_txt6 = obj.scene2.appendChild(quiz_Main.crtEl('div', 'scene2_npc_txt6'));
        obj.scene2_npc_txt7 = obj.scene2.appendChild(quiz_Main.crtEl('div', 'scene2_npc_txt7'));
        obj.scene2_npc_txt8 = obj.scene2.appendChild(quiz_Main.crtEl('div', 'scene2_npc_txt8'));

        obj.intro.appendChild(obj.scene2);
        //스킵 버튼
        obj.btn_skip = obj.intro.appendChild(quiz_Main.crtEl('div', 'btn_skip'));

        //스킵 이벤트
        obj.btn_skip.addEventListener('click', () => {
            obj.btn_skip.style.pointerEvents = "none";
            main_obj.audio.play_ef('ef_button');
            main_obj.audio.na_current?.stop();
            /*타일라인 삭제*/
            if (main_obj.main_tl != null) {
                main_obj.main_tl.kill();
                main_obj.main_tl = null;
            }

            quiz_Main.reset_cnt();
            _this.show_quiz();
        })


        _this.cnt.appendChild(obj.intro);
    }
    show_intro() {
        let main_obj = quiz_Main.getInstance();
        let _this = this;
        let _key = "intro";

        //오브젝트 참조  
        let obj = _this.domNodes[_key];

        //bgm제어
        main_obj.howl_bgm?.stop();
        main_obj.audio.play_bgm("bgm_quiz");

        /*타일라인 삭제*/
        if (main_obj.main_tl != null) {
            main_obj.main_tl.kill();
            main_obj.main_tl = null;
        }

        //타임라인 초기화
        main_obj.main_tl = gsap.timeline({ defaults: { ease: "power1.out" } });

        //초기 화면 준비
        _this.cnt.style.display = "block";
        obj.intro.style.display = "block";
        obj.scene1.style.display = "block";
        obj.btn_skip.style.display = "block";

        //타임라인 등록        
        main_obj.temp.to_temp([obj.intro, obj.btn_skip], { opacity: 1 });
        main_obj.main_tl.call(() => {
            obj.scene1_title.style.display = "block";

            main_obj.audio.play_ef('ef_bubble');
        })
        main_obj.temp.to_temp([obj.scene1_title], { opacity: 1 });

        main_obj.main_tl.call(() => {
            obj.scene1_npc1.style.marginLeft = "-70px";
            obj.scene1_npc2.style.marginLeft = "70px";

            obj.scene1_npc1.style.display = "block";
            obj.scene1_npc2.style.display = "block";

            obj.scene1_npc_txt1.style.display = "block";
        })

        //npc등장
        main_obj.temp.to_temp([obj.scene1_npc1, obj.scene1_npc2], { margin: "0px", opacity: 1 });
        main_obj.main_tl.call(() => {
            //대사 준비
            obj.scene1_npc_txt1.style.display = "block";
        })
        //대사 시작
        main_obj.temp.to_temp([obj.scene1_npc_txt1], { opacity: 1 }, "", "Hs_chi_02_02_01");
        main_obj.temp.to_temp([obj.scene1_npc_txt1], { opacity: 0 });
        main_obj.main_tl.call(() => {
            obj.scene1_npc_txt1.style = "";
            obj.scene1_npc_txt2.style.display = "block";
        })

        main_obj.temp.to_temp([obj.scene1_npc_txt2], { opacity: 1 }, "", "Hs_chi_02_02_02");
        main_obj.temp.to_temp([obj.scene1_npc_txt2], { opacity: 0 });
        main_obj.main_tl.call(() => {
            obj.scene1_npc_txt2.style = "";
            obj.scene1_npc_txt3.style.display = "block";
        })

        main_obj.temp.to_temp([obj.scene1_npc_txt3], { opacity: 1 }, "", "Hs_chi_02_02_03");

        main_obj.main_tl.call(() => {
            //씬2 준비
            obj.scene2.style.display = "block";
            obj.scene2_paper1.style.display = "block";
            obj.scene2_paper1.style.marginTop = "-30px";
            main_obj.audio.play_ef("ef_phone");
        })

        main_obj.temp.to_temp([obj.scene2, obj.scene2_paper1], { opacity: 1, marginTop: "0px" });
        main_obj.main_tl.call(() => {
            //씬1 정리
            obj.scene1.style = "";

            //신문1, 지문시작
            obj.scene2_paper1_txt1.style.display = "block";
        })
        main_obj.temp.to_temp([obj.scene2_paper1_txt1], { opacity: 1 }, "", "Hs_chi_02_02_03n_1");
        main_obj.main_tl.call(() => {
            obj.scene2_paper1_txt2.style.display = "block";
        })
        main_obj.temp.to_temp([obj.scene2_paper1_txt2], { opacity: 1 }, "", "Hs_chi_02_02_03n_2");
        main_obj.main_tl.call(() => {
            obj.scene2_paper1_txt3.style.display = "block";
        })
        main_obj.temp.to_temp([obj.scene2_paper1_txt1, obj.scene2_paper1_txt2], { opacity: 0 });
        main_obj.main_tl.call(() => {
            obj.scene2_paper1_txt1.style = "";
            obj.scene2_paper1_txt2.style = "";
        })
        main_obj.temp.to_temp([obj.scene2_paper1_txt3], { opacity: 1 }, "", "Hs_chi_02_02_03n_3_1");
        main_obj.main_tl.call(() => {
            obj.scene2_paper1_txt4.style.display = "block";
        })
        main_obj.temp.to_temp([obj.scene2_paper1_txt4], { opacity: 1 }, "", "Hs_chi_02_02_03n_3_2");

        main_obj.main_tl.call(() => {
            //신문2 준비
            obj.scene2_paper2.style.display = "block";
        })
        //2초 후 등장
        main_obj.temp.to_temp([obj.scene2_paper2], { opacity: 1, delay: 2 });
        main_obj.main_tl.call(() => {
            //신문1 정리
            obj.scene2_paper1.style = "";

            //npc준비
            obj.scene2_npc1.style.display = "block";
            obj.scene2_npc2.style.display = "block";

            obj.scene2_npc1.style.marginLeft = "-70px";
            obj.scene2_npc2.style.marginLeft = "70px";
        })

        main_obj.temp.to_temp([obj.scene2_npc1, obj.scene2_npc2], { opacity: 1, margin: "0px" });
        main_obj.main_tl.call(() => {
            obj.scene2_npc_txt1.style.display = "block";
        })
        main_obj.temp.to_temp([obj.scene2_npc_txt1], { opacity: 1 }, "", "Hs_chi_02_02_05");
        main_obj.temp.to_temp([obj.scene2_npc_txt1], { opacity: 0 });
        main_obj.main_tl.call(() => {
            obj.scene2_npc_txt1.style = "";
            obj.scene2_npc_txt2.style.display = "block";
        })
        main_obj.temp.to_temp([obj.scene2_npc_txt2], { opacity: 1 }, "", "Hs_chi_02_02_06_1");

        main_obj.main_tl.call(() => {
            obj.scene2_paper2_point1.style.display = "block";
            main_obj.audio.play_ef("ef_zoom");
        })
        main_obj.temp.to_temp([obj.scene2_paper2_point1], { opacity: 1, margin: "0px" }, "", "Hs_chi_02_02_06_2");

        main_obj.temp.to_temp([obj.scene2_npc_txt2], { opacity: 0 });
        main_obj.main_tl.call(() => {
            obj.scene2_npc_txt2.style = "";
            obj.scene2_npc_txt3.style.display = "block";
            obj.scene2_paper2_point2.style.display = "block";
        })
        main_obj.temp.to_temp([obj.scene2_paper2_point1], { opacity: 0 });
        main_obj.main_tl.call(() => {
            obj.scene2_paper2_point1.style = "";
            main_obj.audio.play_ef("ef_zoom");
        })
        main_obj.temp.to_temp([obj.scene2_npc_txt3, obj.scene2_paper2_point2], { opacity: 1 }, "", "Hs_chi_02_02_07");
        main_obj.temp.to_temp([obj.scene2_npc_txt3, obj.scene2_paper2_point2], { opacity: 0 });
        main_obj.main_tl.call(() => {
            obj.scene2_npc_txt3.style = "";
            obj.scene2_paper2_point2.style = "";
            obj.scene2_npc_txt4.style.display = "block";
        })
        main_obj.temp.to_temp([obj.scene2_npc_txt4], { opacity: 1 }, "", "Hs_chi_02_02_08");

        //20251219 구간삭제+모션 변경
        // main_obj.temp.to_temp([obj.scene2_npc1, obj.scene2_npc2, obj.scene2_npc_txt4], { opacity: 0, delay: 2 });
        // main_obj.main_tl.call(() => {
        //     obj.scene2_npc1.style = "";
        //     obj.scene2_npc2.style = "";
        //     obj.scene2_npc_txt4.style = "";
        // })

        //공통 템플릿 사용한, 오디오 재생
        // main_obj.temp.to_temp([obj.scene2_npc_txt4], { opacity: 0, duation: 0.2 }, "", "Hs_chi_02_02_08n_1");
        // main_obj.temp.to_temp([obj.scene2_npc_txt4], { opacity: 0, duation: 0.2 }, "", "Hs_chi_02_02_08n_2");
        // main_obj.temp.to_temp([obj.scene2_npc_txt4], { opacity: 0, duation: 0.2 }, "", "Hs_chi_02_02_08n_3");


        // main_obj.main_tl.call(() => {
        //     obj.scene2_npc3.style.display = "block";
        //     obj.scene2_npc4.style.display = "block";

        //     obj.scene2_npc3.style.marginLeft = "-70px";
        //     obj.scene2_npc4.style.marginLeft = "70px";
        // })
        // main_obj.temp.to_temp([obj.scene2_npc3, obj.scene2_npc4], { opacity: 1, margin: "0px" });


        main_obj.temp.to_temp([obj.scene2_npc_txt4], { opacity: 0 });
        main_obj.main_tl.call(() => {
            obj.scene2_npc3.style.display = "block";
        })
        main_obj.main_tl.to([obj.scene2_npc3], { duration: 0.2, opacity: 1 });
        main_obj.main_tl.call(() => {
            obj.scene2_npc1.style.display = "none";
        })
        main_obj.main_tl.call(() => {
            obj.scene2_npc_txt5.style.display = "block";
        })
        main_obj.temp.to_temp([obj.scene2_npc_txt5], { opacity: 1 }, "", "Hs_chi_02_02_09");
        main_obj.temp.to_temp([obj.scene2_npc_txt5], { opacity: 0 });
        main_obj.main_tl.call(() => {
            obj.scene2_npc_txt5.style = "";
            obj.scene2_npc4.style.display = "block";
        })
        main_obj.main_tl.to([obj.scene2_npc4], { duration: 0.2, opacity: 1 });
        main_obj.main_tl.call(() => {
            obj.scene2_npc2.style.display = "none";
            obj.scene2_npc_txt6.style.display = "block";
        })

        main_obj.temp.to_temp([obj.scene2_npc_txt6], { opacity: 1 }, "", "Hs_chi_02_02_10");
        main_obj.temp.to_temp([obj.scene2_npc_txt6], { opacity: 0 });
        main_obj.main_tl.call(() => {
            obj.scene2_npc_txt6.style = "";
            obj.scene2_npc_txt7.style.display = "block";
        })
        main_obj.temp.to_temp([obj.scene2_npc_txt7], { opacity: 1 }, "", "Hs_chi_02_02_11");
        main_obj.temp.to_temp([obj.scene2_npc_txt7], { opacity: 0 });

        main_obj.main_tl.call(() => {
            obj.scene2_npc_txt7.style = "";
            obj.scene2_npc_txt8.style.display = "block";
        })
        main_obj.temp.to_temp([obj.scene2_npc_txt8], { opacity: 1 }, "", "Hs_chi_02_02_12");

        //2초후 자동 스킵
        main_obj.temp.to_temp([obj.btn_skip], { opacity: 0, delay: 2 });
        main_obj.main_tl.call(() => {
            quiz_Main.reset_cnt();
            _this.show_quiz();
        })
    }

    //퀴즈
    async init_quiz() {
        let main_obj = quiz_Main.getInstance();
        let _this = this;
        let _key = "quiz";
        //오브젝트 생성 및 등록        
        let obj = _this.domNodes[_key] = {};
        obj.quiz = quiz_Main.crtEl('div', 'quiz');

        //배경
        obj.quiz_bg = obj.quiz.appendChild(quiz_Main.crtEl('div', 'quiz_bg'));

        //타이틀
        obj.quiz_title = obj.quiz.appendChild(quiz_Main.crtEl('div', 'quiz_title'));

        //기회
        obj.chacne_box = obj.quiz.appendChild(quiz_Main.crtEl('div', 'chacne_box'));
        obj.chacne_txt = obj.chacne_box.appendChild(quiz_Main.crtEl('div', 'chacne_txt'));

        //문제
        obj.quiz_question = obj.quiz.appendChild(quiz_Main.crtEl('div', 'quiz_question'));
        obj.quiz_question.appendChild(quiz_Main.crtEl('div', 'quiz_brit'));

        //지문
        obj.quiz_jimun = obj.quiz.appendChild(quiz_Main.crtEl('div', 'quiz_jimun'));
        obj.quiz_jimun_brit1 = obj.quiz_jimun.appendChild(quiz_Main.crtEl('div', 'quiz_brit quiz_jimun_brit1'));
        obj.quiz_jimun_brit2 = obj.quiz_jimun.appendChild(quiz_Main.crtEl('div', 'quiz_brit quiz_jimun_brit2'));

        obj.bogi_on1 = obj.quiz_jimun_brit1.appendChild(quiz_Main.crtEl('div', 'bogi_on'));
        obj.bogi_on2 = obj.quiz_jimun_brit2.appendChild(quiz_Main.crtEl('div', 'bogi_on'));

        //보기박스
        obj.bogi_box = obj.quiz.appendChild(quiz_Main.crtEl('div', 'bogi_box'));
        //보기 버튼 생성, 배열에 추가
        obj.bogi_arr = new Array();
        for (let i = 1; i <= 3; i++) {
            obj.bogi_arr[i - 1] = obj.bogi_box.appendChild(quiz_Main.crtEl('div', 'bogi bogi' + i));
            obj.bogi_arr[i - 1].dataset.num = i;
            obj.bogi_arr[i - 1].classList.add("ef_btn");
        }

        //다시하기 버튼
        obj.btn_reset = obj.quiz.appendChild(quiz_Main.crtEl('div', 'btn_reset'));
        //확인하기 버튼
        obj.btn_check = obj.quiz.appendChild(quiz_Main.crtEl('div', 'btn_check'));
        //팝업
        obj.res_pop = obj.quiz.appendChild(quiz_Main.crtEl('div', 'res_pop'));
        //팝업세부 추가
        obj.answer_o = obj.res_pop.appendChild(quiz_Main.crtEl('div', 'answer_o'));
        obj.answer_x = obj.res_pop.appendChild(quiz_Main.crtEl('div', 'answer_x'));
        obj.answer_x2 = obj.res_pop.appendChild(quiz_Main.crtEl('div', 'answer_x2'));
        obj.answer_hint = obj.res_pop.appendChild(quiz_Main.crtEl('div', 'answer_hint'));
        //팝업 힌드 닫기 버튼
        obj.btn_hint_close = obj.answer_hint.appendChild(quiz_Main.crtEl('div', 'btn_hint_close'));
        obj.btn_hint_close.textContent = "닫기";

        //해설 및 피드백
        obj.feed = obj.quiz.appendChild(quiz_Main.crtEl('div', 'feed'));
        obj.feed1 = obj.feed.appendChild(quiz_Main.crtEl('div', 'feed1'));
        obj.feed1_txt1_1 = obj.feed1.appendChild(quiz_Main.crtEl('div', 'feed1_txt1 feed1_txt1_1'));
        obj.feed1_txt1_2 = obj.feed1.appendChild(quiz_Main.crtEl('div', 'feed1_txt1 feed1_txt1_2'));
        obj.feed1_txt2 = obj.feed1.appendChild(quiz_Main.crtEl('div', 'feed1_txt2'));
        obj.feed1_txt3 = obj.feed1.appendChild(quiz_Main.crtEl('div', 'feed1_txt3'));

        obj.feed1_caption = obj.feed1.appendChild(quiz_Main.crtEl('div', 'feed1_caption'));
        obj.feed1_btn_next = obj.feed1.appendChild(quiz_Main.crtEl('div', 'feed_btn_next ef_btn'));

        obj.feed2 = obj.feed.appendChild(quiz_Main.crtEl('div', 'feed2'));
        obj.feed2_txt1 = obj.feed2.appendChild(quiz_Main.crtEl('div', 'feed2_txt1'));
        obj.feed2_btn_next = obj.feed2.appendChild(quiz_Main.crtEl('div', 'feed_btn_next ef_btn'));

        _this.cnt.appendChild(obj.quiz);


        /*** 이벤트 등록 ***/
        //보기 버튼
        obj.bogi_arr.forEach((bogi) => {
            bogi.addEventListener('click', function () {
                main_obj.audio.play_ef("ef_button");
                _this.select_bogi = this.dataset.num;

                //보기 버튼 모두 초기화
                obj.bogi_arr.forEach((bogi) => {
                    bogi.style = "";
                    bogi.style.filter = "grayscale(0.7)";
                    bogi.classList.remove('ef_btn');
                })
                //선택 버튼 
                this.style.pointerEvents = "none";
                this.style.filter = "grayscale(0)";
                this.style.backgroundImage = "url(./common/images/" + _this.cntID + "/bogi" + this.dataset.num + "_ck.png)";

                obj["quiz_jimun_brit1"].style.background = "transparent";
                obj["quiz_jimun_brit2"].style.background = "transparent";
                obj["bogi_on1"].style.backgroundImage = "url(./common/images/" + _this.cntID + "/bogi" + this.dataset.num + "_on.png)";
                obj["bogi_on2"].style.backgroundImage = "url(./common/images/" + _this.cntID + "/bogi" + this.dataset.num + "_on.png)";

                //공통버튼 활성화
                obj.btn_reset.style.pointerEvents = "auto";
                obj.btn_reset.style.filter = "grayscale(0)";
                obj.btn_reset.classList.add('ef_btn');

                obj.btn_check.style.pointerEvents = "auto";
                obj.btn_check.style.filter = "grayscale(0)";
                obj.btn_check.classList.add('ef_btn');
            })
        })
        //다시하기 버튼
        obj.btn_reset.addEventListener("click", () => {
            main_obj.audio.play_ef("ef_button");
            _this.select_bogi = null;

            obj["quiz_jimun_brit1"].style = "";
            obj["quiz_jimun_brit2"].style = "";
            obj["bogi_on1"].style = "";
            obj["bogi_on2"].style = "";

            //보기 버튼 모두 초기화
            obj.bogi_arr.forEach((bogi) => {
                bogi.style = "";
                bogi.style.filter = "grayscale(0)";
                bogi.classList.add('ef_btn');
            })
            //공통버튼 비활성화
            obj.btn_reset.style = "";
            obj.btn_reset.classList.remove('ef_btn');

            obj.btn_check.style = "";
            obj.btn_check.classList.remove('ef_btn');
        })
        //확인하기 버튼
        obj.btn_check.addEventListener("click", () => {
            main_obj.audio.play_ef("ef_button");
            main_obj.audio.na_current?.stop();

            //보기 버튼 일부 상태 변경, 이벤트 비활성화
            obj.bogi_arr.forEach((bogi) => {
                bogi.style = "";
                bogi.style.filter = "grayscale(0)";
                bogi.classList.remove('ef_btn');
                bogi.style.pointerEvents = "none";
            })

            //공통버튼 비활성화
            obj.btn_reset.style = "";
            obj.btn_reset.classList.remove('ef_btn');

            obj.btn_check.style = "";
            obj.btn_check.classList.remove('ef_btn');

            let bool = (main_obj.quiz_info[_this.dataID].answer_num == _this.select_bogi);
            if (!bool) --_this.chance;
            obj.chacne_txt.textContent = _this.chance;
            //남은 기회에 상관 없이 계속 업데이트
            _this.answer = (bool) ? "T" : "F";

            _this.answer_chk(bool);
        })
        //힌트 닫기 버튼
        obj.btn_hint_close.addEventListener("click", () => {
            obj.btn_hint_close.style.pointerEvents = "none";
            main_obj.audio.na_current?.stop();
            main_obj.audio.play_ef('ef_button');

            /*타일라인 삭제*/
            if (main_obj.main_tl != null) {
                main_obj.main_tl.kill();
                main_obj.main_tl = null;
            }

            //타임라인 초기화
            main_obj.main_tl = gsap.timeline({ defaults: { ease: "power1.out" } });

            main_obj.temp.to_temp([obj.res_pop], { opacity: 0 });
            main_obj.main_tl.call(() => {
                obj.res_pop.style = "";
                _this.select_bogi = null;
                //보기 버튼 모두 초기화
                obj.bogi_arr.forEach((bogi) => {
                    bogi.style = "";
                    bogi.style.filter = "grayscale(0)";
                    bogi.classList.add('ef_btn');
                })

                obj["quiz_jimun_brit1"].style = "";
                obj["quiz_jimun_brit2"].style = "";
                obj["bogi_on1"].style = "";
                obj["bogi_on2"].style = "";
            })
        })

        //계속하기 이벤트
        obj.feed1_btn_next.addEventListener("click", () => {
            obj.feed1_btn_next.style.pointerEvents = "none";
            main_obj.audio.na_current?.stop();

            main_obj.audio.play_ef('ef_button');
            _this.feed_motion2();
        })
        obj.feed2_btn_next.addEventListener("click", () => {
            obj.feed2_btn_next.style.pointerEvents = "none";
            main_obj.audio.na_current?.stop();

            main_obj.audio.play_ef('ef_button');
            _this.show_result();
        })
    }
    show_quiz() {
        let main_obj = quiz_Main.getInstance();
        let _this = this;
        let _key = "quiz";

        //오브젝트 참조
        let obj = _this.domNodes[_key];
        /*퀴즈 초기화*/
        _this.chance = 2;
        obj.chacne_txt.textContent = _this.chance;
        obj.bogi_arr.forEach((bogi) => {
            bogi.style = "";
            bogi.style.filter = "grayscale(0)";
            bogi.classList.add('ef_btn');
        })
        obj.btn_reset.style = "";
        obj.btn_check.style = "";
        obj.btn_reset.classList.remove("ef_btn")
        obj.btn_check.classList.remove("ef_btn")


        //bgm제어
        main_obj.howl_bgm?.stop();
        main_obj.audio.play_bgm("bgm_quiz");

        /*타일라인 삭제*/
        if (main_obj.main_tl != null) {
            main_obj.main_tl.kill();
            main_obj.main_tl = null;
        }

        //타임라인 초기화
        main_obj.main_tl = gsap.timeline({ defaults: { ease: "power1.out" } });

        //초기 화면 준비
        _this.cnt.style.display = "block";
        obj.quiz.style.display = "block";

        //퀴즈 시작 시간
        quiz_Main.getInstance().quiz_info[_this.dataID].st_time = Date.now();

        //화면 노출
        main_obj.temp.to_temp(obj.quiz, { opacity: 1 }, "", "Hs_chi_02_02_q");
        // main_obj.main_tl.call(() => {
        //     //_this.feed_motion1();
        //     //_this.show_result();
        // })
    }
    answer_chk($bool) {
        let main_obj = quiz_Main.getInstance();
        let _this = this;
        let _key = "quiz";
        //오브젝트 참조
        let obj = _this.domNodes[_key];

        /*타일라인 삭제*/
        if (main_obj.main_tl != null) {
            main_obj.main_tl.kill();
            main_obj.main_tl = null;
        }

        //타임라인 초기화
        main_obj.main_tl = gsap.timeline({ defaults: { ease: "power1.out" } });

        /*res_pop초기화 */
        obj.res_pop.style = "";
        Array.from(obj.res_pop.children).forEach((child) => {
            child.style = "";
        })

        //효과음
        let ef_file;
        //나레이션
        let ef_narr;
        //힌트 나레이션
        let ef_narr_hint = "Hs_chi_02_02_hint";
        //res_pop 대상
        let target;

        //res_pop 준비
        obj.res_pop.style.display = "flex";
        if ($bool) {
            ef_file = "q_correct";
            ef_narr = "Hs_chi_cmm_o";
            target = obj.answer_o;
        } else {
            ef_file = "q_wrong";
            if (_this.chance <= 0) {
                ef_narr = "Hs_chi_cmm_x2";
                target = obj.answer_x2;
            }
            else {
                ef_narr = "Hs_chi_cmm_x";
                target = obj.answer_x;
            }
        }
        target.style.display = "flex";



        main_obj.main_tl.call(() => {
            main_obj.audio.play_ef(ef_file);
        })
        main_obj.temp.to_temp([obj.res_pop, target], { opacity: 1 }, "", ef_narr);


        main_obj.temp.to_temp([obj.res_pop, target], { opacity: 0 });

        if (!$bool && _this.chance > 0) {
			main_obj.main_tl.call(() => {
                obj.answer_hint.style.display = "flex";
            })
            main_obj.temp.to_temp([obj.res_pop, obj.answer_hint], { opacity: 1 }, "", ef_narr_hint);
        } else {
            main_obj.main_tl.call(() => {
                /*res_pop초기화 */
                Array.from(obj.res_pop.children).forEach((child) => {
                    child.style = "";
                })
                //배경 초기화
                obj.res_pop.style = "";

                //해설 및 피드백 진행
                _this.feed_motion1();
            })
        }
    }
    feed_motion1() {
        let main_obj = quiz_Main.getInstance();
        let _this = this;
        let _key = "quiz";

        //오브젝트 참조
        let obj = _this.domNodes[_key];

        /*타일라인 삭제*/
        if (main_obj.main_tl != null) {
            main_obj.main_tl.kill();
            main_obj.main_tl = null;
        }

        //타임라인 초기화
        main_obj.main_tl = gsap.timeline({ defaults: { ease: "power1.out" } });

        //초기 화면 준비
        obj.feed.style.display = "block";
        obj.feed1.style.display = "block";

        main_obj.main_tl.call(() => {
            obj.quiz_title.style.display = "none";
            obj.chacne_box.style.display = "none";
            obj.quiz_jimun_brit1.style.display = "none";
            obj.quiz_jimun_brit2.style.display = "none";
            obj.bogi_box.style.display = "none";
            obj.btn_reset.style.display = "none";
            obj.btn_check.style.display = "none";

            obj.feed1_btn_next.style.display = "block";
        })
        main_obj.temp.to_temp([obj.feed, obj.feed1, obj.feed1_btn_next], { opacity: 1 });
        main_obj.main_tl.call(() => {
            obj.feed1_txt1_1.style.display = "block";
            obj.feed1_txt1_2.style.display = "block";
        })
        main_obj.temp.to_temp([obj.feed1_txt1_1, obj.feed1_txt1_2], { opacity: 1 }, "", "Hs_chi_02_02_feed1_1");
        main_obj.main_tl.call(() => {
            obj.feed1_txt2.style.display = "block";
            obj.feed1_txt2.style.opacity = "1";
            obj.feed1_txt2.style.height = "0px";
        })

        main_obj.temp.to_temp([obj.feed1_txt2], { height: "197px" }, "", "Hs_chi_02_02_feed1_2");
        main_obj.main_tl.call(() => {
            obj.feed1_txt3.style.display = "block";
        })
        main_obj.temp.to_temp([obj.feed1_txt3], { opacity: 1 }, "", "Hs_chi_02_02_feed1_3");

        main_obj.main_tl.call(() => {
            _this.feed_motion2();
        })
    }

    feed_motion2() {
        let main_obj = quiz_Main.getInstance();
        let _this = this;
        let _key = "quiz";

        //오브젝트 참조
        let obj = _this.domNodes[_key];

        /*타일라인 삭제*/
        if (main_obj.main_tl != null) {
            main_obj.main_tl.kill();
            main_obj.main_tl = null;
        }

        //타임라인 초기화
        main_obj.main_tl = gsap.timeline({ defaults: { ease: "power1.out" } });

        //초기 화면 준비
        obj.feed2.style.display = "block";

        main_obj.temp.to_temp([obj.quiz_question, obj.quiz_jimun, obj.feed1], { opacity: 0 });
        main_obj.main_tl.call(() => {
            obj.feed1_btn_next.style.display = "none";
            obj.feed2_btn_next.style.display = "block";
        })
        //동시진행을 위한 메인 타임라인에 직접 적용
        main_obj.main_tl.to([obj.feed2], { duration: 0.2, opacity: 1 }, "<");

        main_obj.main_tl.call(() => {
            obj.quiz_question.style.display = "none";
            obj.quiz_jimun.style.display = "none";
            obj.feed1.style.display = "none";
        })

        main_obj.temp.to_temp([obj.feed2_btn_next], { opacity: 1 }, "", "Hs_chi_02_02_feed2");

    }

    //결과
    async init_result() {
        let main_obj = quiz_Main.getInstance();
        let _this = this;
        let _key = "result";
        //오브젝트 생성 및 등록        
        let obj = _this.domNodes[_key] = {};
        obj.result = quiz_Main.crtEl('div', 'result');

        //배경
        obj.result_bg = obj.result.appendChild(quiz_Main.crtEl('div', 'result_bg'));

        //내용
        obj.result_con = obj.result.appendChild(quiz_Main.crtEl('div', 'result_con'));
        obj.btn_res_re = obj.result_con.appendChild(quiz_Main.crtEl('div', 'btn_res_re ef_btn'));
        obj.btn_res_next = obj.result_con.appendChild(quiz_Main.crtEl('div', 'btn_res_next ef_btn'));

        obj.result_npc1 = obj.result_con.appendChild(quiz_Main.crtEl('div', 'result_npc1'));
        obj.result_npc2 = obj.result_con.appendChild(quiz_Main.crtEl('div', 'result_npc2'));

        obj.result_npc_txt1 = obj.result.appendChild(quiz_Main.crtEl('div', 'result_npc_txt1'));
        obj.result_npc_txt2 = obj.result.appendChild(quiz_Main.crtEl('div', 'result_npc_txt2'));

        _this.cnt.appendChild(obj.result);


        obj.btn_res_re.addEventListener('click', () => {
            main_obj.audio.play_ef("ef_button");
            obj.btn_res_re.style.pointerEvents = "none";
            main_obj.audio.na_current?.stop();
            //다시 풀기
            quiz_Main.reset_cnt();
            // quiz_Main.show_page("quiz")
            _this.show_quiz();
        })

        obj.btn_res_next.addEventListener('click', () => {
            main_obj.audio.play_ef("ef_button");
            obj.btn_res_next.style.pointerEvents = "none";

            main_obj.audio.na_current?.stop();

            //데이터 업데이트
            //학습자 선택값
            main_obj.quiz_info[_this.dataID].input_result = _this.select_bogi;
            //정.오답( T or F)
            main_obj.quiz_info[_this.dataID].answer = _this.answer
            //퀴즈 기회
            main_obj.quiz_info[_this.dataID].chance = 3 - _this.chance;
            //퀴즈 종료 시간
            main_obj.quiz_info[_this.dataID].ed_time = Date.now();
            //데이터 전송
            quiz_Main.sendQuizData();

            gsap.to(_this.cnt, {
                opacity: 0, duration: 0.5, onComplete: () => {
                    //_this.cnt.style = "";
                    quiz_Main.reset_cnt();
                    main_obj.quiz_num = 2;
                    quiz_Main.show_page("quiz");
                }
            })
        })
    }
    show_result() {
        let main_obj = quiz_Main.getInstance();
        let _this = this;
        let _key = "result";

        //오브젝트 참조  
        let obj = _this.domNodes[_key];

        /*타일라인 삭제*/
        if (main_obj.main_tl != null) {
            main_obj.main_tl.kill();
            main_obj.main_tl = null;
        }

        //타임라인 초기화
        main_obj.main_tl = gsap.timeline({ defaults: { ease: "power1.out" } });

        //초기 화면 준비
        _this.cnt.style.display = "block";
        obj.result.style.display = "block";

        main_obj.temp.to_temp([obj.result], { opacity: 1 });
        main_obj.main_tl.call(() => {
            obj.result_con.style.display = "block";
            obj.result_con.style.marginTop = "50px";
        })
        main_obj.temp.to_temp([obj.result_con], { opacity: 1, margin: "0px" });
        main_obj.main_tl.call(() => {
            obj.result_npc1.style.display = "block";
            obj.result_npc2.style.display = "block";
        })
        main_obj.temp.to_temp([obj.result_npc1, obj.result_npc2], { opacity: 1 });
        main_obj.main_tl.call(() => {
            obj.result_npc_txt1.style.display = "block";
        })
        main_obj.temp.to_temp([obj.result_npc_txt1], { opacity: 1 }, "", "Hs_chi_02_02_13");
        main_obj.temp.to_temp([obj.result_npc_txt1], { opacity: 0 });
        main_obj.main_tl.call(() => {
            obj.result_npc_txt1.style.display = "none";
            obj.result_npc_txt2.style.display = "block";
            console.log('clear test');
        })
        main_obj.temp.to_temp([obj.result_npc_txt2], { opacity: 1 }, "", "Hs_chi_02_02_14");
    }
}

/*
//이미지 처리로 대체, 추후 완료후 아래 주석 코드 삭제
        //씬 종이1 지문 추가
        //txt1-1줄
        // obj.scene1_paper1_txt1.appendChild(quiz_Main.crtEl('p', 'scene1_paper1_txt'));        
        // obj.scene1_paper1_txt1.children[0].textContent="당신이 있는 지금은 서기 2050년, 모든 언어가 흩어져 소통이 불가능해진 시대.";
        // //txt1-2줄
        // obj.scene1_paper1_txt1.appendChild(quiz_Main.crtEl('p', 'scene1_paper1_txt'));
        // obj.scene1_paper1_txt1.children[1].textContent="더 이상 아무도 '한문'이라는 글자를 기억하지 못하는 세상에서,";
        // obj.scene1_paper1_txt1.children[1].appendChild(quiz_Main.crtEl('span', 'highlight_color')).textContent=" 당신은 마지막 한문학자";
        // obj.scene1_paper1_txt1.children[1].appendChild( document.createTextNode('입니다.') );

        // //txt2-1줄
        // obj.scene1_paper1_txt2.appendChild(quiz_Main.crtEl('p', 'scene1_paper1_txt'));
        // obj.scene1_paper1_txt2.children[0].textContent="어느 날, 당신은 우연히 낯선 공간에서 몇 개의 사진과 물건을 발견하게 되고,";
        // //txt2-2줄
        // obj.scene1_paper1_txt2.appendChild(quiz_Main.crtEl('p', 'scene1_paper1_txt'));
        // obj.scene1_paper1_txt2.children[1].textContent="이와 관련된 고대 한문 기록을 발견합니다.";
        // //txt2-3줄
        // obj.scene1_paper1_txt2.appendChild(quiz_Main.crtEl('p', 'scene1_paper1_txt'));
        // obj.scene1_paper1_txt2.children[2].textContent="그 기록 속에는";
        // obj.scene1_paper1_txt2.children[2].appendChild(quiz_Main.crtEl('span', 'highlight_color')).textContent=" 짧은 한자 어휘에 담긴 깊은 의미와 관련된 수수께끼";
        // obj.scene1_paper1_txt2.children[2].appendChild( document.createTextNode('가 담겨져 있죠.') );

        // //txt3-1줄
        // obj.scene1_paper1_txt3.appendChild(quiz_Main.crtEl('p', 'scene1_paper1_txt'));
        // obj.scene1_paper1_txt3.children[0].textContent="제시될 수수께끼를 모두 푼다면,";
        // //txt3-2줄
        // obj.scene1_paper1_txt3.appendChild(quiz_Main.crtEl('p', 'scene1_paper1_txt'));
        // obj.scene1_paper1_txt3.children[1].textContent="한자 어휘에 담긴 의미와 깊은 깨달음이 다시 세상에 드러날 수 있을 거예요!";

        // //txt4-1줄
        // obj.scene1_paper1_txt4.appendChild(quiz_Main.crtEl('p', 'scene1_paper1_txt highlight_color'));
        // obj.scene1_paper1_txt4.children[0].textContent="부디 수수께끼를 모두 풀어 짧은 한자 어휘에 담긴 깊은 의미를 다시 세상에 전파하고,";
        // //txt4-2줄
        // obj.scene1_paper1_txt4.appendChild(quiz_Main.crtEl('p', 'scene1_paper1_txt highlight_color'));
        // obj.scene1_paper1_txt4.children[1].textContent="잊혀진 한문의 가치와 의미를 모든 사람들이 깨달을 수 있도록 도와주세요!";
*/