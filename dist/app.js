'use strict';

(function(doc) {
    var EV_CHANGE = 'change';
    var EL_RVM_SELECT = '.rvm-select';
    var EL_RVM_RES_HEADER = '.rvm-response-header code';
    var EL_RVM_RES = '.rvm-response pre';
    var EL_DATA_URL = 'data-url';
    var EL_DATA_SRC = 'data-src';
    var REQ_GET = 'GET';

    function getElement(el) {
        return document.querySelector(el);
    }
    
    /**
     * @param  {string} reqType  Request type
     * @param  {string} url   Request url
     * @param  {string} type Response file type
     * @param  {function} callback Callback function
     */
    function getFile(reqType, url, type, callback) {
        var request = new XMLHttpRequest();
        request.open(reqType, url, true);

        request.onload = function() {
            if (request.status >= 200 && request.status < 400) {
                // Success!
                updateResFile(request.responseURL, type, request.response);
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
     * @param  {string} type Response file type - json or xml
     */
    function updateResHeader(type) {
        var el = getElement(EL_RVM_RES_HEADER);
        var elHTML = el.textContent;
        var newHTML;
        switch (type) {
            case 'xml':
                newHTML = elHTML.replace('aplication/json', 'aplication/xml');
                break;
            case 'json':
                newHTML = elHTML.replace('aplication/xml', 'aplication/json');
                break;
            default:
                newHTML = elHTML.replace('aplication/xml', 'aplication/json')
        }

        el.textContent = newHTML;
        Prism.highlightElement(el);
    }

    /**
     * @param  {string} url Response url
     * @param  {string} type Response file type - json or xml
     * @param  {string} response Response body
     */
    function updateResFile(url, type, response) {
        var el = getElement(EL_RVM_RES);

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

            getFile(REQ_GET, url + value, value, updateResHeader(value));
        }
    });
    

})(document);