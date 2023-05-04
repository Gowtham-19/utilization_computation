const express = require("express")
app=express()

/**
 * combinations tested for utilization
 * nsd case
 * running stopped nsd passed
 * running nsd stopped passed
 * running nsd passed
 * stopped nsd passed
 * nsd running stopped passed
 * nsd stopped running passed
 * complex case
 * running stopped nsd running
 * nsd running
 */

/**
 * 
 * Function to generate test data
 */
const generatedata = async function() {
    let start_time=new Date(new Date().setHours(15,0,0,0));
    let data=[];
    for(let i=1;i<=360;i++){
        start_time=new Date(new Date(start_time.setSeconds(new Date(start_time).getSeconds()+10)))
        if(i>=1 && i<=100){
            data.push({
                start_time:new Date(start_time).toISOString().slice(0,-5)+"Z",
                status:"running"
            })
        }
        else if(i>100 && i<=200){
            data.push({
                start_time:new Date(start_time).toISOString().slice(0,-5)+"Z",
                status:"running"
            })
        }else if(i>200){
            data.push({
                start_time:new Date(start_time).toISOString().slice(0,-5)+"Z",
                status:"stopped"
            })
        }       
    }
    return data
}

/**
 * Function to compute utilization on data
 * @param {*} data db date
 * @returns 
 */
const computeData =async (data)=> {
    //positive case    
    if(data.length>0){
        let start_time=new Date("2023-05-05T09:30:00Z");
        let end_time=new Date("2023-05-05T10:30:00Z");
        let data_end_time_in_ms=new Date(data[data.length-1]["start_time"]).getTime();
        let final_data=[];
        let data_start_time=start_time.toISOString().slice(0,-5)+"Z";
        let end_time_in_ms=new Date(end_time).getTime();
        let data_start_pos=-1;
        console.log("value of start time",new Date(data_start_time))
        console.log("value of data start time",new Date(data[0]["start_time"]))
        let intial_packet_difference=(new Date(data[0]["start_time"]).getTime()-new Date(data_start_time).getTime())/1000;
        // nsd condtion check
        if(intial_packet_difference>60){
            console.log("intial nsd condtion worked",intial_packet_difference)
            final_data.push({
                status:"nsd",
                start_time:data_start_time,
                end_time:data[0]["start_time"]
            })
            data_start_time=data[0]["start_time"];
            data_start_pos=0;
        }
        // proccesing data points
        for(let i=0;i<data.length;i++){
            let current_point=new Date(data[i]["start_time"]).getTime();
            let next_point=data[i+1]?new Date(data[i+1]["start_time"]).getTime():0;
            let difference=(next_point-current_point)/1000;
            if(i !== data.length-1 && data[i]["status"] != data[i+1]["status"]){
                final_data.push({
                    status:data[i]["status"],
                    start_time: data_start_time,
                    end_time:data[i]["start_time"]  
                })
                if(difference>60){
                    final_data.push({
                        status:"nsd",
                        start_time:data[i]["start_time"],
                        end_time:data[i+1]["start_time"]
                    })
                }
                data_start_time=data[i+1]["start_time"];
                data_start_pos=i+1;
            }else if(i!== data.length-1 && difference>60){
                final_data.push({
                    status:"nsd",
                    start_time:data_start_time,
                    end_time:data[i]["start_time"]
                })
                data_start_time=data[i+1]["start_time"];
                data_start_pos=i+1;
            }else if(i == data.length-1){
                //end point case for last point
                let difference = end_time_in_ms-data_end_time_in_ms;
                    if((difference/1000)>60){
                        if(data[data_start_pos-1]!=data[i]["status"]){
                            final_data.push({
                                status:data[i]["status"],
                                start_time:data_start_time,
                                end_time:data[i]["start_time"]
                            }) 
                        }
                        final_data.push({
                            status:"nsd",
                            start_time:data[i]["start_time"],
                            end_time:end_time
                        })  
                    }else{
                        if(data[data_start_pos-1]!=data[i]["status"]){
                            final_data.push({
                                status:data[i]["status"],
                                start_time:data_start_time,
                                end_time:data[i]["start_time"]
                            }) 
                        }
                    }
            }
        }
        return final_data
    }else{
        return [{
            status:"nsd",
            start_time:"2023-05-04T9:30:00Z",
            end_time:"2023-05-04T10:30:00Z",
        }]
    }
}

app.get("/test",async(req,res)=> {
    let data = await generatedata();
    let utilization=await computeData(data)
    res.status(200).json({
        data:utilization
    })
})

app.listen(7000,()=> {
    console.log("server listeneing on 7000")
})