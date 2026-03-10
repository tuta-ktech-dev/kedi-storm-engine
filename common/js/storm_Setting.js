import { quiz_Main } from './storm_init.js';
/*셋팅 화면*/
export class Setting {
    static updateTrackFill(el) {
        const pct = ((el.value - el.min) / (el.max - el.min)) * 100;
        el.style.background = `linear-gradient(90deg, #c97c3f ${pct}%, #cbb9aa ${pct}%)`;
    }
    constructor() {

        this.setting_domNodes={};

        this.setting;
    }
    
    async init(){
        let main_obj=quiz_Main.getInstance();
        let main_setting=this;
        let title,btn_reset,btn_exit,sub_txt;

        main_setting.setting=quiz_Main.crtEl('div','setting');
        main_setting.setting_domNodes["setting"]=main_setting.setting;

        main_setting.ui_box=quiz_Main.crtEl('div','ui_box');

        title=quiz_Main.crtEl('div','title');
        title.textContent="소리 및 화면 설정";
        main_setting.ui_box.appendChild(title);

        main_setting.set_ef(main_setting.ui_box);        
        main_setting.set_bgm(main_setting.ui_box);
        main_setting.set_na(main_setting.ui_box);
        main_setting.set_na_rate(main_setting.ui_box);
        main_setting.set_bright(main_setting.ui_box);

        btn_reset=quiz_Main.crtEl('div','btn_reset');
        btn_reset.appendChild(quiz_Main.crtEl('div','btn_cursor'));
        main_setting.ui_box.appendChild(btn_reset);        
        main_setting.setting_domNodes.setting["btn_reset"]=btn_reset;
        btn_reset.addEventListener('click',()=>{
            //초기설정
            main_setting.reset();
        });

        btn_exit=quiz_Main.crtEl('div','btn_exit');
        btn_exit.appendChild(quiz_Main.crtEl('div','btn_cursor'));
        main_setting.ui_box.appendChild(btn_exit);
        main_setting.setting_domNodes.setting["btn_exit"]=btn_exit;
        btn_exit.addEventListener('click',()=>{
            main_obj.audio.play_ef("ef_button");
            //초기설정
            gsap.to(main_setting.setting, {opacity: 0, duration: 0.5, ease: "power1.out",onComplete:function(){
                main_setting.setting.style.display="none";                
            }});   
        });

        sub_txt=quiz_Main.crtEl('div','sub_txt');
        sub_txt.textContent="* 중앙의 동그란 버튼을 좌우로 움직여 설정을 변경할 수 있습니다.";
        main_setting.ui_box.appendChild(sub_txt);

        main_setting.set_evt();

        main_setting.setting.appendChild(main_setting.ui_box);
        quiz_Main.getInstance().cnt_resize.appendChild(main_setting.setting);
    }
    set_ef(obj){
        let main_setting=this;
        let ef_set_box;

        ef_set_box=quiz_Main.crtEl('div','ef_set_box');
        main_setting.setting_domNodes["ef_set_box"]=ef_set_box;
        ef_set_box.appendChild(quiz_Main.crtEl('div','slider-control'))
        ef_set_box.children[0].appendChild(quiz_Main.crtEl('label','volumeSlider'));
        ef_set_box.children[0].children[0].textContent="효과음";
        ef_set_box.children[0].appendChild(quiz_Main.crtEl('span','volumeValue'));
        main_setting.setting_domNodes.ef_set_box["txt_ef"]=ef_set_box.children[0].children[1];
        ef_set_box.children[0].children[1].textContent="30";
        ef_set_box.children[0].appendChild(quiz_Main.crtEl('input','volumeSlider'));
        main_setting.setting_domNodes.ef_set_box["val_ef"]=ef_set_box.children[0].children[2];
        ef_set_box.children[0].children[2].type="range";
        ef_set_box.children[0].children[2].min="0";
        ef_set_box.children[0].children[2].max="100";
        ef_set_box.children[0].children[2].value="30";

        ef_set_box.children[0].children[2].addEventListener('input', e => Setting.updateTrackFill(e.target));
        Setting.updateTrackFill(ef_set_box.children[0].children[2]);
        
        obj.appendChild(ef_set_box);
    }
    set_bgm(obj){
        let main_setting=this;
        let bgm_set_box;

        bgm_set_box=quiz_Main.crtEl('div','bgm_set_box');
        main_setting.setting_domNodes["bgm_set_box"]=bgm_set_box;
        bgm_set_box.appendChild(quiz_Main.crtEl('div','slider-control'));
        bgm_set_box.children[0].appendChild(quiz_Main.crtEl('label','volumeSlider'));
        bgm_set_box.children[0].children[0].textContent="배경음";
        bgm_set_box.children[0].appendChild(quiz_Main.crtEl('span','volumeValue'));
        main_setting.setting_domNodes.bgm_set_box["txt_bgm"]=bgm_set_box.children[0].children[1];
        bgm_set_box.children[0].children[1].textContent="20";
        bgm_set_box.children[0].appendChild(quiz_Main.crtEl('input','volumeSlider'));
        main_setting.setting_domNodes.bgm_set_box["val_bgm"]=bgm_set_box.children[0].children[2];
        bgm_set_box.children[0].children[2].type="range";
        bgm_set_box.children[0].children[2].min="0";
        bgm_set_box.children[0].children[2].max="100";
        bgm_set_box.children[0].children[2].value="20";

        bgm_set_box.children[0].children[2].addEventListener('input', e => Setting.updateTrackFill(e.target));
        Setting.updateTrackFill(bgm_set_box.children[0].children[2]);

        obj.appendChild(bgm_set_box);
    }
    set_na(obj){
        let main_setting=this;
        let na_set_box;

        na_set_box=quiz_Main.crtEl('div','na_set_box');
        main_setting.setting_domNodes["na_set_box"]=na_set_box;
        na_set_box.appendChild(quiz_Main.crtEl('div','slider-control'))
        na_set_box.children[0].appendChild(quiz_Main.crtEl('label','volumeSlider'));
        na_set_box.children[0].children[0].textContent="음성";
        na_set_box.children[0].appendChild(quiz_Main.crtEl('span','volumeValue'));
        main_setting.setting_domNodes.na_set_box["txt_na"]=na_set_box.children[0].children[1];
        na_set_box.children[0].children[1].textContent="100";
        na_set_box.children[0].appendChild(quiz_Main.crtEl('input','volumeSlider'));
        main_setting.setting_domNodes.na_set_box["val_na"]=na_set_box.children[0].children[2];
        na_set_box.children[0].children[2].type="range";
        na_set_box.children[0].children[2].min="0";
        na_set_box.children[0].children[2].max="100";
        na_set_box.children[0].children[2].value="100";

        na_set_box.children[0].children[2].addEventListener('input', e => Setting.updateTrackFill(e.target));

        Setting.updateTrackFill(na_set_box.children[0].children[2]);

        obj.appendChild(na_set_box);
    }
    set_na_rate(obj){
        let main_setting=this;
        let na_rate;

        na_rate=quiz_Main.crtEl('div','na_rate');
        main_setting.setting_domNodes["na_rate"]=na_rate;
        na_rate.appendChild(quiz_Main.crtEl('div','slider-control'))
        na_rate.children[0].appendChild(quiz_Main.crtEl('label','volumeSlider'));
        na_rate.children[0].children[0].textContent="음성 속도";
        na_rate.children[0].appendChild(quiz_Main.crtEl('span','volumeValue'));
        main_setting.setting_domNodes.na_rate["txt_rate"]=na_rate.children[0].children[1];
        na_rate.children[0].children[1].textContent="X 1";
        na_rate.children[0].appendChild(quiz_Main.crtEl('input','volumeSlider'));
        main_setting.setting_domNodes.na_rate["val_rate"]=na_rate.children[0].children[2];
        na_rate.children[0].children[2].type="range";
        na_rate.children[0].children[2].min="0";
        na_rate.children[0].children[2].max="2";
        na_rate.children[0].children[2].step="0.1";
        na_rate.children[0].children[2].value="1";

        na_rate.children[0].children[2].addEventListener('input', e => Setting.updateTrackFill(e.target));
        Setting.updateTrackFill(na_rate.children[0].children[2]);

        obj.appendChild(na_rate);
    }
    set_bright(obj){
        let main_setting=this;
        let set_bright;

        set_bright=quiz_Main.crtEl('div','set_bright');
        main_setting.setting_domNodes["set_bright"]=set_bright;
        set_bright.appendChild(quiz_Main.crtEl('div','slider-control'))
        set_bright.children[0].appendChild(quiz_Main.crtEl('label','volumeSlider'));
        set_bright.children[0].children[0].textContent="화면 밝기";
        set_bright.children[0].appendChild(quiz_Main.crtEl('span','volumeValue'));
        main_setting.setting_domNodes.set_bright["txt_bright"]=set_bright.children[0].children[1];
        set_bright.children[0].children[1].textContent="50";
        set_bright.children[0].appendChild(quiz_Main.crtEl('input','volumeSlider'));
        main_setting.setting_domNodes.set_bright["val_bright"]=set_bright.children[0].children[2];
        set_bright.children[0].children[2].type="range";
        set_bright.children[0].children[2].min="0";
        set_bright.children[0].children[2].max="100";
        set_bright.children[0].children[2].value="50";

        set_bright.children[0].children[2].addEventListener('input', e => Setting.updateTrackFill(e.target));
        Setting.updateTrackFill(set_bright.children[0].children[2]);

        obj.appendChild(set_bright);
    }
    set_evt(){
        let main_setting=this;
        let txt_ef=main_setting.setting_domNodes.ef_set_box.txt_ef;
        let val_ef=main_setting.setting_domNodes.ef_set_box.val_ef;
        let txt_bgm=main_setting.setting_domNodes.bgm_set_box.txt_bgm;
        let val_bgm=main_setting.setting_domNodes.bgm_set_box.val_bgm;
        let txt_na=main_setting.setting_domNodes.na_set_box.txt_na;
        let val_na=main_setting.setting_domNodes.na_set_box.val_na;
        let txt_rate=main_setting.setting_domNodes.na_rate.txt_rate;
        let val_rate=main_setting.setting_domNodes.na_rate.val_rate;
        let txt_bright=main_setting.setting_domNodes.set_bright.txt_bright;
        let val_bright=main_setting.setting_domNodes.set_bright.val_bright;

        val_ef.addEventListener('change',function(){
            //효과음
            let val=this.value;
            txt_ef.textContent=val;

            main_setting.set_vol_ef(val);
        })
        val_bgm.addEventListener('change',function(){
            //bgm
            let val=this.value;
            txt_bgm.textContent=val;

            main_setting.set_vol_bgm(val);
        })
        val_na.addEventListener('change',function(){
            //음성
            let val=this.value;
            txt_na.textContent=val;

            main_setting.set_vol_na(val);
        })
        val_rate.addEventListener('change',function(){
            //음성 속도
            let val=this.value;
            txt_rate.textContent="X "+val;

            main_setting.set_rate_na(val);
        })
        val_bright.addEventListener('change',function(){
            //화면 밝기
            let val=this.value;
            txt_bright.textContent=val;
            
            main_setting.set_brightness(val);
        })
    }
    reset(){
        let main_setting=this;
        let txt_ef=main_setting.setting_domNodes.ef_set_box.txt_ef;
        let val_ef=main_setting.setting_domNodes.ef_set_box.val_ef;
        let txt_bgm=main_setting.setting_domNodes.bgm_set_box.txt_bgm;
        let val_bgm=main_setting.setting_domNodes.bgm_set_box.val_bgm;
        let txt_na=main_setting.setting_domNodes.na_set_box.txt_na;
        let val_na=main_setting.setting_domNodes.na_set_box.val_na;
        let txt_rate=main_setting.setting_domNodes.na_rate.txt_rate;
        let val_rate=main_setting.setting_domNodes.na_rate.val_rate;
        let txt_bright=main_setting.setting_domNodes.set_bright.txt_bright;
        let val_bright=main_setting.setting_domNodes.set_bright.val_bright;        

        txt_ef.textContent="30";
        val_ef.value="30";

        txt_bgm.textContent="20";
        val_bgm.value="20";

        txt_na.textContent="100";
        val_na.value="100";

        txt_rate.textContent="X 1";
        val_rate.value="1";

        txt_rate.textContent="X 1";
        val_rate.value="1";

        txt_bright.textContent="50";
        val_bright.value="50";

        main_setting.set_vol_ef(30);
        main_setting.set_vol_bgm(20);
        main_setting.set_vol_na(100);
        main_setting.set_brightness(50);
        main_setting.set_rate_na(1);

        Setting.updateTrackFill(main_setting.setting_domNodes.ef_set_box.children[0].children[2]);
        Setting.updateTrackFill(main_setting.setting_domNodes.bgm_set_box.children[0].children[2]);
        Setting.updateTrackFill(main_setting.setting_domNodes.na_set_box.children[0].children[2]);
        Setting.updateTrackFill(main_setting.setting_domNodes.na_rate.children[0].children[2]);
        Setting.updateTrackFill(main_setting.setting_domNodes.set_bright.children[0].children[2]);
    }
    set_brightness(val){
        let main_obj=quiz_Main.getInstance();
        let num;
        val=Number(val)+50;
        num=val/100;
        main_obj.top_menu.top_menu.style.filter="brightness("+num+")";
        main_obj.main_cnt.style.filter="brightness("+num+")";
        main_obj.pop_msg.msg_exit.style.filter="brightness("+num+")";

    }
    set_vol_na(val){
        let main_obj=quiz_Main.getInstance();

        val=val/100;
        main_obj.audio.na_vol=val;
        
        if(main_obj.howl_na!=undefined){
            main_obj.howl_na.volume(val);
        }
    }
    set_vol_bgm(val){
        let main_obj=quiz_Main.getInstance();

        val=val/100;
        main_obj.audio.bgm_vol=val;
        
        if(main_obj.howl_bgm!=undefined){
            main_obj.howl_bgm.volume(val);
        }
    }
    set_vol_ef(val){
        let main_obj=quiz_Main.getInstance();

        val=val/100;
        main_obj.audio.ef_vol=val;
        
        if(main_obj.howl_ef!=undefined){
            main_obj.howl_ef.volume(val);
        }
    }
    set_rate_na(val){
        let main_obj=quiz_Main.getInstance();
        main_obj.audio.rate=val;

        if(main_obj.howl_na!=undefined){
            main_obj.howl_na.rate(val);
        }
    }
}

