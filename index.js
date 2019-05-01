const fs = require("fs");
const fetch = require("node-fetch");
const path = require("path");
const color = require("colors");
const README = './README.md';


const absRoute = (file) => {
  if (path.isAbsolute(file)=== true){
    console.log(file);
  }else{
    pathAbs = path.resolve(file);
    return pathAbs;
  }
}
absRoute(README);

const validate = (res) => {
  const fetchResult = {
    page: res.url,
    pageStatus: res.status,
    pageMessage: res.statusText
  };
  if (fetchResult.pageStatus !== 200){
    const invalidate = `PATH  ${pathAbs} ${fetchResult.page} ${fetchResult.pageStatus} ${fetchResult.pageMessage}`;
    console.log(invalidate.red);
  }else{
    const validateLinks = `PATH  ${pathAbs} ${fetchResult.page} ${fetchResult.pageStatus} ${fetchResult.pageMessage}`;
    console.log(validateLinks.green);
  }
}

const getFetch = (link) => {
  fetch(link).then((res)=>{
    validate(res);
  })
}

const gLinks = (err, str) => {
  if (err){
    console.log(err.message);
  }else{
    const regExp = /(https?):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))/g;
    const links = str.match(regExp);
    for( let i = 0; i < links.length; i ++){
      let aLinks = links[i].split(')');
      let result = aLinks[0];
      getFetch(result);
    }
  }
}

const mdLinks = (README) =>{
  fs.readFile(README, 'utf-8', getFile = (err, str)=>{
    if (err){
      console.log(err.message);
    }else{
      gLinks(err, str);
    }
  })
}
mdLinks(README);


