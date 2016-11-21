# Fancy Slider #

## Slide between different items in manner that some may consider "fancy" ##
-   Nothing too complicated, just plain html, js and css. I put some comments in there
    to help you understand what's going on should you feel lost. 


## Known Issues ##
-   You'll notice the numbers in the divs in index.html, well, for some odd reason the 
    layout kinda messes up without any text elements inside those divs. I have no idea 
    why, and didn't feel like going through headaches trying to fixing it right now, I 
    mean it's not that bad right?
-   It doesn't handle overflow really well yet, since the sizes of elements are based
    on fixed values as opposed to fluid values based on available screen space.

## Tweaking ##
-   Most of the "animation", or more accurately styling, is done in 
    FancySlider.updateChildren(), so if you wanna tweak things, that wouldn't be a bad
    place to start.
-   You could also mess with the css in fancy-slider.css, again, no magic, it should
    all be clear.
