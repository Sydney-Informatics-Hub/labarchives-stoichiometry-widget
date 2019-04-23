/* Stoichiometry Widget implemented by Joel Nothman and Vijay Raghunath at the Sydney Informatics Hub

Please acknowledge our contribution to your work where appropriate:
"This research was supported by the Sydney Informatics Hub."

Copyright (c) 2018-9, The University of Sydney
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:
1. Redistributions of source code must retain the above copyright
   notice, this list of conditions and the following disclaimer.
2. Redistributions in binary form must reproduce the above copyright
   notice, this list of conditions and the following disclaimer in the
   documentation and/or other materials provided with the distribution.
3. All advertising materials mentioning features or use of this software
   must display the following acknowledgement:
   This product includes software developed by the University of Sydney.
4. Neither the name of the University of Sydney nor the
   names of its contributors may be used to endorse or promote products
   derived from this software without specific prior written permission.
THIS SOFTWARE IS PROVIDED BY <COPYRIGHT HOLDER> ''AS IS'' AND ANY
EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

my_widget_script =
    {
      init:function (mode, json_data) {
        //this method is called when the form is being constructed
        // parameters
        // mode = if it equals 'view' than it should not be editable
        //        if it equals 'edit' then it will be used for entry
        //        if it equals 'view_dev' same as view,  does some additional checks that may slow things down in production
        //        if it equals 'edit_dev' same as edit,   does some additional checks that may slow things down in production

        // json_data will contain the data to populate the form with, it will be in the form of the data
        // returned from a call to to_json or empty if this is a new form.
        //By default it calls the parent_class's init.

        //TO DO write code specific to your form

        // Precision for floats
        var nFixed = 2;

        this.parent_class.init(mode, json_data);

        mole1 = $('#the_form input[name=moles1_number]');
        fw1 = $('#the_form input[name=fw1_number]');
        if (mole1.val() && fw1.val()) {
          my_widget_script.enable_all_records()
        }

        if (mode.indexOf('view') > -1) {
          var isEmpty = function(tr) {
            var inputs = $('input', tr);
            for (var i = 0; i < inputs.length; i++) {
              if ($(inputs[i]).val()) {
                return false;
              }
            }
            return true;
          }

          $('#the_form tbody tr').each(function() {
            if (isEmpty(this)) {
              $(this).remove();
            }
          })
          return;
        }

        $('#the_form input[name^=amount]').on('change', function() {
          var tr = $(this).closest('tr');
          var is_initial_row = tr.attr('class') == 'initialRow';
          var fw = $('input[name^=fw]', tr);
          var amount = $('input[name^=amount]', tr);
          var moles = $('input[name^=moles]', tr);

          if (is_initial_row) {
            if (fw.val() && !moles.val()) {
              moles.val((amount.val() / fw.val()).toFixed(nFixed))
              my_widget_script.enable_all_records()
            } else if (fw.val() && amount.val() && moles.val()) {
              moles.val((amount.val() / fw.val()).toFixed(nFixed))
              my_widget_script.change_record_value()
            }
          } else {
            var equiv = $('input[name^=equivalents]', tr);
            var moles1 = $('#the_form input[name=moles1_number]');
            var moles = $('input[name^=moles]', tr);
            if (fw.val()) {
              moles.val((amount.val() / fw.val()).toFixed(nFixed));
              equiv.val((amount.val() / fw.val() / moles1.val()).toFixed(nFixed))
            } else if (moles.val()) {
              fw.val((amount.val() / moles.val()).toFixed(nFixed));
            }
          }
        });

        $('#the_form input[name^=fw]').on('change', function() {
          var tr = $(this).closest('tr');
          var is_initial_row = tr.attr('class') == 'initialRow';
          var fw = $('input[name^=fw]', tr);
          var amount = $('input[name^=amount]', tr);
          var moles = $('input[name^=moles]', tr);
          if (is_initial_row) {
            if (amount.val() && moles.val()) {
              amount.val((moles.val() * fw.val()).toFixed(nFixed))
              my_widget_script.enable_all_records()
            } else if (amount.val()) {
              moles.val((amount.val() / fw.val()).toFixed(nFixed))
              my_widget_script.enable_all_records()
            } else if (moles.val()) {
              amount.val((moles.val() * fw.val()).toFixed(nFixed))
              my_widget_script.enable_all_records()
            }
          } else {
            var equiv = $('input[name^=equivalents]', tr);
            var moles1 = $('#the_form input[name=moles1_number]');
            if (amount.val() && !equiv.val()) {
              moles.val((amount.val() / fw.val()).toFixed(nFixed))
              equiv.val((amount.val() / fw.val() / moles1.val()).toFixed(nFixed))
            } else if (equiv.val()) {
              moles.val((moles1.val() * equiv.val()).toFixed(nFixed));
              amount.val((moles.val() * fw.val()).toFixed(nFixed))
            }
          }
        });

        $('#the_form input[name^=moles]').on('change', function() {
          var tr = $(this).closest('tr');
          var is_initial_row = tr.attr('class') == 'initialRow';
          var fw = $('input[name^=fw]', tr);
          var amount = $('input[name^=amount]', tr);
          var moles = $('input[name^=moles]', tr);
          if (is_initial_row) {
            if (fw.val() && !amount.val()) {
              amount.val((moles.val() * fw.val()).toFixed(nFixed))
              my_widget_script.enable_all_records()
            } else if (fw.val() && amount.val() && moles.val()) {
              amount.val((moles.val() * fw.val()).toFixed(nFixed))
              my_widget_script.change_record_value()
            }
          } else {
            var equiv = $('input[name^=equivalents]', tr);
            var moles1 = $('#the_form input[name=moles1_number]');
            if (moles1.val()) {
              equiv.val((moles.val() / moles1.val()).toFixed(nFixed))
            }
            if (fw.val()) {
              amount.val((moles.val() * fw.val()).toFixed(nFixed))
            }
            if (amount.val()) {
              fw.val((amount.val() / moles.val()).toFixed(nFixed));
            }
          }
        });

        // Equivalents Field On Change Handler
        $('#the_form input[name^=equivalents]').on('change', function() {
          var tr = $(this).closest('tr');
          var fw = $('input[name^=fw]', tr);
          var equiv = $('input[name^=equivalents]', tr);
          var amount = $('input[name^=amount]', tr);
          var moles = $('input[name^=moles]', tr);
          var moles1 = $('#the_form input[name=moles1_number]');
          var is_initial_row = tr.attr('class') == 'initialRow';

          /* if fw, equiv exists, calculate amt and moles when they are not filled for rows greater than 1 or
             Re-calculate amt and moles when equiv value is changed for rows greater than 1 */
          if (fw.val()) {
            moles.val((moles1.val() * equiv.val()).toFixed(nFixed));
            amount.val((moles.val() * fw.val()).toFixed(nFixed))
          }

          // If not first row, then calculate moles if moles_1 field is there
          if (!is_initial_row) {
            if (moles1.val()) {
              moles.val((moles1.val() * equiv.val()).toFixed(nFixed));
            }
          }
        });
      },

      to_json:function () {
        //should return a json string containing the data entered into the form by the user
        //whatever is return from the method is persisted in LabArchives.  must not be binary data.
        //called when the user hits the save button, when adding or editing an entry


        //TO DO write code specific to your form
        return this.parent_class.to_json();
      },

      from_json:function (json_data) {
        //populates the form with json_data
        //TO DO write code specific to your form
        this.parent_class.from_json(json_data);
      },

      test_data:function () {
        //during development this method is called to populate your form while in preview mode
        //TO DO write code specific to your form
        return this.parent_class.test_data();
      },

      is_valid:function (b_suppress_message) {
        //called when the user hits the save button, to allow for form validation.
        //returns an array of dom elements that are not valid - default is those elements marked as mandatory
        // that have no data in them.
        //You can modify this method, to highlight bad form elements etc...
        //LA calls this method with b_suppress_message and relies on your code to communicate issues to the user
        //Returning an empty array [] or NULL equals no error
        //TO DO write code specific to your form
        return this.parent_class.is_valid(b_suppress_message);
      },

      is_edited:function () {
        //should return true if the form has been edited since it was loaded or since reset_edited was called
        return this.parent_class.is_edited();
      },

      reset_edited:function () {
        //typically called have a save
        //TO DO write code specific to your form
        return this.parent_class.reset_edited();
      },

      // Enable all records if the first record fields are correctly filled
      enable_all_records: function() {
        $('#the_form tbody tr:not(.initialRow) input').prop('disabled', false)
      },

      // Change all record when amount or moles of first record is changed
      change_record_value: function() {
        $('#the_form tbody tr:not(.initialRow)').each(function() {
          var moles = $('input[name^=moles]', this)
          var amount = $('input[name^=amount]', this)
          var fw = $('input[name^=fw]', this)
          var equiv = $('input[name^=equivalents]', this)
          if (fw.val() && equiv.val()) {
            var moles1 = $('#the_form input[name=moles1_number]');
            moles.val((moles1.val() * equiv.val()).toFixed(2));
            amount.val((moles.val() * fw.val()).toFixed(2))
          }
        })
      },

    }
