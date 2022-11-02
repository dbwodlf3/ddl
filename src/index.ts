import axios from "axios";

export type APIType = "query" | "" | string ;
export type APIMethod = "post" | "get" | "" | string;

let DATA_ID = 0;

const DATA:any = {};

function object_to_query_string(queryStringObj: any){
    let temp = [];
    for(const key of Object.keys(queryStringObj)) {
      temp.push(`${key}=${queryStringObj[key]}`);
    }
  
    return temp.join("&");
  }

export class DefaultLayer {
    static id = DATA_ID++;
    static type: APIType = "";
    static method: APIMethod = '';
    static url = '';

    static getData(params?: any): Promise<any> | Promise<undefined> {
        if(this.method == "post") {
        }
        else if(this.method == "get") {
            if(this.type == "query") {
                
                const queries = object_to_query_string(params);
                const data = DATA[`${this.url}?${queries}`];

                if(data) { 
                    return new Promise((resolve)=>{
                        return resolve(data);
                    });
                }
                else { 
                    return axios.get(`${this.url}?${queries}`).then((api_result)=>{
                        DATA[`${this.url}?${queries}`] = api_result.data;
                        return api_result.data;
                    });
                }
            }
        }

        return new Promise((resolve, reject)=> resolve(undefined));
    }
}
