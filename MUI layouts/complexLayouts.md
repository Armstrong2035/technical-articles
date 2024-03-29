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

These are just the basics of Grid. You can learn more about these properties in the official documentation. For now, let is build the layout we set out to build. Now, let us put these and more to use.

## Building the layout

As a guideline, here's a map of our layout. ![a web page for a music website](/MUI%20layouts/musicwebpagelayout.png)

The first thing we notice about this layout is that there are three major sections. They are as follows:

- Navigation section at the top which cuts across the full width of the page. This part is labelled 1
- Beneath the Navigation is the body which contains two main sections

  - Section on the left containing a _slideshow_. This section is labelled 2.
  - Section on the right containing a _music player_. This section is labelled 3.
    - Nested inside the music player is the _audio controller_. This sub section is labelled 4.
    - Nested inside the music player is a _playlist_. This sub section is labelled 5.

> As you read the code, and the reasons for some of the choices, please follow along with code of your own. And feel free to do things differently if you believe you have a better solution.

### Setting the canvas

```jsx
import React from "react";
import { Grid } from "@mui/material";

export default function ComplexLayout() {
  return (
    // Main div for the entire page, setting background color
    <div style={{ backgroundColor: "#212121" }}>
      {/* App bar for navigation or header */}
      <AppBar position="static" sx={{ backgroundColor: "#111111" }}>
        <Toolbar></Toolbar>
      </AppBar>

      {/* Main body div */}
      <div className="body" style={{ padding: "10px", height: "100vh" }}>
        {/* Grid container with items in a row */}
        <Grid container direction={"row"} spacing={1}>
          {/* Grid item for slideshow, taking 3 columns on large screens */}
          <Grid className="slideshow" item lg={3}></Grid>
          {/* Grid item for music player, taking 9 columns on large screens */}
          <Grid className="musicplayer" item lg={9}></Grid>
        </Grid>
      </div>
    </div>
  );
}
```

To set the canvas, we do the following:

1. Create a div as the main canavs for the entire page. We set its background color using the **style** prop. The style prop is used in MUI to add **custom CSS** to **non MUI components**. If div was a MUI component, we would replace style with **SX**
2. Add a header / nav bar using MUI components **AppBar** and **ToolBar**. But since the navbar is not part of the focus for this guide, we don't add anything to this.
3. Nested inside our main Div, we add another div whose **className** is _body_.
4. Set the padding of _body_ to _10px_. We also want the _body_ to take the height of the entire screen, so we set its height to _100VH (viewport height)_. The reason for this will become apparent.
5. Create a Grid container whose items are arranged in a row.
6. Our Grid container has two grid items. The items are _slideshow_ and _musicplayer_
7. Set the width of slideshow to take 3 columns on a large screen, and musicplayer to take 9 columns on a large screen.

> Note: Grid items and containers change their height based on the content we put inside of them.

### Grid Item (Slideshow)

Here's the code for grid item slideshow

```jsx
<Grid className="slideshow" item lg={3}>
  {/* Create a Box component with a black background and height set to 100% */}
  <Box sx={{ backgroundColor: "#000000", height: "100%" }}>
    {/* Stack with items aligned to the center */}
    <Stack alignItems={"center"}>
      {/* Box component to contain the image with a top margin */}
      <Box sx={{ marginTop: "10px" }}>
        {/* Image with custom styles */}
        <img
          src={inthemix} // Assuming 'inthemix' is a variable holding the image source
          style={{ objectFit: "contain", maxWidth: "300px" }} // Custom image styles
        />
      </Box>

      {/* Typography component for the title with white color and left margin */}
      <Typography variant={"h5"} sx={{ color: "white", marginLeft: "10px" }}>
        Soul Jazz Records mixtape radio show
      </Typography>

      {/* Button component for 'Read more' with text variant and positioned to the right */}
      <Button variant={"text"} sx={{ right: "108px" }}>
        Read more
      </Button>
    </Stack>
  </Box>
</Grid>
```

Inside the grid item slideshow, we do the following:

