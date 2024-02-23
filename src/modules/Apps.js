import * as utils from '../lib/utils.js'

class Apps{
    /**
     * Creates a new instance with the given authentication token, API origin, and app ID,
     *
     * @class
     * @param {string} authToken - Token used to authenticate the user.
     * @param {string} APIOrigin - Origin of the API server. Used to build the API endpoint URLs.
     * @param {string} appID - ID of the app to use.
     */
    constructor (authToken, APIOrigin, appID) {
        this.authToken = authToken;
        this.APIOrigin = APIOrigin;
        this.appID = appID;
    }

    /**
     * Sets a new authentication token.
     *
     * @param {string} authToken - The new authentication token.
     * @memberof [Apps]
     * @returns {void}
     */
    setAuthToken (authToken) {
        this.authToken = authToken;
    }

    /**
     * Sets the API origin.
     * 
     * @param {string} APIOrigin - The new API origin.
     * @memberof [Apps]
     * @returns {void}
     */
    setAPIOrigin (APIOrigin) {
        this.APIOrigin = APIOrigin;
    }

    list = async (...args) => {
        let options = {};

        options = { "predicate": ['user-can-edit'] };
        
        return utils.make_driver_method(['uid'], 'puter-apps', 'select').call(this, options);
    }

    create = async (...args) => {
        let options = {};
        // * allows for: puter.apps.new('example-app') *
        if (typeof args[0] === 'string') {
            let indexURL = args[1];
            let title = args[2] ?? args[0];

            options = { object: { name: args[0], index_url: indexURL, title: title}};
        }else if (typeof args[0] === 'object' && args[0] !== null) {
            let options_raw = args[0];
            options = { 
                object: { 
                    name: options_raw.name, 
                    index_url: options_raw.indexURL, 
                    title: options_raw.title,
                    description: options_raw.description,
                    icon: options_raw.icon,
                    maximize_on_start: options_raw.maximizeOnStart,
                    filetype_associations: options_raw.filetypeAssociations,
                }
            };
        }
        // Call the original chat.complete method
        return await utils.make_driver_method(['object'], 'puter-apps', 'create').call(this, options);
    }

    update = async(...args) => {
        let options = {};

        // if there is one string argument, assume it is the app name
        // * allows for: puter.apps.update('example-app') *
        if (Array.isArray(args) && typeof args[0] === 'string') {
            let object_raw = args[1];
            let object = { 
                name: object_raw.name, 
                index_url: object_raw.indexURL, 
                title: object_raw.title,
                description: object_raw.description,
                icon: object_raw.icon,
                maximize_on_start: object_raw.maximizeOnStart,
                filetype_associations: object_raw.filetypeAssociations,
            };

            options = { id: { name: args[0]}, object: object};
        }

        // Call the original chat.complete method
        return await utils.make_driver_method(['object'], 'puter-apps', 'update').call(this, options);
    }

    get = async(...args) => {
        let options = {};
        // if there is one string argument, assume it is the app name
        // * allows for: puter.apps.get('example-app') *
        if (Array.isArray(args) && typeof args[0] === 'string') {
            options = { id: {name: args[0]}};
        }
        return utils.make_driver_method(['uid'], 'puter-apps', 'read').call(this, options);
    }

    delete = async(...args) => {
        let options = {};
        // if there is one string argument, assume it is the app name
        // * allows for: puter.apps.get('example-app') *
        if (Array.isArray(args) && typeof args[0] === 'string') {
            options = { id: {name: args[0]}};
        }
        return utils.make_driver_method(['uid'], 'puter-apps', 'delete').call(this, options);
    }

    getDeveloperProfile = function(...args){
        let options;
        const xhr = new XMLHttpRequest();

        // If first argument is an object, it's the options
        if (typeof args[0] === 'object' && args[0] !== null) {
            options = args[0];
        } else {
            // Otherwise, we assume separate arguments are provided
            options = {
                success: args[0],
                error: args[1],
            };
        }

        return new Promise((resolve, reject) => {
            xhr.open("get", (puter.APIOrigin + '/get-dev-profile'), true);
            xhr.setRequestHeader("Authorization", "Bearer " + puter.authToken);
            xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

            xhr.addEventListener('load', function(e){
                const resp = utils.parseResponse(this.responseText);
                // error
                if(this.status !== 200 && this.status !== 201){
                    // if error callback is provided, call it
                    if(options.error && typeof options.error === 'function')
                        options.error(resp)
                    // reject promise
                    return reject(resp)
                }
                // success
                else{
                    // if success callback is provided, call it
                    if(options.success && typeof options.success === 'function')
                        options.success(resp);
                    // resolve with success
                    return resolve(resp);
                }
            });

            // send request
            xhr.send();
        });
    }

}

export default Apps;