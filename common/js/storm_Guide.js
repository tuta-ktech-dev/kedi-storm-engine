import { quiz_Main } from './storm_init.js';
/*가이드 화면 */
export class Guide {
    constructor() {
        //가이드
        this.guide;

        //dom 객체
        this.guide_domNodes = {};

        this.total_page = 4;
        this.total_count = this.total_page - 1;
        this.count = 0;
        this.repeatTimer;
        this.time_gsap;
    }

    async init() {
        let main_obj = quiz_Main.getInstance();
        let main_guide = this;
        main_guide.guide_domNodes.guide = {};
        let guid_img, now_page, arrow_l, arrow_r;

        main_guide.guide = quiz_Main.crtEl('div', 'guide');

        guid_img = quiz_Main.crtEl('div', 'guid_img');
        now_page = quiz_Main.crtEl('div', 'now_page');

        for (let i = 0; i < main_guide.total_page; i++) {
            let guid = quiz_Main.crtEl('div', 'guid_' + i);
            guid.appendChild(quiz_Main.crtEl('div', 'img'));
            guid.appendChild(quiz_Main.crtEl('div', 'txt'));

            guid_img.appendChild(guid);
            now_page.appendChild(quiz_Main.crtEl('div', 'page'));
        }
        
        main_guide.guide_domNodes.guide["guid_img"] = guid_img;
        main_guide.guide.appendChild(guid_img);

        main_guide.guide_domNodes.guide["now_page"] = now_page;
        main_guide.guide.appendChild(now_page);


        arrow_l = quiz_Main.crtEl('div', 'arrow_l');
        arrow_l.classList.add("ef_btn");
        arrow_l.addEventListener('click', () => {
            main_obj.audio.play_ef('ef_button');
            main_guide.repeatTimer?.pause();
            main_guide.move_img("L");
        })
        main_guide.guide_domNodes.guide["arrow_l"] = arrow_l;
        main_guide.guide.appendChild(arrow_l);

        arrow_r = quiz_Main.crtEl('div', 'arrow_r');
        arrow_r.classList.add("ef_btn");
        arrow_r.addEventListener('click', () => {
            main_obj.audio.play_ef('ef_button');
            main_guide.repeatTimer?.pause();
            main_guide.move_img("R");
        })
        main_guide.guide_domNodes.guide["arrow_r"] = arrow_r;
        main_guide.guide.appendChild(arrow_r);

        quiz_Main.getInstance().main_cnt.appendChild(main_guide.guide);
    }
    show_guide() {
        let main_obj = quiz_Main.getInstance();
        let main_guide = this;
        let guid_img = main_guide.guide_domNodes.guide.guid_img;
        let arrow_l = main_guide.guide_domNodes.guide.arrow_l;
        let arrow_r = main_guide.guide_domNodes.guide.arrow_r;
        let now_page = main_guide.guide_domNodes.guide.now_page;

        main_guide.count = 0;
        main_obj.audio.na_current?.stop();
        if (main_guide.count == 0) {
            arrow_l.style.filter = "grayscale(0.9)";
            arrow_l.style.pointerEvents = "none";
            arrow_l.classList.remove("ef_btn");
            guid_img.style.display = "block";
        }

        //bgm제어
        main_obj.howl_bgm?.stop();
        main_obj.audio.play_bgm("bgm_main");

        if (main_obj.main_tl != null) {
            main_obj.main_tl.kill();
            main_obj.main_tl = null;
        }
        main_obj.main_tl = gsap.timeline({ defaults: { ease: "power1.out" } });

        main_guide.guide.style.display = "block";
        arrow_l.style.display = "none";
        arrow_r.style.display = "none";

        main_obj.temp.to_temp([main_guide.guide, guid_img.children[0].children[0]], { opacity: 1 })
        main_obj.main_tl.call(() => {
            now_page.children[0].style.opacity = 1;

            // 5초마다 실행
            main_guide.repeatTimer = gsap.delayedCall(15, function repeat() {
                main_guide.move_img("R");

                // 다음 실행 예약
                main_guide.repeatTimer = gsap.delayedCall(15, repeat);
            });  
            //타임 효과
            main_guide.time_gsap=gsap.to(arrow_r,{
                "--progress": 1,
                duration: 15,   // 원하는 시간
                ease: "none"
            })
        });
        main_obj.temp.to_temp([guid_img, arrow_l, arrow_r], { opacity: 1 });
        main_obj.main_tl.call(() => {
            arrow_l.style.display = "block";
            arrow_r.style.display = "block";
        })
        main_obj.temp.to_temp(guid_img.children[0].children[1], { opacity: 1, duration: 1 });
    }
    move_img(move) {
        let main_obj = quiz_Main.getInstance();
        let main_guide = this;
        let guid_img = main_guide.guide_domNodes.guide.guid_img;
        let arrow_l = main_guide.guide_domNodes.guide.arrow_l;
        let arrow_r = main_guide.guide_domNodes.guide.arrow_r;
        let now_page = main_guide.guide_domNodes.guide.now_page;
        let left_val;
        let now = main_guide.count;

        main_obj.audio.na_current?.stop();
        gsap.killTweensOf("*");      // 모든 타겟의 tween 제거

        if (main_obj.main_tl != null) {
            main_obj.main_tl.kill();
            main_obj.main_tl = null;
        }
        main_obj.main_tl = gsap.timeline({ defaults: { ease: "power1.out" } });
        main_obj.main_tl.call(() => {
            if ((now == main_guide.total_count) && move == "R") {
                main_obj.temp.to_temp(main_guide.guide, { opacity: 0 });
                main_obj.main_tl.call(() => {
                    main_guide.guide.style = "";
                    main_guide.repeatTimer?.kill();
                    main_guide.time_gsap?.kill();
                    //인트로 화면
                    quiz_Main.show_page("intro");
                })
            }
        })


        main_obj.main_tl.call(() => {
            if (move == "R") {
                main_guide.count++;
                left_val = -2000;
            } else {
                main_guide.count--;
                left_val = 3000;
            }
            if (main_guide.count == 0) {
                arrow_l.style = "";
                arrow_l.classList.remove("ef_btn");
            }
            arrow_l.style.display = "none";
            arrow_r.style.display = "none";

            Array.from(now_page.children).forEach((child) => {
                child.style.opacity = 0.5;
            })
            if(main_guide.count<main_guide.total_page)now_page.children[main_guide.count].style.opacity = 1;
        })

        main_obj.main_tl.call(() => {
            if (main_guide.count < main_guide.total_page) {
                main_obj.audio.play_ef('ef_show');
                main_obj.temp.to_temp([guid_img.children[now].children[0],
                guid_img.children[now].children[1]], { left: left_val, opacity: 0 });

                main_obj.temp.to_temp(guid_img.children[main_guide.count].children[0], { opacity: 1 });
                main_obj.temp.to_temp(guid_img.children[main_guide.count].children[1], { opacity: 1 });
                main_obj.main_tl.call(() => {
                    guid_img.children[now].children[0].style = "";
                    guid_img.children[now].children[1].style = "";
                    arrow_l.style = "";
                    arrow_l.classList.add("ef_btn");
                    arrow_r.style = "";


                    main_guide.repeatTimer?.restart(true);
                    if (main_guide.count == 0) {
                        arrow_l.style.filter = "grayscale(0.9)";
                        arrow_l.style.pointerEvents = "none";
                        arrow_l.classList.remove("ef_btn");
                    }

                    //타임 효과 다시시작
                    main_guide.time_gsap.restart();
                })
            }
        })
    }
}