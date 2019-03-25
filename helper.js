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
            $("div").css({"font-family":"Arial, Helvetica, sans-serif","font-size":"11px", "background-color": "#eeeeee"});
            $("select").css({"background-color": "#f5f5f5"});
            $("#outputdiv").css({"background-color": "#fafafa"});
            $(":button").button();
            $("#outputdiv").hide();

            for (var i=0; i<my_widget_script.compounds.length; i++) {
                $('#compound').append('<option value="' + i + '">' + my_widget_script.compounds[i][0] + '</option>');
            }

            $('#compound').change(my_widget_script.change_compond);
            $('[name*="_default"]').change(function() {
                my_widget_script.set_error('Note:  You have changed a default value.  Please be sure that the density and weight percentage values you have entered are correct.  Different weight percentages will have different densities.  After verifying that your values are correct, please click "Calculate" again.');
            });
            $('#clear').click(my_widget_script.clear);
            $('#calculate').click(my_widget_script.calculate);

            this.parent_class.init(mode, json_data);

            if (my_widget_script.data_valid()) {
                $('#symbol').html(my_widget_script.compounds[$('#compound').val()][1].replace(/(\d+)+/g, '<sub>$1</sub>'));
                my_widget_script.calculate();
            }
        },

        to_json:function () {
            //should return a json string containing the data entered into the form by the user
            //whatever is return from the method is persisted in LabArchives.  must not be binary data
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
        compounds:[
            //[compound name, symbol, density, formula weight, weight percentage, normality, molarity]
            //0:["[Select]","","0","0","0","1","1"],
            ["Acetic Acid","CH3CO2H","1.049","60.05","99.7","1","1"],
            ["Ammonium Hydroxide","NH4OH","0.9","35.05","56.6","1","1"],
            ["Formic Acid","HCOOH","1.22","46.03","95.0","1","1"],
            ["Hydrochloric Acid","HCl","1.2","36.46","37.0","1","1"],
            ["Hydrofluoric Acid","HF","1.15","20.01","48.0","1","1"],
            ["Nitric Acid","HNO3","1.413","63.01","70.0","1","1"],
            ["Perchloric Acid","HClO4","1.664","100.46","70.0","1","1"],
            ["Phosphoric Acid","H3PO4","1.685","98.00","85.0","3","1"],
            ["Potassium Hydroxide","KOH","1.456","56.11","45.0","1","1"],
            ["Sodium Hydroxide","NaOH","1.515","40.00","50.0","1","1"],
            ["Sulfuric Acid","H2SO4 ","1.84","98.08","95.0","2","1"]
        ],
        change_compond:function () {
            var sel = $('#compound').val();
            if (sel != '') {
                // Set the default values for the compound
                $('#symbol').html(my_widget_script.compounds[sel][1].replace(/(\d+)+/g, '<sub>$1</sub>'));
                $('#density').val(my_widget_script.compounds[sel][2]);
                $('#formulawt').val(my_widget_script.compounds[sel][3]);
                $('#wtpercent').val(my_widget_script.compounds[sel][4]);
            }
            else {
                $('#symbol').html('');
                $('input[type="text"]').val('');
            }
            my_widget_script.set_error('');
        },
        set_error:function(msg) {
            $("#errmsg").text(msg);
        },
        clear:function() {
            $('#compound').val('');
            $('#compound').change();
            $("#outputdiv").hide();
            my_widget_script.parent_class.resize_container();
        },
        data_valid:function() {
            var mandatoryflds = $('[name$="_mandatory"]');
            for (var i=0; i< mandatoryflds.length; i++) {
                if (mandatoryflds.eq(i).val() == '') {
                    return false;
                }
            }
            return true;
        },
        calculate:function() {
            $("#outputdiv").hide();
            my_widget_script.set_error('');
            if (!my_widget_script.data_valid()) {
                my_widget_script.set_error('All fields must be filled in.');
                return;
            }
            // Get input values
            var sel = $('#compound').val();
            var density = $('#density').val();
            var formulawt = $('#formulawt').val();
            var wtpercent = $('#wtpercent').val();
            var vol = $('#volume').val();
            var con = $('#concentration').val();
            var conunit = $('#conunit').val();
            var normality = my_widget_script.compounds[sel][5];
            var molarity = my_widget_script.compounds[sel][6];
            // Perform calculations
            var solmol = ((wtpercent * density) / formulawt) * 10;
            var solnorm = solmol * normality;
            var startvol = vol / 4;	//starting volume is one quarter desired final volume
            var soladd = ((con * vol)/solmol)/(conunit=='M'? molarity : normality);
            //Check to see if concentration is too high
            if (soladd > (vol * .75)) {
                my_widget_script.set_error('Concentration is set too high.');
                return;
            }
            // Display results
            $('#resultname').html($('#compound option:selected').text());
            $('#resultsc').html(solmol.toFixed(3) + ' ' + conunit);
            $('#resultsg').html(density);
            $('#resultfw').html(formulawt);
            $('#resultwtperc').html(wtpercent);
            $('#resultmn').html(con + ' ' + conunit);
            $('#resultstockadd').html(soladd.toFixed(3));
            $('#resultstv').html(startvol.toFixed(3));
            $('#resultv').html(vol);
            $("#outputdiv").show();
            my_widget_script.parent_class.resize_container();
        }
    }