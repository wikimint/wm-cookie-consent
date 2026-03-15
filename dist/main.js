var wm_cookie_theme = "light";
var wm_cookie_position = "bottom-left";
var wm_cookie_font = "inherit";
var wm_cookie_title = "Cookie Consent";
var wm_cookie_policy_title = "Policy";
var wm_cookie_read_more = "";
var wm_cookie_current_script = document.currentScript;
var wm_cookie_message = "This website uses cookies to ensure you get the best experience on our website.";
if (wm_cookie_current_script.getAttribute("data-consent-description")) {
  wm_cookie_message = wm_cookie_current_script.getAttribute("data-consent-description");
}
if (wm_cookie_current_script.getAttribute("data-consent-title")) {
  wm_cookie_title = wm_cookie_current_script.getAttribute("data-consent-title");
}
if (wm_cookie_current_script.getAttribute("data-theme")) {
  wm_cookie_theme = wm_cookie_current_script.getAttribute("data-theme");
}
if (wm_cookie_current_script.getAttribute("data-position")) {
  wm_cookie_position = wm_cookie_current_script.getAttribute("data-position");
}
if (wm_cookie_current_script.getAttribute("data-font-family")) {
  wm_cookie_font = wm_cookie_current_script.getAttribute("data-font-family");
}
if (wm_cookie_current_script.getAttribute("data-policy-title")) {
  wm_cookie_policy_title = wm_cookie_current_script.getAttribute("data-policy-title");
}
if (wm_cookie_current_script.getAttribute("data-policy-link")) {
  var wm_cookie_policy_link = wm_cookie_current_script.getAttribute("data-policy-link");
  var wm_full_link = '<a target="_blank" href="' + wm_cookie_policy_link + '">' + wm_cookie_policy_title + "</a>.";
  wm_cookie_read_more = " For more information, see our " + wm_full_link;
}
const wm_cookie_element = document.createElement("DIV");
wm_cookie_element.innerHTML = `
<div id="wm_cookie" data-theme="` + wm_cookie_theme + `" data-position="` + wm_cookie_position + `">
   <div id="wm_cookie-consent">
      <h3>` + wm_cookie_icon + wm_cookie_title + `</h3>
      <p>` + wm_cookie_message + wm_cookie_read_more + `</p>
      <button id="wm_cookie-preferences">Settings</button>
      <button id="wm_deny-cookies">Deny</button>
      <button id="wm_accept-cookies">Accept</button>
   </div>
   <div id="wm_cookie-preferences-modal">
      <div id="wm_cookie-preferences-modal-content">
         <div style="margin-bottom:20px;display:inline-flex;overflow-x: auto;width:100%">
            <button class="wm_cookie-tab-button active" onclick="wmCookieTabs(event, 'wm_cookie-tab1')">Preferences</button>
            <button class="wm_cookie-tab-button" onclick="wmCookieTabs(event, 'wm_cookie-tab2')">Cookies</button>
            <button class="wm_cookie-tab-button" onclick="wmCookieTabs(event, 'wm_cookie-tab3')">Overview</button>
         </div>
         <div id="wm_cookie-preferences-modal-body">
            <div id="wm_cookie-tab1" class="wm_cookie-tab active"></div>
            <div id="wm_cookie-tab2" class="wm_cookie-tab">
               <h3>Cookies in action</h3>
               <table></table>
               <h3>Cookies blocked</h3>
               <div id="wm_cookies-blocked">
                  <p>No blocked cookies found.</p>
               </div>
            </div>   
            <div id="wm_cookie-tab3" class="wm_cookie-tab">
                <div id="wm_cookie-overview"></div>
            </div>
         </div>
         <div class="buttons-brand">
            <button id="wm_save-preferences">Save Preferences</button>
            <button id="wm_close-preferences">Close</button>
            <span class="wm_brand">Powered by <a href='https://developer.wikimint.com/p/cookie-consent-javascript-library.html' target='_blank'><button>wikimint</button></a></span>
         </div>
         </style>
      </div>
   </div>
</div>   `;
document.body.appendChild(wm_cookie_element);
var pref = {};
pref["essential"] = "Essential cookies are necessary for the website to function properly.";
pref["performance"] = "Performance cookies are used to analyze how visitors use a website.";
pref["functionality"] = "Functionality cookies enable a website to remember information and provide enhanced features.";
pref["advertising"] = "Advertising cookies are used to deliver advertisements relevant to the user's interests.";
pref["third-party"] = "Third-party cookies are placed by domains other than the one the user is visiting.";
pref["analytical"] = "Analytical cookies help website owners understand how visitors interact with the website.";
pref["session"] = "Session cookies are temporary cookies that are erased when the user closes the browser.";
pref["persistant"] = "Persistent cookies are stored on a user's device between browser sessions.";
pref["other"] = "All other cookies if any not listed in the above categories come under other cookies.";
for (var key in pref) {
  if (pref.hasOwnProperty(key)) {
    var accor = document.createElement("DIV");
    accor.setAttribute("class", "wm_cookie-accordion");
    accor.innerHTML = `
<div class="wm_cookie-option"  onclick="wmCookieAccordion(this)">
                <input type="checkbox" id="wm_cookie-` + key + `">
                <label style="text-transform: capitalize;" for="wm_cookie-` + key + `">` + key + ` Cookies</label>
            </div>
            <div class="wm_cookie-accordion-body">
            ` + pref[key] + `
            </div>`;
    document.getElementById("wm_cookie-tab1").appendChild(accor);
  }
}
function wm_setCookie(name, value, days) {
  const expires = /* @__PURE__ */ new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1e3);
  document.cookie = name + `=` + value + `;expires=` + expires.toUTCString() + `;path=/`;
}
function wm_getCookie(name) {
  const keyValue = document.cookie.match(`(^|;) ?` + name + `=([^;]*)(;|$)`);
  return keyValue ? keyValue[2] : null;
}
function wm_deleteCookie(name) {
  document.cookie = name + `=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
}
function wm_savePreferences(preferences) {
  localStorage.setItem("wm_cookie_preferences", JSON.stringify(preferences));
}
function wm_loadPreferences() {
  const preferences = localStorage.getItem("wm_cookie_preferences");
  return preferences ? JSON.parse(preferences) : {};
}
function wm_setConsent(consent) {
  wm_setCookie("cookie_consent", consent, 365);
  document.getElementById("wm_cookie-consent").style.display = "none";
  var value;
  if (consent === "accepted") {
    value = true;
  } else {
    value = false;
  }
  const preferences = {
    essential: value,
    performance: value,
    functionality: value,
    advertising: value,
    thirdParty: value,
    analytical: value,
    session: value,
    persistent: value,
    other: value
  };
  wm_setCookie("cookie_preferences", JSON.stringify(preferences), 365);
  wm_savePreferences(preferences);
  wm_manageCookies();
  document.querySelectorAll('#wm_cookie-preferences-modal-content input[type="checkbox"]').forEach(function(checkbox) {
    checkbox.checked = true;
  });
}
document.getElementById("wm_accept-cookies").addEventListener("click", function() {
  wm_setConsent("accepted");
  document.cookie = "cookie_consent=accepted; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/";
  wm_manageCookies();
  document.getElementById("wm_cookie-consent").style.display = "none";
});
document.getElementById("wm_deny-cookies").addEventListener("click", function() {
  wm_setConsent("denied");
  document.cookie = "cookie_consent=denied; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/";
  wm_manageCookies();
  document.getElementById("wm_cookie-consent").style.display = "none";
});
document.getElementById("wm_cookie-preferences").addEventListener("click", function() {
  const preferences = wm_loadPreferences();
  if (preferences) {
    for (const key2 in preferences) {
      if (preferences.hasOwnProperty(key2)) {
        const checkbox = document.getElementById("wm_cookie-" + key2);
        if (checkbox) {
          checkbox.checked = preferences[key2];
        }
      }
    }
  }
  document.getElementById("wm_cookie-preferences-modal").style.display = "block";
  if (!wm_cookie_overview) {
    fetch(wm_info_src).then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.text();
    }).then((content) => {
      document.getElementById("wm_cookie-overview").innerHTML = content;
      wm_cookie_overview = true;
    }).catch((error) => {
      console.error("There was a problem with your fetch operation:", error);
    });
  }
});
document.getElementById("wm_save-preferences").addEventListener("click", function() {
  document.getElementById("wm_cookie-preferences-modal").style.display = "none";
  const preferences = {};
  document.querySelectorAll('#wm_cookie-preferences-modal-content input[type="checkbox"]').forEach(function(checkbox) {
    preferences[checkbox.id.replace("wm_cookie-", "")] = checkbox.checked;
  });
  wm_savePreferences(preferences);
  wm_setCookie("cookie_preferences", JSON.stringify(preferences), 365);
  var preference = "accepted";
  for (var key2 in preferences) {
    if (preferences.hasOwnProperty(key2) && preferences[key2] === false) {
      preference = "preferred";
      break;
    }
  }
  wm_setCookie("cookie_consent", preference, 365);
  wm_manageCookies();
  document.getElementById("wm_cookie-consent").style.display = "none";
});
document.getElementById("wm_close-preferences").addEventListener("click", function() {
  document.getElementById("wm_cookie-preferences-modal").style.display = "none";
  wm_manageCookies();
});
document.getElementById("wm_cookie-manage").addEventListener("click", function() {
  document.getElementById("wm_cookie-consent").style.display = "block";
});
function wm_start_cookies() {
  var cookies = document.cookie.split(";").reduce((cookiesObj, cookie2) => {
    const [name, value] = cookie2.split("=");
    cookiesObj[name.trim()] = decodeURIComponent(value);
    return cookiesObj;
  }, {});
  var cookie_table = document.getElementById("wm_cookie-tab2").getElementsByTagName("table")[0];
  cookie_table.innerHTML = "";
  var blockBtn;
  for (var cookie in cookies) {
    if (!(cookie == "cookie_consent" || cookie == "cookie_preferences")) {
      blockBtn = "<button class='wm_cookie-block'>Block</button>";
    } else {
      blockBtn = "<button class='wm_cookie-must'>Must</button>";
    }
    var cookieList = document.createElement("tr");
    cookieList.innerHTML = "<td style='display:flex;'>" + blockBtn + "</td><td><div style='font-weight:600;' class='wm_cookie-name'>" + cookie + "</div><span class='wm_cookie-value'>" + cookies[cookie] + "</span></td>";
    cookie_table.appendChild(cookieList);
    if (localStorage.wm_cookie_blocked) {
      var cookie_block_table = document.getElementById("wm_cookies-blocked");
      cookie_block_table.innerHTML = "";
      var unBlockBtn = "<button class='wm_cookie-unblock'>Unblock</button>";
      var blockCookies = JSON.parse(localStorage.getItem("wm_cookie_blocked"));
      blockCookies.forEach(function(blockCookie) {
        var cookieList2 = document.createElement("div");
        cookieList2.setAttribute("style", "margin:0 6px 6px 0;");
        cookieList2.innerHTML = unBlockBtn + " <span>" + blockCookie + "</span>";
        cookie_block_table.appendChild(cookieList2);
      });
    }
  }
}
wm_start_cookies();
function wm_manageCookies() {
  var cookies = document.cookie.split(";").reduce((cookiesObj, cookie2) => {
    const [name, value] = cookie2.split("=");
    cookiesObj[name.trim()] = decodeURIComponent(value);
    return cookiesObj;
  }, {});
  var cookie_consent = wm_getCookie("cookie_consent");
  if (cookie_consent && cookie_consent == "denied") {
    for (var cookie in cookies) {
      if (!(cookie == "cookie_consent" || cookie == "cookie_preferences")) {
        wm_deleteCookie(cookie);
      }
    }
  } else if (cookie_consent && cookie_consent == "preferred") {
    var cookie_preferences = wm_getCookie("cookie_preferences");
  } else if (cookie_consent === null) {
    document.getElementById("wm_cookie-consent").style.display = "block";
  }
  if (localStorage.wm_cookie_blocked) {
    var blockCookies = JSON.parse(localStorage.getItem("wm_cookie_blocked"));
    blockCookies.forEach(function(blockCookie) {
      wm_deleteCookie(blockCookie);
    });
  }
  wm_start_cookies();
  wm_block_init();
  wm_unblock_init();
}
wm_manageCookies();
function wm_block_init() {
  var blockBtn = document.querySelectorAll(".wm_cookie-block");
  blockBtn.forEach(function(button) {
    button.addEventListener("click", function() {
      var blockCookies;
      var cookieName = this.closest("td").nextElementSibling.querySelector("div").textContent;
      if (localStorage.wm_cookie_blocked) {
        blockCookies = JSON.parse(localStorage.getItem("wm_cookie_blocked"));
      } else {
        blockCookies = [];
      }
      if (!blockCookies.includes(cookieName)) {
        blockCookies.push(cookieName);
        localStorage.setItem("wm_cookie_blocked", JSON.stringify(blockCookies));
        wm_manageCookies();
      }
    });
  });
}
function wm_unblock_init() {
  var blockBtn = document.querySelectorAll(".wm_cookie-unblock");
  blockBtn.forEach(function(button) {
    button.addEventListener("click", function() {
      var blockCookies;
      var cookieName = this.closest("div").querySelector("span").textContent;
      if (localStorage.wm_cookie_blocked) {
        blockCookies = JSON.parse(localStorage.getItem("wm_cookie_blocked"));
        if (blockCookies.includes(cookieName)) {
          blockCookies = blockCookies.filter(function(blockCookie) {
            return blockCookie !== cookieName;
          });
          localStorage.setItem("wm_cookie_blocked", JSON.stringify(blockCookies));
          wm_manageCookies();
        }
      }
    });
  });
}
window.onload = function() {
  wm_block_init();
  wm_unblock_init();
};
function wmCookieTabs(evt, tabName) {
  var i, tabContent, tabButtons;
  tabContent = document.getElementsByClassName("wm_cookie-tab");
  for (i = 0; i < tabContent.length; i++) {
    tabContent[i].style.display = "none";
  }
  tabButtons = document.getElementsByClassName("wm_cookie-tab-button");
  for (i = 0; i < tabButtons.length; i++) {
    tabButtons[i].className = tabButtons[i].className.replace(" active", "");
  }
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}
function wmCookieAccordion(accordion) {
  accordion.classList.toggle("active");
  var panel = accordion.nextElementSibling;
  if (panel.style.display === "block") {
    panel.style.display = "none";
  } else {
    panel.style.display = "block";
  }
}
