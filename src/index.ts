export type APIType = "query" | "" | string ;
export type APIMethod = "post" | "get" | "" | string;

/** INTERFACES ===============================================================*/
interface Request {
    method: string;
    url: string;
    data?: any;
}

/** ENV VARS */
let DATA_ID = 0;

const DATA:any = {};

function object_to_query_string(queryStringObj: any){
    let temp = [];
    for(const key of Object.keys(queryStringObj)) {
      temp.push(`${key}=${queryStringObj[key]}`);
    }
  
    return temp.join("&");
}

function create_request(requestOption: Request): Promise<any>{
    return new Promise((resolve, reject)=>{
        const request = new XMLHttpRequest();
        request.open(requestOption.method, requestOption.url);
        request.send(requestOption.data);
        request.onload = ()=>{
            if(request.status >= 200 && request.status < 300) {
                /** If Request Response is JSON then parse*/
                resolve(JSON.parse(request.response));

                /** Else do */
            }
            else {
                reject(request.response);
            }
        }
    });
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
                    const request_option = {method: "get", url: `${this.url}?${queries}`};
                    return create_request(request_option).then((api_result)=>{
                        DATA[`${this.url}?${queries}`] = api_result;
                        return api_result;
                    });
                }
            }
        }

        return new Promise((resolve, reject)=> resolve(undefined));
    }
}
