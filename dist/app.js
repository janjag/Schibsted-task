'use strict';

(function(doc) {
    var EV_CHANGE = 'change';
    var EL_RVM_SELECT = '.rvm-select';
    var EL_RVM_RES_HEADER = '.rvm-response-header code';
    var EL_RVM_RES = '.rvm-response pre';
    var EL_DATA_URL = 'data-url';
    var EL_DATA_SRC = 'data-src';
    var EL_DATA_PARENTID = 'data-parentid';
    var REQ_GET = 'GET';

    var APP_JSON = 'aplication/json';
    var APP_XML = 'aplication/xml';

    function getElement(el) {
        return document.querySelector(el);
    }
    
    /**
     * @param  {string} reqType  Request type
     * @param  {string} url   Request url
     * @param  {string} type Response file type
     * @param  {string} id Section id
     * @param  {function} callback Callback function
     */
    function getFile(reqType, url, type, id, callback) {
        var request = new XMLHttpRequest();
        request.open(reqType, url, true);

        request.onload = function() {
            if (request.status >= 200 && request.status < 400) {
                // Success!
                updateResFile(id, request.responseURL, type, request.response);
            } else {
                // We reached our target server, but it returned an error
            }
        };

        request.onerror = function() {
        // There was a connection error of some sort
        };
        request.send();
        callback;
    }
    /**
     * @param  {string} id Section id
     * @param  {string} type Response file type - json or xml
     */
    function updateResHeader(id, type) {
        var el = getElement(id + ' ' + EL_RVM_RES_HEADER);
        var elHTML = el.textContent;
        var newHTML;
        switch (type) {
            case 'xml':
                newHTML = elHTML.replace(APP_JSON, APP_XML);
                break;
            case 'json':
                newHTML = elHTML.replace(APP_XML, APP_JSON);
                break;
            default:
                newHTML = elHTML.replace(APP_XML, APP_JSON)
        }

        el.textContent = newHTML;
        Prism.highlightElement(el);
    }

    /**
     * @param  {string} id Section id
     * @param  {string} url Response url
     * @param  {string} type Response file type - json or xml
     * @param  {string} response Response body
     */
    function updateResFile(id, url, type, response) {
        var el = getElement(id + ' ' + EL_RVM_RES);

        el.classList = '';
        el.classList.add('language-'+ type);
        el.textContent = response;
        el.setAttribute(EL_DATA_SRC, url);
        Prism.highlightElement(el);
    }

    doc.addEventListener(EV_CHANGE, function(ev) {
        if(ev.target.matches(EL_RVM_SELECT)) {
            var value = ev.target.value
            var url = ev.target.getAttribute(EL_DATA_URL);
            var id = '#' + ev.target.getAttribute(EL_DATA_PARENTID);

            getFile(REQ_GET, url + value, value, id, updateResHeader(id,value));
        }
    });
    

})(document);