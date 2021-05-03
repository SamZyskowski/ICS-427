# What is complete so far

Got the API successfully hooked in <br/>
Able to see data from the Open Dota site in console <br/>
Able to search for specific matchIDs and see data <br/>

# What is pending

UI needs to be worked on <br/>
Displaying the data to the webpage itself, not just the console <br/>

# List of team members specifying under each team member's name: what they worked on in the project so far, and what they will be handling next.

Sam Zyskowski - Initial commit and all other code  <br/>
Chris - Report <br/>
James - Worked on implementation of the playerwins page, continuing to work on error checking for the page as well <br/>
Jeffery - Working on fixing errors and working on layouts<br/>



# New section for 2/21 - 3/28 period 

# Progress 

We have successfully transformed the data from the console onto the webpage, and are displaying it well <br/>
Have access to not only the matchID information, but now the playerID information as well <br/>

link: this repo <br/>

# Pending

All that is left is to be able to display the past X games for a player and show hero specific stats <br/>

# Roles and Responsibilities

James:  <br/>
 New: Added the beginning of hero specific stats, as well as being able to input which hero is being searched  <br/>
 Current: Working with Sam on finishing the hero specific stats <br/>
 Next: Being able to display last X games for various filters <br/>
 
 
 
Jeff:   <br/>
  New: Fixed up numerous front end issues, and made good progress on the report <br/>
  Current: Making the design decision on how to display the data we are pulling from the API <br/>
  Next: Implementing design decisions <br/>
  
Chris:  <br/>
  New: Finished the report <br/>
  Current: Helping Jeff with front end <br/>
  Next: Helping Jeff with front end <br/>
  
Sam: <br/>
  New: Finished the matchID page so it displays all the relevant information, started and continued to work on the playerID page <br/>
  Current: Adding more information to the matchID page and possibily a new page all together, as well as streamlining busted code <br/>
  Next: Being able to display last X games for various filters <br/>
  
  
# New section for 3/29 - 4/11 period 

# Progress 

Added functionality for a hero list <br/>
Cleaned up UI <br/>

# Pending

We still want to be able to display a certain amount of stats per player and save info to the database <br/>

# Roles and Responsibilities

James:  <br/>
 Hero list drop down for playerStats page <br/>
 
Jeff:   <br/>
  Fixed up UI and finished report <br/>
  
Chris:  <br/>
  Finished the report <br/>
  
Sam: <br/>
  Worked on existing issues from last submission <br/>
  
  
  # New section for last period

# Progress 

Succeeded in adding background images and fixing UI

# Roles and Responsibilities

James:  <br/>
Refactoring of pages and report + wiki
  <br/>
 
Jeff:   <br/>
Changed layout for Player ID and filled in parts of the report<br/>
  
Chris:  <br/> Report
  <br/>
  
Sam: <br/>
  Fixed UI for matchInfo page and added background images <br/>
  </br>

# Final Thoughts
It was interesting to revisit something I haven't gone over for a long time. It did create some problems when trying to figure out how to do certain things but otherwise it was pretty easy to just look stuff up.

# How to install and use
To use the program, macOS is preferred but not required. To see if your computer or device can run this, you will need to visit installation links provided in the steps below  and see if your device is able to install those requirements. Main points are to clone the repository and install npm and meteor.
1. Download and install github desktop. Then clone the repository to your machine. The desktop is preferred but if you don’t like the desktop or are unfamiliar with it, you may do it manually too. Instructions for both methods are in this: https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository
2. On the desktop, you can now right-click the repository and select the “open in command prompt” option. If you are not using the desktop, simply go to the directory where you cloned the repository using a command prompt or terminal
3. Once in the directory, go into the “app” sub directory using “cd app”. Then install meteor using “meteor npm install”. If there are problems with installation of meteor please look at the following links: https://docs.npmjs.com/cli/v7/commands/npm-install https://www.meteor.com/developers/install
4. Once installed, run the app using “meteor npm run start”. The app will run on a local port such as http://localhost:3000/ 
5. Lastly, open up a web browser like google chrome and head to that local destination to view the program
To uninstall the program, just delete the directory from your machine. 
