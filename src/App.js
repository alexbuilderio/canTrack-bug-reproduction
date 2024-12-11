import './App.css';
import { useEffect, useState } from "react";
import { BuilderComponent, builder, useIsPreviewing, Builder, withChildren } from "@builder.io/react";
import { Heading } from './CustomComponents/Heading';
import { Carousel } from './CustomComponents/Carousel';
import '@builder.io/widgets';
import 'typeface-roboto'
import 'typeface-nunito'

builder.init('d4173130c72d466386720bb5a107ae3');
builder.canTrack = false;
console.log("on initial page render, canTrack is set to: ", builder.canTrack)

Builder.registerComponent(Heading, { 
  name: 'Heading',
  inputs: [
    { 
      name: 'title', 
      type: 'text',
      regex: {
        pattern: '^.{0,10}$',
        message: 'Title should not exceed 10 characters'
      }
    }
  ],
  image: 'https://cdn.builder.io/api/v1/image/assets%2FYJIGb4i01jvw0SRdL5Bt%2F6bef27ee40d24f3b88239fd7e616f82a'
});

Builder.registerComponent(Carousel, {
  name: 'Carousel',
  canHaveChildren: true,
  shouldReceiveBuilderProps: {
      builderBlock: true,
  },
  inputs: [
      {
          name: 'slides',
          type: 'list',
          subFields: [

          ],
          defaultValue: [
              {
                  '@type': '@builder.io/sdk:Element',
                  component: {
                      name: 'Text',
                      options: {
                          text: 'Carousel Text - Im editable'
                      }
                  },
              }
          ],
      },
  ],
})
/*
export const Hero = props =>
  <div>hero {props.children}</div>

// pass your custom component to withChildren()
const HeroWithBuilderChildren = withChildren(Hero)

// specify defaultChildren when you register the component
Builder.registerComponent(HeroWithBuilderChildren, {
  name: 'Hero',
  // Adding defaults is important for easy usability
  defaultChildren: [
    { 
      '@type': '@builder.io/sdk:Element',
      component: { name: 'Text', options: { text: 'I am child text block!' } }
    }
  ]
})

/*
Builder.register("editor.settings", {
  designTokens: {
    fontFamily: [
      { name: 'Design Token Roboto', value: 'Roboto, sans-serif' }
    ],
    fontSize: [
      { name: 'Responsive Font Size', value: 'var(--font-size)' }
    ],
    letterSpacing: [
      { name: 'user friendly name', value: '-0.02em' }
    ]
  },
});
*/

// set whether you're using the Visual Editor,
// whether there are changes,
// and render the content if found
export default function App() {
  const isPreviewingInBuilder = useIsPreviewing();
  const [notFound, setNotFound] = useState(false);
  const [content, setContent] = useState(null);

  const toggleCanTrack = () => {
    console.log("canTrack is set to: ", builder.canTrack)
  };

  // get the page content from Builder
   useEffect(() => {
    async function fetchContent() {
      const content = await builder
        .get("page", {
          url: window.location.pathname
        })
        .promise();

      setContent(content);
      setNotFound(!content);
        console.log("content", content)
      // if the page title is found, 
      // set the document title
      if (content?.data.title) {
       document.title = content.data.title
      }
    }
    fetchContent();
  }, [window.location.pathname]);
  
  // If no page is found, return 
  // a 404 page from your code.
  // The following hypothetical 
  // <FourOhFour> is placeholder.
  if (notFound && !isPreviewingInBuilder) {
    return <p>No page found</p>
  }

  // return the page when found
  return (
    <>
      <p>canTrack is set to {builder.canTrack.toString()}</p> 
      {/* Render the Builder page */}
      <BuilderComponent model="cool-page" content={content}/>
    </>
  );
}
