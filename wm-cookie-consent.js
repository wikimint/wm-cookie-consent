"use strict";
var wm_info_src;
var wm_cookie_overview = null;
var wm_cookie_scripts = document.getElementsByTagName('script');
var wm_cookie_current_script = wm_cookie_scripts[wm_cookie_scripts.length - 1];
var wm_cookie_icon = '<svg version="1.1" width="30px" height="30px" id="Layer_1" fill="currentColor" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 120.23 122.88" style="enable-background:new 0 0 120.23 122.88" xml:space="preserve"><style type="text/css">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style><g><path class="st0" d="M98.18,0c3.3,0,5.98,2.68,5.98,5.98c0,3.3-2.68,5.98-5.98,5.98c-3.3,0-5.98-2.68-5.98-5.98 C92.21,2.68,94.88,0,98.18,0L98.18,0z M99.78,52.08c5.16,7.7,11.69,10.06,20.17,4.85c0.28,2.9,0.35,5.86,0.2,8.86 c-1.67,33.16-29.9,58.69-63.06,57.02C23.94,121.13-1.59,92.9,0.08,59.75C1.74,26.59,30.95,0.78,64.1,2.45 c-2.94,9.2-0.45,17.37,7.03,20.15C64.35,44.38,79.49,58.63,99.78,52.08L99.78,52.08z M30.03,47.79c4.97,0,8.99,4.03,8.99,8.99 s-4.03,8.99-8.99,8.99c-4.97,0-8.99-4.03-8.99-8.99S25.07,47.79,30.03,47.79L30.03,47.79z M58.35,59.25c2.86,0,5.18,2.32,5.18,5.18 c0,2.86-2.32,5.18-5.18,5.18c-2.86,0-5.18-2.32-5.18-5.18C53.16,61.57,55.48,59.25,58.35,59.25L58.35,59.25z M35.87,80.59 c3.49,0,6.32,2.83,6.32,6.32c0,3.49-2.83,6.32-6.32,6.32c-3.49,0-6.32-2.83-6.32-6.32C29.55,83.41,32.38,80.59,35.87,80.59 L35.87,80.59z M49.49,32.23c2.74,0,4.95,2.22,4.95,4.95c0,2.74-2.22,4.95-4.95,4.95c-2.74,0-4.95-2.22-4.95-4.95 C44.54,34.45,46.76,32.23,49.49,32.23L49.49,32.23z M76.39,82.8c4.59,0,8.3,3.72,8.3,8.3c0,4.59-3.72,8.3-8.3,8.3 c-4.59,0-8.3-3.72-8.3-8.3C68.09,86.52,71.81,82.8,76.39,82.8L76.39,82.8z M93.87,23.1c3.08,0,5.58,2.5,5.58,5.58 c0,3.08-2.5,5.58-5.58,5.58s-5.58-2.5-5.58-5.58C88.29,25.6,90.79,23.1,93.87,23.1L93.87,23.1z"/></g></svg>';

if(wm_cookie_current_script.getAttribute("data-cookie-manage") && wm_cookie_current_script.getAttribute("data-cookie-manage") == "true"){
    var  wm_cookie_manage = document.createElement("DIV");
    wm_cookie_manage.innerHTML = `
<span id="wm_cookie-manage">`+ wm_cookie_icon +`</span>
<style>    

#wm_cookie-manage{
  padding: 3px ! important;
  position: fixed;
  z-index: 999999999999 ! important;
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
document.body.appendChild(wm_cookie_manage);
}


function wm_cookie_source(){
    var current_src = wm_cookie_current_script.src;
    // Extract the file name
    var current_file = current_src.substring(current_src.lastIndexOf('/') + 1);
    
    // Assuming the new file name is "newFileName.js"
    var style_file = "style.css";
    var script_file = "main.js";
    var info_file = "overview.html";
    // Replace the file name in the script source
    var style_src = current_src.replace(current_file, style_file);
    var script_src = current_src.replace(current_file, script_file);
    wm_info_src = current_src.replace(current_file, info_file);
    
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = style_src;
    document.head.appendChild(link);
    


// Fetch the content of the JavaScript file
fetch(script_src)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.text();
  })
  .then(jsContent => {

    var script = document.createElement("SCRIPT");
    script.type = "text/javascript";
    script.innerHTML = jsContent;
    document.body.appendChild(script);    // You can evaluate the content, or parse it, etc.

  })
  .catch(error => {
    console.error('There was a problem with your fetch operation:', error);
  });


    }

wm_cookie_source();

