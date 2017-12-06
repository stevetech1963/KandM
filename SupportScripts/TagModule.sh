#!/bin/bash
PS_SVN_ROOT="https://ps-svn01.corp.netledger.com/svn/SVN-PS/"
EFFICIENCIES_ROOT=$PS_SVN_ROOT"Efficiencies/"
EFFICIENCIES_MODULES_TRUNK=$EFFICIENCIES_ROOT"trunk/SuiteCommerce/Denali/Modules/efficiencies/"
EFFICIENCIES_TAGS=$EFFICIENCIES_ROOT"Tags/Modules/efficiencies/"
MODULE_NAME=$1
MODULE_VERSION=$2
OVERRIDE=$3
CURRENT_DEV_VERSION_NAME=$4

EXPECTED_ARGS=2 #Module and Revision
E_BADARGS=65


NEW_REPO_PATH=$EFFICIENCIES_TAGS$MODULE_NAME'@'$MODULE_VERSION'@'

svn info $NEW_REPO_PATH
SVN_EXISTS=$?

if [[ $4 == "" ]]
then
    CURRENT_DEV_VERSION_NAME="dev"
fi


if [ $SVN_EXISTS -eq 0 ]
then
    if [[ $3 == "Override" ]]
    then
        echo "WILL REMOVE"
        svn delete -m "Re-Tagging module, removing" $NEW_REPO_PATH
    else
        echo "No override param, but repo exists. Aborting"
        exit 1
    fi
fi

svn cp $EFFICIENCIES_MODULES_TRUNK$MODULE_NAME@$CURRENT_DEV_VERSION_NAME@ $NEW_REPO_PATH -m '"'$MODULE_NAME' - '$MODULE_VERSION'"'