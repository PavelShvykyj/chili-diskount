import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';


@Injectable()
export class OneCDataService {

  constructor(private http : HttpClient) { }

  checkLogginData(usr:string, pwd:string, connection: string )
  {
    let headers1C = new HttpHeaders().append('Authorization','Basic '+btoa(usr+':'+pwd)).append('Content-Type','text/plain')
    //console.log(headers1C)
    return this.http.get(connection,
                        {headers:headers1C,
                         withCredentials:true,
                         reportProgress:true,
                         responseType:'text'})      
    
  }

  GetRequest(usr:string, pwd:string, connection: string)
  {
    let headers1C = new HttpHeaders().append('Authorization','Basic '+btoa(usr+':'+pwd)).append('Content-Type','text/plain')
    
    return this.http.get(connection,
                         {headers:headers1C,
                          withCredentials:true,
                          reportProgress:true,
                          responseType:'json'})

  }

  PostRequest(usr:string, pwd:string, connection: string, PostData: string)
  {
    let headers1C = new HttpHeaders().append('Authorization','Basic '+btoa(usr+':'+pwd)).append('Content-Type','text/plain')
    
    return this.http.post(connection,
                          PostData,
                          {headers:headers1C,
                          withCredentials:true,
                          reportProgress:true,
                          responseType:'text'})


  }

}

  

