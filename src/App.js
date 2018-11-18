import React from "react"; //installs react for you so you don't need to manually grab it from the site
import { render } from "react-dom"; //only pulls the render function from react-dom
import pf from "petfinder-client";
import Pet from "./Pet";

const petfinder = pf( //petfiner is the API client
{
    key: process.env.API_KEY,
    secret: process.env.API_SECRET
})

class App extends React.Component //App is the class (parent) component. Class components are "stronger" than function components
{
    constructor (props) // constructor always takes in props
    {
        super (props); // calls React.Component's constructor and it passes the props up there

        this.state =
        {
            pets: []
        }
    }

    componentDidMount() // life cycle method
    {
        petfinder.pet.find({ output: "full", location: "Seatle, WA" }) // will request all animals up for adoption in the specified location
        .then(data => 
            {
            let pets;

            if(data.petfinder.pets && data.petfinder.pets.pet) // if it exists...
            {
                if(Array.isArray(data.petfinder.pets.pet)) // if if finds 2 or more pets, it will return an array
                {
                    pets = data.petfinder.pets.pet
                }
                    else
                    {
                        pets = [data.petfinder.pets.pet]; //if its just one animal, wrap that one animal in an array
                    }
            }

                    else
                    {
                        pets = [] //if you don't find anything just make it an empty array
                    }
                    this.setState(
                    {
                        pets
                    })
            })
    }

        // const promise = petfinder.breed.list({ animal: "dog" }) // an object that represents a future value coming (returns a promise)
        // promise.then(console.log, console.error); // will print out what it finds, otherwise will return an error

    handleTitleClick()
    {
        alert("You clicked the title");
    }
    
    render()
    {
        // {} = null or empty parameters
        // return React.createElement("div", {}, [ //createElement is the instance of the App class
        //      React.createElement('h1', {onClick: this.handleTitleClick}, 'Pet Finder!'), //this = whatever instance of App we have
        //      React.createElement(Pet, {name: "Tucket", animal: "Dog", breed: "Mixed"}),
        //      React.createElement(Pet, {name: "Snowflake", animal: "Bird", breed: "Cockatiel"})
        // ])

        return (
            // same code as above but in JSX (HTML code within a JavaScript file)
            // onClick gives you a notification when you click somewhere on the page and in this example it will be the title
            <div>
                <h1 onClick = { this.handleTitleClick }> Pet Finder!</h1>
                {this.state.pets.map(pet => 
                    {
                        let breed;

                        if (Array.isArray(pet.breeds.breed))
                        {
                            breed = pet.breeds.breed.join(" , ") // joins certain breeds
                        }

                        else
                        {
                            breed = pet.breeds.breed;
                        }
                        return (
                            <Pet
                            key={pet.id} // "key" gives a unique identifier that keeps data from being deleted, instead it just gets moved to the new location
                            animal={pet.animal}
                            name={pet.name}
                            breed={breed}
                            media={pet.media}
                            location={`${pet.contact.city}, ${pet.contact.state}`}
                            />
                        )
                    })}
                {/* <Pet name = "Tucket" animal = "Dog" breed = "Mixed" />
                <Pet name = "Snowflake" animal = "Bird" breed = "Cocktiel" /> */}
            </div>
        )
    }
}

render(<App />, document.getElementById('root'))

// Running the program Prettier in the command line/terminal...
// C:\Users\dalde\Documents\Visual Studio Programs\firstReact\src> npx prettier App.js
// Shows preview
// C:\Users\dalde\Documents\Visual Studio Programs\firstReact\src> npx prettier App.js --write
// Overwrites the file with the format that Prettier has recommended

// The reason for the .prettierrc.json file and why it uses {} is because it uses the default configuartion
// VS code is going to see we have a prettier rc file and it's going to say "this is a prettier project" and format the code all the time