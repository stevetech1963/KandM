define('LoginRegister.Register.Taxable.View',
    [
        'LoginRegister.Register.View',
        'underscore',
        'jQuery',
        'Utils'
    ],
    function LoginRegisterRegisterTaxableView(
        LoginRegisterRegisterView,
        _,
        $
    ) {
        'use strict';

        _.extend(LoginRegisterRegisterView.prototype, {
            events: {
                'submit form': 'saveForm',
                'click :checkbox': 'clickCheckbox'
            },

            clickCheckbox: function checkBox(e) {
                var target = $(e.target);
                if (target.is(':checkbox') && target[0].id === 'nontaxable') {
                    if (target.is(':checked')) {
                        $('#form-resaleDealerNumber').css('display', 'block');
                    } else {
                        $('#form-resaleDealerNumber').css('display', 'none');
                    }
                }
            }
        });
    }
);
