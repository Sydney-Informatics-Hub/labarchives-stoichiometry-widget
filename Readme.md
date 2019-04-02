
The Readme is to detail the behaviour expected from the Stochiometry widget. Stochiometry widget is to 
aid a researcher to automatically calculate inter-related values when a dependent value 
in a chemical equation is changed. The stochiomtery widget can be added to a LabArchive Notebook page. 

The user inputs to the Stochiometry widget and the subsequent results are documented as below - 

1. When first entering data into the table
2. When changing the values of the experiment

# Expected Behaviour

## Initializing the records of the experiment:

On launching the Stochiometry widget to add to the page, only row 1 will be enabled on entry, 
although subsequent rows will be displayed.

For row 1 initial entry, the permitted ways of entering values are tabulated below - 

|  User Enters  | Automatically Calculated |
| ------------- | ------------- |
| amt then fw  | moles  |
| fw then amt  | moles |
| moles then fw | amt  |
| fw then moles  | amt  |

The equiv value for row 1 is set to 1 and cannot be edited by the user.

For all non-initial rows for initial entry, the permitted ways of entering values are tabulated below -

|  User Enters  | Automatically Calculated |
| ------------- | ------------- |
| equiv then fw  | mol and amt  |
| fw then equiv  | mol and amt |
| fw then amt | mol and equiv  |
| amt then fw  | mol and equiv  |

Once the first row and the rows needed for experiment are filled, add the Stochiometry to the page.

## Changing the values of the records of the experiment:

For row 1, the behaviour is as below - 

|  User Changes  | Automatically Calculated |
| ------------- | ------------- |
| amt  | mol and amt are recalculated for all rows, greater than 1, which have valid values |
| mol  | mol and amt are recalculated for all rows, greater than 1, which have valid values |

For rows greater than 1, the behaviour is as below - 

|  User Changes  | Automatically Calculated |
| ------------- | ------------- |
| amt  | equiv and moles are recalculated for the row for which the amt was changed |
| equiv  | amt and moles are recalculated for the row for which the equiv was changed  |
| fw  | amt and moles are recalculated for the row for which the fw was changed  |

## For volume and density fields

If the user enters density to the experiment, the volume will be automatically calculated by the formula -
volume = amount / density

Filling density and volumes field is optional to the experiment and is used when gases are involved
in the chemical equation.

Volume will be re-calculated whenever the amount value changes.
