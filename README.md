# Cryptid Music
A website for cryptid music.

<br>

# How to update Snippets

1. prepare your snippets. file type isn't important. name them something short-ish but unique, no spaces, preferably camel cased `soThatTheyreNamedLikeThis` or with dashes `so-theyre-named-like-this`. Stick to alphanumerical characters A-Z & 0-9.
2. duplicate this tab (if you still need the instructions)
3. in one of the tabs press the period key (`.`) on your keyboard to go to the github online editor.
4. put your snippets in the `./snippets` directory/folder 
5. update `./snippets/snippets.json` with new metadata. Make sure filenames match exactly.
6. using the menu to the left of the screen, click the 3rd icon from the top that looks like a futuristic circuit-y tree branch. Enter a description of what you changed where it says `Message`. This can be as simple as `"Snippet Update 12/22/22"`, just something that indicates what was changed. 
7. Under the big button that says `"Commit"` there should be a list of all the files you changed. make sure that it was **only** files in `./snippets` that you wanted to change. If you accidentally changed anything else you should be able to press a button that looks like a rewind arrow that says `'discard changes'`.
8. When everything looks good press the big `'Commit'` button to push your changes to the repo/site. It should only take a minute or two to rebuild the site, you can check the progress of this in the `Actions` tab of this repository

## What should `snippets.json` look like ?
```json
// anything that's the same color as this line shouldn't go in the file, these are just comments
{ // <- opening curly brackets
    "snippetCount": 3, // <- number of snippets currently on page. don't forget the comma, make sure there's no quotes on the number part
    "samples": [ // <- opening bracket for your 'list' of samples
        { // <- need an opening and closing curly brackets for each sample
            "filename": "testsnippet.m4a", // <- filename.extension
            "extension": "x-m4a", // not too important, use x-m4a if you use an .m4a file but drop the x- for any other extension
            "title": "Sample Snippet" // keep this pretty short
        }, // comma after every closing curly bracket *except* the last one.
        {
            "filename": "testsnippet2.m4a",
            "extension": "x-m4a",
            "title": "Sample Snippet 2"
        },
        {
            "filename": "testsnippet3.m4a",
            "extension": "x-m4a",
            "title": "Sample Snippet 3"
        }
    ]
} // <- closing curley brackets

// don't forget quotation marks around all text but not
```