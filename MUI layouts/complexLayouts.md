# Introduction

Many developers assume that Material UI (MUI) cannot build complex layouts. But this is far from true. Building complex layouts with MUI is a matter of mapping the page and using the right elements. To that effect, MUI provides layout components such as Grid. It also allows for custom CSS.

This article will attempt to recreate a complex layout with MUI and custom CSS. It reads like a tutorial, but it is not. It is more of an overview of how you could combine MUI components with custom CSS. As you follow the code in your own IDE, feel free to experiment with your own solutions.

Some of the MUI layout components we will use are as follows:

1. Grid container
2. Grid item
3. Box
4. Stack

In this article, you will recreate the layout in the image below:

![a web page for a music website](/MUI%20layouts/jazz-store-layout.png)

> As you follow along, please experiment with MUI features and custom CSS to see what works. This is not about giving rigid rules for building layouts. It is about showing you how you could combine MUI layout components in your own projects. If you have any interesting insights, please share in the comments.

## Setting the canvas

```jsx
import React from "react";
import { Grid } from "@mui/material";

export default function ComplexLayout() {
  return (
    {/* Main div for the entire page */}
<div
  className="body"
  style={{
    padding: "10px", // Adding padding to the div
    height: "100vh", // Setting the height of the div to full viewport height
    backgroundColor: "#212121", // Setting the background color of the div
  }}
>
  {/* Grid container with items in a row */}
  <Grid container direction={"row"} spacing={3} sx={{ padding: 5 }}>
    {/* Grid item for the slideshow, takes 3 columns on large screens and extra-large screens */}
    <Grid className="side-bar-container" item lg={3} xl={3}></Grid>
    {/* Grid item for the music player, takes 9 columns on large screens and extra-large screens */}
    <Grid className="main-content-container" item lg={9} xl={9}></Grid>
  </Grid>
</div>;

  );
}
```

To set the canvas, we do the following:

1. Create a div (_body_) as the canavs for the page. Set its background color using the **style** prop. The style prop is used in MUI to add **custom CSS** to **non MUI components**. If div was a MUI component, replace style with **SX**
2. Let _body_'s height fill the entire screen by, setting its height to _100VH (viewport height)_.
3. Inside _body_, create a Grid container and arrange its items in a row.
4. Let Grid container have grid items. The items are _side-bar-container_ and _main-content-container_
5. Set the width of both grid items using breakpoints:
   - _side-bar-container_: covers three grid columns on large screens
   - _main-content-container_: covers nine grid columns on large screens.

### Building **side-bar-container**

Here's the code for **side-bar-container**

```jsx
<Grid className="side-bar-container" item lg={3} xl={3}>
  {/* Sidebar container with a black background */}
  <Box
    sx={{
      backgroundColor: "#000000",
      height: "100%",
      display: "flex",
      justifyContent: "center",
    }}
  >
    {/* Box inside the sidebar container */}
    <Stack spacing={2} sx={{ margin: "20px" }}>
      {/* Image placeholder */}
      <img
        src={imageplaceholder}
        style={{ objectFit: "contain", width: "100%" }}
      />

      {/* Heading text */}
      <Typography variant={"h5"} sx={{ color: "white" }}>
        dolor sed viverra ipsum nunc aliquet
      </Typography>

      {/* Button for reading more */}
      <Button variant={"text"} sx={{ justifyContent: "flex-start" }}>
        Read more
      </Button>
    </Stack>
  </Box>
</Grid>
```

Inside **side-bar-container** we do the following:

1. Create a Box component.
   - Set its _height to 100%_ of its parent component. Since there is no explicit height for **side-bar-container**, Box component gets its context from **body**'s height which is '100vh'. Hence this Box height 100% fills the entire length of **body**. Furthermore, MUI Grid items and containers derive their size from the content inside them. This means that **side-bar-container** will adjust its height to the box container.
   - Set Box's display to 'Flex' so that it provides the context for the items that will be nested inside it.
   - Justify the items inside it to 'center'. If you like, experiment with other flex properties.
2. Nest a Stack component inside Box. Stack and everything inside it then become the flex items of Box.
   - Set the margin for Stack to create some seperation between it and Box.
   - Set the space between the stack items.
3. Inside Stack, let the image be contained. Let the image also take 100% of the Stack's width
4. MUI Button goes to the center of the parent component by default. Change that with justifyContent

That does it for **side-bar-container**. Up next, _main-content-container_.

### Building main-content-container

The main content container is a bit more tricky

1. A large product image
2. A products description page
3. A color palette stacked on one another

So far the document structure is as follows:

```psuedo
<div className='body'>
  <Grid container>
    <Grid item className='side-bar-container'> </Grid>
    <Grid item className='main-content-container'> </Grid>
  </Grid>
</div>
```

Body has a Grid container inside it.
Grid container has two grid items. Namely 'side-bar-content', and 'main-content-container'

Here's the structure for _main-content-container_:

