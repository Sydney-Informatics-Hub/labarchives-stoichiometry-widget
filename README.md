
# LabArchives eNotebook Stoichiometry Table Widget

This widget helps the researcher calculate and document amounts used in reactions for stoichiometry.

The widget can be added to a LabArchive Notebook page.

![Demonstration of the Stoichiometry Table Widget in action](https://raw.githubusercontent.com/Sydney-Informatics-Hub/labarchives-stoichiometry-widget/master/demo.gif)

It was developed by the [Sydney Informatics Hub](https://informatics.sydney.edu.au) from an initial version by [Dr. Samuel Banister](https://sydney.edu.au/science/people/samuel.banister.php).

## Installation

To install, you will need to copy the contents of [`widget.html`](widget.html) and [`script.js`](script.js) into the [Widget Manager](https://labarchives.kayako.com/Knowledgebase/Article/View/409/0/5031-the-widget-manager).

1. Go to the *Widget Manager*
2. Under *Available Widgets* click *New*
3. Enter the widget title: *Stoichiometry Table* (or whatever you choose to call it for your notebooks)
4. In the *Widget HTML Editor* tab, click the *Source* button on the toolbar.
5. In a new browser window:
    1. Go to https://github.com/Sydney-Informatics-Hub/labarchives-stoichiometry-widget/raw/master/widget.html
    2. *Select All* (find this in the Edit menu)
    3. *Copy* (find this in the edit menu)
    4. Close that browser window.
6. Back in your *Widget HTML Editor*: *Select All* and *Paste*.
7. Change to the *Script Editor* tab.
8. In a new browser window:
    1. Go to https://github.com/Sydney-Informatics-Hub/labarchives-stoichiometry-widget/raw/master/script.js
    2. *Select All* (find this in the Edit menu)
    3. *Copy* (find this in the edit menu)
    4. Close that browser window.
9. Back in your *Script Editor*: *Select All* and *Paste*
10. Click the *Save Widget* button next to the Title entry box.

## Add a Widget into your Notebook

See https://labarchives.kayako.com/knowledgebase/article/View/408/286/501-what-are-widgets

## Expected Behaviour

The software requirements detail expected behaviour for each modification to the table's data.

The permitted user inputs to the Stochiometry widget and the subsequent results are documented for the following 
two scenarios - 

1. When first entering data into the table
2. When changing the values of the experiment


### Initializing the records of the experiment:

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
| equiv  | mol  |
| mol  | equiv  |
| amt then mol  | equiv and fw |
| fwd then mol  | equiv and amt |

Once the first row and the rows needed for experiment are filled, add the Stochiometry to the page.

### Changing the values of the records of the experiment:

For row 1, the behaviour is as below - 

|  User Changes  | Automatically Calculated |
| ------------- | ------------- |
| amt  | mol and amt are recalculated for all rows which have valid values |
| mol  | mol and amt are recalculated for all rows  which have valid values |
| fw  | amt is recalculated for row 1 |

For rows greater than 1, the behaviour is as below - 

|  User Changes  | Automatically Calculated |
| ------------- | ------------- |
| amt  | equiv and moles are recalculated for the row for which the amt was changed |
| equiv  | amt and moles are recalculated for the row for which the equiv was changed  |
| fw  | amt and moles are recalculated for the row for which the fw was changed  |

### For volume and density fields

If the user enters density to the experiment, the volume will be automatically calculated by the formula -
volume = amount / density

Filling density and volumes field is optional to the experiment and is used when gases are involved
in the chemical equation.

Volume will be re-calculated whenever the amount value changes.
