"use strict";

var wm_info_src = null;
var wm_cookie_overview = null;
var wm_cookie_current_script = document.currentScript;
var wm_cookie_icon = '🍪';




if(wm_cookie_current_script.getAttribute("data-cookie-manage") && wm_cookie_current_script.getAttribute("data-cookie-manage") == "true"){

   var wm_cookie_manage = document.createElement("DIV");
    wm_cookie_manage.innerHTML = `
<span id="wm_cookie-manage">`+ wm_cookie_icon +`</span>
<style>    

#wm_cookie-manage{
  font-size:28px;
  padding: 0px 3px 4px 1px ! important;
  position: fixed;
  z-index: 99999999 ! important;
  background: #fff;
  box-shadow: 0 0 6px #999;
  cursor: pointer;
  border-radius: 100%;
  width: 35px;
  height: 35px;
  bottom: 12px;
  left: 12px;
  color: #555;
  display: flex;
  align-items: center;
  text-align: center;
}
#wm_cookie-manage svg{
  width:30px ! important;
  height:30px ! important;
  margin:auto;
}
  *[data-position^="bottom"] #wm_cookie-manage{
    bottom: -23px ! important;
    transition: bottom 0.3s ease;
    border-radius:3px 3px 0 0;
}
*[data-position^="top"] #wm_cookie-manage{
    top: -23px ! important;
    transition: top 0.3s ease;
    border-radius: 0 0 3px 3px;
}
*[data-position^="bottom"] #wm_cookie-manage:hover{
    bottom: 0px ! important;
}
*[data-position^="top"] #wm_cookie-manage:hover{
    top: 0px ! important;
}
</style>
`;

document.addEventListener("DOMContentLoaded", function () {
  const body = document.body || document.documentElement;
  body.appendChild(wm_cookie_manage);

  document.getElementById('wm_cookie-manage').addEventListener('click', function() {
    document.getElementById('wm_cookie-consent').style.display = 'block';
});

});

}


function wm_loadAllowedScripts() {

  /* Check consent cookie */

  if (!document.cookie.includes("cookie_preferences")) return;


  /* Get cookie_preferences */

  const prefMatch = document.cookie.match(/cookie_preferences=([^;]+)/);

  if (!prefMatch) return;

  let preferences;
  try {
    preferences = JSON.parse(prefMatch[1]);
  } catch (e) {
    console.error("WM Cookie Consent: Invalid preferences cookie");
    return;
  }


  /* Find all blocked elements */

  const elements = document.querySelectorAll("[data-src][data-consent]");


  elements.forEach(el => {

    const consent = el.dataset.consent;
    /* Skip if consent disabled */

    if (!preferences[consent]) return;


    const tag = el.tagName.toLowerCase();


    /* SCRIPT */

    if (tag === "script") {

if(el.dataset.src){
  el.setAttribute('src',el.dataset.src);
}

if(el.dataset.type){
  el.setAttribute('type',el.dataset.type);
}else{
  el.setAttribute('type','text/javascript');
}

}


    /* IFRAME */

    else if (tag === "iframe") {

      const iframe = document.createElement("iframe");

      iframe.src = el.dataset.src;

      Array.from(el.attributes).forEach(attr => {
        if (attr.name !== "data-src") {
          iframe.setAttribute(attr.name, attr.value);
        }
      });

      el.replaceWith(iframe);

    }


    /* IMAGE */

    else if (tag === "img") {

      el.src = el.dataset.src;

    }


    /* Prevent reloading */

    el.removeAttribute("data-src");
    el.removeAttribute("data-type");
    el.removeAttribute("data-consent");

  });

}

wm_loadAllowedScripts();
document.addEventListener("DOMContentLoaded", function () {
  wm_loadAllowedScripts();
});

function wm_cookie_source(){
    var current_src = wm_cookie_current_script.src;
    // Extract the file name
    var current_file = current_src.substring(current_src.lastIndexOf('/') + 1);
    
    // Assuming the new file name is "newFileName.js"
    var style_file = "style.min.css";
    var script_file = "main.min.js";
    var info_file = "cookie-overview.html";
    // Replace the file name in the script source
    var style_src = current_src.replace(current_file, style_file);
    var script_src = current_src.replace(current_file, script_file);
    wm_info_src = current_src.replace(current_file, info_file).replace("/dist","");
    
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = style_src;
    document.head.appendChild(link);
    

    var main = document.createElement("script");
    main.type = "text/javascript";
    main.src = script_src;
    document.head.appendChild(main);

    }

wm_cookie_source();



