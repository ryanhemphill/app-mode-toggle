# app-mode-toggle
a11y experiments: How to toggle app mode automatically

Explanation: (sorry, it's long but you'll see that it's necessary)

This app uses a combination of HTML and JavaScript strategies to toggle "app-mode" in the JAWS screenreader, which reads content to a blind/visually impaired user. In its native state, JAWS uses almost the entire keyboard to help blind users navigate and read content, but the key events are not passed to the browser in most cases. 

Consequently, "reader-mode" in JAWS doesn't allow JavaScript to leverage key events to enhance applications for a blind user, despite the benefits. Web applications have become more and more complex, and for a keyboard user / non-mouse user, the ability to pass key events to the web browser for interactive purposes has become a critical requirement. 

Luckily, a spec called ARIA was developed to help screenreader programs adjust to complex web app software, granting the passage of key events to the browser. The ARIA strategy for this is an HTML insertion of an attribute/value pair role="application", which tells JAWS to switch to app-mode. 

There are issues, however. This "app-mode" is inconsistent in its behaviors and insuring that app-mode is initiated at the moments it's needed most is not problmatic and buggy. This can result in reader-mode and app-mode "competing" and leaving designers/developers unable to insure that app-mode is initiated when it's most needed. 

That is the challenge of this experiment.

"Can we devise means to consistently, WITH ABSOLUTE CERTAINTY, toggle app-mode in JAWS when it is needed most?"
and
"Once app-mode is no longer needed can we, WITH ABSOLUTE CERTAINTY, toggle it off again?"

#Try it out

Go to http://ryanhemphill.github.io/app-mode-toggle/ (with JAWS installed and running on your Windows PC, of course) and give 'er a spin. 

In this demo page, the JAWS reader should start out in reader-mode. 

#The Button Strategy: 

As you go down the page, you will reach the button "Enter App Mode", which will drop you into the application state (app-mode) and place your focus on the navigation buttons below it. Assuming that app-mode initiates, the up/down/right/left keys should respond by changing the focus from one navigation button to another.

#The "Catch" Strategy:

we discovered another means to initiate app-mode without pressing the button by "catching/detecting" the focus event that occurs every time a JAWS reader passes over a text field element. The reader drops into the text field, passing a focus event to the browser, which time we initiate the toggle.

#How we do it:

We use an iframe (empty) that temporarily moves the focus of the JAWS reader out of the current page and into the iframe's page. Upon doing this, we update the page's body to include the ARIA attr/value role="application", which changes the whole page to an application in the "eyes" of JAWS. We then place the focus back on the page, at which point the JAWS reader identifies the ARIA tag and changes its setting to app-mode automatically. Naturally, if we reverse this event by dropping the role="application" with the same iframe focus-jump strategy, the JAWS reader returns to its reader-mode.

#Warning!

JAWS is a glitchy little program. I had to jump through some hoops to make this happen. I do not recommend using this idea (if you make it work successfully) in just any old web app. It really has to NEED it (because you can't get it done by any other means) and you really need to test it extensively if you do. With real blind users.

#Key Benefits:

That being said, I strongly feel that this little program will give you a new appreciation for focus management within a web app when you are trying to make it accessible. It will also allow you to truly experience app-mode transitions and KNOW you are in/out of app-mode when you are doing your applications, whether you use this toggle or not.

Have fun!
