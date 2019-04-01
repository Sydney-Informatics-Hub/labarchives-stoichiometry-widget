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

        moledata = '';
        fwdata = '';

        var json_obj = eval(json_data);
        if (json_obj) {
          for (var i=0; i<nAttributes; i++) {
            //console.log(json_obj[i].name)
            if (json_obj[i].name == 'moles1_number') {
              moledata = json_obj[i].value;
            }
            if (json_obj[i].name == 'fw1_number') {
              fwdata = json_obj[i].value;
            }
          }
        }

        // If mole and fw data in row 1, enable rest of the rows for editing
        if (moledata && fwdata) {
          my_widget_script.enable_all_records()
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
			Amount Field On Blur Handler
		*/
        $('#the_form input[name^=amount]').on('blur', function() {
          var tr = $(this).closest('tr');
          console.log('In amount blur handler'+ tr.attr('class'))

          current_class = tr.attr('class')
          var compare_class_id = current_class.localeCompare('initialRow');
          var fw = $('input[name^=fw]', tr);
          var amount = $('input[name^=amount]', tr);
          var moles = $('input[name^=moles]', tr);
          if(fw.val() && amount.val()) {
            var moles_1 = amount.val() / fw.val()
            console.log(moles_1)
            if (!moles.val()) {
              moles.val(moles_1.toFixed(nFixed))
            }
          }

          if (moles.val() && fw.val() && amount.val && (compare_class_id == 0))  {
            my_widget_script.enable_all_records()
          }

          // for rows greater than 1
          if ( (amount.val()) && (fw.val()) && (compare_class_id != 0)) {
            var equiv = $('input[name^=equivalents]', tr);
            var moles1 = $('#the_form input[name=moles1_number]');
            moles.val((amount.val() / fw.val()).toFixed(nFixed));
            var moles = $('input[name^=moles]', tr);
            equiv.val((amount.val() / fw.val() / moles1.val()).toFixed(nFixed))
          }
        });

        /*
			Amount Field On Change Handler
		*/
        $('#the_form input[name^=amount]').on('change', function() {
          var tr = $(this).closest('tr');
          console.log('In amount change handler'+ tr.attr('class'))
          current_class = tr.attr('class')
          var compare_class_id = current_class.localeCompare('initialRow');

          if (compare_class_id == 0) {
            console.log('Row 1 amount has changed, change row 1 moles and change amount, moles for rest of rows')
            var amount = $('input[name^=amount]', tr);
            var fw = $('input[name^=fw]', tr);
            var moles = $('input[name^=moles]', tr);
            if (amount.val() && fw.val()) {
              moles.val((amount.val() / fw.val()).toFixed(nFixed))
            }
            // Change moles and amount for all enabled rows where value exists
            my_widget_script.change_record_value()
          }
        });

        /*
			FW Field On Blur Handler
		*/
        $('#the_form input[name^=fw]').on('blur', function() {
          console.log('In fw blur handler')
          var tr = $(this).closest('tr');
          current_class = tr.attr('class')
          var compare_class_id = current_class.localeCompare('initialRow');
          var amount = $('input[name^=amount]', tr);
          var fw = $('input[name^=fw]', tr);
          var moles = $('input[name^=moles]', tr);
          var equiv = $('input[name^=equivalents]', tr);

          if (!(amount.val())) {
            console.log('amount field not empty')
            if (moles.val()) {
              console.log('moles field is not empty')
              amount.val((moles.val() * fw.val()).toFixed(nFixed))
            }
          } else {
            // Fw and amount are present, compute moles and equiv
            console.log('amount field is not empty')
            var moles_1 = amount.val() / fw.val()
            moles.val(moles_1.toFixed(nFixed))
            // if not row-1 calculate equiv value too
            if (compare_class_id != 0) {
              var moles1 = $('#the_form input[name=moles1_number]');
              if (amount.val() && fw.val() && moles1.val()) {
                equiv.val((amount.val() / fw.val() / moles1.val()).toFixed(nFixed))
              }
            }
          }

          // check if all are filled then enable rest of the rows only if the current row is 1.
          if (moles.val() && fw.val() && amount.val && (compare_class_id == 0)) {
            my_widget_script.enable_all_records()
          }

          // Check if equiv is present and this is not first row, then calculate moles and amount if not present
          var equiv = $('input[name^=equivalents]', tr);
          if ( (equiv.val()) && (compare_class_id != 0) && (!moles.val()) && (!amount.val())) {
            var moles1 = $('#the_form input[name=moles1_number]');
            moles.val((moles1.val() * equiv.val()).toFixed(nFixed));
            amount.val((moles.val() * fw.val()).toFixed(nFixed))
          }
        });

        /*
			FW Field On Change Handler
		*/
        $('#the_form input[name^=fw]').on('change', function() {
          var tr = $(this).closest('tr');
          console.log('In FW change handler'+ tr.attr('class'))
          current_class = tr.attr('class')
          var compare_class_id = current_class.localeCompare('initialRow');

          if (compare_class_id != 0) {
            console.log('recalculate amount and moles for this row only')
            var moles = $('input[name^=moles]', tr);
            var amount = $('input[name^=amount]', tr);
            var fw = $('input[name^=fw]', tr);
            var equiv = $('input[name^=equivalents]', tr);
            if (moles.val() && fw.val() && equiv.val()) {
              var moles1 = $('#the_form input[name=moles1_number]');
              moles.val((moles1.val() * equiv.val()).toFixed(nFixed)); // This is not needed as changing FW has no effect on moles calculation.
              amount.val((moles.val() * fw.val()).toFixed(nFixed))
            }
          }
        });

        /*
			Moles Field On Blur Handler
		*/
        $('#the_form input[name^=moles]').on('blur', function() {
          console.log('In moles blur handler')
          var tr = $(this).closest('tr');
          current_class = tr.attr('class')
          var compare_class_id = current_class.localeCompare('initialRow');
          var fw = $('input[name^=fw]', tr);
          var amount = $('input[name^=amount]', tr);
          var moles = $('input[name^=moles]', tr);

          if (fw.val() && moles.val() && !amount.val()) {
            console.log('fw field is not empty')
            amount.val((moles.val() * fw.val()).toFixed(nFixed))
          }

          // Enable rest of the records of the experiment; if there moles and fw value exist for row
          if (moles.val() && fw.val() && amount.val && (compare_class_id == 0)) {
            my_widget_script.enable_all_records()
          }
        });

        /*
			Moles Field On Change Handler
		*/
        $('#the_form input[name^=moles]').on('change', function() {
          var tr = $(this).closest('tr');
          console.log('In moles change handler'+ tr.attr('class'))
          current_class = tr.attr('class')
          var compare_class_id = current_class.localeCompare('initialRow');

          if (compare_class_id == 0) {
            console.log('Row 1 moles has changed, change row 1 amount and change amount, moles for rest of rows')
            var amount = $('input[name^=amount]', tr);
            var fw = $('input[name^=fw]', tr);
            var moles = $('input[name^=moles]', tr);
            if (moles.val() && fw.val()) {
              amount.val((moles.val() * fw.val()).toFixed(nFixed))
            }

            // Change moles and amount for all enabled rows where value exists
            my_widget_script.change_record_value()
          }
        });

        /*
			Equivalence Field On Change Handler
		*/
        $('#the_form input[name^=equivalents]').on('change', function() {
          console.log('In equivalents change handler')
          var tr = $(this).closest('tr');
          var fw = $('input[name^=fw]', tr);
          var equiv = $('input[name^=equivalents]', tr);
          var amount = $('input[name^=amount]', tr);
          var moles = $('input[name^=moles]', tr);
          var moles1 = $('#the_form input[name=moles1_number]');
          if (fw.val() && moles1.val() && equiv.val()) {
            moles.val((moles1.val() * equiv.val()).toFixed(nFixed));
            amount.val((moles.val() * fw.val()).toFixed(nFixed))
          }
        });

        /*
			Equivalence Field On Blur Handler
		*/
        $('#the_form input[name^=equivalents]').on('blur', function() {
          console.log('In equivalents blur handler')
          var tr = $(this).closest('tr');
          var fw = $('input[name^=fw]', tr);
          var equiv = $('input[name^=equivalents]', tr);
          var amount = $('input[name^=amount]', tr);
          var moles = $('input[name^=moles]', tr);
          var moles1 = $('#the_form input[name=moles1_number]');
          if (fw.val() && !amount.val() && !moles.val()) {
            console.log('FW exists calculate moles and amount')
            moles.val((moles1.val() * equiv.val()).toFixed(nFixed));
            amount.val((moles.val() * fw.val()).toFixed(nFixed))
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

      /*
			Enable all records if the first record fields are correctly filled
	  */
      enable_all_records: function() {
        console.log('**** In enable_all_records ****')
        var observationsArray = ['2', '3', '4', '5', '6', '7', '8', '9', '10']
        for (var i = 0; i < observationsArray.length; i++) {
          var attributesArray = [
            '_substance ',
            '_amount ',
            '_fw ',
            '_moles ',
            '_equiv ',
            '_volumes ',
            '_density ',
            '_comments '
          ]
          for (var j = 0; j < attributesArray.length; j++) {
            var cell = '#row' + observationsArray[i] + attributesArray[j] + 'input'
            if ($(cell).prop('disabled') == true) {
              $(cell).prop('disabled', false)
            }
          }
        }
      },


      /*
          Change all record when amount or moles of first record is changed
      */
      change_record_value: function() {
        console.log('**** change_record_value ****')
        var observationsArray = ['2', '3', '4', '5', '6', '7', '8', '9', '10']
        for (var i = 0; i < observationsArray.length; i++) {
          var moles = $('#the_form input[name=moles' + observationsArray[i] + '_number]')
          var amount = $('#the_form input[name=amount' + observationsArray[i] + '_number]')
          var fw = $('#the_form input[name=fw' + observationsArray[i] + '_number]')
          var equiv = $('#the_form input[name=equivalents' + observationsArray[i] + '_number]')
          if (fw.val()) {
            var moles1 = $('#the_form input[name=moles1_number]');
            moles.val((moles1.val() * equiv.val()).toFixed(2));
            amount.val((moles.val() * fw.val()).toFixed(2))
          }
        }
      },


    }