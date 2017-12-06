define(
    'OrderWizard.Module.Mounting',
    [
        'Wizard.Module',
        'order_wizard_mount.tpl',
        'Utils'
    ],
    function OrderWizardModuleMounting(
        WizardModule,
        orderWizardMountTpl
    ) {
        'use strict';

        return WizardModule.extend({
            template: orderWizardMountTpl,
            events: { 'change #custbody_mounting_selected': 'changeMountingOptions' },

            initialize: function () {
                WizardModule.prototype.initialize.apply(this, arguments);
            },
            changeMountingOptions: function () {
                var checked = this.$el.find('#custbody_mounting_selected:checked').length;
                console.log('mounting ' + this.$el.find('#custbody_mounting_selected:checked').length);

                if (checked === 1) {
                    this.model.get('options').custbody_mounting_selected = 'T';
                } else {
                    this.model.get('options').custbody_mounting_selected = 'F';
                }
                this.model.get('options').custbody_mounting_notes = this.$el.find('#custbody_mounting_notes_field').val();
                this.model.save();
            },
            submit: function () {
                var checked = this.$el.find('#custbody_mounting_selected:checked').length;
                console.log('mounting ' + this.$el.find('#custbody_mounting_selected:checked').length);

                if (checked === 1) {
                    this.model.get('options').custbody_mounting_selected = 'T';
                } else {
                    this.model.get('options').custbody_mounting_selected = 'F';
                }
                this.model.get('options').custbody_mounting_notes = this.$el.find('#custbody_mounting_notes_field').val();
                return this.isValid();
            }
        });
    }
);
