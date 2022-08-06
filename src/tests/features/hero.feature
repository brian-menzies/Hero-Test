Feature: Verify Hero page works as expected

    Background:
        Given I am in the hero page

    Scenario: Add a new hero and verify they appear in the hero list
        When I Navigate to the Heroes Page
        Then I Add a New Hero "Muscle Man"
        Then The Hero "Muscle Man" should Appear in the Hero List

    Scenario: Verify searching for a hero works
        When I search for Hero "Bomba"
        Then The Hero "Magma" should Appear in the Search Results List

    Scenario: Verify deleting a hero removes them from the list
        When I Navigate to the Heroes Page
        Then I Delete a Random Hero from the List of Heroes
        Then The Previously Deleted Hero should not be present in the List of Heroes
    
    @focus
    Scenario: Verify a hero's name can be changed
        When I search for Hero "Magma"
        When I Select Hero "Magma" from the Search Results
        Then The Hero Details Page Appears
        Then I Change the Hero Name to "Freezer"
        

    Scenario: Verify adding a new hero and then deleting an old one from the list places the new hero on the Top Heroes section
        When I Navigate to the Heroes Page
        Then I Add a New Hero "Cooler and Cell"
        Then I Delete a Random Here from the List of Heroes that's not "Cooler and Cell"
        Then I Navigate to the Dashbaord Page
        Then The Hero "Cooler and Cell" should be Present in the Top Heroes Section
