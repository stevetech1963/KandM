var Handler = (function scriptHandler() {
    'use strict';


    function findFolder(name) {
        var filters =  [
            new nlobjSearchFilter('name', null, 'is', name),
            new nlobjSearchFilter('parent', null, 'is', '-16') // SuiteBundles folder ID
        ];
        var searchResult = nlapiSearchRecord('folder', null, filters);

        if (!searchResult ) {
            return null;
        }
        return searchResult[0].getId();
    }

    function checkFile(keepOld) {
        var file;
        var folderId;
        var existingFile;
        var fileExists = false;
        var data = JSON.stringify({
            'instagram': {
                key: '',
                secret: '',
                accessToken: ''
            }
        });
        var bundleId = nlapiGetContext().getBundleId() || '93280';
        var path = 'SuiteBundles/Bundle ' + bundleId + '/config/';
        var fileName = '.apicredentials.json';
        var configFolderRecord;
        var configFolderId;

        if (keepOld) {
            try {
                existingFile = nlapiLoadFile(path + '/' + fileName);
                fileExists = true;
            } catch (e) {
                fileExists = false;
            }
        }


        if (!fileExists) {
            folderId = findFolder('Bundle ' + bundleId);

            configFolderRecord = nlapiCreateRecord('folder');
            configFolderRecord.setFieldValue('name', 'config');
            configFolderRecord.setFieldValue('parent', folderId);
            configFolderId = nlapiSubmitRecord(configFolderRecord);

            file = nlapiCreateFile(fileName, 'PLAINTEXT', data);
            file.setFolder(configFolderId);

            file.setEncoding('UTF-8');
            nlapiSubmitFile(file);
        }
    }

    return {
        afterInstall: function afterInstall() {
            checkFile(false);
        },
        afterUpdate: function afterUpdate() {
            checkFile(true);
        }
    };
})();