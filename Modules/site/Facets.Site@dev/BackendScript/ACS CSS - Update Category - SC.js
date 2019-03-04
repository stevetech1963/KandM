/**
 *@NApiVersion 2.x
 *@NScriptType ScheduledScript
 */
define(['N/search', 'N/record'],
    function(search, record) {
        function execute(context) {
            try {
                var categorySearch = search.create({
                    type: search.Type.COMMERCE_CATEGORY,
                    columns: ['internalid', 'primaryparent']
                });
                var categories = [];

                categorySearch.run().each(function (result) {
                    categories.push({
                        internalId: result.getValue({
                            name: 'internalid'
                        }),
                        primaryParent: result.getValue({
                            name: 'primaryparent'
                        })
                    });

                    return true;
                });
            } catch (e) {
                log.debug({
                    title: 'ACS CSS - Update Category - search category: ' + e.name,
                    details: e.message
                });
            }

            try {
                for (var i = 0; i < categories.length; i++) {
                    var categoryRecord = record.load({
                        type: record.Type.COMMERCE_CATEGORY,
                        id: categories[i].internalId,
                        dynamic: true
                    });

                    var totalLines = categoryRecord.getLineCount({
                        sublistId: 'items'
                    });

                    if (totalLines === 0 && categories[i].primaryParent) {
                        categoryRecord.setValue({
                            fieldId: 'displayinsite',
                            value: 'F'
                        });

                        categoryRecord.save();
                    }
                }
            } catch (e) {
                log.debug({
                    title: 'ACS CSS - Update Category - load and save category: ' + e.name,
                    details: e.message
                });
            }
        }

        return {
            execute: execute
        };
    }
);
