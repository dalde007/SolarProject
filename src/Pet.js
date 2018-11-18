import React from "react";

class Pet extends React.Component // in React, every "class" component must have a "render" method
{
    render() // render should always be quick because it gets called so much
    {
        const { name, animal, breed, media, location } = this.props;
        
        let photos = [];

        if(media && media.photos && media.photos.photo)
        {
            photos = media.photos.photo.filter(photo => photo["@size"] === "pn"); //keps only one size of the photo to display
        }

        return (
            <div className = "pet">
              <div className = "image-container">
                <img src = { photos[0].value } alt = { name } />
              </div>
              <div className = "info" >
                <h1> { name } </h1>
                <h2> { animal } - { breed } - { location } </h2>
              </div>
            </div>
        );
    }
}

// export const Pet = (props) => //Pet is the function (child) component
// {
//     // return React.createElement("div", {}, [
//     //     React.createElement("h1", {}, props.name),
//     //     React.createElement("h2", {}, props.animal),
//     //     React.createElement("h3", {}, props.breed)
//     // ]);

//     return ( 
//         // this method is known as JSX code where you can write HTML wihtin your JavaScript files
//         // this is the same code as above but in HTML form
//         // { } - makes it print the value of what is inside instead of the literal "props.name" being printed
//         <div>
//             <h1>{ props.name }</h1>
//             <h2>{ props.animal }</h2>
//             <h3>{ props.breed }</h3>
//         </div>
//     )
// };

export default Pet;