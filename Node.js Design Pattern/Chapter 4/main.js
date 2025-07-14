import { error } from 'console'
import {spider} from './spider.js'
spider('https://hukush-pakush.com/',(err,filename,downloaded) =>{
    if(err)
    {
        console.error("Download error: ",err)
    }else{
        console.log(`Finished: ${filename}, downloaded: ${downloaded}`)
    }
})