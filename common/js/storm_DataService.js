import { quiz_Main } from './storm_init.js';
/*LMS 통신 */
export class DataService {
    static IDCreator=(prefix="")=>`${prefix}${(Math.random()*(new Date().getTime())).toString(36)}`.replace(/\./g,'');
    static SetProm(){
        const prom = {fn:null,resolve:null,reject:null}
        prom.fn = new Promise((resolve,reject)=>{
            prom.resolve=resolve;
            prom.reject=reject;
        })
        return prom              
    }
    constructor() {
        this.Message={
            Pool:{},
            Receiver({data}){
              const pool = quiz_Main.getInstance().dataService.Message.Pool;
              const {id,value} = data;
              if(id && pool[id]){
                  pool[id].resolve(value) 
                  delete pool[id];
              } 
            },
            Sender:{
                //*학습자 데이터 로딩
                async Load(){
                    const type = "Load";
                    const id = DataService.IDCreator("prm_");
                    const prom = quiz_Main.getInstance().dataService.Message.Pool[id] = DataService.SetProm();
                    window.parent.postMessage({id,type},'*');
                    return prom.fn;
                },
                //*학습결과 저장
                async Save(step,user_input,result,trynum,start_time,finish_time){
                    const type = "Save";
                    const id = DataService.IDCreator("prm_");
                    const prom = quiz_Main.getInstance().dataService.Message.Pool[id] = DataService.SetProm();
                    
                    window.parent.postMessage({id,type,
                    step,user_input,result,trynum,start_time,finish_time
                    },'*');
        
                    return prom.fn;
                },
                //*학습결과 전체 초기화
                async ResetAll(total_step){
                    const type = "ResetAll";
                    const id = DataService.IDCreator("prm_");
                    const prom = quiz_Main.getInstance().dataService.Message.Pool[id] = DataService.SetProm();
        
                    window.parent.postMessage({id,type,total_step},'*');
        
                    return prom.fn;
                }
            }
        }
    }
    
    async LMS_data(type,step,input_result,sol_result,trynum,start_time,finish_time) {
        let data_obj=this;
        let main_obj=quiz_Main.getInstance();
        let step_num=1;
        
        if(type=="load"){
            //*이전 학습 데이터 로딩
            const {stepArray} = await data_obj.Message.Sender.Load();
            
            console.log(`stepArray.length:${stepArray.length}`);
            if(stepArray.length==0){
                //처음학습
                main_obj.quiz_num=0;
                return;
            }
            if(stepArray["0"].sol_result=='\x00'){
            //if(stepArray["0"].sol_result==null){
                //처음부터 다시 시작하기
                main_obj.quiz_num=0;
                return;
            }else{
                for(let i=0;i<3;i++){
                    if(stepArray[i+""]==undefined){
                        main_obj.quiz_num=step_num;
                        break;
                    }else{
                        if(stepArray[i+""].sol_result!='\x00'){
                        //if(stepArray[i+""].sol_result!=null){
                            main_obj.quiz_info["q"+step_num].answer=stepArray[i+""].sol_result;
                            main_obj.quiz_info["q"+step_num].chance=stepArray[i+""].trynum;
                            main_obj.quiz_info["q"+step_num].input_result=stepArray[i+""].input_result;
                            main_obj.quiz_info["q"+step_num].st_time=stepArray[i+""].start_time;
                            main_obj.quiz_info["q"+step_num].ed_time=stepArray[i+""].finish_time;
                            step_num++;
                        }else{
                            main_obj.quiz_num=step_num;
                            break;
                        }
                    }
                }
                if(stepArray.length+1==4){
                    console.log("학습완료");
                    main_obj.quiz_num=step_num; 
                }
            }
        }else if(type=="save"){
            //*이전 학습 데이터 저장     
            const result = await data_obj.Message.Sender.Save(
                step,input_result,sol_result,trynum,start_time,finish_time
            );
            console.log(result);
        }else if("reset"){
            const result1 = await data_obj.Message.Sender.ResetAll(3);
            if(result1=="true"){
                main_obj.quiz_num=0;
            }
            console.log(result1);
        }
    }
    
}

