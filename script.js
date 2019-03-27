/* Stoichiometry Widget implemented by Joel Nothman at the Sydney Informatics Hub
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
        console.log('init function call starts')

        // Number of attributes in each record
        var nAttributes = 8;

        //my_widget_script.from_json((typeof(json_data) === 'function') ? json_data() : json_data);

        moledata = '';
        fwdata = '';

        // Test
        if (moledata) {
          console.log('samta-a')
        } else {
          console.log('samta-0')
        }

        var json_obj = eval(json_data);

        if (json_obj) {
          console.log(json_obj.length)
          //for (var i=0; i<json_obj.length; i++) {
          for (var i=0; i<nAttributes; i++) {
            console.log(json_obj[i].name)
            if (json_obj[i].name == 'moles1_number') {
              moledata = json_obj[i].value;
            }

            if (json_obj[i].name == 'fw1_number') {
              fwdata = json_obj[i].value;
            }
          }
        }

        // If mole and fw data in row 1, enable rest of the rows for editing
        if (moledata) {
          if (fwdata) {
            console.log('samta-a')
            my_widget_script.enable_records_2()
            my_widget_script.enable_records_3()
            my_widget_script.enable_records_3()
            my_widget_script.enable_records_4()
            my_widget_script.enable_records_5()
            my_widget_script.enable_records_6()
            my_widget_script.enable_records_7()
            my_widget_script.enable_records_8()
            my_widget_script.enable_records_9()
            my_widget_script.enable_records_10()
          }
        } else {
          console.log('samta-0')
        }

        this.parent_class.init(mode, json_data);

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

        var nFixed = 2;
        /*
        $('#the_form input[name^=amount]').on('keyup change', function() {
          var tr = $(this).closest('tr');
          var equiv = $('input[name^=equivalents]', tr);
          if (equiv.length != 1)
            throw ('Found the incorrect number of equiv inputs: ' + equiv.length)
          equiv = equiv.first();
          var moles1 = $('#the_form input[name=moles1_formula]');
          var fw = $('input[name^=fw]', tr);
          if ($(this).val() && fw.val() && moles1.val())
            equiv.val(($(this).val() / fw.val() / moles1.val()).toFixed(nFixed))
        });

        $('#the_form input[name^=fw]').on('keyup change', function() {
          var tr = $(this).closest('tr');
          var amount = $('input[name^=amount]', tr);
          var fw = $('input[name^=fw]', tr);
          var moles = $('input[name^=moles]', tr);
          var equiv = $('input[name^=equivalents]', tr);
          if (moles.val() && fw.val()) {
            amount.val((moles.val() * fw.val()).toFixed(nFixed))
          }
        });

        $('#the_form input[name^=fw]').on('change', function() {
          var tr = $(this).closest('tr');
          var amount = $('input[name^=amount]', tr);
          var equiv = $('input[name^=equivalents]', tr);
          if (!equiv.val()) {
            amount.change();
          }
        });
        */

        // Vijay changes 25 Mar

        // Amount blur handling
        $('#the_form input[name^=amount]').on('blur', function() {
          console.log('Amount field on blur')

          // If Fw field is not empty re-calculate Moles field
          var tr = $(this).closest('tr');
          var fw = $('input[name^=fw]', tr);
          var amount = $('input[name^=amount]', tr);
          var moles = $('input[name^=moles]', tr);

          var content = $('input[name^=fw]', tr);
          if(content.val().length != '0') {
            var fw = $('input[name^=fw]', tr);
            var amount = $('input[name^=amount]', tr);
            var moles = $('input[name^=moles]', tr);
            var moles_1 = amount.val() / fw.val()
            console.log(moles_1)
            moles.val(moles_1.toFixed(nFixed))
            // enable all the rows as all important values for row 1 are filled
            my_widget_script.enable_records_2()
            my_widget_script.enable_records_3()
            my_widget_script.enable_records_4()
            my_widget_script.enable_records_5()
            my_widget_script.enable_records_6()
            my_widget_script.enable_records_7()
            my_widget_script.enable_records_8()
            my_widget_script.enable_records_9()
            my_widget_script.enable_records_10()
          } else {
            console.log('FW filed is empty.')
          }

        });

        // FW blur handling
        $('#the_form input[name^=fw]').on('blur', function() {
          console.log('FW field on blur')
          var tr = $(this).closest('tr');

          var content = $('input[name^=amount]', tr);
          if(content.val().length == '0') {
            // yes it is empty
            var tr = $(this).closest('tr');
            var fw = $('input[name^=fw]', tr);
            var amount = $('input[name^=amount]', tr);
            var moles = $('input[name^=moles]', tr);

            // moles field is not empty calculate a value
            // else assign a default value of 10
            if (moles.val().length == '0') {
              var mole_1 = 1
              moles.val(mole_1.toFixed(nFixed))
              var amount_1 = 1 * fw.val()
              amount.val(amount_1.toFixed(nFixed))
            } else {
              console.log('moles field is not empty')
              var amount_1 = moles.val() * fw.val()
              amount.val(amount_1.toFixed(nFixed))
            }
          } else {
            // no it is not empty
            var tr = $(this).closest('tr');
            var fw = $('input[name^=fw]', tr);
            var amount = $('input[name^=amount]', tr);
            var moles = $('input[name^=moles]', tr);
            var moles_1 = amount.val() / fw.val()
            console.log(moles_1)
            moles.val(moles_1.toFixed(nFixed))
          }

          my_widget_script.enable_records_2()
          my_widget_script.enable_records_3()
          my_widget_script.enable_records_3()
          my_widget_script.enable_records_4()
          my_widget_script.enable_records_5()
          my_widget_script.enable_records_6()
          my_widget_script.enable_records_7()
          my_widget_script.enable_records_8()
          my_widget_script.enable_records_9()
          my_widget_script.enable_records_10()
        });

        // Moles blur handling
        $('#the_form input[name^=moles]').on('blur', function() {
          console.log('Moles field on blur')

          var tr = $(this).closest('tr');
          var fw = $('input[name^=fw]', tr);
          var amount = $('input[name^=amount]', tr);
          var moles = $('input[name^=moles]', tr);

          // if fw and amount are empty assign a default value to both of them.
          if (fw.val().length == '0') {
            var fw_1= 1
            fw.val(fw_1.toFixed(nFixed))
            var amount_1 = moles.val() * 1
            amount.val(amount_1.toFixed(nFixed))
          } else {
            var tr = $(this).closest('tr');
            var fw = $('input[name^=fw]', tr);
            var moles = $('input[name^=moles]', tr);
            var amount = $('input[name^=amount]', tr);
            amount_1 = fw.val() * moles.val()
            amount.val(amount_1.toFixed(nFixed))
            amount.val((moles.val() * fw.val()).toFixed(nFixed))
          }

          // Enable rest of the records of the experiment; if there moles and fw value exist for row 1
          if (fw.val().length != '0') {
            //my_widget_script.enable_records()
            my_widget_script.enable_records_2()
            my_widget_script.enable_records_3()
            my_widget_script.enable_records_4()
            my_widget_script.enable_records_5()
            my_widget_script.enable_records_6()
            my_widget_script.enable_records_7()
            my_widget_script.enable_records_8()
            my_widget_script.enable_records_9()
            my_widget_script.enable_records_10()
          }
        });

        // Vijay changes 25 Mar

        $('#the_form input[name^=equivalents]').on('keyup change', function() {
          var tr = $(this).closest('tr');
          var amount = $('input[name^=amount]', tr);
          var fw = $('input[name^=fw]', tr);
          var moles = $('input[name^=moles]', tr);
          var moles1 = $('#the_form input[name=moles1_formula]');
          var equiv = $('input[name^=equivalents]', tr);
          if (equiv.val() && fw.val() && moles1.val()) {
            moles.val((moles1.val() * equiv.val()).toFixed(nFixed));
            fw.change();
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
        console.log('In is_valid:function')
        return this.parent_class.is_valid(b_suppress_message);
      },

      is_edited:function () {
        //should return true if the form has been edited since it was loaded or since reset_edited was called
        console.log('In is_edited:function')
        return this.parent_class.is_edited();
      },

      reset_edited:function () {
        //typically called have a save
        //TO DO write code specific to your form
        return this.parent_class.reset_edited();
      },

      // Enable the rows on moles blur; This function is no longer used.
      enable_records: function() {
        console.log('Entering the enable_records function')

        console.log('Samta-1')
        console.log($('#row2_substance input').prop('disabled'))

        var content = $("#row1_moles").text();
        console.log($("#row1_moles").val())
        console.log($("#row1_moles").val().length)
        console.log('Samta-2')

        if ($('#row2_substance input').prop('disabled') == true) {
          $('#row2_substance input').prop('disabled', false)
        }

        if ($('#row2_amount input').prop('disabled') == true) {
          $('#row2_amount input').prop('disabled', false)
        }

        if ($('#row2_fw input').prop('disabled') == true) {
          $('#row2_fw input').prop('disabled', false)
        }

        if ($('#row2_moles input').prop('disabled') == true) {
          $('#row2_moles input').prop('disabled', false)
        }

        if ($('#row2_equiv input').prop('disabled') == true) {
          $('#row2_equiv input').prop('disabled', false)
        }

        if ($('#row2_volumes input').prop('disabled') == true) {
          $('#row2_volumes input').prop('disabled', false)
        }

        if ($('#row2_substance input').prop('disabled') == true) {
          $('#row2_substance input').prop('disabled', false)
        }

        if ($('#row2_density input').prop('disabled') == true) {
          $('#row2_density input').prop('disabled', false)
        }

        if ($('#row2_comments input').prop('disabled') == true) {
          $('#row2_comments input').prop('disabled', false)
        }

        //$('#row2_amount input').prop('disabled', false)
        //$('#row2_fw input').prop('disabled', false)
        //$('#row2_moles input').prop('disabled', false)
        //$('#row2_equiv input').prop('disabled', false)
        //$('#row2_volumes input').prop('disabled', false)
        //$('#row2_density input').prop('disabled', false)
        //$('#row2_comments input').prop('disabled', false)


        //$('#the_form input[name^=equivalents]')
      },

      enable_records_2: function() {
        console.log('In enable_records_2')

        if ($('#row2_substance input').prop('disabled') == true) {
          $('#row2_substance input').prop('disabled', false)
        }

        if ($('#row2_amount input').prop('disabled') == true) {
          $('#row2_amount input').prop('disabled', false)
        }

        if ($('#row2_fw input').prop('disabled') == true) {
          $('#row2_fw input').prop('disabled', false)
        }

        if ($('#row2_moles input').prop('disabled') == true) {
          $('#row2_moles input').prop('disabled', false)
        }

        if ($('#row2_equiv input').prop('disabled') == true) {
          $('#row2_equiv input').prop('disabled', false)
        }

        if ($('#row2_volumes input').prop('disabled') == true) {
          $('#row2_volumes input').prop('disabled', false)
        }


        if ($('#row2_density input').prop('disabled') == true) {
          $('#row2_density input').prop('disabled', false)
        }

        if ($('#row2_comments input').prop('disabled') == true) {
          $('#row2_comments input').prop('disabled', false)
        }
      },

      enable_records_3: function() {
        console.log('In enable_records_3')

        if ($('#row3_substance input').prop('disabled') == true) {
          $('#row3_substance input').prop('disabled', false)
        }

        if ($('#row3_amount input').prop('disabled') == true) {
          $('#row3_amount input').prop('disabled', false)
        }

        if ($('#row3_fw input').prop('disabled') == true) {
          $('#row3_fw input').prop('disabled', false)
        }

        if ($('#row3_moles input').prop('disabled') == true) {
          $('#row3_moles input').prop('disabled', false)
        }

        if ($('#row3_equiv input').prop('disabled') == true) {
          $('#row3_equiv input').prop('disabled', false)
        }

        if ($('#row3_volumes input').prop('disabled') == true) {
          $('#row3_volumes input').prop('disabled', false)
        }

        if ($('#row3_density input').prop('disabled') == true) {
          $('#row3_density input').prop('disabled', false)
        }

        if ($('#row3_comments input').prop('disabled') == true) {
          $('#row3_comments input').prop('disabled', false)
        }
      },

      enable_records_4: function() {
        console.log('In enable_records_4')

        if ($('#row4_substance input').prop('disabled') == true) {
          $('#row4_substance input').prop('disabled', false)
        }

        if ($('#row4_amount input').prop('disabled') == true) {
          $('#row4_amount input').prop('disabled', false)
        }

        if ($('#row4_fw input').prop('disabled') == true) {
          $('#row4_fw input').prop('disabled', false)
        }

        if ($('#row4_moles input').prop('disabled') == true) {
          $('#row4_moles input').prop('disabled', false)
        }

        if ($('#row4_equiv input').prop('disabled') == true) {
          $('#row4_equiv input').prop('disabled', false)
        }

        if ($('#row4_volumes input').prop('disabled') == true) {
          $('#row4_volumes input').prop('disabled', false)
        }

        if ($('#row4_density input').prop('disabled') == true) {
          $('#row4_density input').prop('disabled', false)
        }

        if ($('#row4_comments input').prop('disabled') == true) {
          $('#row4_comments input').prop('disabled', false)
        }
      },

      enable_records_5: function() {
        console.log('In enable_records_5')

        if ($('#row5_substance input').prop('disabled') == true) {
          $('#row5_substance input').prop('disabled', false)
        }

        if ($('#row5_amount input').prop('disabled') == true) {
          $('#row5_amount input').prop('disabled', false)
        }

        if ($('#row5_fw input').prop('disabled') == true) {
          $('#row5_fw input').prop('disabled', false)
        }

        if ($('#row5_moles input').prop('disabled') == true) {
          $('#row5_moles input').prop('disabled', false)
        }

        if ($('#row5_equiv input').prop('disabled') == true) {
          $('#row5_equiv input').prop('disabled', false)
        }

        if ($('#row5_volumes input').prop('disabled') == true) {
          $('#row5_volumes input').prop('disabled', false)
        }

        if ($('#row5_density input').prop('disabled') == true) {
          $('#row5_density input').prop('disabled', false)
        }

        if ($('#row5_comments input').prop('disabled') == true) {
          $('#row5_comments input').prop('disabled', false)
        }
      },

      enable_records_6: function() {
        console.log('In enable_records_6')

        if ($('#row6_substance input').prop('disabled') == true) {
          $('#row6_substance input').prop('disabled', false)
        }

        if ($('#row6_amount input').prop('disabled') == true) {
          $('#row6_amount input').prop('disabled', false)
        }

        if ($('#row6_fw input').prop('disabled') == true) {
          $('#row6_fw input').prop('disabled', false)
        }

        if ($('#row6_moles input').prop('disabled') == true) {
          $('#row6_moles input').prop('disabled', false)
        }

        if ($('#row6_equiv input').prop('disabled') == true) {
          $('#row6_equiv input').prop('disabled', false)
        }

        if ($('#row6_volumes input').prop('disabled') == true) {
          $('#row6_volumes input').prop('disabled', false)
        }

        if ($('#row6_density input').prop('disabled') == true) {
          $('#row6_density input').prop('disabled', false)
        }

        if ($('#row6_comments input').prop('disabled') == true) {
          $('#row6_comments input').prop('disabled', false)
        }
      },

      enable_records_7: function() {
        console.log('In enable_records_7')

        if ($('#row7_substance input').prop('disabled') == true) {
          $('#row7_substance input').prop('disabled', false)
        }

        if ($('#row7_amount input').prop('disabled') == true) {
          $('#row7_amount input').prop('disabled', false)
        }

        if ($('#row7_fw input').prop('disabled') == true) {
          $('#row7_fw input').prop('disabled', false)
        }

        if ($('#row7_moles input').prop('disabled') == true) {
          $('#row7_moles input').prop('disabled', false)
        }

        if ($('#row7_equiv input').prop('disabled') == true) {
          $('#row7_equiv input').prop('disabled', false)
        }

        if ($('#row7_volumes input').prop('disabled') == true) {
          $('#row7_volumes input').prop('disabled', false)
        }

        if ($('#row7_density input').prop('disabled') == true) {
          $('#row7_density input').prop('disabled', false)
        }

        if ($('#row7_comments input').prop('disabled') == true) {
          $('#row7_comments input').prop('disabled', false)
        }
      },

      enable_records_8: function() {
        console.log('In enable_records_8')

        if ($('#row8_substance input').prop('disabled') == true) {
          $('#row8_substance input').prop('disabled', false)
        }

        if ($('#row8_amount input').prop('disabled') == true) {
          $('#row8_amount input').prop('disabled', false)
        }

        if ($('#row8_fw input').prop('disabled') == true) {
          $('#row8_fw input').prop('disabled', false)
        }

        if ($('#row8_moles input').prop('disabled') == true) {
          $('#row8_moles input').prop('disabled', false)
        }

        if ($('#row8_equiv input').prop('disabled') == true) {
          $('#row8_equiv input').prop('disabled', false)
        }

        if ($('#row8_volumes input').prop('disabled') == true) {
          $('#row8_volumes input').prop('disabled', false)
        }

        if ($('#row8_density input').prop('disabled') == true) {
          $('#row8_density input').prop('disabled', false)
        }

        if ($('#row8_comments input').prop('disabled') == true) {
          $('#row8_comments input').prop('disabled', false)
        }
      },

      enable_records_9: function() {
        console.log('In enable_records_9')

        if ($('#row9_substance input').prop('disabled') == true) {
          $('#row9_substance input').prop('disabled', false)
        }

        if ($('#row9_amount input').prop('disabled') == true) {
          $('#row9_amount input').prop('disabled', false)
        }

        if ($('#row9_fw input').prop('disabled') == true) {
          $('#row9_fw input').prop('disabled', false)
        }

        if ($('#row9_moles input').prop('disabled') == true) {
          $('#row9_moles input').prop('disabled', false)
        }

        if ($('#row9_equiv input').prop('disabled') == true) {
          $('#row9_equiv input').prop('disabled', false)
        }

        if ($('#row9_volumes input').prop('disabled') == true) {
          $('#row9_volumes input').prop('disabled', false)
        }

        if ($('#row9_density input').prop('disabled') == true) {
          $('#row9_density input').prop('disabled', false)
        }

        if ($('#row9_comments input').prop('disabled') == true) {
          $('#row9_comments input').prop('disabled', false)
        }
      },

      enable_records_10: function() {
        console.log('In enable_records_10')

        if ($('#row10_substance input').prop('disabled') == true) {
          $('#row10_substance input').prop('disabled', false)
        }

        if ($('#row10_amount input').prop('disabled') == true) {
          $('#row10_amount input').prop('disabled', false)
        }

        if ($('#row10_fw input').prop('disabled') == true) {
          $('#row10_fw input').prop('disabled', false)
        }

        if ($('#row10_moles input').prop('disabled') == true) {
          $('#row10_moles input').prop('disabled', false)
        }

        if ($('#row10_equiv input').prop('disabled') == true) {
          $('#row10_equiv input').prop('disabled', false)
        }

        if ($('#row10_volumes input').prop('disabled') == true) {
          $('#row10_volumes input').prop('disabled', false)
        }

        if ($('#row10_density input').prop('disabled') == true) {
          $('#row10_density input').prop('disabled', false)
        }

        if ($('#row10_comments input').prop('disabled') == true) {
          $('#row10_comments input').prop('disabled', false)
        }
      },


    }