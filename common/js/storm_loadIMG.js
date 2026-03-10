/*사용할 이미지 로드*/
export class loadIMG {
    constructor() {
        this.imageUrls = new Array();
		
		this.preload_IMG = false;
    }
    async init() {
        let main_IMG = this;

        //공통 이미지
        main_IMG.imageUrls.push(
            'answer_o','answer_x','answer_x2','btn_check','btn_check_over','btn_cursor','btn_fullscreen','btn_load','btn_load_over','btn_new','btn_new_over','btn_next','btn_next_over','btn_no','btn_no_over','btn_res_re','btn_res_re_over','btn_reset','btn_reset_over','btn_skip','btn_start_main','btn_start_main_over','btn_unfullscreen','btn_y','btn_y_over','chacne_box','setting_exit','setting_exit_over','setting_re','setting_re_over','start/bg','start/btn_start_main','start/btn_start_main_over','top_ck','top_o','top_title','top_x',
            'cursor_arrow','cursor_over','exit_box','load_box','new_box','intro_next','intro_next_over','btn_hint_close_icon'
        );
        //가이드
        main_IMG.imageUrls.push(
            'guide/bg_guide','guide/btn_arrowL','guide/btn_arrowL_over','guide/btn_arrowR','guide/btn_arrowR_over','guide/img0','guide/img1','guide/img2','guide/img3','guide/txt0','guide/txt1','guide/txt2','guide/txt3'
        );
        //인트로
        main_IMG.imageUrls.push(
            'intro/scene1_bg','intro/scene1_msg1','intro/scene1_npc_txt1','intro/scene1_npc_txt2','intro/scene1_npc_txt3','intro/scene1_npc_txt4','intro/scene1_npc_txt5','intro/scene1_npc_txt6','intro/scene1_npc1','intro/scene1_npc2','intro/scene1_npc3','intro/scene2_bg','intro/scene2_npc_txt1','intro/scene2_npc_txt2','intro/scene2_npc_txt3','intro/scene2_npc1','intro/scene2_npc2','intro/scene2_npc3',
        );
        //quiz01 이미지
        main_IMG.imageUrls.push(
            'cnt01/answer_hint','cnt01/bogi1','cnt01/bogi1_ck','cnt01/bogi2','cnt01/bogi2_ck','cnt01/bogi3','cnt01/bogi3_ck','cnt01/feed_bg','cnt01/feed1_caption','cnt01/feed1_txt1','cnt01/feed1_txt2','cnt01/feed1_txt3','cnt01/feed2_txt1','cnt01/quiz_bg','cnt01/quiz_brit','cnt01/quiz_jimun','cnt01/quiz_question','cnt01/quiz_title','cnt01/result_con','cnt01/result_npc_txt1','cnt01/result_npc_txt2','cnt01/result_npc1','cnt01/result_npc2','cnt01/scene1_bg','cnt01/scene1_npc_txt1','cnt01/scene1_npc_txt2','cnt01/scene1_npc_txt3','cnt01/scene1_npc1','cnt01/scene1_npc2','cnt01/scene1_title','cnt01/scene2_bg','cnt01/scene2_npc_txt1','cnt01/scene2_npc_txt2','cnt01/scene2_npc_txt3','cnt01/scene2_npc_txt4','cnt01/scene2_npc_txt5','cnt01/scene2_npc_txt6','cnt01/scene2_npc_txt7','cnt01/scene2_npc_txt8','cnt01/scene2_npc1','cnt01/scene2_npc2','cnt01/scene2_npc3','cnt01/scene2_npc4','cnt01/scene2_paper1','cnt01/scene2_paper1_title','cnt01/scene2_paper1_txt1','cnt01/scene2_paper1_txt2','cnt01/scene2_paper1_txt3','cnt01/scene2_paper1_txt4','cnt01/scene2_paper2','cnt01/scene2_paper2_point1','cnt01/scene2_paper2_point2',
        )
        //quiz02 이미지
        main_IMG.imageUrls.push(
            'cnt02/answer_hint','cnt02/bogi1','cnt02/bogi1_ck','cnt02/bogi1_on','cnt02/bogi2','cnt02/bogi2_ck','cnt02/bogi2_on','cnt02/bogi3','cnt02/bogi3_ck','cnt02/bogi3_on','cnt02/bogi4','cnt02/bogi4_ck','cnt02/bogi4_on','cnt02/feed_bg','cnt02/feed1_caption','cnt02/feed1_txt1','cnt02/feed1_txt2','cnt02/feed1_txt3','cnt02/quiz_bg','cnt02/quiz_brit1','cnt02/quiz_brit2','cnt02/quiz_jimun','cnt02/quiz_question','cnt02/quiz_title','cnt02/result_con','cnt02/result_npc_txt1','cnt02/result_npc_txt2','cnt02/result_npc1','cnt02/result_npc2','cnt02/scene1_bg','cnt02/scene1_bg_cover','cnt02/scene1_bg_item','cnt02/scene1_item1','cnt02/scene1_item2','cnt02/scene1_item3','cnt02/scene1_item4','cnt02/scene1_npc_txt1','cnt02/scene1_npc_txt2','cnt02/scene1_npc_txt3','cnt02/scene1_npc_txt4','cnt02/scene1_npc_txt5','cnt02/scene1_npc1','cnt02/scene1_npc2','cnt02/scene1_npc3','cnt02/scene1_npc4','cnt02/scene1_title','cnt02/secene1_paper','cnt02/secene1_paper_txt1','cnt02/secene1_paper_txt2','cnt02/secene1_paper_txt3',
        );
        //quiz03 이미지
        main_IMG.imageUrls.push(
            'cnt03/answer_hint','cnt03/bogi1','cnt03/bogi1_ck','cnt03/bogi2','cnt03/bogi2_ck','cnt03/bogi3','cnt03/bogi3_ck','cnt03/feed_bg','cnt03/feed1_caption','cnt03/feed1_txt1','cnt03/feed1_txt2','cnt03/feed1_txt3','cnt03/feed1_txt4','cnt03/quiz_bg','cnt03/quiz_brit','cnt03/quiz_jimun','cnt03/quiz_question','cnt03/quiz_title','cnt03/result_con','cnt03/result_npc_txt1','cnt03/result_npc_txt2','cnt03/result_npc1','cnt03/result_npc2','cnt03/scene1_bg','cnt03/scene1_npc_txt1','cnt03/scene1_npc_txt2','cnt03/scene1_npc_txt3','cnt03/scene1_npc_txt4','cnt03/scene1_npc_txt5','cnt03/scene1_npc1','cnt03/scene1_npc2','cnt03/scene1_npc3','cnt03/scene1_npc4','cnt03/scene1_title','cnt03/secene1_paper','cnt03/secene1_paper_txt1','cnt03/secene1_paper_txt2','cnt03/secene1_paper_txt3','cnt03/secene1_paper_txt4',
        );
        //reuslt 이미지
        main_IMG.imageUrls.push(
            'result/act1','result/act1_ck','result/act2','result/act2_ck','result/act3','result/act3_ck','result/bg','result/bg2','result/btn_exit','result/btn_exit_over','result/btn_re','result/btn_re_over','result/paper','result/scene1_npc_txt1','result/scene1_npc_txt2','result/scene1_npc_txt3','result/scene1_npc_txt4','result/scene1_npc1','result/scene1_npc2','result/scene2_npc_txt1','result/scene2_npc_txt2','result/scene2_npc1','result/scene2_npc2','result/scene3_npc_txt1','result/scene3_npc_txt2','result/scene3_npc1','result/scene3_npc2',
        );

        await main_IMG.preloadImages(main_IMG.imageUrls);
    }
    async preloadImages(urls, concurrency = 5) { // 한 번에 5개씩 처리
        let main_IMG = this;
        const results = [];
        const remainingUrls = [...urls];

        if (main_IMG.preload_IMG == true) return;

        const worker = async () => {
            while (remainingUrls.length > 0) {
                const url = remainingUrls.shift();
                await new Promise((resolve) => {
                    const img = new Image();
                    img.src = `./common/images/${url}.png`;
                    img.onload = resolve;
                    img.onerror = resolve; // 에러 시에도 다음 이미지 진행
                });
            }
        };

        // 설정한 동시 실행 수만큼 워커 실행
        const workers = Array(Math.min(concurrency, urls.length)).fill(null).map(() =>
            worker()
        );

        await Promise.all(workers);
    }
}