```jsx
<Grid className="main-content-container" item lg={9} xl={9}>
  <Grid container spacing={3}>
    <Grid item className="content-box"></Grid>
    <Grid item className="colorlist" sx={{ overflow: "hidden" }}></Grid>
  </Grid>
</Grid>
```

The code snippet demonstrates that it is possible to nest a Grid container inside a grid item.

1. Inside _main-content-container_, nest a Grid container.
2. Inside the Grid container, create two grid items.
3. The grid items are 'content-box' and 'color-list'.

#### Building _content-box_

```jsx
<Grid item className="content-box">
  <Grid container spacing={3}>
    <Grid item className={"content-box-child-1"} lg={6}>
      <img src={imageplaceholder} style={{ height: "100%", width: "100%" }} />
    </Grid>

    <Grid item className={"content-box-child-2"} lg={6}>
      <Card
        sx={{
          backgroundColor: "#000000",
          height: "100%",
          borderRadius: "0",
        }}
      >
        <Stack spacing={2}>
          <CardContent>
            <Typography variant={"p"} sx={{ color: "white" }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Volutpat commodo sed egestas egestas. A cras semper auctor neque
              vitae tempus quam pellentesque nec. Quisque id diam vel quam
              elementum pulvinar etiam non. Porta non pulvinar neque laoreet
              suspendisse. Ultrices mi tempus imperdiet nulla.
            </Typography>
          </CardContent>

          {productList.map((product) => {
            return (
              <>
                <Box
                  border={3}
                  sx={{
                    backgroundColor: "#222222",
                  }}
                >
                  <Stack
                    direction={"row"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                  >
                    <Typography
                      sx={{ color: "white" }}
                    >{`${product.name}`}</Typography>
                    <Button>Add to cart</Button>
                  </Stack>
                </Box>
              </>
            );
          })}
        </Stack>
      </Card>
    </Grid>
  </Grid>
</Grid>
```

_content-box_ has two sections. Here's the code structure:

1. Nest a Grid container inside content-box
2. Create two grid items inside the grid container
3. For _content-box-child-1_, do the following:
   - Set the width to '6' grid columns on large screens. Hence, _content-box-child-1_ will take half of the width of its parent container, main-content-container.
   - Add an image. Let it fill the entire width and length of _content-box-child-1_.
4. For _content-box-child-2_, do the following:
   - Set the width to '6' grid columns on large screens. Hence, _content-box-child-2_ will take half of the width of its parent container, main-content-container.
   - Create a Card component inside it.
   - Set the height of Card to fill the entire length of _content-box-child-2_.
   - MUI Cards have a preset border radius. Set it to zero to overwrite the default.
   - Inside Card, create a Stack.
     - Inside Stack do the following:
       - Create CardContent.
       - Add typography to card content
       - Also add an array.
       - Render the array as follows: For each array item, create a Box component with a border of 2. Inside the Box, stack the name of the product, and a button to buy. Let the Stack items be arranged as a row. Then do the following:
         - Justify the items to have some space between them.
         - Align the items to the center.

> You set the height for the items in _content-box-child-1_ and _content-box-child-2_ to 100% of the grid item. Since these are the only Grid items in main-content-calendar, they will span the length of the entire page. But something interesting happens when we add another grid item to _main-content-calendar_'s main axis (vertical). The 100% height content for the items in _content-box-child-1_ and _content-box-child-2_ changes context from main-content-calendar to just the grid item that holds that content. Therefore, the 100% height will only be within the grid item. Main-content-calendar will then expand its height to accomodate a new grid item along its main axis. This changes the layout of the entire page.

So time to add the another grid item to main-content-calendar.

#### Building **color-list**

```jsx
<Grid item className="color-list" sx={{ overflow: "hidden" }}>
  <Stack direction={"row"} spacing={-13}>
    {colorList.map((color) => {
      return (
        <Box
          sx={{
            width: "150px",
            height: "150px",
            backgroundColor: color,
          }}
        >
          {" "}
        </Box>
      );
    })}
  </Stack>
</Grid>
```

Do the following:

1. Inside _color-list_ create a Stack (not Tony Stark) component.
2. Since we have an array of over 20 boxes, set Stack's overflow to hidden.
3. Stack the images in a row
4. Add negative spacing, so each color box overlaps the color box to its left.
5. For each array item, do the following:
   - Create a box.
   - Set a fixed height
   - Set a fixed width
   - Set the background color

Conclusion:
MUI layout components such as Grid, Stack, and Box are just ways that MUI can help. There are other components not used in this article. Please refer to official documentation. Furthermore, MUI allows developers to use custom CSS when neccesary. This article demonstrates MUI's flexibility by using CSS 'flex display'. You can also use other CSS features such as 'absolute' or 'Z-index'.

But beyond MUI's flexbility this article provides a way to think about layouts. The major principle at play here is to group related content into containers. This principle is possible because of MUI's ability to use Grid components, Grid items and Stacks as both parent, and children. This idea offers the least path to resistance.

Finally, please do your own experiments with MUI. For example, this article only uses the Large breakpoint. Hence, this design is not reponsive in small and medium screens. Perhaps that is one way for you to test your new found knowledge.
