**The Readme is to detail the behaviour expected from the Stochiometry widget**

1. When initializing the records of the experiment
2. When changing the values of the experiment

**Initializing the records of the experiment:**

On launching the Stochiometry widget, to add to the page, all rows, except for row 1
will be disabled for entry.

For row 1 initial entry, the following are the permitted ways - 

|  User Enters  | Automatically Calculated |
| ------------- | ------------- |
| amt and fw  | moles  |
| fw and amt  | moles |
| moles and fw | amt  |
| fw and moles  | amt  |

The equiv value for row 1 is set to 1 and cannot be edited by the user.

For rows greater than 1 for initial entry, the following are the permitted ways -

|  User Enters  | Automatically Calculated |
| ------------- | ------------- |
| equiv and fw  | mol and amt  |
| fw and equiv  | mol and amt |
| fw and amt | mol and equiv  |
| amt and fw  | mol and equiv  |

Once the first row and the rows needed for experiment are filled, add the Stochiometry to the page.

**Changing the values of the records of the experiment:**

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

** For volume and density fields**

For all rows, user has to enter the density in the experiment, the volume will be automatically calculated by the formula -
volume = amount / density

Volume will be re-calculated whenever the amount value changes.
