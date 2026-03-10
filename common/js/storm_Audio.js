import { quiz_Main } from './storm_init.js';
/*오디오 */
export class Audio {
    constructor() {
        /*음성 파일*/
        this.na_cache = {};
        this.na_current = null;
        this.na_Id;
        this.na_list=[
            'empt',
            'Hs_chi_02_01_01','Hs_chi_02_01_02_1','Hs_chi_02_01_02_2','Hs_chi_02_01_03','Hs_chi_02_01_04','Hs_chi_02_01_05','Hs_chi_02_01_06','Hs_chi_02_01_07','Hs_chi_02_01_08','Hs_chi_02_01_09','Hs_chi_02_01_10',

            'Hs_chi_cmm_o','Hs_chi_cmm_x','Hs_chi_cmm_x2',
            'Hs_chi_02_02_01','Hs_chi_02_02_02','Hs_chi_02_02_03','Hs_chi_02_02_03n_1','Hs_chi_02_02_03n_2','Hs_chi_02_02_03n_3_1','Hs_chi_02_02_03n_3_2','Hs_chi_02_02_05','Hs_chi_02_02_06_1','Hs_chi_02_02_06_2','Hs_chi_02_02_07','Hs_chi_02_02_08','Hs_chi_02_02_08n_1','Hs_chi_02_02_08n_2','Hs_chi_02_02_08n_3','Hs_chi_02_02_09','Hs_chi_02_02_10','Hs_chi_02_02_11','Hs_chi_02_02_12',
            'Hs_chi_02_02_q','Hs_chi_02_02_hint',
            'Hs_chi_02_02_feed1_1','Hs_chi_02_02_feed1_2','Hs_chi_02_02_feed1_3','Hs_chi_02_02_feed2',
            'Hs_chi_02_02_13','Hs_chi_02_02_14',

            'Hs_chi_02_03_01','Hs_chi_02_03_02','Hs_chi_02_03_03','Hs_chi_02_03_03n_1','Hs_chi_02_03_03n_2','Hs_chi_02_03_03n_3','Hs_chi_02_03_04_1','Hs_chi_02_03_04_2','Hs_chi_02_03_05',
            'Hs_chi_02_03_q','Hs_chi_02_03_hint',
            'Hs_chi_02_03_feed1_1','Hs_chi_02_03_feed1_2','Hs_chi_02_03_feed1_3',
            'Hs_chi_02_03_06','Hs_chi_02_03_07',

            'Hs_chi_02_04_01','Hs_chi_02_04_02','Hs_chi_02_04_03','Hs_chi_02_04_03n_1','Hs_chi_02_04_03n_2','Hs_chi_02_04_03n_3','Hs_chi_02_04_03n_4','Hs_chi_02_04_04','Hs_chi_02_04_05',
            'Hs_chi_02_04_q','Hs_chi_02_04_hint',
            'Hs_chi_02_04_feed1_1','Hs_chi_02_04_feed1_2','Hs_chi_02_04_feed1_3','Hs_chi_02_04_feed1_4',
            'Hs_chi_02_04_06','Hs_chi_02_04_07',

            'Hs_chi_02_05_01_01','Hs_chi_02_05_01_02','Hs_chi_02_05_02_01','Hs_chi_02_05_02_02','HS_chi_02_05_03_01','Hs_chi_02_05_03_02','Hs_chi_02_05_03_03','Hs_chi_02_05_03_04',
        ]
        /*효과음 파일*/
        this.ef_cache = {};
        this.ef_current = null;
        this.ef_Id;
        this.ef_list=[  //효과음 파일
            'q_correct','q_wrong','ef_button','ef_bubble','ef_stamp','ef_show',
            'ef_bubble','ef_msg','ef_phone','ef_zoom','ef_scroll',
        ]
        /*bgm 파일*/
        this.bgm_cache = {};
        this.bgm_current = null;
        this.bgm_Id;
        this.bgm_list=[  //효과음 파일
            'bgm_main','bgm_intro','bgm_quiz',
        ]
        this.bgm_load={ //활동 별 처음 나올 bgm 로드
            0:"bgm_main",
            1:"bgm_quiz",
            2:"bgm_quiz",
            3:"bgm_quiz",
            4:"bgm_intro"
        }

        //볼륨 설정
        this.ef_vol=0.3;
        this.na_vol=1;
        this.bgm_vol=0.2;

        //속도 설정
        this.rate=1;
        
		this.preload_bgm=false;
    }
    async init_bgm(){
        let main_audio=this;

        if(main_audio.preload_bgm==true) return;

        //bgm 준비
        main_audio.bgm_list.forEach(file => {
            main_audio.bgm_cache[file] = new Howl({
                src: ["./common/mp3/"+file+".mp3"],
                loop: true,
                volume: 0.5,
                preload: false
            });
        });
    }
    async init_ef(){
        let main_audio=this;

        if(main_audio.preload_bgm==true) return;

        main_audio.ef_list.forEach(file => {
            main_audio.ef_cache[file] = new Howl({
                src: ["./common/mp3/"+file+".mp3"],
                volume: 0.5,
                preload: true
            });
        });
    }
    async init_na(){
        let main_audio=this;

        if(main_audio.preload_bgm==true) return;
        
        // 음성 사전 로딩
        main_audio.na_list.forEach(file => {
            main_audio.na_cache[file] = new Howl({
                src: ["./common/mp3/"+file+".mp3"],
                volume: 0.5,    
                preload: true
            });
        });
    }

