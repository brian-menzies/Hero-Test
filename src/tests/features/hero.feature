Feature: Verify Hero page works as expected

    Background:
        Given I am in the hero page

    @focus
    Scenario: Add a new hero and verify they appear in the hero list
        When I Add a New Hero "Muscle Man"
        Then The Hero should Appear in the Hero List

    Scenario: Verify searching for a hero works

    Scenario: Verify deleting a hero removes them from the list

    Scenario: Verify a hero's name can be changed

    Scenario: Verify adding a new hero and then deleting an old one from the list places the new hero on the Top Heroes section
