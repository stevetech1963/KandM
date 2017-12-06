define('ItemsKeyMapping.Site', [
    'ItemsKeyMapping',
    'SC.Configuration',
    'underscore'
], function (
    ItemsKeyMapping,
    Configuration,
    _
) {
    'use strict';

    Configuration.itemKeyMapping = _.extend(Configuration.itemKeyMapping || {}, {
        _name: function (item) {
             // If its a matrix child it will use the name of the parent
            var itemId = item.get('itemid') || '';
            var parent = item.get('_matrixParent');
            var matches;
            var childName;
            if (parent.get('internalid')) {
                // we need the displayname included in the itemdid, see #B-11868
                matches = itemId.match(/:(.*)/);
                childName = matches && matches[1];
                return childName || item.get('salesdescription') || parent.get('storedisplayname2') || parent.get('displayname') || itemId;
            }
             // Otherways return its own name
            return item.get('salesdescription') || item.get('storedisplayname2') || item.get('displayname') || itemId;
        }

    });
});
