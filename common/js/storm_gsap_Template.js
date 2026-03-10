import { quiz_Main } from './storm_init.js';

/*gsap 모션 함수*/
export class gsap_Template {
    constructor() {
		gsap.registerPlugin(TextPlugin);
    }

    //템플릿1 onStart: 음성 실행 -> 음성 완료 다음 진행
    to_temp(obj, act, evt = "", audio = "", time = "") {
        let main_obj = quiz_Main.getInstance();

        const evtAct = {};

        for (let key in act) {
            evtAct[key] = act[key];
        }
        if (evtAct.duration == undefined) {
            evtAct.duration = 0.5;
        }
        if (evt?.onStart) {
            evtAct.onStart = typeof evt.onStart === "function"
                ? evt.onStart
                : new Function(evt.onStart);
        } else {
            evtAct.onStart = () => {
                if (audio != "") {
                    let test = "empt";
                    main_obj.audio.play_na(audio).then(() => {
                        if (main_obj.main_tl != null) {
                            main_obj.main_tl.play();
                        }
                    });
                }
            }
        }
        if (evt?.onComplete) {
            evtAct.onComplete = typeof evt.onComplete === "function"
                ? evt.onComplete
                : new Function(evt.onComplete);
        } else {
            if (audio != "") {
                evtAct.onComplete = () => { main_obj.main_tl.pause(); }
            }
        }

        if (time != "") {
            main_obj.main_tl.to(obj, evtAct, time);
        } else {
            main_obj.main_tl.to(obj, evtAct);
        }
    }
}