1. Create a Box component. We set its background color, and _height to 100%_.

   - Go back to item 7 of the previous section in this article. Note that we set the width of this grid item using breakpoints (lg={3}). However, there is no equivalent way to set the height using breakpoints. So here, we set the Box component's height to 100% of the div named body. Since grid containers and grid items change their height beased on the content in the content, giving the Box container the 100% height automatically sets the height of the grid item. However for this to work, we must explicitely state the height of the parent component, otherwise the value _height:'100%'_ will not have a reference point. In this case, the reference point is _height: '100vh'_ from the body div.

2. Nest the following components inside box:
   - Stack with items aligned to the center. This Stack component groups the following components
     - A Box component that acts as a container for an image. We set a maximum width for the image, and ensure that it stays within that box with the contain rule.
     - A Typography component with a single sentence. We use the **marginLeft** rule to ensure that the text aligns properly with its sibling components.
     - A button. We use the **right** property to ensure that the button aligns property with its sibling components.

All of this makes up the slideshow grid item. But there is a second major grid item to consider - music player.

### Grid Item (musicplayer)

The music player section of the body is more complex than slideshow. While slideshow arranges an image, a sentence, and a button on one line - music player has two major elements. These elements are as follows:

1. The Album which has the following elements:
   - An album cover
   - Album details:
     - Album description
     - Tracks player
     - Product details:
       - Product type
       - Serial number
       - Inventory status
       - Price
       - Favourite button
       - Add to cart button
2. The Playlist, which is an array of album covers.

Here's how we set the structure:

```jsx
<Grid className="musicplayer" item lg={9}>
  {/* Grid container for the music player */}
  <Grid container spacing={1}>
    {/* Grid item for the record player */}
    <Grid item className="recordplayer"></Grid>

    {/* Grid item for the playlist */}
    <Grid item className="playlist" sx={{ overflow: "hidden" }}>
      {/* The 'overflow' property is set to 'hidden' to handle overflow content */}
    </Grid>
  </Grid>
</Grid>
```

Musicplayer as a grid item of the overarching grid container takes up 9 columns in width. This was defined earlier in our code. However, the volume and diversity of the content inside this grid item makes it neccesary to create a nested grid container inside of it. To that effect, we do the following:

1. Create a grid container inside musicplayer.
2. Create two grid items inside our nested grid container namely record player and playlist.

#### Building record player

```jsx
<Grid item className="recordplayer">
  {/* Grid container for the song details */}
  <Grid container spacing={1}>
    {/* Grid item for the song image */}
    <Grid
      item
      className={"albumcover"}
      lg={6}
      sx={{ minHeight: "470px" }}
    ></Grid>
    {/* Grid item for the song information */}
    <Grid
      item
      className={"albumdetails"}
      lg={6}
      sx={{ minHeight: "470px" }}
    ></Grid>
  </Grid>
</Grid>
```

Record player is a grid item, which has two large visual elements. So we do the following:

1. Nest yet another grid container inside it.
2. Create two grid items inside this container namely albumcover, and albumdetails
3. Both grid items covers 6/12 grid columns.
4. We set the minimum height of album cover to _470px_. While we want albumdetails to have the same height, we do not state that yet.

```jsx
<Grid item className={"albumcover"} lg={6} sx={{ minHeight: "470px" }}>
  <img src={souljazzrecords} style={{ height: "100%" }} />
</Grid>
```

Album Cover is fairly simple. We put an image inside it, and ensure that the image matches 100% of its parent. Next, let us build Album details.

```jsx
<Grid item className={"albumdetails"} lg={6} sx={{ minHeight: "470px" }}>
  {/* Card for displaying album details */}
  <Card sx={{ backgroundColor: "#000000" }}>
    {/* Stack to vertically stack card content */}
    <Stack spacing={2}>
      {/* Card content */}
      <CardContent></CardContent>

      {/* Container for additional content */}
      <Container></Container>
    </Stack>
  </Card>
</Grid>
```

