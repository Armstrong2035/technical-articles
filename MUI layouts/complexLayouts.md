## Outline

1. Introduction (done)
2. What is a layout (1 parargaph)
3. MUI Grid
4. MUI media queries
5. SX for custom CSS declearations
6. Componenents with built in, immutable values
7. Conclusion

# Introduction

One of the issues people have with using a component library is the semi-mutabvle / immutable nature of the components. For example, any given Material UI (MUI) component has preset variants that limit a developer's ability to customzie it. This creates the impresion that Material UI can only be used to build a relatively simple layout, and that tradeoffs will have to be made. This concern is however mostly unfounded because MUI has features that can handle complex layouts. It also allows users to write custom CSS declearations.

This article will dive deep into MUI's inbuilt and Grid functionlaity. It will also teach you how to use the SX prop, as well as the cases where editing is not an option. As you follow along, we will build out a layout with the following web page as a guideline:

The prerequisite knowledge for this article to make sense is as follows:

- Knowledge of JavaScript
- Knowledge of React
- Knowledge of Material UI
- Knowledge of some CSS

Let us dig in

## What is layout?

A typical website or native application has a number of visul elements to display. The hero picture, text, navigation bar, icons and CTA button are a few visual elements. Layout refers to how these elements are arranged, organized or displayed. Simply put, a layout is the map of a web page.

But just like maps, some layouts are straight forward, while others can be difficult for a developer to build. Some layouts are simple - such as a **Single Column Layout** which is when a website has all its visual elements in a single vertical column. Single column layouts are popular among landing pages where the information architechture is straight forward.

But what if you are building a **Magazine Layout** or an **Asymetric Layout**? These layouts have several visual elements and their arrangement may differ in positon, size, and spacing. In this case, Material UI offers **Grid**, **Media rules** and the **SX** prop to help developers build complex layouts.

For this article, we will recreate the layout in the image below:

![a web page for a music website](/MUI%20layouts/musicwebpage.png)

## MUI Grid

- Overview of MUI Grid
- Our first grid container
- Our first two grid items
- Creating our first two nested grid containers

MUI Grid is a well define tool for building flexible and complex layouts in React projects. Its syntax on a basic level is as follows:

```jsx
import React from "react";
import { Grid } from "@mui/material";

function Container() {
  const value = "center"; // Example value for alignment

  return (
    <Grid
      container
      alignItems={center}
      justifyContent={value}
      direction={"row"} // Example direction value
      spacing={3} // Example spacing value
      sx={
        {
          /* CSS declaration */
        }
      }
    >
      <Grid item xs={12} sm={12} md={6} lg={4}>
        <Item1 /> {/* Render Item1 component */}
      </Grid>

      <Grid item xs={12} sm={12} md={6} lg={4}>
        <Item2 /> {/* Render Item2 component */}
      </Grid>

      <Grid item xs={12} sm={12} md={6} lg={4}>
        <Item3 /> {/* Render Item3 component */}
      </Grid>
    </Grid>
  );
}

export default Container;
```

#### The Grid Container

The **grid container** is the starting point of our layout design. Whatever is nested inside it is a **grid item**. The grid container has the following props:

1. **Direction** receives either **row** or **column** as it value. This determines the direction which the grid items insisde this grid container will be arranged. Furthermore, if direction is set to 'row' then the main axis is horizontal and the cross axis is vertical. Otherwise, the main axis is vertical and the cross axis is horizontal.
2. **Align Items** affects how items are appear on the cross axis. If direction is set to row, then align items will affect how items appear vertically. The values for this prop can be found in MUI official documentation.
3. **Justify Content** arranges grid items according to the Main axis. If direction is set to row, justify content will impact the horizontal arrangement of items. The values for this prop can be found in MUI official documentation.
4. **Spacing** determines how much space is between grid items
5. **Responsive values** such as xs, or lg determines the size of a grid item within the context of its container.

(Question: how much information is too much? Should I explain deeper here?)

These are just the basics of Grid. You can learn more about these prperties in the official documentation. For now, let is build the layout we set out to build.

## Building the layout

As a guideline, here's a map of our layout. ![a web page for a music website](/MUI%20layouts/musicwebpagelayout.png)

The first thing we notice about this layout is that there are three major sections. They are as follows:

- Navigation section at the top which cuts across the full width of the page. This part is labelled 1
- Beneath the Navigation is the body which contains two main sections
  - Section on the left containing a _slideshow_. This section is labelled 2.
  - Section on the right containing a _music player_. This section is labelled 3.
    - Nested inside the music player is the _audio controller_. This sub section is labelled 4.
    - Nested inside the music player is a _playlist_. This sub section is labelled 5.

```jsx
import React from "react";
import { Container, Grid, Stack } from "@mui/material";

export default function ComplexLayout() {
  return (
    <Container>
      <Grid container className={"navigation"}></Grid>

      <Grid container className={"body"}></Grid>
    </Container>
  );
}
```

We first outline the navigation and the body with the Stack component. It is a layout component that stacks two elements on top of one another.

Inside the Stack component, we put two Grid Containers. The first Grid container is the navigation section. The second Grid container is the body.

The next thing we will do is to start to populate each of these Grid containers with grid items of their own.
