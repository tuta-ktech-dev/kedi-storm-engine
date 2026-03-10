import { quiz_Main } from './storm_init.js';
/*상단 메뉴*/
export class Top {
    constructor() {
        this.top_menu = document.getElementById("top_menu");

        //상단 전체화면 버튼
        this.btn_fullscreen = document.getElementsByClassName("btn_fullscreen")[0];
        this.storm_fullscreen = false;

        //상단 설정 버튼
        this.btn_setting = document.getElementsByClassName("btn_setting")[0];

        //상단 뮤트 버튼
        this.btn_mute_on = document.getElementsByClassName("btn_mute_on")[0];
        this.btn_mute_off = document.getElementsByClassName("btn_mute_off")[0];

        //전체화면 조정 객체
        this.screen = document.getElementById("content");

        //상단 내비게이션 활성화
        this.pageInfo = new Array();
    }
    init() {
        let main_obj = quiz_Main.getInstance();
        let top_obj = this;

        //201119 상단 내비게이션값 초기화 추가
        for (let i = 0; i < Object.keys(main_obj.quiz_info).length + 2; i++) {
            top_obj.pageInfo.push(false);
        }
        //상단 최소화,최대화 버튼
        top_obj.btn_fullscreen.addEventListener('click', () => {
            main_obj.audio.play_ef("ef_button");
            top_obj.fullScreen();
        })
        top_obj.btn_fullscreen.addEventListener('mouseenter', function () {
            this.children[2].classList.add("on");
            this.children[2].style.display = "flex";
        })
        top_obj.btn_fullscreen.addEventListener('mouseleave', function () {
            this.children[2].classList.remove("on");
            this.children[2].style.display = "none";
        })
        top_obj.btn_fullscreen.appendChild(quiz_Main.crtEl('div', 'tooltip'));
        top_obj.btn_fullscreen.children[2].textContent = "창 크기 조절";

        //설정
        top_obj.btn_setting.addEventListener('click', () => {
            main_obj.audio.play_ef("ef_button");

            gsap.to(main_obj.setting.setting, {
                opacity: 1, duration: 0.5, ease: "power1.out", onStart: function () {
                    main_obj.setting.setting.style.display = "block";
                }
            });
        })
        top_obj.btn_setting.addEventListener('mouseenter', function () {
            this.children[1].classList.add("on");
            this.children[1].style.display = "flex";
        })
        top_obj.btn_setting.addEventListener('mouseleave', function () {
            this.children[1].classList.remove("on");
            this.children[1].style.display = "none";
        })
        top_obj.btn_setting.appendChild(quiz_Main.crtEl('div', 'tooltip'));
        top_obj.btn_setting.children[1].textContent = "세부 설정";

        //mute on
        top_obj.btn_mute_on.addEventListener('click', () => {
            top_obj.set_mute();
        })
        top_obj.btn_mute_on.addEventListener('mouseenter', function () {
            this.children[1].classList.add("on");
            this.children[1].style.display = "flex";
        })
        top_obj.btn_mute_on.addEventListener('mouseleave', function () {
            this.children[1].classList.remove("on");
            this.children[1].style.display = "none";
        })
        top_obj.btn_mute_on.appendChild(quiz_Main.crtEl('div', 'tooltip'));
        top_obj.btn_mute_on.children[1].textContent = "음소거";

        //mute off
        top_obj.btn_mute_off.addEventListener('click', () => {
            top_obj.set_mute();
        })
        top_obj.btn_mute_off.addEventListener('mouseenter', function () {
            this.children[1].classList.add("on");
            this.children[1].style.display = "flex";
        })
        top_obj.btn_mute_off.addEventListener('mouseleave', function () {
            this.children[1].classList.remove("on");
            this.children[1].style.display = "none";
        })
        top_obj.btn_mute_off.appendChild(quiz_Main.crtEl('div', 'tooltip'));
        top_obj.btn_mute_off.children[1].textContent = "소리 켜기";

        //일단 임시로 무조껀 나오게
        if (quiz_Main.isIOS() == false) {
            top_obj.btn_fullscreen.children[0].style.display = "block";
        }

        document.addEventListener('fullscreenchange', function () {
            if (!top_obj.storm_fullscreen) {
                top_obj.storm_fullscreen = true;
                top_obj.btn_fullscreen.children[1].style.display = "block";
                top_obj.btn_fullscreen.children[0].style.display = "none";
            } else {
                top_obj.storm_fullscreen = false;
                top_obj.btn_fullscreen.children[1].style.display = "none";
                top_obj.btn_fullscreen.children[0].style.display = "block";
            }
            quiz_Main.responsive();
        });

        //검수용 퀴즈 이동
        if (main_obj.mode == "local") {
            top_obj.btn_event();
        }
    }
    set_TopMenu() {
        let top_obj = this;
        let main_obj = quiz_Main.getInstance();

        for (var i = 0; i < top_obj.pageInfo.length; i++) {
            if (top_obj.pageInfo[i] == true) {
				top_obj.top_menu.style.display = "flex";
                top_obj.top_menu.children[i].classList.add("act_div");
                top_obj.top_menu.children[i].classList.remove("fin_div_chk_o");
                top_obj.top_menu.children[i].classList.remove("fin_div_chk_x");
                top_obj.top_menu.children[i].classList.remove("fin_div");
            } else {
                top_obj.top_menu.children[i].classList.remove("act_div");
                if (main_obj.quiz_num > i) {
                    if (i == 0) {
                        top_obj.top_menu.children[i].classList.add("fin_div");
                    } else {
                        if (main_obj.quiz_info["q" + i].answer == "T") {
                            top_obj.top_menu.children[i].classList.add("fin_div_chk_o");
                        } else {
                            top_obj.top_menu.children[i].classList.add("fin_div_chk_x");
                        }
                    }
                } else {
                    top_obj.top_menu.children[i].classList.remove("fin_div_chk_o");
                    top_obj.top_menu.children[i].classList.remove("fin_div_chk_x");
                }
            }
            top_obj.pageInfo[i] = false;
        }
        //top_obj.top_menu.style.display = "flex";
    }
    async fullScreen() {
        let top_obj = this;

        if (!top_obj.storm_fullscreen) {
            // 전체화면 요청
            const elem = top_obj.screen; // 또는 특정 대상 요소
            if (elem.requestFullscreen) {
                elem.requestFullscreen();
            } else if (elem.webkitRequestFullscreen) {
                elem.webkitRequestFullscreen();
            } else if (elem.mozRequestFullScreen) {
                elem.mozRequestFullScreen();
            } else if (elem.msRequestFullscreen) {
                elem.msRequestFullscreen();
            }
        } else {
            // 전체화면 종료
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
        }
    }
    btn_event() {
        let main_obj = quiz_Main.getInstance();
        let top_obj = this;

        for (var i = 0; i < top_obj.pageInfo.length; i++) {
            top_obj.top_menu.children[i].classList.add("test_mode");
            top_obj.top_menu.children[i].dataset.num = i;
            top_obj.top_menu.children[i].addEventListener('click', function () {
                if (this.classList.contains('act_div')) {
                    return;
                } else {
                    main_obj.guide.repeatTimer?.kill();
                    if (this.dataset.num == 0) {
                        quiz_Main.reset_cnt();
                        main_obj.quiz_num = 0;
                        quiz_Main.show_page("intro");
                    } else if (this.dataset.num == 1) {
                        if (main_obj.quiz_info.q1.input_result != "") {
                            quiz_Main.reset_cnt();
                            main_obj.quiz_num = 1;
                            quiz_Main.show_page("quiz");
                        }
                    } else if (this.dataset.num == 2) {
                        if (main_obj.quiz_info.q1.input_result != "") {
                            quiz_Main.reset_cnt();
                            main_obj.quiz_num = 2;
                            quiz_Main.show_page("quiz");
                        }
                    } else if (this.dataset.num == 3) {
                        if (main_obj.quiz_info.q2.input_result != "") {
                            quiz_Main.reset_cnt();
                            main_obj.quiz_num = 3;
                            quiz_Main.show_page("quiz");
                        }
                    } else if (this.dataset.num == 4) {
                        if (main_obj.quiz_info.q3.input_result != "") {
                            quiz_Main.reset_cnt();
                            main_obj.quiz_num = 4;
                            quiz_Main.show_page("result");
                        }
                    }
                }
            })
        }
    }
    set_mute() {
        let main_obj = quiz_Main.getInstance();
        let top_obj = this;

        main_obj.audio.play_ef("ef_button");
        if (main_obj.st_mute == false) {
            main_obj.howl_na?.mute(true);
            main_obj.howl_bgm?.mute(true);
            main_obj.howl_ef?.mute(true);
            main_obj.st_mute = true;
            top_obj.btn_mute_on.style.display = "none";
            top_obj.btn_mute_off.style.display = "block";
        } else {
            main_obj.howl_na?.mute(false);
            main_obj.howl_bgm?.mute(false);
            main_obj.howl_ef?.mute(false);
            main_obj.st_mute = false;
            top_obj.btn_mute_on.style.display = "block";
            top_obj.btn_mute_off.style.display = "none";
        }
    }

}