Album details nests a single Card component. However, inside the Card, there are a few elements:

- A Stack component, inside which we vertical nest the card content.
- A Container inside which we nest the album details.
- Another Container that nests an array of tracks with media control. This part has intentionally been left out for you to add. You can view the original project at https://soundsoftheuniverse.com/sjr

Let us work more on the Stack component, and then the Container.

```jsx
<Stack spacing={2}>
  <CardContent>
    <Typography variant={"h5"} sx={{ color: "white" }}>
      Punk 45: There Is No Such Thing As Society (2024 edition)
    </Typography>
    <Typography variant={"h4"} sx={{ color: "orange" }}>
      Get A Job, Get A Car, Get A Bed, Get Drunk! Underground Punk In The UK
      1977-81
    </Typography>
    <Typography variant={"h4"} sx={{ color: "white" }}>
      Underground Punk In The UK 1977-81
    </Typography>

    <Typography variant={"p"} sx={{ color: "white" }}>
      Soul Jazz Records’ new 10th anniversary edition of their long-out-of-print
      Punk 45: No Such Thing As Society. This is a one-off limited-edition
      heavyweight special-edition coloured vinyl pressing only + download code
      This new edition is fully remastered, repackaged and includes five new
      tracks from ...
    </Typography>
  </CardContent>
</Stack>
```

Inside the Stack component, we arrange the card content vertically. We also add spacing of 2px between each.

Next up, the Container component.

```jsx
<Container>
  <CardActionArea sx={{ backgroundColor: "#222222" }}>
    <Grid container direction={"row"} spacing={7}>
      <Grid item lg={6}>
        <Stack direction={"column"} spacing={1}>
          <Typography variant={"p"} sx={{ color: "white" }}>
            New 2xLP (Colored Vinly) + Download Code <br />
            SJRLP542C
          </Typography>

          <Typography variant={"p"} sx={{ color: "white" }}>
            In Stock
          </Typography>
        </Stack>
      </Grid>

      <Grid item md={6} lg={6}>
        <Grid container direction={"column"} alignItems={"flex-end"}>
          <Grid item>
            <Typography sx={{ color: "white" }}>$30.00</Typography>
          </Grid>

          <Grid item>
            <Button size={"small"} sx={{ color: "grey" }}>
              <FavoriteIcon />
            </Button>
            <Button variant={"contained"} size={"small"} sx={{ fontSize: 7 }}>
              {" "}
              ADD TO BAG
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  </CardActionArea>
</Container>
```

Inside the Container component are a number of elements. So we need to arrange them properly. We do the following:

1. Create a Grid Container whose grid items are spaced by 7px, and are horizontally arrange.
2. Both grid items take up 6 columns of width.
3. The first grid item nests a Stack component.
   - The Stack component arranges two blocks of text in a row.
4. The second grid item nests another Grid container.
   - The nested Grid container has two Grid items.
     - The first grid item simply has the price.
     - The second grid item has two buttons arranged in a row.

So we have built the following inside music player

1. Record player
   1. Album cover
   2. Album details
      1. Album description
      2. Product details
         1. Add to Cart
         2. Serial Number
         3. And so on.
2. Playlist

We round it all up with playlist below:

```jsx
<Grid item className="playlist" sx={{ overflow: "hidden" }}>
  <Stack direction={"row"} spacing={-13}>
    {playlist.map((image, index) => {
      return (
        <img
          src={image}
          style={{
            height: "100%",
            maxWidth: "150px",
            maxHeight: "150px",
          }}
        />
      );
    })}
  </Stack>
</Grid>
```

We do the following here:

1. Set overflow to hidden, because of the array of playlist images.
2. We Stack our images in a row
3. We set the spacing of the Stack to -13, so that they stack ontop of one another. This gives the view of a shelf
4. We set a fixed height and width for each image.

Conclusion:
We have done alot of things here. But the main strategy we used here is to use Containers to group related elements together. Then to nest children inside it. We have also not shied from using custom CSS to change things around. We also use breakpoints to ensure that items stay within their borders.