    /*251024 음성 로드*/
    play_na(fileName, volume = this.na_vol ,rate = this.rate) {
        let main_audio=this;

        return new Promise((resolve, reject) => {
            const sound = main_audio.na_cache[fileName];

            if (!sound) {
                reject("사운드가 로드되지 않았습니다: " + fileName);
                return;
            }

            //속도 설정
            sound.rate(rate);
            // 볼륨 설정
            sound.volume(volume);

            //상단 뮤트설정
            if(quiz_Main.getInstance().st_mute==true){
                sound.mute(true);  
            }else{
                sound.mute(false);
            }

            // 재생 시작
            const na_Id = sound.play();  
            
            quiz_Main.getInstance().howl_na=sound;

            if (!na_Id) {
                reject("재생 실패: " + fileName);
                return;
            }

            const cleanup = () => {
                sound.off("end", onEnd);   // 이벤트 해제
                main_audio.na_current = null;
            };

            const onEnd = (id) => {
                if (id === na_Id) {
                    cleanup();
                    resolve();  // 재생 끝남
                }
            };

            sound.once("end", onEnd);
            
            // 추적용
            main_audio.na_current = {
                fileName,
                na_Id,
                sound,
                stop() {
                    sound.stop(na_Id);
                    //20251121_음성중지 gsap 진행 문제 수정
                    cleanup();
                }
            };
        });
    }
    /*251024 효과음 로드*/
    play_ef(fileName, volume = this.ef_vol){
        let main_audio=this;
        return new Promise((resolve, reject) => {
        const sound = main_audio.ef_cache[fileName];        
        
        //상단 뮤트설정
        if(quiz_Main.getInstance().st_mute==true){
            sound.mute(true);  
        }else{
            sound.mute(false);
        }        
        
        // 볼륨 설정
        sound.volume(volume);

        // 재생 시작
        const ef_Id = sound.play();  
        quiz_Main.getInstance().howl_ef=sound;

        const cleanup = () => {
            sound.off("end", onEnd);   // 이벤트 해제
            sound.off("stop", onStop);
            main_audio.ef_current = null;
        };

        const onEnd = (id) => {
            if (id === ef_Id) {
                cleanup();
                resolve();  // 재생 끝남
            }
        };

        const onStop = (id) => {
            if (id === ef_Id) {
                //cleanup();
                sound.off("stop", onStop);
                resolve();  // 도중 중단도 resolve
            }
        };
        
        sound.once("end", onEnd);
        sound.once("stop", onStop);

        // 추적용
        main_audio.ef_current = {
            fileName,
            ef_Id,
            sound,
            stop() {
                sound.stop(ef_Id);
                cleanup();
                resolve(); // 강제 종료 시 resolve도 필요
            }
        };
        });
    }
    /*251024 bgm 로드*/
    play_bgm(fileName, volume = this.bgm_vol) {
        let main_audio = this;
        const sound = main_audio.bgm_cache[fileName];

        // 볼륨 설정
        sound.volume(volume);

        //상단 뮤트설정
        if (quiz_Main.getInstance().st_mute == true) {
            sound.mute(true);
        } else {
            sound.mute(false);
        }

        sound.play();        
        quiz_Main.getInstance().howl_bgm = sound;
    }
    load_bgm(fileName, volume = this.bgm_vol){
        let main_audio=this;
        
        if(main_audio.preload_bgm==true) return;

        const sound = main_audio.bgm_cache[fileName]; 
        
        if (!sound) return;

        if (sound.state() === 'unloaded') {
            console.log(`[BGM] ${fileName} 파일이 로드되지 않아 로드를 시작합니다.`);
            sound.load(); // 수동 로드 시작
        }
    }
}